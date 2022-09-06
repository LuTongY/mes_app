<template>
	<view class="warpper">
	<view class="seaerch_warpper">
		<view class="calendar_icon">
			<view style="width: 40px;height: 40px;margin: 0 auto;">
				<u-icon  size="40" name="calendar" @click="popupShow=true"></u-icon>
			</view>
		</view>
		<view class="search">
			 <text style="font-size: 22px;font-weight: 700;margin-left: -60px;">{{'年份:'+form.startTime}}</text>  
		</view>
		<view>
		     <u-popup :show="popupShow" mode="center" :round="10"   @close="popupClose">
				   <view class="timeWarpper">
		             	<u--form
		             				labelPosition="left"
		             				:model="form"
		             				ref="form1"
		             	>
						<u-form-item label="年份" 	borderBottom ref="item1" labelWidth='80' @click='pickerStartTime=true'>
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
						<u-form-item >
								<u-button text="查询" type="primary" @click="GetList"></u-button>
						</u-form-item>
						</u--form>
				</view>
		     </u-popup>
			  <u-picker :show="pickerStartTime" :columns="pickerStartTimeColumn"  @cancel="pickerStartTime=false" @confirm="StartTimeConfirm"></u-picker>
		</view>
		
	</view>
	 <view class="table">
	 	<gdx-table :data='data' :column='column' :footer='footer'></gdx-table>
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
				form:{startTime:this.$moment().format('YYYY'),zh:'',label:'所有'},
				startDate:false,
				startDateValue:'',
				pickerStartTimeColumn:[['2020','2021','2022','2023']],
				companyList:[
					{id:'',label:'所有'},
					{id:'租金',label:'租金'},
					{id:'水电',label:'水电'},
					],
				data: [],
				column: [{
					label: '年',
					width:'120px',
					prop: 'iyear',
					sum:true,
					textAlign:'center'
				}, {
					label: '应缴金额(万)',
					prop: 'dzzj',
					textAlign:'center'
				}],
				footer:[]
			}
		},
		mounted() {
			this.GetList();
		},
		methods: {
			GetList(data){
				this.pickerShow=false;
				this.pickerStartTime=false;
				this.loading=true;
				this.popupShow=false;
				let obj={
					'search[year]':this.$moment(this.form.startTime).format('YYYY'),
					'search[channel]':this.form.zh || '',
				}
				this.$Api.report.shop.getTrend(obj).then((res)=>{
					if(res.data.code==200){
						this.data=res.data.data.rows || [];
						this.dataFormatting();		  
					}
					this.loading=false;
				})
			},
              dataFormatting(){
				  this.footer=[];
				  let footer={iyear:'总合计',dzzj:0};
				  if(Array.isArray(this.data)){
					  this.data.forEach((item,index)=>{
					  	footer.dzzj  += parseFloat(item.dzzj);
					  })
				  }
				 
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
				  this.pickerShow=false;
			  },
			  formatDate($event,value){	
				 this.pickerStartTime=false;
			  },
			  StartTimeConfirm(e){
				  this.form.startTime=e.value[0];
				   this.pickerStartTime=false;
				   this.GetList();
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
		text-align: center;
		line-height: 40px;
		
	}
	.timeWarpper{
		width: 68vw;
		padding: 8vw;
	}
</style>
