(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-column-notice/u-column-notice"],{"1f6c":function(t,n,e){},"2dca":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=i(e("5ea3"));function i(t){return t&&t.__esModule?t:{default:t}}var o={mixins:[t.$u.mpMixin,t.$u.mixin,u.default],watch:{text:{immediate:!0,handler:function(n,e){t.$u.test.array(n)||t.$u.error("column模式要求text参数为数组")}}},computed:{textStyle:function(){var n={};return n.color=this.color,n.fontSize=t.$u.addUnit(this.fontSize),n},vertical:function(){return"horizontal"!=this.mode}},data:function(){return{}},methods:{clickHandler:function(t){this.$emit("click",t)},close:function(){this.$emit("close")}}};n.default=o}).call(this,e("543d")["default"])},3930:function(t,n,e){"use strict";e.r(n);var u=e("8bf7"),i=e("b595");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("99d3");var c,r=e("f0c5"),a=Object(r["a"])(i["default"],u["b"],u["c"],!1,null,"489f0bf4",null,!1,u["a"],c);n["default"]=a.exports},"8bf7":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return u}));var u={uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-icon/u-icon")]).then(e.bind(null,"9889"))}},i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__get_style([t.textStyle])),u=["link","closable"].includes(t.mode);t.$mp.data=Object.assign({},{$root:{s0:e,g0:u}})},o=[]},"99d3":function(t,n,e){"use strict";var u=e("1f6c"),i=e.n(u);i.a},b595:function(t,n,e){"use strict";e.r(n);var u=e("2dca"),i=e.n(u);for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-column-notice/u-column-notice-create-component',
    {
        'uview-ui/components/u-column-notice/u-column-notice-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3930"))
        })
    },
    [['uview-ui/components/u-column-notice/u-column-notice-create-component']]
]);
