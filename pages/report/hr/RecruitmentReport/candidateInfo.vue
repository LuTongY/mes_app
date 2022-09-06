<template>
	<view class="wapper">
		<view class="user">
			<view class="user_name">
				<view>{{data.candidateRow.name}}</view>
				<view>{{data.candidateRow.post}}</view>
			</view>
			<view class="user_avatar">
				<view class="user_avatar_warpper">
				<u-avatar
				           icon="account-fill"
				           fontSize="38"			         
						   size="65"
				   ></u-avatar>
				   </view>
			</view>
		</view>
		<view class="main">
			<view>
				<label for="">是否有加微信:</label>
				<span>{{data.candidateRow.is_add_wx}}</span>
			</view>
		<view>
			<label for="">是否复试:</label>
			<span>{{data.candidateRow.is_arrive}}</span>
		</view>
		<view>
			<label for="">招聘渠道:</label>
			<span>{{data.candidateRow.channel}}</span>
		</view>
		<view>
			 <label for="">复试人:</label>
			 <span>{{data.candidateRow.retester}}</span>
		</view>
		<view >
			<view>复试结果:</view>
			<view>
				<u--textarea :value="data.candidateRow.condResult" placeholder="请输入内容" autoHeight disabled
					border="surround"></u--textarea>
			</view>
		</view>
		<view>
			 <label for="">是否录用:</label>
			 <span>{{data.candidateRow.isHire}}</span>
		</view>
		<view >
			<view>录用薪资待遇:</view>
			<view>
				<u--textarea :value="data.candidateRow.hireSalary" placeholder="请输入内容" autoHeight disabled
					border="surround"></u--textarea>
			</view>
		</view>
		<view >
			<label for="">预计报到时间:</label>
			<span>{{data.candidateRow.checkinExpect}}</span>
		</view>
	  <template v-if="data.candidateRow.is_show_contact">
		<view >
			<label for="">微信:</label>
			<span>{{data.candidateRow.wx}}</span>
		</view>
		<view >
			<label for="">联系电话:</label>
			<a :href="'tel:'+data.candidateRow.tel" style="color:#606266;text-decoration: none;text-align:left;font-size: 14px;">{{data.candidateRow.tel}}</a>
		</view>
		<view class="resume">
			<label for="">简历:</label>
			<span class="table_body_name" style="flex: 3;text-align: left;text-indent: 1em;">
				<a :href="data.candidateRow.resume">{{data.candidateRow.resume_name}}</a>
			</span>
		</view>
		 </template>
		</view>
		 <template v-if="data.candidateRow.is_show_contact">
		<view class="contact">
			<view class="contact_title">
			  <h3>
				<span>沟通记录</span>
			  </h3>
			</view>	
			<u-collapse>
			    <u-collapse-item v-for="(item,index) in data.contactList" :title="$moment(item.contactTime).format('YYYY-MM-DD')+'/'+item.type" :value="'沟通时长(分): '+item.duration"
			      name="Variety components"
			    >		
			       	<u-album :urls="item.pictures"></u-album>
			    </u-collapse-item>
			</u-collapse>
		</view>
	  </template>
		<loading :load="loading"></loading>
	</view>
</template>

<script>
	import loading from "@/components/loading/loading.vue"
	export default{
		data(){
			return {
				loading: true,
				data: {candidateRow:{},contactList:{}},
				search:'',
			}
		},
		created() {
			this.GetList()
		},
		onLoad(data) {
			this.search=data
			
		},
		mounted() {
			
		},
		methods:{
			GetList(data){
				// if (uni.getStorageSync('userName') == 0 || !uni.getStorageSync('userName')) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		position: 'top',
				// 		title: '没有获取到用户工号'
				// 	});
				// 	this.loading = false;
				// 	return false;
				// }
				this.loading = true;
				this.$Api.report.hr.CandidateContact.GetCandidateDetail({
					"id": this.search.adminId,
					"staffNo": uni.getStorageSync('userName'),
				}).then((res) => {
					if (res.data.code == 200) {
						this.data = res.data.data
						// this.data ? "" : this.data = {};
				
					}
					this.loading = false;
				})
			}
		}
		
	}
</script>

<style scoped>
	@import url("./css/candidateInfo.css");
</style>
