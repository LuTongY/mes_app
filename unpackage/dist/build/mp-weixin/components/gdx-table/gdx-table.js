(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/gdx-table/gdx-table"],{"139b":function(t,n,r){"use strict";var o;r.d(n,"b",(function(){return e})),r.d(n,"c",(function(){return u})),r.d(n,"a",(function(){return o}));var e=function(){var t=this,n=t.$createElement,r=(t._self._c,t.__map(t.column,(function(n,r){var o=t.__get_orig(n),e=t.__get_style([t.coumentWidth(n)]);return{$orig:o,s0:e}}))),o=t.__map(t.data,(function(n,r){var o=t.__get_orig(n),e=t.__map(t.column,(function(n,r){var o=t.__get_orig(n),e=t.__get_style([t.coumentWidth(n)]);return{$orig:o,s1:e}}));return{$orig:o,l1:e}})),e=t.__map(t.tableFootSum,(function(n,r){var o=t.__get_orig(n),e=t.__map(t.column,(function(n,r){var o=t.__get_orig(n),e=t.__get_style([t.coumentWidth(n)]);return{$orig:o,s2:e}}));return{$orig:o,l3:e}}));t.$mp.data=Object.assign({},{$root:{l0:r,l2:o,l4:e}})},u=[]},"21f1":function(t,n,r){"use strict";r.r(n);var o=r("139b"),e=r("f5bb");for(var u in e)"default"!==u&&function(t){r.d(n,t,(function(){return e[t]}))}(u);r("7d70");var a,i=r("f0c5"),c=Object(i["a"])(e["default"],o["b"],o["c"],!1,null,"7bd7047d",null,!1,o["a"],a);n["default"]=c.exports},"7d70":function(t,n,r){"use strict";var o=r("f10f"),e=r.n(o);e.a},b26c:function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={name:"gdx-table",props:{column:{type:Array,default:function(){return[]}},data:{type:Array,default:function(){return[]}},footer:{type:Array,default:function(){return[]}}},computed:{tableFootSum:function(){var t=this;if(this.footer.length>0)return this.footer;var n={};return this.column.forEach((function(r,o){n[r.prop]=0==o?"汇总":"",r.hasOwnProperty("sum")&&1==r.sum&&0!=o&&t.data.isArray&&t.data.forEach((function(t,o){n[r.prop]+=parseFloat(t[r.prop]&&NaN!=parseFloat(t[r.prop])?t[r.prop]:0)}))})),[n]}},data:function(){return{search:""}},mounted:function(){console.log(this.tableFootSum),console.log(this.column)},methods:{coumentWidth:function(t){var n={flex:t.width?"0 0 "+t.width:"1","text-align":t.textAlign?t.textAlign:"left"};return n}}};n.default=o},f10f:function(t,n,r){},f5bb:function(t,n,r){"use strict";r.r(n);var o=r("b26c"),e=r.n(o);for(var u in o)"default"!==u&&function(t){r.d(n,t,(function(){return o[t]}))}(u);n["default"]=e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/gdx-table/gdx-table-create-component',
    {
        'components/gdx-table/gdx-table-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("21f1"))
        })
    },
    [['components/gdx-table/gdx-table-create-component']]
]);
