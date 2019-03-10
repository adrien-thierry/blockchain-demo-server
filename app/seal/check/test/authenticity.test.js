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
var CURRENT = ["all", "etape3", "authenticity"];
var DO_TEST = false;
var OK = false;

for(var s in wf.cli.stack)
{
  if(CURRENT.indexOf(wf.cli.stack[s].toLowerCase()) > -1) DO_TEST = true;
}

if(!DO_TEST) return;

var test =  require("../check.app.js");
test = new test({init:{version:"TEST"}});

console.log("[*] Verifing authenticityFlow");

test.setAuthenticity({ state: false, error: "test error"});

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
    OK = true;
  }
}

test.authenticityFlow({}, resFalse);
if(!OK)
{
  console.error("[!] ERROR : Function should raise an error");
  process.exit(1);
}

test.setAuthenticity({ state: true, error: null});
var resTrue =
{
  end: function(_res)
  {
    console.error("[!] ERROR : Function shouldn't raise an error");
    process.exit(1);
  }
}

test.authenticityFlow({}, resTrue);
console.log("[+] authenticityFlow is ok");
