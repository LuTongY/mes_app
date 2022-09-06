<template>
	<view>
		<view class="warpper u-skeleton">
			<view class="title">
				<span class="u-skeleton-rect">基本信息</span>
			</view>
			<view>
				<span>{{"加工物料:"+getData.invName}}</span>
			</view>
			<u-line color="#ccc" />
			<view>
				<span style="flex: 1;">{{"本卡数量:"+getData.quantity}}</span>
				<span style="flex: 1;">{{"可报数量:"+getData.quantity}}</span>
			</view>
			<view class="title">
				<span>报工</span>
			</view>
			<view class="item">
				<view v-if="assignList.length==0" class="empty"> 没有查询到数据,请检查是否派工 </view>
				<table v-else="assignList" class="table">
					<tr class="u-tr">
						<th class="u-th" width="20%">加工人</th>
						<th class="th" width="24%">加工日期</th>
						<th class="th number" width="15%">派数量</th>
						<th class="th number" width="15%">报数量</th>
						<th class="th" width="26%">报工</th>
					</tr>
					<tr class="tr" v-for="(item,index) in assignList">
						<td class="td">{{item.staffName}}</td>
						<td class="td">{{item.produceDate}}</td>
						<td class="td number" width="15%">暂无</td>
						<td class="td number" width="15%">{{item.completeQty}}</td>
						<td class="td" width="26%">
							<view v-if='getData.quantity<=item.completeQty' class="tableBtn success">已完成 </view>
							<view v-else-if='time != item.produceDate' class="tableBtn warning">非报日期</view>
							<input type="text" size="mini" v-else v-model="assignList[index].num" placeholder="请填写数量">
							<!-- 	<field   placeholder="请填写数量" width="100%"></field> -->
						</td>
					</tr>
				</table>
			</view>
			<view v-if="assignList.length !=0">
				<view class="tableBtn end" @click="saveCompleteQty">报工</view>
				<view class="tableBtn end">入库</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<loading :load="load"></loading>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				getData: {},
				index: '',
				assignList: '',
				time: new Date().toISOString().slice(0, 10),
				load: false,
			}
		},
		mounted() {
			//监听传值
			let _this = this
			uni.$once('ReportItem_getData', function(data) {
				_this.getData = data.msg.data
				_this.index = data.msg.index
				_this.assignList = data.msg.assignList
			})
		},
		methods: {
			saveCompleteQty() {
				this.load = true
				let data = {
					id: this.getData.id,
					data: {}
				}
				this.assignList.forEach((item, index) => {
					if (item.num && item.num > 0) {
						data['data[' + item.id + ']'] = item.num
					}
				})
				this.$Api.production.report.saveCompleteQty(data).then(res => {
					if (res.data.code == 200) {
						uni.$emit('UpdateReportData', {
							msg: this.getData.id
						})
						this.$refs.uToast.show({
							title: '报工成功',
							position: 'top',
							type: 'success',
							back: true,
							duration: 1500
						});
					} else {
						this.$refs.uToast.show({
							title: res.data.message,
							position: 'top',
							type: 'error'
						});
					}
					this.load = false
				})
			}
		},
	}
</script>
<style scoped>
	.warpper>view:not(.item) {
		padding: 20rpx;
		display: flex;
		position: relative;
		overflow: hidden;

	}

	.u-field {
		padding: 0px 3px;
	}

	.title {
		padding: 2rpx 0;
		font-size: 18px;
		font-weight: 700;
		background-color: #E3E6E8;
	}

	.u-th.number,
	.u-td.number {
		width: 15%;
		flex: none;
	}

	.table {
		width: 100%;
	}

	.tableBtn {
		color: #fff;
		border-radius: 15px;
		padding: 3px;
		text-align: center;
	}

	.tableBtn.success {
		background: #19BE6B;
	}

	.tableBtn.warning {
		background: #FE952B;
	}

	.tableBtn.end {
		width: 35%;
		background: #2A7EF9;
		padding: 8px 4px;
		margin: 0 auto;
	}

	,
	.empty {
		width: 100vw;
		text-align: center;
		padding: 0 20rpx;
	}

	.u-td {
		height: 50px;
	}
</style>
