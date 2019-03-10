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
var CURRENT = ["all", "etape1", "verify"];
var DO_TEST = false;

for(var s in wf.cli.stack)
{
  if(CURRENT.indexOf(wf.cli.stack[s].toLowerCase()) > -1) DO_TEST = true;
}

if(!DO_TEST) return;

var test =  require("../start.app.js");

console.log("[*] Verifing VERIFY_ADDRESS");

var notAddress = ["0", 1, 1000000, "_AAAAAAAAAAAAAAAAAAAAA", "Bx000000000000000000000000000000000000000000000000000000000000000"];

var isAddress = ["Bx0000000000000000000000000000000000000000000000000000000000000000", "Bxa1ce31fc61c8779217d064039a0ac83b47b39f9bb13121a07d51ea60f90dd64f"];


for(var n in notAddress)
{
  if(VERIFY_ADDRESS(notAddress[n]) !== false)
  {
    console.error("[!] ERROR : " + notAddress[n] + " is not a valid address");
    process.exit(1);
  }
}

for(var i in isAddress)
{
  if(VERIFY_ADDRESS(isAddress[i]) !== true)
  {
    console.error("[!] ERROR : " + notAddress[n] + " is a valid address");
    process.exit(1);
  }
}

console.log("[+] INFO : VERIFY_ADDRESS is ok");
