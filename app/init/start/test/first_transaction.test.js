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
var CURRENT = ["all", "etape1", "first"];
var DO_TEST = false;

for(var s in wf.cli.stack)
{
  if(CURRENT.indexOf(wf.cli.stack[s].toLowerCase()) > -1) DO_TEST = true;
}

if(!DO_TEST) return;

var test =  require("../start.app.js");

console.log("[*] Verifing FIRST_TRANSACTION");

var ft = FIRST_TRANSACTION();

if(!ft) {console.error("[!] ERROR : FIRST_TRANSACTION() return null or undefined variable"); process.exit(1);}

if(!ft.type ) {console.error("[!] ERROR : type is null or undefined"); process.exit(1);}

if(!ft.id ) {console.error("[!] ERROR : id is null or undefined"); process.exit(1);}

if(!ft.from ) {console.error("[!] ERROR : from is null or undefined"); process.exit(1);}
if(ft.from != -1 ) {console.error("[!] ERROR : from is different of -1"); process.exit(1);}

if(!ft.to ) {console.error("[!] ERROR : to is null or undefined"); process.exit(1);}
if(!VERIFY_ADDRESS(ft.to) ) {console.error("[!] to is not a valid address"); process.exit(1);}

if(ft.amount == undefined) {console.error("[!] ERROR : amount is null or undefined"); process.exit(1);}
if(typeof ft.amount != "number") {console.error("[!] ERROR : amount is not a number"); process.exit();}

console.log("[+] INFO : FIRST_TRANSACTION is ok");
