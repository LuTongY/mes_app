<template>
	<view class="warpper">
		<view class="charts_warpper">
			<view class="" style="padding: 8px 0;overflow: hidden;">
				<span style='font-size: 18px;font-weight: 600;padding-left: 1em;'>统计结果</span>
				<span style='font-size: 16px;color: rgb(96, 98, 102);'> · 每日00:00:00-次日00:00:00</span>
			</view>
			<view class="charts-box" style="margin: 0 auto;">
				<qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" ref='uCharts'/>
			</view>
			<view style="background-color: #eee;height: 10px;"></view>
		</view>
		<view class="userList" style="height: calc(100% - 230px);overflow: hidden;">
			<view style="height: 30px;border-bottom: 1px solid #eee;line-height: 30px;padding: 10px 0;">
				<span style="font-size: 18px;font-weight: 600;padding-left:1em ;">明细</span>
				<view class="" style="float: right;width: 150px;">
					<u-subsection :list="list" :current="curNow" @change="sectionChange" mode="button"></u-subsection>
				</view>
			</view>
			<view style="height: calc(100% - 51px);overflow:auto;">
				 <view class="" style="padding: 10px 20px;border-bottom:1px solid #eee;" v-for="(item, index) in userList" :key="index">
					 <view class="" style="display: flex;height: 30px;line-height: 30px;">
					 	<u-avatar
					 		shape="square"
					 		size="35"
					 		:src="urls[Math.ceil(Math.random()*10)-1]"				 	
					 	></u-avatar>
						<span style="padding-left: 20px;">{{item.staffName}}</span>
					 </view>			 	
				 </view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props:{
			search:{
				type:Object,
			}
		},
		data() {
			return {
				list: ['已汇报', '未汇报'],
				urls: ['https://cdn.uviewui.com/uview/album/1.jpg',
					   'https://cdn.uviewui.com/uview/album/2.jpg',
					   'https://cdn.uviewui.com/uview/album/3.jpg',
					   'https://cdn.uviewui.com/uview/album/4.jpg',
					   'https://cdn.uviewui.com/uview/album/5.jpg',
					   'https://cdn.uviewui.com/uview/album/6.jpg',
					    'https://cdn.uviewui.com/uview/album/7.jpg',
						'https://cdn.uviewui.com/uview/album/8.jpg',
						'https://cdn.uviewui.com/uview/album/9.jpg',
						'https://cdn.uviewui.com/uview/album/10.jpg',
								],
				curNow: 0,
				chartData: {},
				userList:[],
				data:[],
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: undefined,
					title: {
						name: "已汇报 0",
						fontSize: 20,
						color: "#2fc25b"
					},
					subtitle: {
						name: "未汇报 10",
						fontSize: 20,
						color: "#666666"
					},
					extra: {
						arcbar: {
							type: "default",
							width: 12,
							backgroundColor: "#E9E9E9",
							startAngle: 0.75,
							endAngle: 0.25,
							gap: 2,
							linearType: "custom"
						}
					}
				}
			};
		},
		onReady() {

		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
				if(index==0){
					this.userList=this.data.LogUser
				}else if(index==1){
					this.userList=this.data.notLogUser
				}else{
					uni.showToast({
					    icon: 'none',
						position: 'top',
					    title: '请选择汇报人员类型'
					});
				}
			},
			getServerData(data) {
				this.$Api.report.dailyStatement.GetReportUser(data).then((res) => {
                     if(res.data.code==200){
						 this.data=res.data.data;
						   let data = {
						        series: [{
						                color: "#2fc25b",
						                data: res.data.data.LogUser.length/(res.data.data.LogUser.length+res.data.data.notLogUser.length)
						            }]};
						this.chartData = data;
						this.opts.title.name='已汇报 ' + res.data.data.LogUser.length
						this.opts.subtitle.name='未汇报 ' + res.data.data.notLogUser.length
						this.userList= this.curNow==0?res.data.data.LogUser:res.data.data.notLogUser;
					 }
				})
			},
		}
	};
</script>

<style scoped>
	.warpper {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 80%;
		height: 180px;
	}

	/deep/ .userList .u-subsection--subsection,
	/deep/ .userList .u-subsection__bar {
		height: 30px !important;
	}
</style>
