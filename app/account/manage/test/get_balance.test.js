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

var wf = WF();
var CURRENT = ["all", "etape2", "balance"];
var DO_TEST = false;

for(var s in wf.cli.stack)
{
  if(CURRENT.indexOf(wf.cli.stack[s].toLowerCase()) > -1) DO_TEST = true;
}

if(!DO_TEST) return;

var test =  require("../manage.app.js");
test = new test({init:{version:"TEST"}});

console.log("[*] Verifing getBalance");

global.CURRENT_BLOCK = {data:{content:{register:[]}}};

var resFalse =
{
  end: function(_res)
  {
    try
    {
      _res = JSON.parse(_res);
      if(_res.code == 0)
      {
        console.error("[!] ERROR : result should be an error");
        process.exit(1);
      }
    }
    catch(e)
    {
      console.error("[!] ERROR : Function result is not a valid JSON");
      process.exit(1);
    }
  }
}

test.getBalance({"url": "testing", "param":{}}, resFalse);
test.getBalance({"url": "testing", "param":{target:"aa"}}, resFalse);

var resTrue =
{
  end: function(_res)
  {
    try
    {
      _res = JSON.parse(_res);
      if(_res.code != 0)
      {
        console.error("[!] ERROR : result shouldn't be an error");
        process.exit(1);
      }
      if(!_res.data)
      {
        console.error("[!] ERROR : result doesn't contain data");
        process.exit(1);
      }
      else if(_res.data.exists == undefined)
      {
        console.error("[!] ERROR : result doesn't contain exists key");
        process.exit(1);
      }
      else if(!_res.data.exists)
      {
        console.error("[!] ERROR :  exists key should be true");
        process.exit(1);
      }
    }
    catch(e)
    {
      console.error("[!] ERROR : Function result is not a valid JSON");
      process.exit(1);
    }
  }
}

test.getBalance({"url": "testing", "param":{target:INIT_ADDRESS}}, resTrue);

console.log("[*] getBalance is ok")
