<template>
	<view class="warpper">
	<view class="seaerch_warpper">
		<view class="calendar_icon">
			<view style="width: 40px;height: 40px;margin: 0 auto;">
				<u-icon  size="40" name="calendar" @click="popupShow=true"></u-icon>
			</view>
		</view>
		<view class="search">
			<u-search placeholder="请输入项目名称" v-model="search"></u-search>
		</view>
		<view>
		     <u-popup :show="popupShow" mode="center" :round="10"   @close="popupClose">
				   <view class="timeWarpper">
		             	<u--form
		             				labelPosition="left"
		             				:model="form"
		             				ref="form1"
		             	>
						<u-form-item label="公司" 	borderBottom ref="item1" labelWidth='80' @click='pickerShow=true'>
							<u--input
													v-model="form.label"
													disabled
													disabledColor="#ffffff"
													placeholder="请选择公司"
													border="none"
											></u--input>
											<u-icon
													slot="right"
													name="arrow-right"
											></u-icon>
						</u-form-item>
							<u-form-item label="开始日期" 	borderBottom ref="item1" labelWidth='80' @click='pickerStartTime=true'>
								<u--input
														v-model="form.startTime"
														disabled
														disabledColor="#ffffff"
														placeholder="请选择开始日期"
														border="none"
												></u--input>
												<u-icon
														slot="right"
														name="arrow-right"
												></u-icon>
							</u-form-item>
							<u-form-item label="结束日期" 	borderBottom ref="item1" labelWidth='80' @click='pickerEndTime=true'>
								<u--input
														v-model="form.endTime"
														disabled
														disabledColor="#ffffff"
														placeholder="请选择结束日期"
														border="none"
												></u--input>
												<u-icon
														slot="right"
														name="arrow-right"
												></u-icon>
							</u-form-item>
							<u-form-item >
								<u-button text="查询" type="primary" @click="GetList"></u-button>
							</u-form-item>
						</u--form>
				</view>
		     </u-popup>
			  <u-datetime-picker
			                 :show="pickerStartTime"
			                 v-model="form.startTimePicker"
			                 mode="date"
							 @confirm="formatDate($event,'startTime')"
							 @cancel="pickerStartTime=false"
			  ></u-datetime-picker>
			  <u-datetime-picker
			                 :show="pickerEndTime"
			                 v-model="form.endTimePicker"
			                 mode="date"
							 @confirm="formatDate($event,'endTime')"
							  @cancel="pickerEndTime=false"
			  ></u-datetime-picker>
			  <u-picker :show="pickerShow" :columns="[companyList]" keyName="label"  @cancel="pickerShow=false" @confirm="optPicker" :defaultIndex="[0]"></u-picker>
		</view>
		
	</view>
	 <view class="table">
	 	<gdx-table :data='fiflterData.list' :column='column' :footer='fiflterData.footer'></gdx-table>
	 </view>
		
		<loading :load="loading"></loading>
	</view>
</template>

<script>
	import loading from "@/components/loading/loading.vue"
	export default {
		data() {
			return {
				pickerShow:false,
				loading:false,
				pickerStartTime:false,
				pickerEndTime:false,
				popupShow:false,
				search:'',
				rawdata:'',
				form:{startTime:this.$moment().format('YYYY-MM-01'),endTime:this.$moment().format('YYYY-MM-DD'),zh:'',label:'所有',startTimePicker:this.$moment().format('YYYY-MM-01'),endTimePicker:this.$moment().format('YYYY-MM-DD')},
				startDate:false,
				startDateValue:'',
				companyList:[
					{id:'',label:'所有'},
					{id:'85101',label:'冠达星股份有限公司'},
					{id:'85104',label:'福建冠达星装饰工程有限公司'},
					{id:'89007',label:'福建冠达星云商科技有限公司'},
					{id:'89201',label:'冠达星控股集团有限公司'},
					{id:'89202',label:'福建冠达星五金制品有限公司'},
					{id:'89203',label:'达星有限公司'},
					{id:'89410',label:'深圳冠达星创业投资有限公司'},
					{id:'85099',label:'东西之间有限公司'},
					],
				data: [],
				column: [{
					label: '现金流量项目',
					width: '220px',
					prop: 'citemname',
					sum:true
				}, {
					label: '收入',
					prop: 'Debit'
				}, {
					label: '支出',
					prop: 'Credit',
					sum:true
				}],
				footer:[]
			}
		},
		// onReady() {
		// 			// 微信小程序需要用此写法
		// 			this.$refs.datetimePicker.setFormatter(this.formatter)
		// 		},
		computed:{
			fiflterData(){
				let list=[];
				let footer=[{citemname:'总合计',Debit:0,Credit:0}];
				if(!this.search){
					list=this.data;
					footer=this.footer;
				}else{
					this.data.forEach((item,index)=>{
						if(item.citemname.indexOf(this.search)> -1){
							list.push(item);
							console.log(this.rawdata)
							footer[0]['Debit']  += parseFloat(this.rawdata[index].Debit);
							footer[0]['Credit'] += parseFloat(this.rawdata[index].Credit);
						}
					})
					footer[0].Debit=this.jeFormatter(footer[0].Debit);
					footer[0].Credit=this.jeFormatter(footer[0].Credit)
				}
				return {
					   list,
					   'footer':footer,
				}
			},
		},
		mounted() {
          
			this.GetList();
		},
		methods: {
			GetList(data){
				this.pickerShow=false;
				this.pickerStartTime=false;
				this.pickerEndTime=false;
				this.loading=true;
				this.popupShow=false;
				let obj={
					'search[start]':this.$moment(this.form.startTime).format('YYYY-MM-DD'),
					'search[end]':this.$moment(this.form.endTime).format('YYYY-MM-DD'),
					'search[zh]':this.form.zh,
				}
				this.$Api.report.finance.cashFlow.GetList(obj).then((res)=>{
					if(res.data.code==200){
						this.rawdata= JSON.parse(JSON.stringify( res.data.data.rows));
						this.data=res.data.data.rows;
						this.dataFormatting();
						this.data.forEach((item,index)=>{
							item.Debit=this.jeFormatter(item.Debit)
							item.Credit=this.jeFormatter(item.Credit)
						});		  
					}
					this.loading=false;
				})
			},
              dataFormatting(){
				  this.footer=[];
				  let footer={citemname:'总合计',Debit:0,Credit:0}
				  this.data.forEach((item,index)=>{	  
					  footer.Debit  += parseFloat(item.Debit);
					  footer.Credit += parseFloat(item.Credit);
				  })
				  footer.Debit=this.jeFormatter(footer.Debit);
				  footer.Credit=this.jeFormatter(footer.Credit)
				  this.footer.push(footer)
			  },
			  jeFormatter(value, row){
			  	if(parseInt(value)<=0 || !value){
			  		return "";
			  	}
			  	else{
			  		return this.commafy(Math.round(value*100)/100,0);
			  	}
			  },
			  commafy(num,n){ 	
			  	num = String(num.toFixed(n)); 
			  	var re = /(-?\d+)(\d{3})/; 
			  	while(re.test(num)) {
			  		num = num.replace(re,"$1,$2");
			  	}
			  	return num;
			  },
			  popupClose(){
				  this.popupShow=false;
				  this.pickerStartTime=false;
				  this.pickerEndTime=false;
				  this.pickerShow=false;
			  },
			  formatDate($event,value){
				  console.log($event,value)
				 this.form[value]=this.$moment($event.value).format('YYYY-MM-DD')
				 console.log(this.form[value]);
				 this.pickerStartTime=false;
				 this.pickerEndTime=false
			  },
			  optPicker(e){
				  console.log(e)
				  this.form.label=e.value[0].label;
				  this.form.zh=e.value[0].id;
				  this.pickerShow=false;
				  
			  }
		}
	}
</script>

<style scoped lang="less">
	.warpper{
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		.seaerch_warpper{
			flex: 0 0 37px;
			padding: 8px 10px;
			border-bottom: 1px solid #ECECEC;
			display: flex;
		}
		.table{
			flex: 1;
			overflow: hidden;
			padding: 5px 0;
		}
	}
	.calendar_icon{
		flex:1;
		margin: 0 auto;
	}
	.search{
		flex: 5;
	}
	.timeWarpper{
		width: 68vw;
		padding: 8vw;
	}
</style>
