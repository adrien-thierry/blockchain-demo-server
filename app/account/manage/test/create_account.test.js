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
var CURRENT = ["all", "etape2", "create"];
var DO_TEST = false;

for(var s in wf.cli.stack)
{
  if(CURRENT.indexOf(wf.cli.stack[s].toLowerCase()) > -1) DO_TEST = true;
}

if(!DO_TEST) return;

var test =  require("../manage.app.js");
test = new test({init:{version:"TEST"}});

console.log("[*] Verifing createAccount");

global.CURRENT_BLOCK = {data:{content:{register:[]}}};

var res =
{
  end: function(_res)
  {
    try
    {
      _res = JSON.parse(_res);
      if(!_res.data)
      {
        console.error("[!] ERROR : result doesn't contain data");
        process.exit(1);
      }
      else if(!_res.data.id)
      {
        console.error("[!] ERROR : result doesn't contain an id");
        process.exit(1);
      }
      else if(!VERIFY_ADDRESS(_res.data.id))
      {
        console.error("[!] ERROR :  result id is not a valid address : " + _res.data.id);
        process.exit(1);
      }

      if(CURRENT_BLOCK.data.content.register.length != 1)
      {
        console.error("[!] ERROR :  address is not added to CURRENT_BLOCK");
        process.exit(1);
      }
      else if(CURRENT_BLOCK.data.content.register[0].type != "n")
      {
        console.error("[!] ERROR :  address is not added to CURRENT_BLOCK");
        process.exit(1);
      }
      else if(CURRENT_BLOCK.data.content.register[0].from != -1)
      {
        console.error("[!] ERROR :  from should be -1");
        process.exit(1);
      }
      else if(CURRENT_BLOCK.data.content.register[0].to != _res.data.id)
      {
        console.error("[!] ERROR : to should be the address " + _res.data.id);
        process.exit(1);
      }

      console.log("[+] INFO : createAccount is ok");
    }
    catch(e)
    {
      console.error("[!] ERROR : Function result is not a valid JSON");
      process.exit(1);
    }
  }
}

test.createAccount({"url": "testing", "param":{}}, res);
