(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-notice-bar/u-notice-bar"],{"13ae":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=o(e("5546"));function o(n){return n&&n.__esModule?n:{default:n}}var i={name:"u-notice-bar",mixins:[n.$u.mpMixin,n.$u.mixin,u.default],data:function(){return{show:!0}},methods:{click:function(n){this.$emit("click",n),this.url&&this.linkType&&this.openPage()},close:function(){this.show=!1,this.$emit("close")}}};t.default=i}).call(this,e("543d")["default"])},"3ff7":function(n,t,e){"use strict";e.r(t);var u=e("6961"),o=e("edf1");for(var i in o)"default"!==i&&function(n){e.d(t,n,(function(){return o[n]}))}(i);e("6520");var c,r=e("f0c5"),l=Object(r["a"])(o["default"],u["b"],u["c"],!1,null,"c01c53c6",null,!1,u["a"],c);t["default"]=l.exports},6520:function(n,t,e){"use strict";var u=e("d811"),o=e.n(u);o.a},6961:function(n,t,e){"use strict";e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return u}));var u={uColumnNotice:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-column-notice/u-column-notice")]).then(e.bind(null,"3930"))},uRowNotice:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-row-notice/u-row-notice")]).then(e.bind(null,"b5cb"))}},o=function(){var n=this,t=n.$createElement,e=(n._self._c,n.show?n.__get_style([{backgroundColor:n.bgColor},n.$u.addStyle(n.customStyle)]):null);n.$mp.data=Object.assign({},{$root:{s0:e}})},i=[]},d811:function(n,t,e){},edf1:function(n,t,e){"use strict";e.r(t);var u=e("13ae"),o=e.n(u);for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);t["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-notice-bar/u-notice-bar-create-component',
    {
        'uview-ui/components/u-notice-bar/u-notice-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3ff7"))
        })
    },
    [['uview-ui/components/u-notice-bar/u-notice-bar-create-component']]
]);
