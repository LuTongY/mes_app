<template>
	<view>
	<view class="warpper ">
		<view class="title  ">
			<span>流转卡基本信息</span>
			<span class="scan" ><u-icon name="scan" size="52" @click="scan"></u-icon></span>
		</view>
		<view>
			<span>{{"生产订单号:"+data.productNo}}</span>
		</view>
		<view>
			<span style="flex: 1;">{{"流转卡ID:"+data.id}}</span>
			<span style="flex: 1;">{{"制造令ID:"+data.taskId}}</span>
			<span style="flex: 1;">{{"本卡数量:"+data.quantity}}</span>
		</view>
		<view>
			<span>{{"加工物料:"+data.invName}}</span>
		</view>
		<view class="title">
			<span>标准工序路线</span>
		</view>
		<view v-for="(item,index) in data.taskProcessList" :key="item.id">
			<span style="flex: 2;">{{item.processName}}</span>
			<span style="flex: 1;">
				<view class="ReportBtn" @click="goItem(index)">
					<span>报工</span>
					<span>{{item.reportedQty}}</span>
				</view>
			</span>
		</view>
	</view>
	 <loading :load="load"></loading>
	</view>
</template>
<script>
	import loading from "@/components/loading/loading.vue"
	export default {
		components: {
			loading,
		},
		onShow(){
		    uni.$once("UpdateReportData", res => {
		        this.getData({'id':res.msg})
		    })
		},
		data() {
			return {
				scanText: '',
				data: {
					'productNo':'',
					'id':'',
					'taskId':'',
					'quantity':'',
					'invName':'',		
				},
				load: false,

			}
		},
		mounted(){
			//监听传值
			let _this = this
			uni.$once('StartScan', function(data) {
				 _this.load = true
				 _this.getData({id:data.scanText.id})
			})
		},
		methods: {
			//启动摄像头
			scan: function() {
				let _this = this;
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						_this.scanText = {id: res.result};
						_this.load = true;
						_this.getData(_this.scanText)
					   
					},
					fail:function(err){
						console.log(err)
						uni.showToast({
							icon: 'none',
							position: 'top',
							title:err.errMsg
						})
					}
				});
			},
			//获取数据
			getData:function(data){
				this.$Api.production.report.getInfo(data).then(Response => {
					this.load = false;
					if (Response.data.code == 200) {
						this.data = Response.data.data
					} else {
						uni.showToast({
							icon: 'none',
							position: 'top',
							title: Response.data.message
						})
					}
				})
			},
			goItem: function(index) {
				uni.navigateTo({
					url: '/pages/production/Report/ReportItem',
					animationDuration: 200
				});
				let data={'id':this.data.id,'taskProcessId':this.data.taskProcessList[index].id}
				setTimeout(() => {
					console.log(data)
					this.$Api.production.report.getProcessAssignInfo(data).then(Response => {
						if (Response.data.code == 200) {
							let obj = {
								data: this.data,
								index: index,
								assignList: ""
							};
							obj.assignList = Response.data.data.assignList;
							uni.$emit('ReportItem_getData', {msg: obj})
						} else {
							uni.showToast({
								icon: 'none',
								position: 'top',
								title: Response.data.message
							})
						}
					});
				}, 100);
			},
		},
	}
</script>
<style lang="scss" scoped>
	.warpper>view{
		padding: 20rpx;
		display: flex;
		position: relative;
		
	}
	.warpper>view:not(:last-child){
		border-bottom: 1px solid #E3E6E8;
	}
     .scan{
		 position: absolute;
		right: 20rpx;
	 }
	.title {
		padding: 2rpx 0;
		font-size: 18px;
		font-weight: 700;
		padding: 0!important;
		height: 45px;
		line-height: 45px;
		text-indent: 1em;
		background-color: #E3E6E8;
	}

	.ReportBtn {
		position:relative;
		top:50%;
		transform:translateY(-50%);
		max-width: 230rpx;
		padding: 8rpx 10rpx;
		background-color: #2298F5;
		color: #fff;
		border-radius: 15px;
		text-indent: 1em;
		display: inline-block;
		span:last-child {
			background-color: red;
			padding: 0 10rpx;
			border-radius: 20px;
			margin-left: 5rpx;
		}
	}
</style>
