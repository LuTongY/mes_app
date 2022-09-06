<template>
	   <view class="report_warpper">
	      <view class="seaerch_warpper">
				<view class="search">
					<u-search placeholder="请输入招聘人员" v-model="searchFilter"></u-search>
				</view>			
	      </view>
		  <!-- 内容区 -->
		  <view class="main">
			  <u-empty mode="search" height="320" icon="http://cdn.uviewui.com/uview/empty/car.png"
			  	v-if="dataFilter.length>0?false:true">
			  </u-empty>
			 <u-cell-group v-else>
			 	<u-cell v-for="(item,index) in dataFilter"  size='large'  icon="account-fill" :title="item.recruiter"   :isLink="true" @click="go_item(item)"></u-cell>
			 </u-cell-group>
		  </view>
		    <loading :load="loading"></loading>
	    </view>
	
</template>

<script>
	import loading from "@/components/loading/loading.vue"
	export default{
		data(){
			return{
				loading:true,
				searchPopup:false,
				searchFilter:'',
				data:[],
				isEmpty:false,
				show: false,
				Data: {},
			}
		},
		computed:{
			dataFilter(){
				let list = [];
				let ListObjct={};
				if(!this.searchFilter){
					list=this.data;
				}else{
					this.data.forEach((item,index)=>{
						if(item.recruiter.indexOf(this.searchFilter)> -1){
							list.push(item)
						}
					})
				}
				return list	  
			},
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			option.userName=option.hasOwnProperty('userName')?option.userName:0;
			uni.setStorageSync('userName',option.userName)
		},
		mounted() {
			this.GetList();
		},
		methods:{
			GetList(data){
				this.monthShow=false;
				this.loading=true;	
				this.$Api.report.hr.CandidateContact.GetRecruiterList().then((res)=>{
					if(res.data.code==200){
							this.data=res.data.data.recruiterList
							this.data?"":this.data=[];
						
					}
				this.loading=false;
				})
			},
			go_item(data){
				uni.navigateTo({
					url:"/pages/report/hr/RecruitmentReport/RecruitmentReport_sum?adminId="+data.adminId+'&userName='+data.recruiter,
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

<style scoped>
 @import url("./css/RecruitmentReport.css");
</style>
