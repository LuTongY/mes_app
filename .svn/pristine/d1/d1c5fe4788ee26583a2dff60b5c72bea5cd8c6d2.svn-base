<template>
	   <view class="report_warpper">
	      <view class="seaerch_warpper">
	      	<view class="calendar_icon">
	      		<view style="width: 40px;height: 40px;margin: 0 auto;">
	      			<u-icon  size="40" name="search" @click="popupShow=true"></u-icon>
	      		</view>
	      	</view>
	      	<view class="search" style="display: flex;">    
	      		<u-search placeholder="职位" v-model="searchFilter"></u-search>    		
	      	</view>
	      	<view>
	      	      <u-popup :show="popupShow" mode="center" :round="10"   @close="popupClose">
	      	      	<view class="searchPopupWarpper">
	      	              	<u--form labelPosition="left"	:model="form"	ref="form1">
	      	      							<u-form-item label="招聘类别" 	borderBottom ref="item1" labelWidth='80' @click="formItem('postTypeList','postType')">
	      	      								<u--input
	      	      														v-model="form.postType"
	      	      														disabled
	      	      														disabledColor="#ffffff"
	      	      														placeholder="请选择招聘类别"
	      	      														border="none"
	      	      												></u--input>
	      	      												<u-icon
	      	      														slot="right"
	      	      														name="arrow-right"
	      	      												></u-icon>
	      	      							</u-form-item>
	      	      							<u-form-item label="招聘部门" 	borderBottom ref="item1" labelWidth='80' @click="formItem('departmentList','departmentId')">
	      	      								<u--input
	      	      														v-model="form.departmentId"
	      	      														disabled
	      	      														disabledColor="#ffffff"
	      	      														placeholder="请选择招聘部门"
	      	      														border="none"
	      	      												></u--input>
	      	      												<u-icon
	      	      														slot="right"
	      	      														name="arrow-right"
	      	      												></u-icon>
	      	      							</u-form-item>
											<u-form-item label="开始日期" 	borderBottom ref="item1" labelWidth='80' @click="formItemTime('startTime')">
												<u--input
																		v-model="form.startTime"
																		disabled
																		disabledColor="#ffffff"
																		placeholder="请选择开始日期"
																		border="none"
																></u--input>
																<u-icon
																		slot="right"
																		name="arrow-right"
																></u-icon>
											</u-form-item>
	      	      							<u-form-item >
	      	      								<u-button text="查询" type="primary" @click="GetList('Btn')"></u-button>
	      	      							</u-form-item>
	      	      						</u--form>
	      	      				</view>
	      	      </u-popup>
	      	</view> 	
	      </view>

		  <view class="main">
			  <u-empty mode="search" height="320" icon="http://cdn.uviewui.com/uview/empty/car.png" v-if="FilterData.length>0?false:true">
			  </u-empty>
			  <view class="table" v-else> 
                 <view class="table_header">
					 <view>部门</view>
					 <view>招聘岗位</view>
					 <view style="flex: 0 0 80px;">需求/已招</view>
					 <view style="flex: 0 0 60px;">负责人</view>				
					 <view style="flex: 0 0 90px;">开始/结束</view>	 				
				 </view>
				 <view class="table_body" @scroll='showOut' ref='table_body'>
					 <view :class="['table_body_tr','table_body_tr_'+item.rowNum]" v-for="(item,index) in FilterData" :key="item.id">
						 <view>{{item.departmentName}}</view>
						 <view>{{item.postName}}</view>
						 <view style="flex: 0 0 80px;text-align: center;">{{item.demandQty+'/'+item.quantity}}</view>
						 <view style="flex: 0 0 60px;text-align: center;">{{item.recruiterName}}</view>
						 <view style="flex: 0 0 90px;text-align: center;">
							 <p>{{item.startTime}}</p>
							 <p>{{item.endTime}}</p>
						 </view>	 
					 </view>
				 </view>
				</view>
		  </view>
		  <u-picker :show="postTypePicker" :columns="[pickerColumns]" @cancel='postTypePicker=false' @confirm='PostConfirm'></u-picker>
		  <!-- 日期框组件 -->
		  <u-datetime-picker  :show="pickerTime"  v-model="optFrom[type]"  mode="date"  @confirm="formatDate($event)" @cancel="pickerTime=false" ></u-datetime-picker>
		  <!-- 加载动画 -->
		<!--  <loading :load="loading"></loading> -->
	    </view>
	
</template>

<script>
	export default{
	
		data(){
			return{
				loading:false,
				type:'',
				popupShow:false,
				pickerTime:false,
				postTypePicker:false,
				pickerColumns:[],
				searchPopup:false,
				searchFilter:'',
				form:{
					postType:'',
					startTime:'',
					endTime:'',	
				},
				optFrom:{
					postType:'',
					departmentId:'',
					startTime:Number(new Date()),
				},
				list:[],
				data:'',
				pagesize:20,
				page:1,
				showList:20,
				table_bodyscrollTop:0,
				lock:true,
			}
		},
		computed:{
		  	FilterData(){
				let FilterData=[]
				if(this.searchFilter){
					this.list.forEach((item,index)=>{
						if(item.postName.indexOf(this.searchFilter)> -1){
							FilterData.push(item);
						}
					})
				}else{
					FilterData=this.list
				}
				return FilterData
			}
		},
		mounted() {
			this.GetList();
		},
		methods:{
			GetList(data){
				if(data=='Btn'){this.page=1,this.list.length=0}
				this.loading=true,
				this.popupShow=false;
				this.pickerTime=false;
				this.postTypePicker=false;
				console.log(this.optFrom.departmentId)
				let obj={
					'pagesize':this.pagesize,
					'page':this.page,
					'search[departmentId]':parseInt(this.optFrom.departmentId)>-1?this.optFrom.departmentId+1:'',
					'search[postType]':this.optFrom.postType,
					'search[startTime]':this.form.startTime
				}
				this.$Api.report.hr.RecruitmentPlan.GetMobileList(obj).then((res)=>{
					if(res.data.code==200){
						this.data=res.data.data;
						this.lock=true;
						if(res.data.data.rows.length<this.pagesize){this.lock=false};
						res.data.data.rows.forEach((item,index)=>{
							this.list.push(item);
						})
					}
					this.loading=false;
				})
			},
			popupClose(){
				this.popupShow=false;
				this.postTypePicker=false;
				this.pickerTime=false;
			},
			PostConfirm(e){
				this.form[this.type]=e.value[0]
				this.optFrom[this.type]=e.indexs[0]
				this.postTypePicker=false;
			},
			formItem(key,formValue){
				this.postTypePicker=false;
				this.pickerTime=false;
				this.type=formValue;
				if(typeof(this.data[key]) == 'object'){
					this.pickerColumns=Object.values(this.data[key]);
				}else{
					this.pickerColumns=this.data[key];
				}
				this.postTypePicker=true;
			},
			formItemTime(key){
				this.pickerTime=false;
				this.postTypePicker=false;
				this.type=key;
				this.pickerTime=true;
			},
			formatDate(e){
				this.form[this.type]=this.$moment(e.value).format('YYYY-MM-DD');
				this.pickerTime=false;
				
			},
			showOut(e){
				let bodyHeight=this.$refs.table_body.$el.offsetHeight;
				let bodyItmeDom=document.getElementsByClassName('table_body_tr');
				let bodyItmeHeight =0;
				for(let i=0;i<bodyItmeDom.length;i++){
					bodyItmeHeight += parseInt(bodyItmeDom[i].clientHeight);
				}
				if(parseInt(bodyHeight)+parseInt(this.$refs.table_body.$el.scrollTop) - parseInt(bodyItmeHeight) >= -50 && !this.loading && this.lock){
					this.page += 1;
					this.GetList();
				}
			}
			
		}
	}
</script>

<style scoped lang="less">
	*{
		font-family: '微软雅黑';
	}
	.report_warpper{
		height: 100%;
	}
	.seaerch_warpper{
		height: 37px;
		padding: 8px 10px;
		
		border-bottom: 1px solid #ECECEC;
		display: flex;
		
	}
	.search{
		flex: 5;
	}
.calendar_icon{
	flex:1;
	margin: 0 auto;
}
.main{
	height: calc(100% - 54px);
	overflow: auto;
}
.searchPopupWarpper{
	width: 60vw;
	padding: 8vw;
	padding-bottom:10px;
}
.table_header{
	display: flex;
	background-color: #4E80FB;
	>view{
		flex: 1;
		// border-right: 1px solid #ECECEC;
		// border-bottom: 1px solid #ECECEC;
		color: #fff;
		height: 40px;
		line-height: 40px;
		
		text-align: center;
	}
}
.table_body{
	overflow: auto;
	height: calc(100vh - 94px);
	.table_body_tr:nth-child(2n){
		background-color: #E6F3F9;
	}
	.table_body_tr{
		display: flex;
		font-size: 14px;
		min-height: 45px;
		border-bottom: 1px solid #ECECEC;
		align-items: center;
		>view{
			flex: 1;
		}
	}
}
</style>