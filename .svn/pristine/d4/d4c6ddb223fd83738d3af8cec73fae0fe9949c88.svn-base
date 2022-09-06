<template>
	<view class="warpper">
	<view class="seaerch_warpper">
		<view class="calendar_icon">
			<view style="width: 40px;height: 40px;margin: 0 auto;">
				<u-icon  size="40" name="calendar" @click="popupShow=true"></u-icon>
			</view>
		</view>
		<view class="search">
			<u-search placeholder="搜索" v-model="search"></u-search>
		</view>
		<view>
		     <u-popup :show="popupShow" mode="center" :round="10"   @close="popupClose">
				   <view class="timeWarpper">
		             	<u--form	labelPosition="left"	:model="form" ref="form1">
							<u-form-item label="年月" 	borderBottom ref="item1" labelWidth='80' @click='pickerStartTime=true'>
								<u--input	v-model="form.date" disabled disabledColor="#ffffff"	placeholder="请选择开始日期" border="none"></u--input>
								<u-icon slot="right"	name="arrow-right"></u-icon>
							</u-form-item>
							<u-form-item >
								<u-button text="查询" type="primary" @click="GetList"></u-button>
							</u-form-item>
						</u--form>
				</view>
		     </u-popup>
			  <u-datetime-picker
			                 :show="pickerStartTime"
			                 v-model="form.date"
			                 mode="year-month"
							 @confirm="formatDate($event,'startTime')"
							 @cancel="pickerStartTime=false"
			  ></u-datetime-picker>
		</view>
	</view>
	<view class="total">
		<view>
			<label for="">合计应付利息:</label>
			<span>{{sumFloatFormatter(fiflterData.list,'应付利息')}}</span>
		</view>
		<view>
			<label for="">合计实付利息:</label>
			<span>{{sumFloatFormatter(fiflterData.list,'实付利息')}}</span>
		</view>
	</view>
	 <view class="table">
		 
	 	<view class="item" v-for="(item,index) in fiflterData.list">
			<view class="count" style="position: absolute;right: 20px;display: block;border: 1px solid #ccc;border-radius: 50%;width: 24px;height: 24px;padding: 0;text-align: center;line-height: 24px;">
				<span>{{index+1}}</span>
			</view>
			<view>
				<view class="">
					<label for="">借款单位:</label>
					<span>{{item['借款单位']}}</span>
				</view>
			</view>
	 		<view >
				<view class="">
					<label for="">借款银行:</label>
					<span>{{item['借款银行']}}</span>
				</view>
			</view>
			<view >
				<view class="">
					<label for="">合同号:</label>
					<span>{{item['合同号']}}</span>
					<span style="padding: 0 8px;color: #F7D53F;font-weight: 600;">{{'['+item['期限']+'期]'}}</span>
				</view>
			</view>
			<view>
				<view class="">
					<label for="">抵押或担保方式:</label>
					<span>{{item['抵押或担保方式']}}</span>
				</view>	
			</view>
			<view>
				<view>
					<label for="">借款日期:</label>
					<span>{{item['借款日期']}}</span>
				</view>
				<view class="">
					<label for="">到期日期:</label>
					<span>{{item['到期日']}}</span>
				</view>	
			</view>
	 		<view>
				<view class="">
					<label for="">借款金额:</label>
					<span>{{jeFormatter(item['借款金额'])}}</span>
				</view>	
				<view>
					<label for="">借款类别:</label>
					<span>{{item['借款类别']}}</span>
				</view>
			</view>
	 		<view>
				<view class="">
					<label for="">利率:</label>
					<span>{{lvFormatter(item['利率'])}}</span>
				</view>
				<view class="">
					<label for="">现执行利率:</label>
					<span>{{lvFormatter(item['现执行利率'])}}</span>
				</view>
			</view>
			<view>
				<view class="">
					<label for="">应付利息:</label>
					<span>{{jeFormatter(item['应付利息'])}}</span>
				</view>
				<view class="">
					<label for="">实付利息:</label>
					<span>{{jeFormatter(item['实付利息'])}}</span>
				</view>
			</view>
			<view>
				<view class="">
					<label for="">付息方式:</label>
					<span>{{item['付息方式']}}</span>
				</view>
				<view class="">
					<label for="">利息还款日:</label>
					<span>{{item['利息还款日']}}</span>
				</view>
			</view>
			<view v-if="item['备注']">
				<view class="">
					<label for="" style="margin-bottom: 3px;">备注:</label>
					<u--textarea v-model="item['备注']" placeholder="请输入内容" autoHeight disabled></u--textarea>
				</view>
			</view>
		
	 	</view>
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
				form:{date:this.$moment().format('YYYY-MM')},
				startDate:false,
				startDateValue:'',
				data: [],
			}
		},
		computed:{
			fiflterData(){
				let list=[];
				if(!this.search){
					list=this.data;
				}else{
					this.data.forEach((item,index)=>{
						if(this.searchData(item)){		
							list.push(item);
						}
					})
				}
				return {
					   list,
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
					'search[year]':this.$moment(this.form.date).format('YYYY'),
					'search[month]':this.$moment(this.form.date).format('M'),
					'search[zh]':this.form.zh,
				}
				this.$Api.report.finance.recycling.GetList(obj).then((res)=>{
					if(res.data.code==200){
						this.data=res.data.data.rows;	  
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
				 this.pickerStartTime=false;
				 this.pickerEndTime=false
			  },
			  optPicker(e){
				  console.log(e)
				  this.form.label=e.value[0].label;
				  this.form.zh=e.value[0].id;
				  this.pickerShow=false;
				  
			  },
			   lvFormatter(value, row){
			  	if(parseInt(value)<=0 || value==''){
			  		return "";
			  	}
			  	else{
			  		return Math.round(value*10000)/10000;
			  	}
			  },
			  sumFloatFormatter(data,key) {
			  	// field = this.field;
			  	var total_sum = data.reduce(function(sum, row) {
			  		return Math.round(sum*100)/100 + (Math.round(row[key]*100)/100 || 0);
			  	}, 0);
			  	return this.commafy(total_sum,2);
			  },
			  searchData(array){
				  let bool
				  Object.values(array).filter(filterItem=>{
				  	if(filterItem && filterItem.indexOf(this.search)>-1){
				  		bool= true;
						return false;
				  	}	
				  })
				  return bool
			  },
		}
	}
</script>

<style scoped lang="less">
	*{
		font-family: '微软雅黑';
	}
	.warpper{
		height: 100%;
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
	.table{
		height: 100%;
		overflow: auto;
		font-size: 14px;
		>.item{
			border-radius: 15px;
			box-shadow: 0 0 2px #999;;
			width: 96%;
			margin: 10px auto;
			border: 1px solid rgb(218, 219, 222);
			padding: 8px 0;
			position: relative;
			>view{
				padding: 4px 0;
				display: flex;
				>view{
					flex: 1;
					word-break: break-all;
					>label{
						padding: 0 5px;
					}
				}
			}
		}
	}
	.total{
		display: flex;
		width: 100%;
		padding: 5px 2%;
		border-bottom:1px solid rgb(218, 219, 222) ;
		>view{
			flex: 1;
		}
		
	}
</style>
