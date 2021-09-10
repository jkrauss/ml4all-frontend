import{q as e,r as t,v as n,w as s,S as a,i as o,s as r,j as c,x as i,m as d,d as l,y as p,z as u,A as f,l as E,o as A,B as $,k as m,g as R,C as O,D as P,E as g,F as W,G as v,H as _,I as D,J as N,K as w,L as h,M as b,N as T}from"./main.js";
/**
 * @license
 * Copyright 2020 Google Inc.
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
 */var C={UNKNOWN:"Unknown",BACKSPACE:"Backspace",ENTER:"Enter",SPACEBAR:"Spacebar",PAGE_UP:"PageUp",PAGE_DOWN:"PageDown",END:"End",HOME:"Home",ARROW_LEFT:"ArrowLeft",ARROW_UP:"ArrowUp",ARROW_RIGHT:"ArrowRight",ARROW_DOWN:"ArrowDown",DELETE:"Delete",ESCAPE:"Escape",TAB:"Tab"},S=new Set;S.add(C.BACKSPACE),S.add(C.ENTER),S.add(C.SPACEBAR),S.add(C.PAGE_UP),S.add(C.PAGE_DOWN),S.add(C.END),S.add(C.HOME),S.add(C.ARROW_LEFT),S.add(C.ARROW_UP),S.add(C.ARROW_RIGHT),S.add(C.ARROW_DOWN),S.add(C.DELETE),S.add(C.ESCAPE),S.add(C.TAB);var U=8,x=13,G=32,B=33,j=34,y=35,H=36,L=37,M=38,k=39,K=40,I=46,F=27,z=9,q=new Map;q.set(U,C.BACKSPACE),q.set(x,C.ENTER),q.set(G,C.SPACEBAR),q.set(B,C.PAGE_UP),q.set(j,C.PAGE_DOWN),q.set(y,C.END),q.set(H,C.HOME),q.set(L,C.ARROW_LEFT),q.set(M,C.ARROW_UP),q.set(k,C.ARROW_RIGHT),q.set(K,C.ARROW_DOWN),q.set(I,C.DELETE),q.set(F,C.ESCAPE),q.set(z,C.TAB);var J=new Set;function Q(e){var t=e.key;if(S.has(t))return t;var n=q.get(e.keyCode);return n||C.UNKNOWN}
/**
 * @license
 * Copyright 2016 Google Inc.
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
 */J.add(C.PAGE_UP),J.add(C.PAGE_DOWN),J.add(C.END),J.add(C.HOME),J.add(C.ARROW_LEFT),J.add(C.ARROW_UP),J.add(C.ARROW_RIGHT),J.add(C.ARROW_DOWN);var V={animation:{prefixed:"-webkit-animation",standard:"animation"},transform:{prefixed:"-webkit-transform",standard:"transform"},transition:{prefixed:"-webkit-transition",standard:"transition"}};function X(e,t){if(function(e){return Boolean(e.document)&&"function"==typeof e.document.createElement}(e)&&t in V){var n=e.document.createElement("div"),s=V[t],a=s.standard,o=s.prefixed;return a in n.style?a:o}return t}const Y=/^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,Z=/^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;function ee(a){let o,r=[];const c=a.$on;function i(e){t(a,e)}return a.$on=(e,t)=>{let n=e,s=()=>{};o?s=o(n,t):r.push([n,t]);const i=n.match(Y),d=n.match(Z),l=i||d;if(i&&console&&console.warn('Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',n),l){const e=n.split(i?":":"$");n=e[0]}const p=c.call(a,n,t);return(...e)=>(s(),p(...e))},t=>{const a=[],c={};o=(o,r)=>{let d=o,l=r,p=!1;const u=d.match(Y),f=d.match(Z);if(u||f){const e=d.split(u?":":"$");d=e[0],p=Object.fromEntries(e.slice(1).map((e=>[e,!0]))),p.nonpassive&&(p.passive=!1,delete p.nonpassive),p.preventDefault&&(l=n(l),delete p.preventDefault),p.stopPropagation&&(l=s(l),delete p.stopPropagation)}const E=e(t,d,l,p),A=()=>{E();const e=a.indexOf(A);e>-1&&a.splice(e,1)};return a.push(A),!d in c&&(c[d]=e(t,d,i)),A};for(let e=0;e<r.length;e++)o(r[e][0],r[e][1]);return{destroy:()=>{for(let e=0;e<a.length;e++)a[e]();for(let e of Object.entries(c))e[1]()}}}}function te(e){return Object.entries(e).filter((([e,t])=>""!==e&&t)).map((([e])=>e)).join(" ")}function ne(e){let t;const n=e[10].default,s=w(n,e,e[12],null);return{c(){s&&s.c()},m(e,n){s&&s.m(e,n),t=!0},p(e,a){s&&s.p&&(!t||4096&a)&&h(s,n,e,e[12],t?T(n,e[12],a,null):b(e[12]),null)},i(e){t||(m(s,e),t=!0)},o(e){E(s,e),t=!1},d(e){s&&s.d(e)}}}function se(e){let t,n,s;const a=[{use:[e[7],...e[0]]},{class:te({[e[1]]:!0,[e[5]]:!0,...e[4]})},e[6],e[8]];var o=e[2];function r(e){let t={$$slots:{default:[ne]},$$scope:{ctx:e}};for(let e=0;e<a.length;e+=1)t=_(t,a[e]);return{props:t}}return o&&(t=new o(r(e)),e[11](t)),{c(){t&&c(t.$$.fragment),n=i()},m(e,a){t&&d(t,e,a),l(e,n,a),s=!0},p(e,[s]){const i=499&s?p(a,[129&s&&{use:[e[7],...e[0]]},50&s&&{class:te({[e[1]]:!0,[e[5]]:!0,...e[4]})},64&s&&u(e[6]),256&s&&u(e[8])]):{};if(4096&s&&(i.$$scope={dirty:s,ctx:e}),o!==(o=e[2])){if(t){f();const e=t;E(e.$$.fragment,1,0,(()=>{A(e,1)})),$()}o?(t=new o(r(e)),e[11](t),c(t.$$.fragment),m(t.$$.fragment,1),d(t,n.parentNode,n)):t=null}else o&&t.$set(i)},i(e){s||(t&&m(t.$$.fragment,e),s=!0)},o(e){t&&E(t.$$.fragment,e),s=!1},d(s){e[11](null),s&&R(n),t&&A(t,s)}}}const ae={component:null,class:"",classMap:{},contexts:{},props:{}};function oe(e,t,n){const s=["use","class","component","getElement"];let a,o=O(t,s),{$$slots:r={},$$scope:c}=t,{use:i=[]}=t,{class:d=""}=t;const l=ae.class,p={},u=[],f=ae.contexts,E=ae.props;let{component:A=ae.component}=t;Object.entries(ae.classMap).forEach((([e,t])=>{const s=P(t);s&&"subscribe"in s&&u.push(s.subscribe((t=>{n(4,p[e]=t,p)})))}));const $=ee(g());for(let e in f)f.hasOwnProperty(e)&&W(e,f[e]);return v((()=>{for(const e of u)e()})),e.$$set=e=>{t=_(_({},t),D(e)),n(8,o=O(t,s)),"use"in e&&n(0,i=e.use),"class"in e&&n(1,d=e.class),"component"in e&&n(2,A=e.component),"$$scope"in e&&n(12,c=e.$$scope)},[i,d,A,a,p,l,E,$,o,function(){return a.getElement()},r,function(e){N[e?"unshift":"push"]((()=>{a=e,n(3,a)}))},c]}class re extends a{constructor(e){super(),o(this,e,oe,se,r,{use:0,class:1,component:2,getElement:9})}get getElement(){return this.$$.ctx[9]}}const ce={...ae};function ie(e){function t(...t){return Object.assign(ae,ce,e),new re(...t)}return t.prototype=re,re.$$render&&(t.$$render=(...t)=>Object.assign(ae,ce,e)&&re.$$render(...t)),re.render&&(t.render=(...t)=>Object.assign(ae,ce,e)&&re.render(...t)),t}export{C as K,ie as a,te as c,ee as f,X as g,Q as n};
//# sourceMappingURL=classAdderBuilder-2cb7c5e6.js.map
