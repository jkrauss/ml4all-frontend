import{x as e,y as t,z as n,A as a,S as l,i as s,s as i,M as r,J as o,e as c,b as u,Q as p,d,f,R as g,N as m,O as h,P as b,C as $,T as v,k as I,o as y,g as O,U as E,E as j,G as P,H as R,a4 as w,K as x,L as A}from"./main.js";import{_ as k,i as H,M}from"./index-92fcd14e.js";
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var S={ROOT:"mdc-form-field"},L={LABEL_SELECTOR:".mdc-form-field > label"},U=function(e){function t(n){var a=e.call(this,H(H({},t.defaultAdapter),n))||this;return a.click=function(){a.handleClick()},a}return k(t,e),Object.defineProperty(t,"cssClasses",{get:function(){return S},enumerable:!1,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return L},enumerable:!1,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{activateInputRipple:function(){},deactivateInputRipple:function(){},deregisterInteractionHandler:function(){},registerInteractionHandler:function(){}}},enumerable:!1,configurable:!0}),t.prototype.init=function(){this.adapter.registerInteractionHandler("click",this.click)},t.prototype.destroy=function(){this.adapter.deregisterInteractionHandler("click",this.click)},t.prototype.handleClick=function(){var e=this;this.adapter.activateInputRipple(),requestAnimationFrame((function(){e.adapter.deactivateInputRipple()}))},t}(M);const C=/^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,W=/^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;function D(e){return Object.entries(e).filter((([e,t])=>""!==e&&t)).map((([e])=>e)).join(" ")}function N(e,t){let n=Object.getOwnPropertyNames(e);const a={};for(let l=0;l<n.length;l++){const s=n[l],i=s.indexOf("$");-1!==i&&-1!==t.indexOf(s.substring(0,i+1))||-1===t.indexOf(s)&&(a[s]=e[s])}return a}function T(e,t){let n=Object.getOwnPropertyNames(e);const a={};for(let l=0;l<n.length;l++){const s=n[l];s.substring(0,t.length)===t&&(a[s.substring(t.length)]=e[s])}return a}function z(e,t){let n=[];if(t)for(let a=0;a<t.length;a++){const l=Array.isArray(t[a]),s=l?t[a][0]:t[a];l&&t[a].length>1?n.push(s(e,t[a][1])):n.push(s(e))}return{update(e){if((e&&e.length||0)!=n.length)throw new Error("You must not change the length of an actions array.");if(e)for(let t=0;t<e.length;t++)if(n[t]&&"update"in n[t]){Array.isArray(e[t])&&e[t].length>1?n[t].update(e[t][1]):n[t].update()}},destroy(){for(let e=0;e<n.length;e++)n[e]&&"destroy"in n[e]&&n[e].destroy()}}}const F=e=>({}),_=e=>({});function q(t){let n,a,l,s,i,j,P,R,w;const x=t[13].default,A=r(x,t,t[12],null),k=t[13].label,H=r(k,t,t[12],_);let M=[{for:t[4]},T(t[10],"label$")],S={};for(let e=0;e<M.length;e+=1)S=o(S,M[e]);let L=[{class:i=D({[t[1]]:!0,"mdc-form-field":!0,"mdc-form-field--align-end":"end"===t[2],"mdc-form-field--nowrap":t[3]})},N(t[10],["label$"])],U={};for(let e=0;e<L.length;e+=1)U=o(U,L[e]);return{c(){n=c("div"),A&&A.c(),a=u(),l=c("label"),H&&H.c(),p(l,S),p(n,U)},m(i,r){d(i,n,r),A&&A.m(n,null),f(n,a),f(n,l),H&&H.m(l,null),t[14](l),t[15](n),P=!0,R||(w=[g(s=z.call(null,l,t[5])),g(j=z.call(null,n,t[0])),g(t[9].call(null,n)),e(n,"SMUI:generic:input:mount",t[16]),e(n,"SMUI:generic:input:unmount",t[17])],R=!0)},p(e,[t]){A&&A.p&&(!P||4096&t)&&m(A,x,e,e[12],P?b(x,e[12],t,null):h(e[12]),null),H&&H.p&&(!P||4096&t)&&m(H,k,e,e[12],P?b(k,e[12],t,F):h(e[12]),_),p(l,S=$(M,[(!P||16&t)&&{for:e[4]},1024&t&&T(e[10],"label$")])),s&&v(s.update)&&32&t&&s.update.call(null,e[5]),p(n,U=$(L,[(!P||14&t&&i!==(i=D({[e[1]]:!0,"mdc-form-field":!0,"mdc-form-field--align-end":"end"===e[2],"mdc-form-field--nowrap":e[3]})))&&{class:i},1024&t&&N(e[10],["label$"])])),j&&v(j.update)&&1&t&&j.update.call(null,e[0])},i(e){P||(I(A,e),I(H,e),P=!0)},o(e){y(A,e),y(H,e),P=!1},d(e){e&&O(n),A&&A.d(e),H&&H.d(e),t[14](null),t[15](null),R=!1,E(w)}}}let B=0;function G(l,s,i){const r=["use","class","align","noWrap","inputId","label$use","getElement"];let c=j(s,r),{$$slots:u={},$$scope:p}=s;const d=function(l){let s,i=[];const r=l.$on;function o(e){t(l,e)}return l.$on=(e,t)=>{let n=e,a=()=>{};s?a=s(n,t):i.push([n,t]);const o=n.match(C),c=n.match(W),u=o||c;if(o&&console&&console.warn('Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',n),u){const e=n.split(o?":":"$");n=e[0]}const p=r.call(l,n,t);return(...e)=>(a(),p(...e))},t=>{const l=[],r={};s=(s,i)=>{let c=s,u=i,p=!1;const d=c.match(C),f=c.match(W);if(d||f){const e=c.split(d?":":"$");c=e[0],p=Object.fromEntries(e.slice(1).map((e=>[e,!0]))),p.nonpassive&&(p.passive=!1,delete p.nonpassive),p.preventDefault&&(u=n(u),delete p.preventDefault),p.stopPropagation&&(u=a(u),delete p.stopPropagation)}const g=e(t,c,u,p),m=()=>{g();const e=l.indexOf(m);e>-1&&l.splice(e,1)};return l.push(m),!c in r&&(r[c]=e(t,c,o)),m};for(let e=0;e<i.length;e++)s(i[e][0],i[e][1]);return{destroy:()=>{for(let e=0;e<l.length;e++)l[e]();for(let e of Object.entries(r))e[1]()}}}}(P());let f,g,m,h,{use:b=[]}=s,{class:$=""}=s,{align:v="start"}=s,{noWrap:I=!1}=s,{inputId:y="SMUI-form-field-"+B++}=s,{label$use:O=[]}=s;R("SMUI:generic:input:props",{id:y}),w((()=>(g=new U({activateInputRipple:()=>{h&&h.activateRipple()},deactivateInputRipple:()=>{h&&h.deactivateRipple()},deregisterInteractionHandler:(e,t)=>{m.removeEventListener(e,t)},registerInteractionHandler:(e,t)=>{m.addEventListener(e,t)}}),g.init(),()=>{g.destroy()})));return l.$$set=e=>{s=o(o({},s),x(e)),i(10,c=j(s,r)),"use"in e&&i(0,b=e.use),"class"in e&&i(1,$=e.class),"align"in e&&i(2,v=e.align),"noWrap"in e&&i(3,I=e.noWrap),"inputId"in e&&i(4,y=e.inputId),"label$use"in e&&i(5,O=e.label$use),"$$scope"in e&&i(12,p=e.$$scope)},[b,$,v,I,y,O,f,m,h,d,c,function(){return f},p,u,function(e){A[e?"unshift":"push"]((()=>{m=e,i(7,m)}))},function(e){A[e?"unshift":"push"]((()=>{f=e,i(6,f)}))},e=>i(8,h=e.detail),()=>i(8,h=void 0)]}class J extends l{constructor(e){super(),s(this,e,G,q,i,{use:0,class:1,align:2,noWrap:3,inputId:4,label$use:5,getElement:11})}get getElement(){return this.$$.ctx[11]}}export{J as F};
//# sourceMappingURL=FormField-7d2f31b7.js.map
