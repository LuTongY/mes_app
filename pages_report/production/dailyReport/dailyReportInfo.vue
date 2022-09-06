<template>
	<view class="body">
		<u--form labelPosition="left"  ref="form1" labelWidth="100">
			<u-form-item label="时间"  borderBottom ref="item1">
				<u--input v-model="result.assignDate" placeholder="请输入" :disabled="true" border="none"></u--input>
			</u-form-item>
			<u-form-item label="管理"  borderBottom ref="item1">
				<u--input v-model="manager" placeholder="请输入" :disabled="true" border="none"></u--input>
			</u-form-item>
			<u-form-item label="车间"  borderBottom ref="item1">
				<u--input value="五金" :disabled="true" border="none"></u--input>
			</u-form-item>
			<u-form-item label="工序"  borderBottom ref="item1">
				<u--input v-model="result.processName" placeholder="请输入" border="none"></u--input>
			</u-form-item>
			<u-form-item label="产品型号"  borderBottom ref="item1">
				<u--input v-model="result.productName" placeholder="请输入" border="none"></u--input>
			</u-form-item>
			<u-form-item label="焊接点数"  borderBottom ref="item1">
				<u--input v-model="result.num" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="操作工"  borderBottom ref="item1">
				<u--input v-model="result.staffName" :disabled="true" placeholder="请输入" border="none"></u--input>
			</u-form-item>
			<u-form-item label="十分钟产能"  borderBottom ref="item1">
				<u--input v-model="result.timeUse1" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="小时产能"  borderBottom ref="item1">
				<u--input v-model="result.timeUse2" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="8:00-9:00"  borderBottom ref="item1">
				<u--input @blur="blur" v-model="result.timePeriod1" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="9:00-10:00"  borderBottom ref="item1">
				<u--input @blur="blur" v-model="result.timePeriod2" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="10:00-11:00"  borderBottom ref="item1">
				<u--input @blur="blur" v-model="result.timePeriod3" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="11:00-12:00"  borderBottom ref="item1">
				<u--input @blur="blur" v-model="result.timePeriod4" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="13:30-14:30"  borderBottom ref="item1">
				<u--input @blur="blur" v-model="result.timePeriod5" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="14:30-15:30"  borderBottom ref="item1">
				<u--input @blur="blur" v-model="result.timePeriod6" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="15:30-16:30"  borderBottom ref="item1">
				<u--input @blur="blur" v-model="result.timePeriod7" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="16:30-18:00"  borderBottom ref="item1">
				<u--input @blur="blur" v-model="result.timePeriod8" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="18:30-20:40"  borderBottom ref="item1">
				<u--input @blur="blur" v-model="result.timePeriod9" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="派工数量"  borderBottom ref="item1">
				<u--input v-model="result.assignQty" placeholder="请输入" type="number" border="none"></u--input>
			</u-form-item>
			<u-form-item label="完成数量"  borderBottom ref="item1">
				<u--input :value="total" placeholder="请输入" :disabled="true" border="none"></u--input>
			</u-form-item>
			<u-form-item label="差异数量"  borderBottom ref="item1">
				<u--input :value="result.assignQty - total" placeholder="请输入" :disabled="true" border="none"></u--input>
			</u-form-item>
			<u-button type="primary" @click="submit">提交</u-button>
		</u--form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result:{},
				manager:'',
				total:0,
				nototal:0,
				account:''
			}
		},
		onLoad(e) {
			this.getInfo(e.id)
			let account = JSON.parse(localStorage.getItem('account'));
			this.account = account;
		},
		methods: {
			blur(){
				let row = this.result;
				let sum = 0;
				for(var i = 1; i <= 9; i++){
					sum += +row['timePeriod'+i];
				}
				this.total = sum;
			},
			submit(){
				let data = this.result;
				data['manager'] = this.manager;
				for(var i = 1; i <= 9; i++){
					data['timePeriod'+i] = data['timePeriod'+i] ? data['timePeriod'+i] : '';
				}
				this.$Api.report.dailyReport.edit(data).then((res)=>{
					console.log(res)
					if(res.data.code == 200){
						uni.showToast({
							title:res.data.message
						})
						uni.navigateBack({
							delta: 1
						});
					}else{
						for(var i in res.data.message){
							uni.showToast({
								title:res.data.message[i],
								icon:'none'
							})
							console.log(res.data.message[i])
							return false;
						}
					}
				})
			},
			getInfo(id){
				let data = {'id':id}
				this.$Api.report.dailyReport.GetListInfo(data).then((res)=>{
					if(res.data.code == 200){
						let row = res.data.data.row
						let sum = 0;
						for(var i = 1; i <= 9; i++){
							sum += +row['timePeriod'+i];
						}
						this.total = sum;
						this.result = row;
						this.manager = row['manager'] ? row['manager'] : this.account['truename'];
					}else{
						uni.showToast({
							title:res.data.message
						})
					}
					// this.list = res.data.data.rows
				})
			}
		}
	}
</script>

<style>
	.body{
		width: 95%;
		margin: auto;
		padding-bottom: 15px;
	}
</style>
