try{self["workbox:window:5.1.4"]&&_()}catch(e){}function e(e,t){return new Promise((function(r){var n=new MessageChannel;n.port1.onmessage=function(e){r(e.data)},e.postMessage(t,[n.port2])}))}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function r(e,r){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}(e))||r&&e&&"number"==typeof e.length){n&&(e=n);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}try{self["workbox:core:5.1.4"]&&_()}catch(e){}var n=function(){var e=this;this.promise=new Promise((function(t,r){e.resolve=t,e.reject=r}))};function o(e,t){var r=location.href;return new URL(e,r).href===new URL(t,r).href}var i=function(e,t){this.type=e,Object.assign(this,t)};function a(e,t,r){return r?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}function s(){}var c=function(t){var r,s;function c(e,r){var s,c;return void 0===r&&(r={}),(s=t.call(this)||this).t={},s.i=0,s.o=new n,s.u=new n,s.s=new n,s.v=0,s.h=new Set,s.l=function(){var e=s.m,t=e.installing;s.i>0||!o(t.scriptURL,s.g)||performance.now()>s.v+6e4?(s.p=t,e.removeEventListener("updatefound",s.l)):(s.P=t,s.h.add(t),s.o.resolve(t)),++s.i,t.addEventListener("statechange",s.S)},s.S=function(e){var t=s.m,r=e.target,n=r.state,o=r===s.p,a=o?"external":"",c={sw:r,originalEvent:e};!o&&s.j&&(c.isUpdate=!0),s.dispatchEvent(new i(a+n,c)),"installed"===n?s.A=self.setTimeout((function(){"installed"===n&&t.waiting===r&&s.dispatchEvent(new i(a+"waiting",c))}),200):"activating"===n&&(clearTimeout(s.A),o||s.u.resolve(r))},s.O=function(e){var t=s.P;t===navigator.serviceWorker.controller&&(s.dispatchEvent(new i("controlling",{sw:t,originalEvent:e,isUpdate:s.j})),s.s.resolve(t))},s.U=(c=function(e){var t=e.data,r=e.source;return a(s.getSW(),(function(){s.h.has(r)&&s.dispatchEvent(new i("message",{data:t,sw:r,originalEvent:e}))}))},function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];try{return Promise.resolve(c.apply(this,e))}catch(e){return Promise.reject(e)}}),s.g=e,s.t=r,navigator.serviceWorker.addEventListener("message",s.U),s}s=t,(r=c).prototype=Object.create(s.prototype),r.prototype.constructor=r,r.__proto__=s;var v,f=c.prototype;return f.register=function(e){var t=(void 0===e?{}:e).immediate,r=void 0!==t&&t;try{var n=this;return function(e,t){var r=e();return r&&r.then?r.then(t):t()}((function(){if(!r&&"complete"!==document.readyState)return u(new Promise((function(e){return window.addEventListener("load",e)})))}),(function(){return n.j=Boolean(navigator.serviceWorker.controller),n.I=n.M(),a(n.R(),(function(e){n.m=e,n.I&&(n.P=n.I,n.u.resolve(n.I),n.s.resolve(n.I),n.I.addEventListener("statechange",n.S,{once:!0}));var t=n.m.waiting;return t&&o(t.scriptURL,n.g)&&(n.P=t,Promise.resolve().then((function(){n.dispatchEvent(new i("waiting",{sw:t,wasWaitingBeforeRegister:!0}))})).then((function(){}))),n.P&&(n.o.resolve(n.P),n.h.add(n.P)),n.m.addEventListener("updatefound",n.l),navigator.serviceWorker.addEventListener("controllerchange",n.O,{once:!0}),n.m}))}))}catch(e){return Promise.reject(e)}},f.update=function(){try{return this.m?u(this.m.update()):void 0}catch(e){return Promise.reject(e)}},f.getSW=function(){try{return void 0!==this.P?this.P:this.o.promise}catch(e){return Promise.reject(e)}},f.messageSW=function(t){try{return a(this.getSW(),(function(r){return e(r,t)}))}catch(e){return Promise.reject(e)}},f.M=function(){var e=navigator.serviceWorker.controller;return e&&o(e.scriptURL,this.g)?e:void 0},f.R=function(){try{var e=this;return function(e,t){try{var r=e()}catch(e){return t(e)}return r&&r.then?r.then(void 0,t):r}((function(){return a(navigator.serviceWorker.register(e.g,e.t),(function(t){return e.v=performance.now(),t}))}),(function(e){throw e}))}catch(e){return Promise.reject(e)}},(v=[{key:"active",get:function(){return this.u.promise}},{key:"controlling",get:function(){return this.s.promise}}])&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(c.prototype,v),c}(function(){function e(){this.k=new Map}var t=e.prototype;return t.addEventListener=function(e,t){this.B(e).add(t)},t.removeEventListener=function(e,t){this.B(e).delete(t)},t.dispatchEvent=function(e){e.target=this;for(var t,n=r(this.B(e.type));!(t=n()).done;)(0,t.value)(e)},t.B=function(e){return this.k.has(e)||this.k.set(e,new Set),this.k.get(e)},e}());function u(e,t){if(!t)return e&&e.then?e.then(s):Promise.resolve()}export{c as Workbox,e as messageSW};
//# sourceMappingURL=workbox-window.prod.es5-4882dc8f.js.map
