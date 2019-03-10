/*
 * This file is part of blockchain-demo-server
 * Copyright (c) 2019 Adrien THIERRY
 * https://github.com/adrien-thierry/blockchain-demo-server
 *
 * sources : https://github.com/adrien-thierry/blockchain-demo-server
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * @namespace ETAPE2
 */

/**
* @module ACCOUNT/MANAGE
*/

var wf = WF();

/**
*
* @function manageAccount
* @desc Prototype principal de l'app manage
*
*/
function manageAccount(conf)
{

  /**
  *
  * @memberof ETAPE2
  * @function createAccount
  * @param {object} req request parametre
  * @param {object} res response parametre
  * @desc Crée un compte et le renvoie avec la fonction
  * wf.httpUtil.dataSuccess(req, res, info, data, version);
  * @todo créer la fonction et la valider avec ./fortressjs --test create
  *
  */

  this.createAccount = function(req, res)
  {
    NEXT_BLOCK();
    var _account = CREATE_ADDRESS();
    var _amount = 0;
    if(req.param.target)
    {
      try
      {
        _amount = parseInt(req.param.target);
      }catch(e){}
    }
    var _transact = doTransaction(-1, _account.id, _amount, "n");
    CURRENT_BLOCK.data.content.register.push(_transact);
    FLUSH_BLOCK();
    wf.httpUtil.dataSuccess(req, res, req.url + " ok", _account, conf.init.version);
  }

  /**
  *
  * @memberof ETAPE2
  * @function getBalance
  * @param req request parametre
  * @param res response parametre
  * @desc Récupère la balance d'un compte et la renvoie avec
  * wf.httpUtil.dataSuccess(req, res, info, data, version);
  * @todo créer la fonction et la valider avec ./fortressjs --test balance
  *
  */

  this.getBalance = function(req, res)
  {
    if(req.param.target)
    {
      CHECK_ADDRESS(req.param.target, function(err, _data)
      {
        if(err || !_data.exists)
        {
          wf.httpUtil.dataError(req, res, "Error", "Address doesn't exist : " + err.message, 500, "1.0");
        }
        else wf.httpUtil.dataSuccess(req, res, req.url + " ok", _data, conf.init.version);
      });
    }
    else
    {
      wf.httpUtil.dataError(req, res, "Error", "Missing address", 500, "1.0");
    }

  }

  var route = "/account/:action?/:target?";
  var router = function(req, res)
  {
    switch(req.param.action)
    {
      case "create":
        this.createAccount(req, res);
      break;
      case "balance":
        this.getBalance(req, res);
      break;
      case "list":
      default:
        wf.httpUtil.dataSuccess(req, res, req.url + " ok", ["create", "balance", "list"], conf.init.version);
      break;
    }
  }.bind(this);
  wf.Router.ANY("*", route, router);

}
module.exports = manageAccount;
