<template>
	<view>
	   <view class="report_warpper">
	      <view class="seaerch_warpper">
			  <view>
				<u-icon name="calendar"  size="28" :label="this.$moment(month).format('YYYY-MM')" @click="monthShow=true" bold labelSize='20'></u-icon>
			   </view>
			   <view  class="seaerch_warpper_userName">
				   <span style="color: rgb(96, 98, 102);font-size: 20px;font-weight: 500;">{{this.search.userName}}</span>
				   
			   </view>
			   <view style="flex: 0 0 48px;" @click="searchShow=true">
				   <u-icon name="search" color="#2979ff" size="32" ></u-icon>
			   </view>
				
	      </view>
		  <view class="table_header">
			   <view class="table_header_tr">
		  					  <view style="flex:0 0 50px;line-height: 40px;">日期</view>
		  					  <view>
								  <p>上传</p>
								  <p>简历数</p></view>
		  					  <view>
								  <p>沟通</p>
								  <p>数量</p>
							   </view>
		  					  <view style="flex:2;">
								  <p>推荐复试</p>
								  <p>数量</p>
							   </view>
		  					  <view style="flex:2;">
								  <p>电话/微信</p>
								  <p>(分钟)</p>
							 </view>
							 <view>
								 <p>总时长</p>
								 <p>(分钟)</p>
							 </view>
				</view>
		  </view>
		  <!-- 内容区 -->
		  <view class="main">
			  <u-empty mode="search" height="320" icon="http://cdn.uviewui.com/uview/empty/car.png"
			  	v-if="data.list.length>0?false:true">
			  </u-empty>
			  <view v-else>
				  <view class="table_body">
				   <view class="table_body_tr" v-for="(item,index) in data.list" @click="go_item(item)">
					   <view style="flex:0 0 50px;line-height: 40px;">{{$moment(item.createDate).format('MM-DD')}}</view>
					   <view>{{item.totalResumeNum}}</view>
					   <view>{{item.totalContactCount}}</view>
					   <view style="flex:2;">{{item.totalSecondTestCount}}</view> 
					   <view style="flex:2;">{{item.totalTelDuration+'/'+item.totalWxDuration}}</view>
				       <view>{{item.totalDuration}}</view> 
				   </view>			 
				  </view>
			  </view>
		  </view>
		  <!-- 页脚汇总 -->
		  <view class="table_footer">
			 <view class="table_footer_tr">
			  <view style="flex:0 0 50px;">汇总:</view>
			   <view>{{data.stat.totalResumeNum}}</view>
			   <view>{{data.stat.totalContactCount}}</view>
			  <view>{{data.stat.totalSecondTestCount}}</view>	  
			  <view style="flex:2;">{{data.stat.totalTelDuration+'/'+data.stat.totalWxDuration}}</view>
			 <view>{{data.stat.totalDuration}}</view>
			 </view>
		  </view>  
	    </view>
	<loading :load="loading"></loading>
	<!-- 日期弹出框 -->
	<u-datetime-picker
	              :show="monthShow"
	              v-model="month"
	              mode="year-month"
				@cancel="monthShow=false"
				@confirm="GetList"
	></u-datetime-picker>
	<!-- 搜索弹出框 -->
	<u-popup :show="searchShow" @close="searchShow=false"  mode="center">
	            <view class="searchPopup">
	                <u--form
					:model="searchData"
					labelWidth='auto'
					borderBottom>
						<u-form-item label="姓名:" borderBottom>
							<u--input
									v-model="searchData.name"
									border="none"
									placeholder="请输入姓名"
							></u--input>
						</u-form-item>
						<u-form-item label="电话:" borderBottom>
							<u--input
									v-model="searchData.tel"
									border="none"
									placeholder="请输入电话"
							></u--input>
						</u-form-item>
						<u-form-item label="是否复试:" borderBottom>
							<u-radio-group 
							    v-model="searchData.isArrive"
							    placement="row">
								<u-radio  v-for="(item,key,index) in this.data.arriveOption"  :name="key" :label="item"></u-radio>
							</u-radio-group>
						</u-form-item>
						<u-form-item >
							<u-button text="确认" type="primary" @click="go_item('searchPopup')"></u-button>
						</u-form-item>
					</u--form>
	            </view>
			</u-popup>
	</view>
</template>

<script>
	import loading from "@/components/loading/loading.vue"
	export default{
		data(){
			return{
				monthShow:false,
				loading:true,
				month: Number(new Date()),
				searchPopup:false,
				searchData:{},
				searchFilter:'',
				searchShow:false,
				
				data:{		
					list:[],
					stat:{totalContactCount:0,
					      totalDuration:0,
						  totalResumeNum:0,
						  totalTelDuration:0,
						  totalWxDuration:0}
					
				},
				isEmpty:false,
				show: false,
				Data: {},
				search:'',
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.search=option
		},
		mounted() {
			this.GetList();
		},
		methods:{
			GetList(data){
				this.monthShow=false;
				this.loading=true;
				if(data){this.month=data.value}
				this.$Api.report.hr.CandidateContact.GetRecruiterStatList({'search[adminId]':this.search.adminId,'search[date]':this.$moment(this.month).format('YYYY-MM')}).then((res)=>{
					if(res.data.code==200){
							this.data=res.data.data
							this.data?"":this.data=[];
						
					}
				this.loading=false;
				})
			},
			go_item(data){
				let url="/pages_report/hr/RecruitmentReport/RecruitmentReport_item?adminId="+this.search.adminId+'&month='+this.$moment(this.month).format('YYYY-MM')+'&createDate='+data.createDate
				let string='';
				if(data=='searchPopup'){		
					for(let i in this.searchData){
						if(this.searchData[i]){
						string +='&'+[i]+'='+	this.searchData[i]
						}				
					}
					url="/pages_report/hr/RecruitmentReport/RecruitmentReport_item?adminId="+this.search.adminId+string
				}
				uni.navigateTo({
					url:url,
				    animationType: 'slide-in-right',
				    animationDuration: 200
				})
			},
			getDate: function(obj) {
				this.$set(this.search, this.search.option, obj.value)
				this.$forceUpdate()
				this.show = false;
				this.GetList()
			},
			formatting: function(date) {
				return this.$moment(date).format('YYYY-MM-DD')
			},
		}
	}
</script>

<style scoped lang="scss">
 @import url("./css/RecruitmentReport_sum.css");
</style>
