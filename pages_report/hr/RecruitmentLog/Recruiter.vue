<template>
	<view>
	   <view class="report_warpper">
	      <view class="seaerch_warpper">
			  <view>
				<u-icon name="calendar"  size="28" :label="this.$moment(month).format('YYYY-MM-DD')" @click="monthShow=true" bold labelSize='20'></u-icon>
			   </view>
			   <view  class="seaerch_warpper_userName">
				   <span style="color: rgb(96, 98, 102);font-size: 20px;font-weight: 500;">{{this.search.userName}}</span>		   
			   </view>
				
	      </view>
		  <view class="table_header">
			   <view class="table_header_tr">
		  					  <view style="flex:0 0 70px;line-height: 40px;">姓名</view>
		  					  <view style="line-height: 40px;">沟通时长(分)</view>
		  					  <view style="line-height: 40px;">沟通方式</view>
				</view>
		  </view>
		  <!-- 内容区 -->
		  <view class="main">
			  <u-empty mode="search" height="320" icon="http://cdn.uviewui.com/uview/empty/car.png"
			  	v-if="data.list.length>0?false:true">
			  </u-empty>
			  <view v-else>
				  <view class="table_body">
				   <view class="table_body_tr" v-for="(item,index) in data.list" @click="go_item(item.candidateId)">
					   <view style="flex:0 0 70px;line-height: 40px;">{{item.name}}</view>
					   <view>{{item.contactDuration}}</view>
					   <view>{{item.contactType}}</view>
				   </view>			 
				  </view>
			  </view>
		  </view>
		  <!-- 页脚汇总 -->
		  <view class="table_footer">
			 <view class="table_footer_tr">
			  <view style="flex:0 0 70px;">汇总:</view>
			   <view>{{sumContactDuration}}</view>
			   <view></view>
			 </view>
		  </view>  
	    </view>
	<loading :load="loading"></loading>
	<!-- 日期弹出框 -->
	<u-datetime-picker
	              :show="monthShow"
	              v-model="month"
	              mode="date"
				@cancel="monthShow=false"
				@confirm="GetList"
	></u-datetime-picker>
	</view>
</template>

<script>
	import loading from "@/components/loading/loading.vue"
	export default{
		data(){
			return{
				monthShow:false,
				loading:false,
				month: Number(new Date()),
				searchPopup:false,
				searchData:{},
				searchFilter:'',
				searchShow:false,
				
				data:{		
					list:[],
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
		computed:{
			sumContactDuration:function(){
				let sum=0
				this.data.list.forEach(item=>{
					sum += parseInt(item.contactDuration)
				})
				return sum
			}
		},
		mounted() {
			this.GetList();
		},
		methods:{
			GetList(data){
				this.monthShow=false;
				this.loading=true;
				if(data){this.month=data.value}
				this.$Api.report.hr.CandidateContact.GetRecruiterContactList({'search[recruiterId]':this.search.recruiterId,'search[contactDate]':this.$moment(this.month).format('YYYY-MM-DD'),'pagesize':'100'}).then((res)=>{
					if(res.data.code==200){
							this.data.list=res.data.data.rows || [];				
					}
				this.loading=false;
				})
			},
			go_item(id){
				uni.navigateTo({
					url:"/pages_report/hr/RecruitmentLog/candidateInfo?adminId="+id+'&staffNo='+this.search.recruiterId,
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
