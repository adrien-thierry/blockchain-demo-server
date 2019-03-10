/*
  Copyright (C) 2016-2018  Adrien THIERRY
  http://seraum.com
  License MIT
*/

/**
 * @namespace AJAX
 */
var AJAX = {};

AJAX.x = function ()
{
    if (typeof XMLHttpRequest !== 'undefined')
    {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++)
    {
        try
        {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {}
    }
    return xhr;
};

/**
 * AJAX.Send - Send an ajax request
 * @memberof AJAX
 * @method
 * @param  {string} url the target request url
 * @param  {function} callback The callback function
 * @param  {string} method The method of the request (GET, POST, PUT, DELETE...)
 * @param  {object} data the data to send in url
 * @param {bool} async Set async for the request, default is true
 * @return {void}
 */
AJAX.Send = function (url, callback, method, data, async)
{
    if (async === undefined)
    {
        async = true;
    }
    var x = AJAX.x();
    x.open(method, url, async);
    x.addEventListener("error", function(){callback({"code":"500", "message":"Server error"}, null);}, false);
    x.addEventListener("abort", function(){callback({"code":"500", "message":"Network error"}, null);}, false);
    x.onreadystatechange = function ()
    {
        if (x.readyState == 4)
        {
          if (x.status === 200)
          {
            callback(null, x.responseText);
          }
          else
          {
            callback({"code":"404", "message":"Not found"}, null);
          }
        }
    };
    if (method == 'POST')
    {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data);
};

/**
 * AJAX.GET - Get ajax request
 * @memberof AJAX
 * @method
 * @param  {string} url the target request url
 * @param  {object} data the data to send in url
 * @param  {function} callback The callback function
 * @param {bool} async Set async for the request, default is true
 * @return {void}
 */
AJAX.GET = function (url, data, callback, async)
{
    var query = [];
    for (var key in data)
    {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    AJAX.Send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async);
};

/**
 * AJAX.POST - Post ajax request
 * @memberof AJAX
 * @method
 * @param  {string} url the target request url
 * @param  {string} data the data to send in url
 * @param  {function} callback The callback function
 * @param {bool} async Set async for the request, default is true
 * @return {void}
 */
AJAX.POST = function (url, data, callback, async)
{
    AJAX.Send(url, callback, 'POST', data, async);
};

/**
 * AJAX.PUT - Put ajax request
 * @memberof AJAX
 * @method
 * @param  {string} url the target request url
 * @param  {string} data the data to send in url
 * @param  {function} callback The callback function
 * @param {bool} async Set async for the request, default is true
 * @return {void}
 */
AJAX.PUT = function (url, data, callback, async)
{
    AJAX.Send(url, callback, 'PUT', data, async);
};

/**
 * AJAX.DELETE - Delete ajax request
* @memberof AJAX
 * @method
 * @param  {string} url the target request url
 * @param  {object} data the data to send in url
 * @param  {function} callback The callback function
 * @param {bool} async Set async for the request, default is true
 * @return {void}
 */
AJAX.DELETE = function (url, data, callback, async)
{
    var query = [];
    for (var key in data)
    {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    AJAX.Send(url + (query.length ? '?' + query.join('&') : ''), callback, 'DELETE', null, async);
};

window.AJAX = AJAX;
