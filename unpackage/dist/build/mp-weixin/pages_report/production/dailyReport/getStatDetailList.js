(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages_report/production/dailyReport/getStatDetailList"],{"1a8e":function(t,e,n){"use strict";n.r(e);var o=n("fd38"),a=n("9aa1");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("4496");var c,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=u.exports},4496:function(t,e,n){"use strict";var o=n("60df"),a=n.n(o);a.a},"60df":function(t,e,n){},"8afb":function(t,e,n){"use strict";(function(t){n("9bf7");o(n("66fd"));var e=o(n("1a8e"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"9aa1":function(t,e,n){"use strict";n.r(e);var o=n("f3c7"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},f3c7:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{list:[],form:{date:"",date1:""},show:!1,dateVal:Number(new Date),datei:""}},onLoad:function(t){var e=JSON.parse(t.data);console.log(e);var n={"search[date][0]":e.date,"search[date][1]":e.date1,"search[processId]":e.processId,"search[staffNo]":e.staffNo};this.getList(n)},onReady:function(){},onShow:function(){},methods:{getList:function(t){var e=this;this.$Api.report.dailyReport.GetStatDetailList(t).then((function(t){console.log(t),e.list=t.data.data}))},click:function(e){console.log(e),t.navigateTo({url:"/pages/report/dailyReport/dailyReportInfo?id="+e})},del:function(e){var n=this;t.showModal({title:"确认清空",success:function(o){console.log(o);var a={id:e};o.confirm&&n.$Api.report.dailyReport.delete(a).then((function(e){console.log(e),200==e.data.code?t.showToast({title:e.data.message}):t.showToast({title:e.data.message,icon:"none"})}))}})},cancel:function(){this.show=!1},confirm:function(e){var n=t.$u.timeFormat(e.value,"yyyy-mm-dd");1==this.datei?this.form.date=n:n>=this.form.date?this.form.date1=n:t.showToast({title:"时间有误！",icon:"none"}),this.show=!1},clickDate:function(t){this.datei=t,this.show=!0},search:function(){this.getList()},formatter:function(t,e){return"year"===t?"".concat(e,"年"):"month"===t?"".concat(e,"月"):"day"===t?"".concat(e,"日"):e}}};e.default=n}).call(this,n("543d")["default"])},fd38:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uRow:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-row/u-row")]).then(n.bind(null,"5ffd"))},uCol:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-col/u-col")]).then(n.bind(null,"caca"))}},a=function(){var t=this,e=t.$createElement;t._self._c},i=[]}},[["8afb","common/runtime","common/vendor"]]]);