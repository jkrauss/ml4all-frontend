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
 */
var t=function(){function t(){this.rafIDs=new Map}return t.prototype.request=function(t,e){var n=this;this.cancel(t);var r=requestAnimationFrame((function(r){n.rafIDs.delete(t),e(r)}));this.rafIDs.set(t,r)},t.prototype.cancel=function(t){var e=this.rafIDs.get(t);e&&(cancelAnimationFrame(e),this.rafIDs.delete(t))},t.prototype.cancelAll=function(){var t=this;this.rafIDs.forEach((function(e,n){t.cancel(n)}))},t.prototype.getQueue=function(){var t=[];return this.rafIDs.forEach((function(e,n){t.push(n)})),t},t}();export{t as A};
//# sourceMappingURL=animationframe-5701646e.js.map
