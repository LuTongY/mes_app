<template>
	<view>
		<u--form labelPosition="left" ref="form1" class="search">
			<div class="date">
				<u--input placeholder="开始时间" border="surround" v-model="form.date" @focus="clickDate(1)"></u--input>
				<u--input placeholder="结束时间" border="surround" v-model="form.date1" @focus="clickDate(2)"></u--input>
			</div>
			<u-datetime-picker ref="datetimePicker" :show="show" v-model="dateVal" :formatter="formatter" mode="date"  @cancel="cancel" @confirm="confirm"></u-datetime-picker>
			<div class="button">
				<u-button  type="primary" size="small" @click="search">搜索</u-button>
			</div>
		</u--form>
		<view class="u-demo-block__content table">
			<u-row>
				<u-col span="2">
					<view class="demo-layout tr">管理</view>
				</u-col>
				<u-col span="2">
					<view class="demo-layout tr">工序</view>
				</u-col>
				<u-col span="3">
					<view class="demo-layout tr">产品型号</view>
				</u-col>
				<u-col span="3">
					<view class="demo-layout tr">操作工/完成量</view>
				</u-col>
				<u-col span="2">
					<view class="demo-layout tr">操作</view>
				</u-col>
			</u-row>
			<u-row class="lin" v-for="(item,index) in list" :key="item.id">
				<u-col @click="click(item.id)" span="2">
					<view class="demo-layout td">{{item.manager}}</view>
				</u-col>
				<u-col @click="click(item.id)" span="2">
					<view class="demo-layout td">{{item.processName}}</view>
				</u-col>
				<u-col @click="click(item.id)" span="3">
					<view class="demo-layout td">{{item.productNo}}</view>
				</u-col>
				<u-col @click="click(item.id)" span="3">
					<view class="demo-layout td">{{item.staffName+'/'+item.completeQty}}</view>
				</u-col>
				<u-col @click="del(item.reportId)" span="2">
					<view class="demo-layout td">清空</view>
				</u-col>
			</u-row>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				// value1: Number(new Date()),
				form:{date:'',date1:''},
				show:false,
				dateVal:Number(new Date()),
				datei:''
			}
		},
		onLoad() {
			this.setDate();
		},
		onReady() {
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		onShow() {
			this.getList();
		},
		methods: {
			setDate(){
				let date = uni.$u.timeFormat(Number(new Date()), 'yyyy-mm-dd');
				this.form.date = date
				this.form.date1 = date
			},
			getList() {
				let form = this.form;
				let data = {
					'search[date][0]':form.date,
					'search[date][1]':form.date1,
				}
				this.$Api.report.dailyReport.GetList(data).then((res) => {
					this.list = res.data.data.rows
				})
			},
			click(id) {
				console.log(id)
				uni.navigateTo({
					url: "/pages/report/dailyReport/dailyReportInfo?id=" + id
				})
			},
			// 清空
			del(id) {
				uni.showModal({
					title: "确认清空",
					success: (res) => {
						console.log(res)
						let data = {
							'id': id
						};
						if (res.confirm) {
							this.$Api.report.dailyReport.delete(data).then((res) => {
								console.log(res)
								if (res.data.code == 200) {
									uni.showToast({
										'title': res.data.message
									})
								} else {
									uni.showToast({
										'title': res.data.message,
										'icon': 'none'
									})
								}
							})
						}
					}
				})
			},
			cancel(){
				this.show = false;
			},
			confirm(e){
				let date = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
				if(this.datei == 1){
					this.form.date = date
				}else {
					if(date >= this.form.date){
						this.form.date1 = date
					}else{
						uni.showToast({
							title:'时间有误！',
							icon:'none'
						})
					}
				}
				
				this.show = false;
			},
			clickDate(e){
				this.datei = e;
				this.show = true;
			},
			search(){
				
				this.getList();
			},
			formatter(type, value) {
				
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
		}
	}
</script>

<style lang="scss">
	.search{
		margin: 5px;
	}
	.button{
		display: flex;
	}
	.date{
		display: flex;
		margin: 10px;
	}
	.table {
		font-size: 24rpx;
	}

	.wrap {
		padding: 12px;
	}

	.demo-layout {
		height: 35px;
		line-height: 35px;
		text-align: center;
		color: #fff;
	}

	.lin:nth-child(odd) {
		background-color: #ECF5FF;
	}

	// .lin:active{
	// 	background-color: #0084C7;
	// }
	.tr {
		background-color: #3C9CFF;
	}

	.td {
		color: #333;
	}
</style>
