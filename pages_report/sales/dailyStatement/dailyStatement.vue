<template>
	<view id='dailyStatement'>
		<view class="header" style="height: 150px;">
			<view style="width: 90%;margin: 0 auto;padding: 10px 0;">
				 <u-subsection :list="subsectionlist" :current="curNow" @change="sectionChange" fontSize='16' mode="subsection"></u-subsection>
			</view>
			<view style="width: 90%;margin: 0 auto;display: flex;height: 50px;line-height: 50px;">
				 <view style="flex: 1;text-align: center;line-height: 50px;">
					 <view style="margin: 0 auto;width: auto;margin-top:17px;" @click="showDataType=true">
					 	 <u-icon name="arrow-down" :label='dataType' style="width: 50px;margin: 0 auto;" labelPos="left" ></u-icon>
					 </view>
					 <!-- 查询方式 -->
					 <u-popup :show="showDataType" @close="showDataType=false" @open="open" mode="center">
					             <view style="width: 60vw;text-align: left;text-indent: 1em;">
					                 <view style="border-bottom:1px solid #eee ;padding: 5px 0;" @click="today">今天</view>
					                 <view style="border-bottom:1px solid #eee ;padding: 5px 0;" @click="showCalendar=true;showDataType=false;calendarType='single';">选择日期</view>
									 <view style="padding: 5px 0;" @click="showCalendar=true;showDataType=false;calendarType='range'">选择区间</view>
					             </view>
					 </u-popup>
					 <!-- 日历弹出框 -->
					 <u-calendar :minDate="minDate"   :maxDate="maxDate" :mode='calendarType'  :show="showCalendar" @confirm="confirmCalendar" @close="showCalendar=false" closeOnClickOverlay></u-calendar>
				 </view>
				 <view style="flex: 1;text-align: center;">
					 <view style="margin: 0 auto;width: auto;margin-top:17px;">
					 	 <u-icon name="arrow-down" label='所有部门' style="width: 90px;margin: 0 auto;" labelPos="left" ></u-icon>
					 </view>
					  <!-- 部门弹出框 -->
					 <u-popup :show="department" @close="department=false" mode="center">
					 	<view style="height: auto;padding:30px 50px;border-radius: 12px;" class="dept">
					 		<u-checkbox-group v-model="checkboxValue" placement="column">
					 			<u-checkbox label="全部" :name="0" :customStyle="{marginBottom: '12px'}"> </u-checkbox>
					 			<u-checkbox :customStyle="{marginBottom: '12px'}" v-for="(item, index) in selectData"
					 				:key="item.value" :label="item.label" :name="item.value">
					 			</u-checkbox>
					 		</u-checkbox-group>
					 		<view style="display: flex;padding-top:20px ;">
					 			<u-button text="取消" style="margin-right: 20px;" @click="()=>{department=false}"></u-button>
					 			<u-button type="primary" text="确定"></u-button>
					 		</view>
					 	</view>
					 </u-popup>
				 </view>
			</view>
			<view style="background-color: #eee;height: 10px;">
				
			</view>
		</view>
		<view class="main">
			<statistics ref='statistics'  @search='search'   v-show="curNow=='1'"/>
			<u-collapse accordion ref='collapse' v-show="curNow=='0'">
				<u-collapse-item title="收到询盘邮件情况" >
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">询盘数量</view>
						<view style="flex: 1;">查看</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData">
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;">{{item.stat.inquiryMail.quantity}}</view>
							<view style="flex: 1;height: 38px;" >
								<span class='detail' v-if='item.stat.inquiryMail.quantity>0' @click="go_item(index,'inquiryMail')" >详细</span>
							</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('inquiryMail','quantity') }}</view>
						<view style="flex: 1;"></view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="发出报价邮件情况[*]">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">发出报价数量</view>
						<view style="flex: 1;">查看</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData">
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;">{{item.stat.quotationMail.quantity}}</view>
							<view style="flex: 1;height: 38px;" >
								<span class='detail' v-if='item.stat.quotationMail.quantity>0' @click="go_item(index,'quotationMail')" >详细</span>
							</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('quotationMail','quantity') }}</view>
						<view style="flex: 1;"></view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="推荐邮件情况[*]">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">推荐信数量</view>
						<view style="flex: 1;">查看</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData">
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;">{{item.stat.recommendMail.quantity}}</view>
							<view style="flex: 1;height: 38px;" >
								<span class='detail' v-if='item.stat.recommendMail.quantity>0' @click="go_item(index,'recommendMail')" >详细</span>
							</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('recommendMail','quantity') }}</view>
						<view style="flex: 1;"></view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="正常业务往来邮件发出数量[*]">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">发出数量</view>
						<view style="flex: 1;">查看</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData">
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;">{{item.stat.otherMail.bussMailNum}}</view>
							<view style="flex: 1;height: 38px;" >
								<span class='detail' v-if='item.stat.otherMail.bussMailNum>0' @click="go_item(index,'otherMail','bussMailNum')" >详细</span>
							</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('otherMail','bussMailNum')}}</view>
						<view style="flex: 1;"></view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="合计每天发出邮件数量">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">邮件数量</view>
						<view style="flex: 1;">查看</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData">
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;">{{item.stat.otherMail.totalMailNum}}</view>
							<view style="flex: 1;height: 38px;" >
								<span class='detail' v-if='item.stat.otherMail.totalMailNum>0' @click="go_item(index,'otherMail','totalMailNum')" >详细</span>
							</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('otherMail','totalMailNum')}}</view>
						<view style="flex: 1;"></view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="电话沟通情况">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">拨出电话个数</view>
						<view style="flex: 1;">查看</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData">
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;">{{item.stat.telContact.quantity}}</view>
							<view style="flex: 1;height: 38px;" >
								<span class='detail' v-if='item.stat.telContact.quantity>0' @click="go_item(index,'telContact')" >详细</span>
							</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('telContact','quantity')}}</view>
						<view style="flex: 1;"></view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="其他社媒沟通情况">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">客户个数</view>
						<view style="flex: 1;">查看</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData">
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;">{{item.stat.media.quantity}}</view>
							<view style="flex: 1;height: 38px;" >
								<span class='detail' v-if='item.stat.media.quantity>0' @click="go_item(index,'media')" >详细</span>
							</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('media','quantity')}}</view>
						<view style="flex: 1;"></view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="开立U8合同情况" label="过滤条件(U8国际贸易中心下属部门销售类合同,合同类型编码包含GDX01,成品编码2开头)">
					<view class="table_header" style="display: flex;">
						<view style="flex: 0 0 120px;">部门</view>
						<view style="flex: 1;">合同个数</view>
						<view style="flex: 1;">商品数量</view>
						<view style="flex: 1;">金额($)</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData" @click="go_item(index,'u8Contract')">
							<view style="flex: 0 0 120px;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;">{{item.stat.u8Contract.quantity}}</view>
							<view style="flex: 1;height: 38px;" >{{item.stat.u8Contract.number}}</view>
							<view style="flex: 1;height: 38px;" >{{item.stat.u8Contract.amount}}</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 0 0 120px;">总计</view>
						<view style="flex: 1;">{{total('u8Contract',['quantity','number','amount']).quantity}}</view>
						<view style="flex: 1;">{{total('u8Contract',['quantity','number','amount']).number}}</view>
						<view style="flex: 1;">{{total('u8Contract',['quantity','number','amount']).amount}}</view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="开立U8销售订单情况" label="点击部门列查看详细情况">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">商品数量</view>
						<view style="flex: 1;">金额($)</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData" @click="go_item(index,'u8SaleOrder')">
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;" >{{item.stat.u8SaleOrder.number}}</view>
							<view style="flex: 1;height: 38px;" >{{item.stat.u8SaleOrder.amount}}</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('u8SaleOrder',['number','quantity','amount']).number}}</view>
						<view style="flex: 1;">{{total('u8SaleOrder',['number','quantity','amount']).amount}}</view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="出货情况" label="点击部门列查看详细情况">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">商品数量</view>
						<view style="flex: 1;">金额($)</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData" @click="go_item(index,'dispatch')">
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;" >{{item.stat.dispatch.number}}</view>
							<view style="flex: 1;height: 38px;" >{{item.stat.dispatch.amount}}</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('dispatch',['number','quantity','amount']).number}}</view>
						<view style="flex: 1;">{{total('dispatch',['number','quantity','amount']).amount}}</view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="收款情况">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">金额</view>
						<view style="flex: 1;">查看</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData" >
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;" >{{item.stat.receiptBill.amount}}</view>
							<view style="flex: 1;height: 38px;" >
								<span @click="go_item(index,'receiptBill')" class='detail' v-if='item.stat.receiptBill.amount>0'>详细</span>
							</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('receiptBill','amount')}}</view>
						<view style="flex: 1;"></view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="在谈订单情况[*]">
					<view class="table_header" style="display: flex;">
						<view style="flex: 1;">部门</view>
						<view style="flex: 1;">数量</view>
						<view style="flex: 1;">金额</view>
						<view style="flex: 1;">查看</view>
					</view>
					<view class="table_body" >
						<view style="display: flex;" v-for="(item,index) in Data.listData" >
							<view style="flex: 1;height: 38px;">{{item.department}}</view>
							<view style="flex: 1;height: 38px;" >{{item.stat.oppOrder.quantity}}</view>
							<view style="flex: 1;height: 38px;" >{{item.stat.oppOrder.amount}}</view>
							<view style="flex: 1;height: 38px;" >
								<span @click="go_item(index,'oppOrder')" class='detail' v-if='item.stat.oppOrder.quantity>0'>详细</span>
							</view>
						</view>		
					</view>
					<view class="table_footer" style="display: flex;">
						<view style="flex: 1;">总计</view>
						<view style="flex: 1;">{{total('oppOrder',['quantity','number','amount']).quantity}}</view>
						<view style="flex: 1;">{{total('oppOrder',['quantity','number','amount']).amount}}</view>
						<view style="flex: 1;"></view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="其他工作汇报[*]">
					<view class="table_header" style="display: flex;">
						<view style="flex: 0 0 80px;">姓名</view>
						<view style="flex: 1;">事项</view>
					</view>
					<view class="table_body" style="border-bottom: 1px solid #eee;">
						<template v-for="(item,index) in Data.listData">
						<template v-for="(users,userIndex) in item.users">
						   <view style="display: flex;height: auto;" v-for="(other,otherIndex) in users.other" >
							    <view style="flex: 0 0 80px;">{{users.name}}</view>
							    <view style="flex: 1;height: auto;" >{{other.workOther}}</view>
					      </view>
						</template>
						</template>	
					</view>
				</u-collapse-item>
				<u-collapse-item title="需协助处理工作提报[*]">
					<view class="table_header" style="display: flex;">
						<view style="flex: 0 0 80px;">姓名</view>
						<view style="flex: 1;">事项</view>
					</view>
					<view class="table_body" style="border-bottom: 1px solid #eee;">
						<template v-for="(item,index) in Data.listData">
						<template v-for="(users,userIndex) in item.users">
						   <view style="display: flex;height: auto;" v-for="(other,otherIndex) in users.other" v-if="other.workAssist">
							    <view style="flex: 0 0 80px;">{{users.name}}</view>
							    <view style="flex: 1;height: auto;" >{{other.workAssist}}</view>
					      </view>
						</template>
						</template>	
					</view>
				</u-collapse-item>
				<u-collapse-item title="明日计划[*]">
					<view class="table_header" style="display: flex;">
						<view style="flex: 0 0 80px;">姓名</view>
						<view style="flex: 1;">事项</view>
					</view>
					<view class="table_body" style="border-bottom: 1px solid #eee;">
						<template v-for="(item,index) in Data.listData">
						<template v-for="(users,userIndex) in item.users">
						   <view style="display: flex;height: auto;" v-for="(other,otherIndex) in users.other" v-if="other.workTomorrow">
							    <view style="flex: 0 0 80px;">{{users.name}}</view>
							    <view style="flex: 1;height: auto;" >{{other.workTomorrow}}</view>
					      </view>
						</template>
						</template>	
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
        <loading :load="loading"></loading>
	</view>
</template>

<script>
	import loading from "@/components/loading/loading.vue"
	import statistics from "./statistics.vue"
	export default {
		components:{
			statistics
		},
		data() {
			return {
				dataType:'今日',
				minDate:this.$moment().subtract(1,'months').format('YYYY-MM-DD'),
				maxDate:this.$moment().format('YYYY-MM-DD'),
				calendarType:'single',
				subsectionlist:['内容汇总','汇报人数'],
				curNow: 0,
				loading:true,
				showDataType:false,
				showCalendar:false,
				show: false,
				department: false,
				checkboxValue: [],
				search: {
					popupTitle: '',
					option: '',
					dateValue: '',
					date: Number(new Date()),
					start: this.$moment().format('YYYY-MM-DD'),
					end: this.$moment().format('YYYY-MM-DD'),
				},
				selectData: [],
				changeSelect: [],
				Data: {},
				iData: [],
			}
		},
		onLoad() {
            this.page_list();
		},
		mounted() {
		},
		methods: {
				sectionChange(index) {
					if(index==1 && this.search.start != this.search.end){
						uni.showToast({
						    icon: 'none',
							position: 'top',
						    title: '区间日期无法查看汇报人数，请切换至某一天查看'
						});
						return false;
					}
					   this.curNow = index;
							if(index==1){
								this.$nextTick(()=>{
									this.$refs.statistics.getServerData(this.search);
								})
								
							}
							console.log(index)
						},
			//过滤
			filtration() {
				this.Data.listData = {};
				if (this.changeSelect.length > 0) {
					this.changeSelect.forEach((item, index) => {
						this.Data.listData[item] = this.iData.listData[item]
					})

				} else {
					this.Data = this.iData;
				}
			},
			page_list: function() {
				this.loading=true;
				let obj = {
					'search[reportDate][0]': this.search.start,
					'search[reportDate][1]': this.search.end,
					'isMobile': 1,
				};
				this.$Api.report.dailyStatement.GetMobileList(obj).then(res => {
                    this.loading=false;
					this.iData = res.data.data
					this.getDept();
					this.filtration();
				})
			},
			today(){
				this.search.start=this.search.end=this.$moment().format('YYYY-MM-DD');
				this.showDataType=false;
				this.dataType='今天';
				this.page_list();
				this.$refs.statistics.getServerData(this.search);
			},
			confirmCalendar(value,type){
				if(this.curNow==1 && this.calendarType=='range'){
					uni.showToast({
					    icon: 'none',
						position: 'top',
					    title: '区间日期无法查看汇报人数，请切换至某一天查看'
					});
					return false;
				}
				if(this.calendarType=='single'){
					this.search.start=this.search.end=value[0]
					this.dataType=this.$moment(value[0]).format('MM/DD') 
				}else if(this.calendarType=='range'){
					this.search.start=value[0]
					this.search.end=value[value.length-1]
					this.dataType=this.$moment(value[0]).format('MM/DD')+'-'+this.$moment(value[value.length-1]).format('MM/DD')
				}else{
					uni.showToast({
					    icon: 'none',
						position: 'top',
					    title: '获取日期格式错误'
					});
				};
				this.showCalendar=false;
				this.page_list();
			    if(this.curNow==1 && this.calendarType=='single'){
			    	this.$nextTick(()=>{
			    		this.$refs.statistics.getServerData(this.search);
			    	})
			    }
				
			},
			//个人合计
			totalSumAll(data, field) {
				let totalSumAll = 0;
				for (let obj in data) {
					if (parseFloat(data[obj][field]) > 0) {
						totalSumAll += ((parseFloat(data[obj][field] * 100)).toFixed(2) - 0)
					}
				}
				return totalSumAll / 100;
			},
			//总计
			total(name, field) {
				let data = this.Data.listData;
				let sum;
				if (typeof field == 'string') {
					sum = 0;
					for (let key in data) {
						sum += data[key].stat[name][field]
					}
				} else {
					sum = {}
					field.forEach((item) => {
						sum[item] = 0;
					})
					for (let key in data) {
						for (let sumKey in sum) {
							sum[sumKey] += ((parseFloat(data[key].stat[name][sumKey] * 100)).toFixed(2) - 0)
						}
					}
					for (let sumKey in sum) {
						sum[sumKey] = sum[sumKey] / 100
					}
				}

				return sum
			},
			formatting: function(date) {
				return this.$moment(date).format('YYYY-MM-DD')
			},
			getDate: function(obj) {
				// this.$set(this.Date,this.Date.option,this.$moment(obj.value).format('YYYY-MM-DD'))
				this.$set(this.search, this.search.option, obj.value)
				this.$forceUpdate()
				this.show = false;
			},
			//获取部门列表
			getDept() {
				this.selectData = [];
				for (let key in this.iData.listData) {
					let obj = {
						label: this.iData.listData[key].department,
						value: key
					};
					this.selectData.push(obj);
				}
			},
			go_item(index,category,key){
				uni.navigateTo({
				    url: '/pages_report/sales/dailyStatement/dailyStatement_Item'
				});
				this.Data.listData[index].category=category;
				if(key){this.Data.listData[index].key=key;}
				setTimeout(()=>{
					uni.$emit('dailyStatementItem_getData', {msg: this.Data.listData[index]});
				},600)			
			}
		}
	}
</script>

<style lang='scss' scoped>
	#dailyStatement{
		display: flex;
		flex-direction: column;
		height: 100vh;
		.header{
			flex: 0 0 120px;
		}
		.main{
			flex: 1;
			overflow: auto;
		}
	}
	.deptName{
		width: 30%;
		min-width: 110px;
	}
	.data{
		width: 22%;
		min-width: 80px;
	}
	.detail{
		padding:2px 16px;
		display: inline-block;
		background-color: #3c9cff;
		color: #fff;border-radius: 5px;
		/* width: 20%; */
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.search {
		>view {
			height: 45px;
			line-height: 45px;
		}
	}

	table {
		table-layout: fixed;
		border-collapse: collapse;
		width: 100%;
		border: 1px solid #e6e6e6;
		min-height: 25px;
		line-height: 25px;
		text-align: center;
		border-collapse: collapse;
		padding: 2px;
	}

	
	table tr th,
	table tr td {
		border: 1px solid #e6e6e6;
		height: 35px;
	}

	tfoot td,
	thead td {
		background: #fafafa;
		font-size: 14px;
		
	}
	.u-button /deep/{
		height: 35px;
		line-height: 35px;
		margin-top: 7px;
	}
	.main{
		height: calc(100vh - 188px);
		overflow: auto;
	}
	/deep/.header .u-subsection--subsection,
	/deep/.header .u-subsection__bar{
		height: 40px;
	}
	/deep/.u-calendar-month__days__day__select__buttom-info{
		bottom: -11px;
	}
	.table_header{
		border: 1px solid #e6e6e6;
		height: 38px;
		text-align: center;
		background-color: #fafafa;
		line-height: 38px;	
		>view:nth-child(2n){
			border-left: 1px solid #e6e6e6;
			border-right: 1px solid #e6e6e6;
		}
	}
	.table_body{
		border-left: 1px solid #e6e6e6;
		border-right: 1px solid #e6e6e6;
		>view{
			text-align: center;
			>view{
				height: 38px;
				line-height: 38px;
			}
			>view:nth-child(2n){
				border-left: 1px solid #e6e6e6;
				border-right: 1px solid #e6e6e6;
			}
		}
		>view:not(:last-child){
			border-bottom: 1px solid #e6e6e6;
		}
	}
	.table_footer{
		border: 1px solid #e6e6e6;
		height: 38px;
		text-align: center;
		background-color: #fafafa;
		line-height: 38px;	
		>view:nth-child(2n){
			border-left: 1px solid #e6e6e6;
			border-right: 1px solid #e6e6e6;
		}
	}
	/deep/.detail{
		height: 25px;
		line-height: 25px;
	}
</style>
