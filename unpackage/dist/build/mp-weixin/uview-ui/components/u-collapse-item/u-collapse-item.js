(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-collapse-item/u-collapse-item"],{"141f":function(t,n,e){},"31a9":function(t,n,e){"use strict";var i=e("141f"),a=e.n(i);a.a},"6cab":function(t,n,e){"use strict";e.r(n);var i=e("c16e"),a=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=a.a},b13b:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}));var i={uCell:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-cell/u-cell")]).then(e.bind(null,"3334"))},uLine:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-line/u-line")]).then(e.bind(null,"2fbf"))}},a=function(){var t=this,n=t.$createElement;t._self._c},u=[]},c16e:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=u(e("a34a")),a=u(e("6193"));function u(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,i,a,u,r){try{var o=t[u](r),c=o.value}catch(s){return void e(s)}o.done?n(c):Promise.resolve(c).then(i,a)}function o(t){return function(){var n=this,e=arguments;return new Promise((function(i,a){var u=t.apply(n,e);function o(t){r(u,i,a,o,c,"next",t)}function c(t){r(u,i,a,o,c,"throw",t)}o(void 0)}))}}var c={name:"u-collapse-item",mixins:[t.$u.mpMixin,t.$u.mixin,a.default],data:function(){return{elId:t.$u.guid(),animationData:{},expanded:!1,showBorder:!1,animating:!1,parentData:{accordion:!1,border:!1}}},watch:{expanded:function(t){var n=this;clearTimeout(this.timer),this.timer=null,this.timer=setTimeout((function(){n.showBorder=t}),t?10:290)}},mounted:function(){this.init()},methods:{init:function(){var n=this;if(this.updateParentData(),!this.parent)return t.$u.error("u-collapse-item必须要搭配u-collapse组件使用");var e=this.parent,i=e.value,a=e.accordion;e.children;if(a){if(t.$u.test.array(i))return t.$u.error("手风琴模式下，u-collapse组件的value参数不能为数组");this.expanded=this.name==i}else{if(!t.$u.test.array(i)&&null!==i)return t.$u.error("非手风琴模式下，u-collapse组件的value参数必须为数组");this.expanded=(i||[]).some((function(t){return t==n.name}))}this.$nextTick((function(){this.setContentAnimate()}))},updateParentData:function(){this.getParentData("u-collapse")},setContentAnimate:function(){var n=this;return o(i.default.mark((function e(){var a,u,r;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.queryRect();case 2:a=e.sent,u=n.expanded?a.height:0,n.animating=!0,r=t.createAnimation({timingFunction:"ease-in-out"}),r.height(u).step({duration:n.duration}).step(),n.animationData=r.export(),t.$u.sleep(n.duration).then((function(){n.animating=!1}));case 9:case"end":return e.stop()}}),e)})))()},clickHandler:function(){this.disabled&&this.animating||this.parent&&this.parent.onChange(this)},queryRect:function(){var t=this;return new Promise((function(n){t.$uGetRect("#".concat(t.elId)).then((function(t){n(t)}))}))}}};n.default=c}).call(this,e("543d")["default"])},c3f6:function(t,n,e){"use strict";e.r(n);var i=e("b13b"),a=e("6cab");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("31a9");var r,o=e("f0c5"),c=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"1e8aa495",null,!1,i["a"],r);n["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-collapse-item/u-collapse-item-create-component',
    {
        'uview-ui/components/u-collapse-item/u-collapse-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c3f6"))
        })
    },
    [['uview-ui/components/u-collapse-item/u-collapse-item-create-component']]
]);