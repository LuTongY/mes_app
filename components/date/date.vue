<template>
	<view class="dateWarpper">
	<!-- 	<u-icon label="uView" size="14" name="arrow-down"></u-icon> -->
	<view class="" style="display: flex;" @click="dateShow(true)">
		<u-icon  size="45" name="calendar" ></u-icon>
		<p style='color: #303133;line-height: 50px;'>
			<span  style="margin-right:8px;font-size:16px;">{{titleText}}</span>
			<span style="transform: rotate(90deg);display: inline-block;">></span>
		</p>
	</view>
		<u-popup :show="showDateType" @close="dateShow(false)"  mode="center">
			<view style="width: 60vw;text-align: left;text-indent: 1em;">	
				<view style="border-bottom:1px solid #eee ;padding: 5px 0;height: 40px;line-height: 40px;" @click="direct(0,'d','今天')"  v-if="mode=='date'">今天</view>
				<view style="border-bottom:1px solid #eee ;padding: 5px 0;height: 40px;line-height: 40px;" @click="direct(-1,'d','昨天')" v-if="mode=='date'">昨天</view>	
				<view style="border-bottom:1px solid #eee ;padding: 5px 0;height: 40px;line-height: 40px;" @click="direct(0,'M','本月')"  v-if="mode=='year-month'">本月</view>
				<view style="border-bottom:1px solid #eee ;padding: 5px 0;height: 40px;line-height: 40px;" @click="direct(-1,'M','上一月')" v-if="mode=='year-month'">上一月</view>
				
				<view style="border-bottom:1px solid #eee ;padding: 5px 0;height: 40px;line-height: 40px;" @click="direct(0,'y','本年度')"  v-if="mode=='year'">本年度</view>
				<view style="border-bottom:1px solid #eee ;padding: 5px 0;height: 40px;line-height: 40px;" @click="direct(-1,'y','上一年')" v-if="mode=='year'">上一年</view>
				
				<view style="border-bottom:1px solid #eee ;padding: 5px 0height: 40px;line-height: 40px;;"@click="dateMainShow=true;showCalendar=true;showDateType=false;type='single';">选择日期</view>
				<view style="padding: 5px 0;height: 40px;line-height: 40px;" @click="click=dateMainShow=true;showCalendar=true;showDateType=false;type='range'">选择区间</view>
			</view>
		</u-popup>
		<view class="dateMain" v-if="dateMainShow">
			<!-- 遮罩层 -->
			<u-overlay :show="showCalendar" @click="closeShade"></u-overlay>
			<!-- 日期弹出框 -->
			<view class="dataPicker" :class="[showCalendar?'openDataPickerAnimation':'colseDataPickerAnimation']">
				<view class="dataHeader">
					<view v-if="type=='single'">取消</view>
					<view v-if="type=='single'"></view>
					<view v-if="type=='single'"></view>
					<view v-if="type=='range'" @click="cutTab(0)" :class="[titleTabIndex==0?'range_s':'']">
						<view style="line-height: 25px;font-weight: 600;font-size: 14px;text-align: left;text-indent: 1em;">开始日期</view>
						<view style="line-height: 25px;font-size: 13px;text-align: left;text-indent: 1em;">{{titleDateText(0)}}</view>
					</view>
					<view v-if="type=='range'" @click="cutTab(1)" :class="[titleTabIndex==1?'range_s':'']">
						<view style="line-height: 25px;font-weight: 600;font-size: 14px;text-align: left;text-indent: 1em;">结束日期</view>
						<view style="line-height: 25px;font-size: 13px;text-align: left;text-indent: 1em;">{{titleDateText(1)}}</view>
					</view>
					<view v-if="type=='range'"></view>
					<view @click='confirm'>确认</view>
				</view>
				<view class="dataMain">
					<view class="dataMain_op">
						<view v-for="(item,key,index) in currentDate[0]" :class="key">
							<view class="year_warpper"
								:style="{transform: `translateY(${currentY[key]+scrollY[key]}px) translateZ(0px)`,transition:'all ease 0.1s'}"
								@touchstart="Touchstart($event,key)" @touchmove="Touchmove($event,key)"
								@touchend="Touchend($event,key)" :ref="key">
								<view v-for="c_item in dateList[key]">
									<span :class="[currentDate[titleTabIndex][key]==c_item?'currentDate':'']">{{c_item}}</span>
								</view>
							</view>
						</view>
					</view>
					<view class="filter"></view>
				</view>
			</view>

		</view>

	</view>
</template>

<script scoped>
	export default {
		name: "date",
		props: {
		 mode: { //日期类型   date,year,year-month
				type: String,
				default: 'date',
			},
		},
		watch:{
			type:function(n,o){
				if(n=='single'){this.titleTabIndex=0};
				this.init('1');	//1代表不初始化文字内容	
			}
		},
		data() {
			return {
				titleText:'',
				type:'single',  //选择类型   single 单个,range范围  
				titleTabIndex: 0,
				dateList: {
					year: [],
					month: [],
					days: [],
				},
				currentDate: [{ //当前选中的年月日
					year: this.$moment().format('YYYY'),
					month: this.$moment().format('MM'),
					// days: this.$moment().format('DD'),
				}],
				currentY: { //当前Y轴坐标
					year: 0,
					month: 0,
					days: 0,
				},
				scrollY: {
					year: 0, //单次滑动了多少PX
					month: 0,
					days: 0,
				},
				start: {
					year: {
						x: 0,
						y: 0,
					},
					month: {
						x: 0,
						y: 0,
					},
					days: {
						x: 0,
						y: 0,
					}
				},
				end: {
					year: {
						x: 0,
						y: 0,
					},
					month: {
						x: 0,
						y: 0,
					},
					days: {
						x: 0,
						y: 0,
					},
				},
				showCalendar: false,
				showDateType: false,
				dateMainShow: false,
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			dateShow(type) {
				this.showDateType = type;
			},
			confirm(row) {
				let date=[];
				let text='';
				this.currentDate.forEach((item,index)=>{
					for(let key in item){
						text += item[key]+'-';
					}	
					text=text.substring(0,text.length-1);
					date.push(text);
					text='';
				});
				if(this.type=='range'){
					if(this.$moment(date[1]).isBefore(date[0])){
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: '结束日期大于起始日期'
						});
						return false;
					}
				}
				if(date.length==1){
					this.titleText = date[0];
				}else{
					let format={
						'year':'YYYY',
						'year-month':'YY-M',
						'date':'YY-M-D',
					}
					console.log(this.$moment(date[0]).format('YY-M-D'))
					this.titleText = this.$moment(date[0]).format(format[this.mode]) + '/' + this.$moment(date[1]).format(format[this.mode]);;
				}
				this.$emit('confirm',date);
				
				this.closeShade();
			},
			Touchstart(e, op_name) {
				this.start[op_name].y = e.touches[0].pageY;
				this.start[op_name].x = e.touches[0].pageX;
			},
			Touchmove(e, op_name) {
				this.end[op_name].y = e.changedTouches[0].pageY;
				this.end[op_name].x = e.changedTouches[0].pageX;
				let maxScroll = 0 - (this.dateList[op_name].length - 1) * 44 //最大滑动距离
				let currentScroll = Math.floor(this.end[op_name].y - this.start[op_name].y) //本次滑动距离 
				if (currentScroll + this.currentY[op_name] > 0) {
					this.scrollY[op_name] = 0;
					this.currentY[op_name] = 0;
					this.currentDate[this.titleTabIndex][op_name] = this.dateList[op_name][0];
				} else if (currentScroll + this.currentY[op_name] < maxScroll) {
					this.scrollY[op_name] = 0;
					this.currentY[op_name] = 0 - ((this.dateList[op_name].length - 1) * 44);
					this.currentDate[this.titleTabIndex][op_name] = this.dateList[op_name][this.dateList[op_name].length -1
					];
				} else {
					this.scrollY[op_name] = currentScroll;
				}
			},
			Touchend(e, op_name) {
				this.currentY[op_name] += Math.ceil(this.scrollY[op_name] / 44) * 44;
				this.scrollY[op_name] = 0;
				this.currentDate[this.titleTabIndex][op_name] = this.dateList[op_name][Math.abs(this.currentY[op_name] / 44)] + '';
				// 动态获取当前年月对应的天数
				if (op_name == 'month' && this.mode == 'date') {
					this.getDays(this.currentDate[this.titleTabIndex]['year'] + '-' + this.currentDate[this.titleTabIndex]['month'])
				}
			},
			init(type) {
				if (this.type == 'single') {
					this.currentDate = [{}]
				};
				if (this.type == 'range') {
					this.currentDate = [{}, {}]
				}
				if (this.mode == 'date') {
					if(!type){this.titleText='今日'};			
					this.getYear();
				    this.getMonths();
				    this.getDays();
				} else if (this.mode == 'year-month') {
					if(!type){this.titleText='本月'};	
					this.getYear();
					this.getMonths();
				} else if (this.mode == 'year') {
					if(!type){this.titleText='本年度'};
					this.getYear();
				}
				//滑动至当前年月日
				for (let key in this.currentDate[0]) {
					this.currentY[key] = 0 - (this.dateList[key].indexOf(this.currentDate[this.titleTabIndex][key])) * 44;
				}
			},
			getDays(yearMonth = this.$moment().format('YYYY-MM')) {
				this.dateList.days = [];
				this.currentDate.forEach((item) => {
					item['days'] = item['days'] ? item['days'] : this.$moment().format('DD');
				})
				let days = this.$moment(yearMonth, "YYYY-MM").daysInMonth();
				for (let i = 1; i <= days; i++) {
					if (i < 10) {
						this.dateList.days.push('0' + i);
					} else {
						this.dateList.days.push(i + '');
					}
				}
				this.fixdays();
			},
			getMonths() {
				this.currentDate.forEach((item) => {
					item['month'] = this.$moment().format('MM')
				})
				for (let i = 1; i <= 12; i++) {
					if (i < 10) {
						this.dateList.month.push('0' + i);
					} else {
						this.dateList.month.push(i + '');
					}
				}
			},
			getYear() {
				//初始化年份
				this.currentDate.forEach((item) => {
					item['year'] = this.$moment().format('YYYY')
				})
				let currentYear = parseInt(this.$moment().format('YYYY'));
				for (let i = (currentYear - 10); i <= currentYear + 10; i++) {
					this.dateList.year.push(i + '');
				}
			},
			fixdays() {
				if (this.dateList.days.indexOf(this.currentDate[this.titleTabIndex]['days']) == -1) {
					this.currentDate[this.titleTabIndex]['days'] = this.dateList.days[this.dateList.days.length - 1];
					this.currentY['days'] = 0 - (this.dateList['days'].indexOf(this.currentDate[this.titleTabIndex]['days'])) * 44;
				}
			},
			titleDateText(index) {
				let text = '';
				for (let key in this.currentDate[index]) {
					text += this.currentDate[index][key] + '-'
				}
				let data = text.substring(0, text.length - 1)
				return data;
				return this.$moment(text).format('YYYY-MM-DD')
			},
			cutTab(index) {
				this.titleTabIndex = index;
				for (let key in this.dateList) {
					this.currentY[key] = 0 - (this.dateList[key].indexOf(this.currentDate[this.titleTabIndex][key])) * 44;
				}
			},
			closeShade() {
				this.showCalendar = false;
				let that = this;
				setTimeout(() => {
					this.dateMainShow = false
				}, 300);
			},
			direct(number,type,name){
				let format={
					y:'YYYY',
					M:'YYYY-MM',
					d:'YYYY-MM-DD'
				}
				let date=this.$moment().format(format[type]);
				
				if(number<0){
					date=this.$moment().add(number,type).format(format[type])
				}
				this.titleText=name;
				this.$emit('confirm',[date,date]);
				this.dateShow(false);
			}

		}
	}
</script>

<style lang="less">
	@import url("@/components/date/date.less");
</style>
