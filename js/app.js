"use strict";
const $ = selector => document.querySelector(selector);
const checks = [
 ["Content-Security-Policy","Restricts which sources can load scripts, styles and other resources."],
 ["Strict-Transport-Security","Encourages browsers to use HTTPS for future visits."],
 ["X-Content-Type-Options","Use nosniff to reduce MIME-type confusion."],
 ["Referrer-Policy","Limits referrer information shared with other sites."],
 ["Permissions-Policy","Controls access to browser features such as camera and microphone."]
];
const host=$("#checks");
checks.forEach(([name,description])=>{
 const article=document.createElement("article");article.className="check";
 const title=document.createElement("b");title.textContent=name;
 const text=document.createElement("p");text.textContent=description;
 article.append(title,text);host.append(article);
});
const input=$("#pw");
function evaluate(password){
 const checks=[password.length>=12,password.length>=16,/[a-z]/.test(password)&&/[A-Z]/.test(password),/[0-9]/.test(password),/[^A-Za-z0-9]/.test(password)];
 return checks.filter(Boolean).length;
}
input.addEventListener("input",()=>{
 const password=input.value;
 const score=evaluate(password);
 $("#meter").style.width=(score*20)+"%";
 $("#score").textContent=!password?"Not evaluated":score<=2?"Needs improvement":score===3?"Fair":score===4?"Good":"Strong pattern";
 $("#advice").textContent=!password?"Use a unique passphrase and a password manager. Never reuse important passwords.":password.length<12?"Try a longer, unique passphrase. A longer password is generally harder to guess.":score<4?"Avoid predictable patterns and never reuse passwords across important accounts.":"Good pattern. Use a unique password and enable multi-factor authentication.";
});
$("#pw").addEventListener("blur",()=>{input.value="";$("#meter").style.width="0%";$("#score").textContent="Not evaluated";});
