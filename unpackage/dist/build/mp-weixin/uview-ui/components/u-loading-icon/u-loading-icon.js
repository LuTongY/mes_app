(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-loading-icon/u-loading-icon"],{"0399":function(t,n,e){"use strict";e.r(n);var i=e("4350"),u=e("c45b");for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);e("a46b");var a,r=e("f0c5"),c=Object(r["a"])(u["default"],i["b"],i["c"],!1,null,"7b486b06",null,!1,i["a"],a);n["default"]=c.exports},2331:function(t,n,e){},4350:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}));var u=function(){var t=this,n=t.$createElement,e=(t._self._c,t.show?t.__get_style([t.$u.addStyle(t.customStyle)]):null),i=t.show&&!t.webviewHide?t.$u.addUnit(t.size):null,u=t.show&&!t.webviewHide?t.$u.addUnit(t.size):null,o=t.show&&t.text?t.$u.addUnit(t.textSize):null;t.$mp.data=Object.assign({},{$root:{s0:e,g0:i,g1:u,g2:o}})},o=[]},a46b:function(t,n,e){"use strict";var i=e("2331"),u=e.n(i);u.a},b4c9:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=u(e("9f66"));function u(t){return t&&t.__esModule?t:{default:t}}var o={name:"u-loading-icon",mixins:[t.$u.mpMixin,t.$u.mixin,i.default],data:function(){return{array12:Array.from({length:12}),aniAngel:360,webviewHide:!1,loading:!1}},computed:{otherBorderColor:function(){var n=t.$u.colorGradient(this.color,"#ffffff",100)[80];return"circle"===this.mode?this.inactiveColor?this.inactiveColor:n:"transparent"}},watch:{show:function(t){}},mounted:function(){this.init()},methods:{init:function(){setTimeout((function(){}),20)},addEventListenerToWebview:function(){var t=this,n=getCurrentPages(),e=n[n.length-1],i=e.$getAppWebview();i.addEventListener("hide",(function(){t.webviewHide=!0})),i.addEventListener("show",(function(){t.webviewHide=!1}))}}};n.default=o}).call(this,e("543d")["default"])},c45b:function(t,n,e){"use strict";e.r(n);var i=e("b4c9"),u=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-loading-icon/u-loading-icon-create-component',
    {
        'uview-ui/components/u-loading-icon/u-loading-icon-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0399"))
        })
    },
    [['uview-ui/components/u-loading-icon/u-loading-icon-create-component']]
]);
