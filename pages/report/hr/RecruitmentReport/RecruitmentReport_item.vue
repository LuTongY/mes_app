<template>
	<view class="report_warpper">
		<view class="tab">
			<view class="tab_left" >
				<view style="display: inline-block;  margin: 0 auto;">
					<span style="color: rgb(96, 98, 102);font-size: 20px;">{{this.month}}</span>			
				</view>
				
			</view>
			<view class="titleSum">
				<label for="">共计人数:</label>
				<span>{{listData.length}}</span>
			</view>	
		</view>
		<!-- 内容区 -->
		<view class="main">
			<u-empty mode="search" height="320" icon="http://cdn.uviewui.com/uview/empty/car.png"
				v-if="listData.length>0?false:true">
			</u-empty>
			<u-collapse v-else>
				<template v-for="(item,index) in listData">
					<view class="user_warpper" @click="go_item(item.id)">
					 <view class="user">
						<view class="user_data">
							<view class="userName">
								<label for="">姓名:</label>
								<span>{{item.name}}</span>
							</view>
							<view class="post">
								<span>{{item.department+' · '+item.post}}</span>
								<span style="padding: 0 3px ;">|</span>
								<span>{{item.createDate}}</span>
							</view>
							<view class="salaryRequire">
								<label for="">招聘渠道:</label>
								<span>{{item.channel}}</span>
							</view>
							<view class="salaryRequire">
								<label for="">期望薪资:</label>
								<span>{{item.salaryRequire}}</span>
							</view>
						</view>
						<view class="user_avatar">
							<view class="user_avatar_warpper">
							 <u-avatar
							            icon="account-fill"
							            fontSize="38"
							            randomBgColor
										size="60"
							    ></u-avatar>
							</view>
						</view>
					</view>
					<view class="contactResultWarpper">
						<view class="contactResultWarpper-title">沟通结果</view>
						<view>
							<u--textarea :value="item.contactResult" placeholder="请输入内容" autoHeight disabled
								border="surround"></u--textarea>
						</view>
					</view>
						
					</view>
				</template>

			</u-collapse>
		</view>
		<loading :load="loading"></loading>
		<u-datetime-picker
		              :show="monthShow"
		              v-model="month"
		              mode="year-month"
					@cancel="monthShow=false"
					@confirm="GetList"
		></u-datetime-picker>
	</view>

</template>

<script>
	import loading from "@/components/loading/loading.vue"

	export default {
		data() {
			return {
				loading: true,
				monthShow: false,
				month: '',
				list: [],
				search: '',
				searchPopup: false,
				searchFilter: '',
				data: [],
				isEmpty: false,
				isSwitch: false,
			}
		},
		computed: {
			listData() {
				let list = [];
				if (!this.isSwitch) {
					list = this.data.candidateList
				} else {
					list = this.data.contactList
				}
				list ? 'list' : list = []
				return list
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.month=option.month
			this.search = option
		},

		mounted() {
			this.GetList()
		},

		methods: {
			GetList(data) {
				if (uni.getStorageSync('userName') == 0 || !uni.getStorageSync('userName')) {
					uni.showToast({
						icon: 'none',
						position: 'top',
						title: '没有获取到用户工号'
					});
					this.loading = false;
					return false;
				}
				this.monthShow = false;
				this.loading = true;
				if(data){this.month=data.value}
				let req={};
				for(let i in this.search){
					if(this.search[i]){
						req['search['+i+']']=this.search[i]
					}
				}
				this.$Api.report.hr.CandidateContact.GetCandidateList(req).then((res) => {
					if (res.data.code == 200) {
						this.data = res.data.data
						this.data ? "" : this.data = [];

					}
					this.loading = false;
				})
			},
			go_item(id){
				uni.navigateTo({
					url:"/pages/report/hr/RecruitmentReport/candidateInfo?adminId="+id,
				    animationType: 'slide-in-right',
				    animationDuration: 200
				})
			},
		}
	}
</script>

<style scoped>
	@import url("./css/RecruitmentReport_item.css");
</style>
