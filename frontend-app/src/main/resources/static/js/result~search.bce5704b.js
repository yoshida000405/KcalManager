(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["result~search"],{"6e01":function(t,n,e){},"9e73":function(t,n,e){"use strict";e("6e01")},a15b:function(t,n,e){"use strict";var r=e("23e7"),o=e("44ad"),a=e("fc6a"),i=e("a640"),u=[].join,f=o!=Object,c=i("join",",");r({target:"Array",proto:!0,forced:f||!c},{join:function(t){return u.call(a(this),void 0===t?",":t)}})},b0b5:function(t,n,e){"use strict";var r=e("7a23"),o={id:"doughnutChart",class:"chart"};function a(t,n,e,a,i,u){return Object(r["openBlock"])(),Object(r["createBlock"])("div",o)}e("a15b"),e("b680"),e("a9e3");var i=function(t){return Object.prototype.toString.call(t)};function u(t){return"function"===typeof t&&/native code/.test(t.toString())}var f="undefined"!==typeof Symbol&&u(Symbol)&&"undefined"!==typeof Reflect&&u(Reflect.ownKeys),c=function(t){return t};function l(t,n,e){var r=e.get,o=e.set;Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:r||c,set:o||c})}function s(t,n,e,r){Object.defineProperty(t,n,{value:e,enumerable:!!r,writable:!0,configurable:!0})}function d(t,n){return Object.hasOwnProperty.call(t,n)}function p(t){return Array.isArray(t)}Object.prototype.toString;function v(t){return null!==t&&"object"===typeof t}function h(t){return"[object Object]"===i(t)}function g(t){return"function"===typeof t}function m(t,n){r["default"].util.warn(t,n)}var y=void 0;try{var b=e("7a23");b&&C(b)?y=b:b&&"default"in b&&C(b.default)&&(y=b.default)}catch(St){}var _=null,w=null,O="__composition_api_installed__";function C(t){return t&&"function"===typeof t&&"Vue"===t.name}function j(t){return d(t,O)}function S(){return _}function k(){var t=_||y;return t}function $(t){_=t,Object.defineProperty(t,O,{configurable:!0,writable:!0,value:!0})}function x(t){w=t}function D(){return w}function A(){return w?I(w):null}var E=new WeakMap;function I(t){if(E.has(t))return E.get(t);var n={proxy:t,update:t.$forceUpdate,uid:t._uid,emit:t.$emit.bind(t),parent:null,root:null},e=["data","props","attrs","refs","vnode","slots"];return e.forEach((function(e){l(n,e,{get:function(){return t["$"+e]}})})),l(n,"isMounted",{get:function(){return t._isMounted}}),l(n,"isUnmounted",{get:function(){return t._isDestroyed}}),l(n,"isDeactivated",{get:function(){return t._inactive}}),l(n,"emitted",{get:function(){return t._events}}),E.set(t,n),t.$parent&&(n.parent=I(t.$parent)),t.$root&&(n.root=I(t.$root)),n}function F(t){var n=A();return null===n||void 0===n?void 0:n.proxy}function M(t,n){void 0===n&&(n={});var e=t.config.silent;t.config.silent=!0;var r=new t(n);return t.config.silent=e,r}function T(t){var n=S();return n&&t instanceof n}function P(t,n){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return t.$scopedSlots[n]?t.$scopedSlots[n].apply(t,e):m("slots."+n+'() got called outside of the "render()" scope',t)}}function B(t,n){var e;if(t){if(t._normalized)return t._normalized;for(var r in e={},t)t[r]&&"$"!==r[0]&&(e[r]=!0)}else e={};for(var r in n)r in e||(e[r]=!0);return e}function R(t){var n="function"===typeof Symbol&&Symbol.iterator,e=n&&t[n],r=0;if(e)return e.call(t);if(t&&"number"===typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function N(t,n){var e="function"===typeof Symbol&&t[Symbol.iterator];if(!e)return t;var r,o,a=e.call(t),i=[];try{while((void 0===n||n-- >0)&&!(r=a.next()).done)i.push(r.value)}catch(u){o={error:u}}finally{try{r&&!r.done&&(e=a["return"])&&e.call(a)}finally{if(o)throw o.error}}return i}function W(t,n){for(var e=0,r=n.length,o=t.length;e<r;e++,o++)t[o]=n[e];return t}function q(t){return f?Symbol.for(t):t}q("composition-api.preFlushQueue"),q("composition-api.postFlushQueue");var L="composition-api.refKey",U=new WeakMap,V=(new WeakMap,new WeakMap),X=function(){function t(t){var n=t.get,e=t.set;l(this,"value",{get:n,set:e})}return t}();function z(t,n){var e=new X(t),r=Object.seal(e);return V.set(r,!0),r}function K(t){var n;if(Y(t))return t;var e=ot((n={},n[L]=t,n));return z({get:function(){return e[L]},set:function(t){return e[L]=t}})}function Y(t){return t instanceof X}function Z(t){if(!h(t))return t;var n={};for(var e in t)n[e]=J(t,e);return n}function J(t,n){var e=t[n];return Y(e)?e:z({get:function(){return t[n]},set:function(e){return t[n]=e}})}function Q(t){var n;return Boolean((null===t||void 0===t?void 0:t.__ob__)&&"object"===typeof t.__ob__&&(null===(n=t.__ob__)||void 0===n?void 0:n.__raw__))}function G(t){var n;return Boolean((null===t||void 0===t?void 0:t.__ob__)&&"object"===typeof t.__ob__&&!(null===(n=t.__ob__)||void 0===n?void 0:n.__raw__))}function H(t){if(!(!h(t)||Q(t)||Array.isArray(t)||Y(t)||T(t)||U.has(t))){U.set(t,!0);for(var n=Object.keys(t),e=0;e<n.length;e++)tt(t,n[e])}}function tt(t,n,e){if("__ob__"!==n&&!Q(t[n])){var r,o,a=Object.getOwnPropertyDescriptor(t,n);if(a){if(!1===a.configurable)return;r=a.get,o=a.set,r&&!o||2!==arguments.length||(e=t[n])}H(e),Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:function(){var o=r?r.call(t):e;return n!==L&&Y(o)?o.value:o},set:function(a){if(!r||o){var i=r?r.call(t):e;n!==L&&Y(i)&&!Y(a)?i.value=a:o?o.call(t,a):e=a,H(a)}}})}}function nt(t){var n,e=k();if(e.observable)n=e.observable(t);else{var r=M(e,{data:{$$state:t}});n=r._data.$$state}return d(n,"__ob__")||s(n,"__ob__",rt(n)),n}function et(){return nt({}).__ob__}function rt(t){return void 0===t&&(t={}),{value:t,dep:{notify:c,depend:c,addSub:c,removeSub:c}}}function ot(t){if(!v(t))return t;if(!h(t)&&!p(t)||Q(t)||!Object.isExtensible(t))return t;var n=nt(t);return H(n),n}var at=function(t){return"on"+(t[0].toUpperCase()+t.slice(1))};function it(t){return function(n){var e=F(at(t));e&&ut(S(),e,t,n)}}function ut(t,n,e,r){var o=n.$options,a=t.config.optionMergeStrategies[e];o[e]=a(o[e],ft(n,r))}function ft(t,n){return function(){for(var e,r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];var a=null===(e=A())||void 0===e?void 0:e.proxy;x(t);try{return n.apply(void 0,W([],N(r)))}finally{x(a)}}}it("beforeMount"),it("mounted"),it("beforeUpdate"),it("updated"),it("beforeDestroy"),it("destroyed"),it("errorCaptured"),it("activated"),it("deactivated"),it("serverPrefetch");function ct(t,n,e){var r=t.__composition_api_state__=t.__composition_api_state__||{};r[n]=e}function lt(t,n){return(t.__composition_api_state__||{})[n]}var st={set:ct,get:lt};function dt(t,n,e){var r=t.$options.props;n in t||r&&d(r,n)||(Y(e)?l(t,n,{get:function(){return e.value},set:function(t){e.value=t}}):Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:function(){return G(e)&&e.__ob__.dep.depend(),e},set:function(t){e=t}}))}function pt(t){var n=st.get(t,"rawBindings")||{};if(n&&Object.keys(n).length){for(var e=t.$refs,r=st.get(t,"refs")||[],o=0;o<r.length;o++){var a=r[o],i=n[a];!e[a]&&i&&Y(i)&&(i.value=null)}var u=Object.keys(e),f=[];for(o=0;o<u.length;o++){a=u[o],i=n[a];e[a]&&i&&Y(i)&&(i.value=e[a],f.push(a))}st.set(t,"refs",f)}}function vt(t,n){var e=t.$options._parentVnode;if(e){for(var r=st.get(t,"slots")||[],o=B(e.data.scopedSlots,t.$slots),a=0;a<r.length;a++){var i=r[a];o[i]||delete n[i]}var u=Object.keys(o);for(a=0;a<u.length;a++){i=u[a];n[i]||(n[i]=P(t,i))}st.set(t,"slots",u)}}function ht(t,n,e){var r=D();x(t);try{return n(t)}catch(o){if(!e)throw o;e(o)}finally{x(r)}}function gt(t){function n(){var t=this,n=t.$options,r=n.setup,o=n.render;if(o&&(n.render=function(){for(var n=this,e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return ht(t,(function(){return o.apply(n,e)}))}),r&&"function"===typeof r){var a=n.data;n.data=function(){return e(t,t.$props),"function"===typeof a?a.call(t,t):a||{}}}}function e(t,n){void 0===n&&(n={});var e,i=t.$options.setup,u=a(t);if(s(n,"__ob__",et()),vt(t,u.slots),ht(t,(function(){e=i(n,u)})),e)if(g(e)){var f=e;t.$options.render=function(){return vt(t,u.slots),ht(t,(function(){return f()}))}}else if(h(e)){G(e)&&(e=Z(e)),st.set(t,"rawBindings",e);var c=e;Object.keys(c).forEach((function(n){var e=c[n];Y(e)||(G(e)?p(e)&&(e=K(e)):g(e)?e=e.bind(t):v(e)?o(e)&&r(e):e=K(e)),dt(t,n,e)}))}else 0}function r(t){if(h(t)&&!Y(t)&&!G(t)&&!Q(t)){var n=S(),e=n.util.defineReactive;Object.keys(t).forEach((function(n){var o=t[n];e(t,n,o),o&&r(o)}))}}function o(t,n){return void 0===n&&(n=new Map),n.has(t)?n.get(t):(n.set(t,!1),Array.isArray(t)&&G(t)?(n.set(t,!0),!0):!(!h(t)||Q(t))&&Object.keys(t).some((function(e){return o(t[e],n)})))}function a(t){var n={slots:{}},e=["root","parent","refs","listeners","isServer","ssrContext"],r=["attrs"],o=["emit"];return e.forEach((function(e){var r="$"+e;l(n,e,{get:function(){return t[r]},set:function(){m("Cannot assign to '"+e+"' because it is a read-only property",t)}})})),r.forEach((function(e){var r="$"+e;l(n,e,{get:function(){var n,e,o=ot({}),a=t[r],i=function(n){l(o,n,{get:function(){return t[r][n]}})};try{for(var u=R(Object.keys(a)),f=u.next();!f.done;f=u.next()){var c=f.value;i(c)}}catch(s){n={error:s}}finally{try{f&&!f.done&&(e=u.return)&&e.call(u)}finally{if(n)throw n.error}}return o},set:function(){m("Cannot assign to '"+e+"' because it is a read-only property",t)}})})),o.forEach((function(e){var r="$"+e;l(n,e,{get:function(){return function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];var o=t[r];o.apply(t,n)}}})})),n}t.mixin({beforeCreate:n,mounted:function(){pt(this)},updated:function(){pt(this)}})}function mt(t,n){if(!t)return n;if(!n)return t;for(var e,r,o,a=f?Reflect.ownKeys(t):Object.keys(t),i=0;i<a.length;i++)e=a[i],"__ob__"!==e&&(r=n[e],o=t[e],d(n,e)?r!==o&&h(r)&&!Y(r)&&h(o)&&!Y(o)&&mt(o,r):n[e]=o);return n}function yt(t){j(t)||(t.config.optionMergeStrategies.setup=function(t,n){return function(e,r){return mt("function"===typeof t?t(e,r)||{}:void 0,"function"===typeof n?n(e,r)||{}:void 0)}},$(t),gt(t))}var bt={install:function(t){return yt(t)}};function _t(t){return t}"undefined"!==typeof window&&window.Vue&&window.Vue.use(bt);var wt=e("1157"),Ot=e.n(wt),Ct=e("0613"),jt=_t({name:"RoundGraf",mounted:function(){Ot()((function(t){t((function(){t("#doughnutChart").drawDoughnutChart([{title:"タンパク質",value:Ct["a"].state.allInfo["protein"],color:"#FC4349"},{title:"脂質",value:Ct["a"].state.allInfo["fat"],color:"#F7E248"},{title:"炭水化物",value:Ct["a"].state.allInfo["carbohydrate"],color:"#D7DADB"}])}))}))},computed:{gram:function(){return Ct["a"].state.gram},kcal:function(){return Ct["a"].state.allInfo["kcal"]}},watch:{$route:function(t,n){t.path!==n.path&&Ot()((function(t){t((function(){t("#doughnutChart").empty(),t("#doughnutChart").drawDoughnutChart([{title:"タンパク質",value:Ct["a"].state.allInfo["protein"],color:"#FC4349"},{title:"脂質",value:Ct["a"].state.allInfo["fat"],color:"#F7E248"},{title:"炭水化物",value:Ct["a"].state.allInfo["carbohydrate"],color:"#D7DADB"}])}))}))},gram:function(t,n){Ot()((function(t){t((function(){t("#doughnutChart").empty(),t("#doughnutChart").drawDoughnutChart([{title:"タンパク質",value:Ct["a"].state.allInfo["protein"],color:"#FC4349"},{title:"脂質",value:Ct["a"].state.allInfo["fat"],color:"#F7E248"},{title:"炭水化物",value:Ct["a"].state.allInfo["carbohydrate"],color:"#D7DADB"}])}))}))},kcal:function(t,n){Ot()((function(t){t((function(){t("#doughnutChart").empty(),t("#doughnutChart").drawDoughnutChart([{title:"タンパク質",value:Ct["a"].state.allInfo["protein"],color:"#FC4349"},{title:"脂質",value:Ct["a"].state.allInfo["fat"],color:"#F7E248"},{title:"炭水化物",value:Ct["a"].state.allInfo["carbohydrate"],color:"#D7DADB"}])}))}))}}});(function(t,n){t.fn.drawDoughnutChart=function(n,e){var r=this,o=r.width(),a=r.height(),i=o/2,u=a/2,f=Math.cos,c=Math.sin,l=Math.PI,s=t.extend({segmentShowStroke:!0,segmentStrokeColor:"#0C1013",segmentStrokeWidth:1,baseColor:"rgba(0,0,0,0.5)",baseOffset:4,edgeOffset:10,percentageInnerCutout:75,animation:!0,animationSteps:90,animationEasing:"easeInOutExpo",animateRotate:!0,tipOffsetX:-8,tipOffsetY:-45,tipClass:"doughnutTip",summaryClass:"doughnutSummary",summaryTitle:"TOTAL kcal:",summaryTitleClass:"doughnutSummaryTitle",summaryNumberClass:"doughnutSummaryNumber",beforeDraw:function(){},afterDrawed:function(){},onPathEnter:function(t,n){},onPathLeave:function(t,n){}},e),d={linear:function(t){return t},easeInOutExpo:function(t){var n=t<.5?8*t*t*t*t:1-8*--t*t*t*t;return n>1?1:n}},p=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();s.beforeDraw.call(r);var v=t('<svg width="'+o+'" height="'+a+'" viewBox="0 0 '+o+" "+a+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo(r),h=[],g=d[s.animationEasing],m=R([a/2,o/2])-s.edgeOffset,y=m*(s.percentageInnerCutout/100),b=0,_=0,w=m+s.baseOffset,O=y-s.baseOffset;t(document.createElementNS("http://www.w3.org/2000/svg","path")).attr({d:A(w,O),fill:s.baseColor}).appendTo(v);var C=t(document.createElementNS("http://www.w3.org/2000/svg","g"));C.attr({opacity:0}).appendTo(v);for(var j=t('<div class="'+s.tipClass+'" />').appendTo("body").hide(),S=(j.width(),j.height(),2*(y-(m-y))),k=t('<div class="'+s.summaryClass+'" />').appendTo(r).css({width:S+"px",height:S+"px","margin-left":-S/2+"px","margin-top":-S/2+"px"}),$=(t('<p class="'+s.summaryTitleClass+'">'+s.summaryTitle+"</p>").appendTo(k),t('<p class="'+s.summaryNumberClass+'"></p>').appendTo(k).css({opacity:0})),x=0,D=n.length;x<D;x++)_=Ct["a"].state.allInfo["kcal"],b+=n[x].value,h[x]=t(document.createElementNS("http://www.w3.org/2000/svg","path")).attr({"stroke-width":s.segmentStrokeWidth,stroke:s.segmentStrokeColor,fill:n[x].color,"data-order":x}).appendTo(C).on("mouseenter",E).on("mouseleave",I).on("mousemove",F);function A(t,n){var e=-1.57,r=4.7131,o=i+f(e)*t,a=u+c(e)*t,l=i+f(e)*n,s=u+c(e)*n,d=i+f(r)*t,p=u+c(r)*t,v=i+f(r)*n,h=u+c(r)*n,g=["M",o,a,"A",t,t,0,1,1,d,p,"Z","M",v,h,"A",n,n,0,1,0,l,s,"Z"];return g=g.join(" "),g}function E(e){var r=t(this).data().order;j.text(n[r].title+": "+n[r].value+"グラム").fadeIn(200),s.onPathEnter.apply(t(this),[e,n])}function I(e){j.hide(),s.onPathLeave.apply(t(this),[e,n])}function F(t){j.css({top:t.pageY+s.tipOffsetY,left:t.pageX-j.width()/2+s.tipOffsetX})}function M(t){var e=-l/2,r=1;if(s.animation&&s.animateRotate&&(r=t),T(t,_),C.attr("opacity",t),1===n.length&&4.7122<r*(n[0].value/b*(2*l))+e)h[0].attr("d",A(m,y));else for(var o=0,a=n.length;o<a;o++){var d=r*(n[o].value/b*(2*l)),p=e+d,v=(p-e)%(2*l)>l?1:0,g=i+f(e)*m,w=u+c(e)*m,O=i+f(e)*y,j=u+c(e)*y,S=i+f(p)*m,k=u+c(p)*m,$=i+f(p)*y,x=u+c(p)*y,D=["M",g,w,"A",m,m,0,v,1,S,k,"L",$,x,"A",y,y,0,v,0,O,j,"Z"];h[o].attr("d",D.join(" ")),e+=d}}function T(t,n){$.css({opacity:t}).text((n*t).toFixed(1))}function P(t,n){var e=s.animation?W(g(t),null,0):1;n(e)}function B(t){var n=s.animation?1/W(s.animationSteps,Number.MAX_VALUE,1):1,e=s.animation?0:1;p((function o(){e+=n,P(e,t),e<=1?p(o):s.afterDrawed.call(r)}))}function R(t){return Math.min.apply(null,t)}function N(t){return!isNaN(parseFloat(t))&&isFinite(t)}function W(t,n,e){return N(n)&&t>n?n:N(e)&&t<e?e:t}return B(M),r}})(Ot.a);e("9e73");jt.render=a;n["a"]=jt}}]);
//# sourceMappingURL=result~search.bce5704b.js.map