<template>
	<view class="warpper">
		<u--form labelPosition="left"  :model="formData"  :rules="rules" ref="form" borderBottom labelWidth='70px'>
			<u-form-item  borderBottom   >
					<view class="" style="width: 80px;height: 80px;margin: 10px auto;border: 1px solid #eee;padding: 15px;border-radius: 50%;">
						 <u-upload
						    :fileList="fileList3"
						    @afterRead="afterRead($event,'Avatar')"
						    @delete="deletePic($event,'Avatar')"
						 	name="3"
						 	multiple
						 	:maxCount="1"
						 	width="80px"
						 	height="80px"	
						 >
						 	<image src="http://120.37.137.59:9900/upload/mobileApplet/Avatar.png" 
						 	mode="widthFix" style="width:70px;"></image>
						 </u-upload>
					</view>
			</u-form-item>
			<u-form-item label="姓名" borderBottom  required prop="user_name">
						<u--input	v-model="formData.user_name" :readonly="true" ></u--input>
						<u-icon  	slot="right" name="camera-fill"	size="32" @click="getUser"></u-icon>
			</u-form-item>
			<u-form-item label="部门" borderBottom @click='deptpickershow=true'  required prop="deptkey">
						<u--input	v-model="formData.deptkey"	disabled disabledColor="#ffffff"></u--input>
						<u-icon		slot="right"	name="arrow-right"></u-icon>
						<u-picker :show="deptpickershow" ref="uPicker"  :columns="deptpickerColumns" @confirm="deptconfirm" @cancel="deptpickershow=false" @change="changeHandler" keyName="DEPT_NAME"></u-picker>
			</u-form-item>
			<u-form-item label="岗位" borderBottom prop="JOB_POSITION" required>
						<u--input	v-model="formData.JOB_POSITION"	></u--input>
			</u-form-item>
			<u-form-item label="是否为职员" borderBottom labelWidth='90px' required>
						<u-radio-group 
						    v-model="formData.isLogin"
						    placement="row"
							@change="isLoginChange">
							<u-radio activeColor="#5c93f4" label="是" :name="1" ></u-radio>
							<u-radio activeColor="#5c93f4" label="否" :name="0" ></u-radio>
						</u-radio-group>
			</u-form-item>
			<u-form-item label="OA辅助角色" v-if="isRoleShow" borderBottom labelWidth='90px' required @click='rolePickershow=true' prop='rolekey' >
						<u--input	v-model="formData.rolekey"	disabled disabledColor="#ffffff"></u--input>
						<u-icon		slot="right"	name="arrow-right"></u-icon>
						<u-picker :show="rolePickershow" ref="uPicker"  :columns="rolePickerColumns" @confirm="roleConfirm" @cancel="rolePickershow=false"  keyName="role_name"></u-picker>
			</u-form-item>
		<!-- 	<u-form-item label="企业微信考勤组"  borderBottom labelWidth='120px' required @click='corpcheckinoptionshow=true' prop='corpcheckinoption' >
						<u--input	v-model="formData.corpcheckinoption"	disabled disabledColor="#ffffff"></u--input>
						<u-icon		slot="right"	name="arrow-right"></u-icon>
						<u-picker   :show="corpcheckinoptionshow" ref="uPicker"  :columns="corpcheckinoptionColumns" @confirm="corpcheckinoptionConfirm" @cancel="corpcheckinoptionshow=false"  keyName="groupname"></u-picker>
			</u-form-item> -->
			<u-form-item   borderBottom>
					<view class="phono" style="width: 100%;">
						<view style="padding: 8px 0;">
							<span>身份证正反面录入</span>
						</view>
						<view class="photo_main" style="display: flex;width: 100%;">
							<view style="flex: 1;border: 1px solid #eee;margin-right: 10px;padding: 8px 0;">
								 <u-upload
								    :fileList="fileList1"
								    @afterRead="afterRead($event,'identityCard_1')"
								    @delete="deletePic($event,'identityCard_1')"
								 	name="1"
								 	multiple
								 	:maxCount="1"
								 	width="120px"
								 	height="120px"	
								 >
								 	<image src="http://120.37.137.59:9900/upload/mobileApplet/sfz_1.png" 
								 	mode="widthFix" style="width:120px;"></image>
								 </u-upload>
							 </view>
							<view style="flex: 1;border: 1px solid #eee;text-align: center;padding: 8px 0;">
								 <u-upload
								    :fileList="fileList2"
								    @afterRead="afterRead($event,'identityCard_2')"
								    @delete="deletePic($event,'identityCard_2')"
								 	name="2"
								 	multiple
								 	:maxCount="1"
								 	width="120px"
								 	height="120px"
								 >
								 <image src="http://120.37.137.59:9900/upload/mobileApplet/sfz_2.png" 
								 	mode="widthFix" style="width:120px;"></image>		 
								 </u-upload>
							 </view>
						</view>
						
					</view>
			</u-form-item>
			<u-form-item label="性别" borderBottom prop='sex' required>
						<u--input	v-model="formData.sex" readonly ></u--input>
			</u-form-item>
			<u-form-item label="民族" borderBottom prop='nation' required>
						<u--input	v-model="formData.nation" readonly ></u--input>
			</u-form-item>
			<u-form-item label="出生" borderBottom prop='birth' required>
						<u--input	v-model="formData.birth" readonly ></u--input>
			</u-form-item>
			<u-form-item label="住址" borderBottom prop='address' required>
				       <view style="height: 36px;">{{formData.address}}</view>
			</u-form-item>
			<u-form-item label="身份证号" borderBottom prop='id_NO' required>
						<u--input	v-model="formData.id_NO" readonly ></u--input>
			</u-form-item>
			<u-form-item label="联系电话" borderBottom prop='Phone' required>
						<u--input	v-model="formData.Phone"  ></u--input>
			</u-form-item>
		</u--form>
		<view style="padding:10px 0;">
				<u-button type="primary" text="生成工号" @click="submit"></u-button>
		</view>
		<loading :load="loading"></loading>
		<statistics />
		<u-notify ref="uNotify"></u-notify>
	</view>
	
</template>
<script>
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default{
		components:{
		},
		data(){
			return{
				deptpickerColumns:[],
				deptpickercolumnData:[],
				corpcheckinoptionColumns:[],
				schedulist:{},
				deptpickershow:false,
				rolePickershow:false,
				corpcheckinoptionshow:false,
				fileList1:[],
				fileList2:[],
				fileList3:[],
				rolePickerColumns:[[{role_id:'20',role_name:'职员'},{role_id:'4',role_name:'经理'},{role_id:'21',role_name:'总监'}]],
				isRoleShow:false,
				loading:false,
				tmpAvatarUrl:'',
				formData:{
					'user_name':'',
					'isLogin':0,
					Avatar:'',
					identityCard_1:'',
					identityCard_2:'',
				},
				access_token:'',
				imgbase64:'',
				rules:{
					'user_name':{
						type: 'string',
					    required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change'],
					},
					'deptkey':{
						type: 'string',
					    required: true,
						message: '请选择部门',
						trigger: ['blur', 'change'],
					},
					'JOB_POSITION':{
						type: 'string',
					    required: true,
						message: '请输入职务',
						trigger: ['blur', 'change'],
					},
					'sex':{
						type: 'string',
					    required: true,
						message: '请输入性别',
						trigger: ['blur', 'change'],
					},
					'nation':{
						type: 'string',
					    required: true,
						message: '请输入民族',
						trigger: ['blur', 'change'],
					},
					'birth':{
						type: 'string',
					    required: true,
						message: '请输入出生年月',
						trigger: ['blur', 'change'],
					},
					'address':{
						type: 'string',
					    required: true,
						message: '请输入住址',
						trigger: ['blur', 'change'],
					},
					'Phone':{
						type: 'string',
					    required: true,
						message: '请输入电话',
						trigger: ['blur', 'change'],
					},
					'id_NO':{
						type: 'string',
					    required: true,
						message: '请输入身份证号',
						trigger: ['blur', 'change'],
					},
					'rolekey':{
						type: 'string',
						required: true,
						message: '请选择OA辅助角色',
						trigger: ['blur', 'change'],
					}
				},
				}
		},
		mounted() {
			this.getDept();
			// this.Getcorpcheckinoption();
		},
		methods:{
			getDept(){
				this.$Api.hr.profiling.getDept().then((res)=>{
					if(res.data.code==200){
						this.deptpickerColumns.push(res.data.data.rows)
						this.deptpickerColumns.push(res.data.data.rows1)
						this.deptpickercolumnData.push(res.data.data.rows1);
						this.deptpickercolumnData.push(res.data.data.rows2);
						this.deptpickercolumnData.push(res.data.data.rows3);
					}
				})
			},
			//获取考勤规则
			Getcorpcheckinoption(){
				this.$Api.hr.profiling.Getcorpcheckinoption().then((res)=>{
					if(res.data.code==200){
						 this.corpcheckinoptionColumns=[res.data.data.group]
						 console.log(this.corpcheckinoptionColumns);
					}
				})
			},
			getUser(){
				const _this=this
				uni.chooseImage({
					count: 6,
					sizeType: ['compressed'],
					success: function(res) {
						_this.imgToBase64(res.tempFilePaths[0]).then(base64=>{
								_this.imgbase64=base64.substring(base64.indexOf(',')+1);
								_this.$Api.hr.profiling.getOrc({image:_this.imgbase64}).then((res)=>{
									if(res.data.code==200){
										_this.loading=false;
										_this.formData.user_name=res.data.data.words_result['姓名'].words;
										_this.formData.sex=res.data.data.words_result['性别'].words;
										_this.formData.nation=res.data.data.words_result['民族'].words;
										_this.formData.birth=res.data.data.words_result['出生'].words;
										_this.formData.address=res.data.data.words_result['住址'].words;
										_this.formData.id_NO=res.data.data.words_result['公民身份号码'].words;
									}
								});
						})
						
					    }
					})
				},
			imgToBase64(data){
								return new Promise((resolve,reject)=>{
										pathToBase64(data).then(base64 => {
											resolve(base64)
										 }).catch(error => {
											console.error(error)
											reject(error)
										})		
								})			
							},
			deptconfirm(e){
				this.formData.deptkey=e.value[0].DEPT_NAME+'-'+e.value[1].DEPT_NAME
				this.formData.deptId=e.value[1].DEPT_ID
				this.deptpickershow=false;
			},
			changeHandler(e){
				 const { columnIndex,
				          value,
						  values, // values为当前变化列的数组内容
				          index,
						// 微信小程序无法将picker实例传出来，只能通过ref操作
				        picker = this.$refs.uPicker
				                } = e
				                // 当第一列值发生变化时，变化第二列(后一列)对应的选项
				                if (columnIndex === 0) {
				                    // picker为选择器this实例，变化第二列对应的选项
				                    picker.setColumnValues(1, this.deptpickercolumnData[index])
				                }
			},
			roleConfirm(e){
				this.formData.rolekey=e.value[0].role_name
				this.formData.roleId=e.value[0].role_id
				this.rolePickershow=false;
			},
			corpcheckinoptionConfirm(e){
				this.schedulist
				this.formData.rolekey=e.value[0].role_name
				this.formData.roleId=e.value[0].role_id
				this.rolePickershow=false;
			},
			isLoginChange(e){
				if(e==0){this.formData.rolekey='';this.formData.roleId=''}
				this.isRoleShow=e==1?true:false;
			},
			submit(){
				const _this=this;
				this.loading=true;
				this.$refs.form.validate().then(res => {
								this.$Api.hr.profiling.addUser(this.formData).then((res)=>{
									this.loading=false;
									if(res.data.code==200){
										_this.goItem(res.data.data.work_no,res.data.data.weCharcode);
									}
								})
							}).catch(errors => {
								this.loading=false;
								uni.$u.toast('校验失败')
							})
			  },
			  // 删除图片
			  			deletePic(event,Avatar) {
			  				this[`fileList${event.name}`].splice(event.index, 1);
							this.formData[Avatar]='';
			  			},
			  // 新增图片
			  	async afterRead(event,Avatar) {
					        this.tmpAvatarUrl=event.file[0].url
					        console.log(event);
			  				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			  				let lists = [].concat(event.file)
			  				let fileListLen = this[`fileList${event.name}`].length
			  				lists.map((item) => {
			  					this[`fileList${event.name}`].push({
			  						...item,
			  						status: 'uploading',
			  						message: '上传中'
			  					})
			  				})
						    for (let i = 0; i < lists.length; i++) {
												const result = await this.uploadFilePromise(lists[i].url,Avatar)
												let item = this[`fileList${event.name}`][fileListLen]
												this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
													status: 'success',
													message: '',
													url: result
												}))
												fileListLen++
											}
			  			},
			 uploadFilePromise(url,Avatar) {
				                let _this=this
								return new Promise((resolve, reject) => {
									let a = uni.uploadFile({
										url: 'https://api.mes.fjgdx.com/mobile/hr/profiling/upload',
										filePath: url,
										name: 'file',
										formData: {
											accessToken:uni.getStorageSync('accessToken'),
											factoryId:'10',
											Avatar,
										},
										success: (res) => {
											setTimeout(() => {
												resolve(res.data.data)
												let req=JSON.parse(res.data)
												_this.formData[Avatar]=req.data.filepath;
											}, 0)													
										}
									});
								})
							},
			  goItem(work_no,weCharcode){
			  	uni.navigateTo({
			  		url: "/pages/index/hr/profiling/profiling_item?work_no="+work_no+"&user_name="+this.formData.user_name+"&deptkey="+this.formData.deptkey+"&JOB_POSITION="+this.formData.JOB_POSITION+"&sex="+this.formData.sex+"&weCharcode="+weCharcode,
			  		animationDuration: 200
			  	});
			  },
			},
		
		}
</script>
<style >
	.warpper{
		padding:0 30px;
		height:100vh;
		overflow: auto;
	}
	.u-radio{
		margin-left: 10px;
	}
	/deep/.u-form-item__body{
		padding: 5px 0;
	}
	/deep/.u-upload__wrap{
		margin: 0 auto;
	}
	/deep/.u-upload__wrap__preview,
	/deep/.u-upload__button{
		padding: 0 !important;
		margin: 0;
	}
</style>