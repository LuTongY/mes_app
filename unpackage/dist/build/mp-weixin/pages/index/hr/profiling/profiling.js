(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/hr/profiling/profiling"],{"0f8e":function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return o}));var o={"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u--form/u--form")]).then(t.bind(null,"c9be"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"d6d0"))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u--input/u--input")]).then(t.bind(null,"0f32"))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-icon/u-icon")]).then(t.bind(null,"9889"))},uPicker:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-picker/u-picker")]).then(t.bind(null,"8613"))},uRadioGroup:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-radio-group/u-radio-group")]).then(t.bind(null,"3aa9"))},uRadio:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-radio/u-radio")]).then(t.bind(null,"984d"))},uRow:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-row/u-row")]).then(t.bind(null,"5ffd"))},uCol:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-col/u-col")]).then(t.bind(null,"caca"))},uButton:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-button/u-button")]).then(t.bind(null,"e667"))},loading:function(){return t.e("components/loading/loading").then(t.bind(null,"8d2c"))},uNotify:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-notify/u-notify")]).then(t.bind(null,"ae16"))}},r=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.deptpickershow=!0},e.e1=function(n){e.deptpickershow=!1},e.e2=function(n){e.rolePickershow=!0},e.e3=function(n){e.rolePickershow=!1})},i=[]},"3e28":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("c971"),r={components:{},data:function(){return{deptpickerColumns:[],deptpickercolumnData:[],deptpickershow:!1,rolePickershow:!1,rolePickerColumns:[[{role_id:"20",role_name:"职员"},{role_id:"4",role_name:"经理"},{role_id:"21",role_name:"总监"}]],isRoleShow:!1,loading:!1,formData:{user_name:"",isLogin:0},access_token:"",imgbase64:"",rules:{user_name:{type:"string",required:!0,message:"请填写姓名",trigger:["blur","change"]},deptkey:{type:"string",required:!0,message:"请选择部门",trigger:["blur","change"]},JOB_POSITION:{type:"string",required:!0,message:"请输入职务",trigger:["blur","change"]},sex:{type:"string",required:!0,message:"请输入性别",trigger:["blur","change"]},nation:{type:"string",required:!0,message:"请输入民族",trigger:["blur","change"]},birth:{type:"string",required:!0,message:"请输入出生年月",trigger:["blur","change"]},address:{type:"string",required:!0,message:"请输入住址",trigger:["blur","change"]},Phone:{type:"string",required:!0,message:"请输入电话",trigger:["blur","change"]},id_NO:{type:"string",required:!0,message:"请输入身份证号",trigger:["blur","change"]},rolekey:{type:"string",required:!0,message:"请选择OA辅助角色",trigger:["blur","change"]}}}},mounted:function(){this.getDept()},methods:{getDept:function(){var e=this;this.$Api.hr.profiling.getDept().then((function(n){200==n.data.code&&(e.deptpickerColumns.push(n.data.data.rows),e.deptpickerColumns.push(n.data.data.rows1),e.deptpickercolumnData.push(n.data.data.rows1),e.deptpickercolumnData.push(n.data.data.rows2),e.deptpickercolumnData.push(n.data.data.rows3))}))},getUser:function(){var n=this;e.chooseImage({count:6,sizeType:["original"],sourceType:["camera"],success:function(e){n.imgToBase64(e.tempFilePaths[0]).then((function(e){n.imgbase64=e.substring(e.indexOf(",")+1),n.getToken()}))}})},imgToBase64:function(e){return new Promise((function(n,t){(0,o.pathToBase64)(e).then((function(e){n(e)})).catch((function(e){console.error(e),t(e)}))}))},getOrc:function(){var n=this;n.loading=!0,e.request({method:"POST",url:"https://aip.baidubce.com/rest/2.0/ocr/v1/idcard",data:{access_token:n.access_token,image:n.imgbase64,id_card_side:"front"},header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(e){n.loading=!1,n.formData.user_name=e.data.words_result["姓名"].words,n.formData.sex=e.data.words_result["性别"].words,n.formData.nation=e.data.words_result["民族"].words,n.formData.birth=e.data.words_result["出生"].words,n.formData.address=e.data.words_result["住址"].words,n.formData.id_NO=e.data.words_result["公民身份号码"].words},fail:function(t){e.showToast({icon:"none",position:"top",title:"获取身份证失败"}),n.loading=!1}})},getToken:function(){var n=this;n.loading=!0,e.request({method:"POST",url:"https://aip.baidubce.com/oauth/2.0/token",header:{"Content-Type":"application/x-www-form-urlencoded"},data:{grant_type:"client_credentials",client_id:"o6YjhMfi8mUkyPkAh98sTufN",client_secret:"Yeto6wl3gGRTDq4ut6rBWpfbuPGg2aXu"},success:function(e){n.loading=!1,n.access_token=e.data.access_token,n.getOrc()},fail:function(t){e.showToast({icon:"none",position:"top",title:"获取Token失败"}),n.loading=!1}})},deptconfirm:function(e){this.formData.deptkey=e.value[0].DEPT_NAME+"-"+e.value[1].DEPT_NAME,this.formData.deptId=e.value[1].DEPT_ID,this.deptpickershow=!1},changeHandler:function(e){var n=e.columnIndex,t=(e.value,e.values,e.index),o=e.picker,r=void 0===o?this.$refs.uPicker:o;0===n&&r.setColumnValues(1,this.deptpickercolumnData[t])},roleConfirm:function(e){this.formData.rolekey=e.value[0].role_name,this.formData.roleId=e.value[0].role_id,this.rolePickershow=!1},isLoginChange:function(e){0==e&&(this.formData.rolekey="",this.formData.roleId=""),this.isRoleShow=1==e},submit:function(){var n=this,t=this;this.loading=!0,this.$refs.form.validate().then((function(e){n.$Api.hr.profiling.addUser(n.formData).then((function(e){n.loading=!1,200==e.data.code&&t.goItem(e.data.data.work_no)}))})).catch((function(t){n.loading=!1,e.$u.toast("校验失败")}))},goItem:function(n){e.navigateTo({url:"/pages/index/hr/profiling/profiling_item?work_no="+n+"&user_name="+this.formData.user_name+"&deptkey="+this.formData.deptkey+"&JOB_POSITION="+this.formData.JOB_POSITION+"&sex="+this.formData.sex,animationDuration:200})}}};n.default=r}).call(this,t("543d")["default"])},"4ace":function(e,n,t){},"70c9":function(e,n,t){"use strict";t.r(n);var o=t("0f8e"),r=t("f7db");for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);t("a38e");var a,u=t("f0c5"),s=Object(u["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=s.exports},a38e:function(e,n,t){"use strict";var o=t("4ace"),r=t.n(o);r.a},e900:function(e,n,t){"use strict";(function(e){t("9bf7");o(t("66fd"));var n=o(t("70c9"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t("543d")["createPage"])},f7db:function(e,n,t){"use strict";t.r(n);var o=t("3e28"),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a}},[["e900","common/runtime","common/vendor"]]]);