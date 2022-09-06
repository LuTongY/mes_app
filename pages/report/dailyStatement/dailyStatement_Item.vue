<template>
	<view>
		</u-empty>
		<table>
			<thead>
				<tr>
					<td :colspan="columns[getData.category].title.length+1" style='height: 30px;'>{{columns[getData.category].tableName}}</td>
				</tr>
				<tr>				
					<td>姓名</td>
					<td v-for="(item,index) in columns[getData.category].title" > {{item}} </td>
				</tr>
			</thead>
			<tbody>
			  <template v-for="(item,key,index) in getData.users">
				<tr v-for="(i_item,i_key,i_index) in item[getData.category]">
				   <td :rowspan="item[getData.category]?item[getData.category].length:1" v-if='i_index==0'>{{item.name}}</td>
				<!--   <td>{{i_item}}</td> -->
				 <template v-if="getData.category != 'otherMail'">
					 <td v-for="(columnsItem,columnsIndex) in columns[getData.category].columns">
					 		{{i_item[columnsItem]}}
					  </td>
				 </template>
				 <template v-if="getData.category == 'otherMail'">
				 		 <td >
				 			{{i_item[columns.otherMail.columns]}}
				 		</td>
				 </template>
				  
				</tr>
				</template>	
			</tbody>
		</table>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				getData:{'category':'inquiryMail'},
				columns:{      //列名
					"inquiryMail":{tableName:'收到询盘邮件情况',title:['客户名称','询盘数量'],columns:['customer','quantity']},
					"quotationMail":{tableName:'发出报价邮件情况',title:['客户名称','发出报价数量'],columns:['customer','quantity']},
					"recommendMail":{tableName:'推荐邮件情况',title:['推荐的品类','推荐信数量'],columns:['category','quantity']},
					"otherMail":{tableName:'正常业务往来邮件发出数量',title:['正常业务往来邮件发出数量',],columns:"bussMailNum"},
					"telContact":{tableName:'拨出电话个数',title:['客户名称','拨出电话个数'],columns:['customer','quantity'],},
					"media":{tableName:'其他社媒沟通情况',title:['客户名称','客户个数'],columns:['customer','quantity'],},
					"u8Contract":{tableName:'开立U8合同情况',title:['客户名称','合同个数','商品数量','金额($)'],columns:['customer','quantity','number','amount']},
					"u8SaleOrder":{tableName:'开立U8销售订单情况',title:['客户名称','商品数量','金额($)'],columns:['customer','number','amount']},
					"dispatch":{tableName:'出货情况',title:['客户名称','商品数量','金额($)'],columns:['customer','number','amount']},
					"receiptBill":{tableName:'收款情况',title:['客户名称','金额($)'],columns:['customer','amount']},
					"oppOrder":{tableName:'在谈订单情况',title:['客户名称','型号','数量','金额','类型'],columns:['customer','standard','quantity','amount','orderType'],},
				},
			}
		},
		mounted() {
			console.log(this.columns)
			//监听传值
			let _this = this;
			uni.$once('dailyStatementItem_getData', function(data) {
				// _this.data=;
				if(data.msg.category == 'otherMail' || data.msg.key){
					_this.columns.otherMail.columns=data.msg.key
				}
				_this.getData=data.msg
				
				console.log(_this.getData)
			})
		},
	}
</script>

<style scoped lang="scss">
	table{
		table-layout: fixed;
		border-collapse: collapse;
		width: 96%;
		word-break: break-all;
		margin: 0 auto;
		min-height: 25px;
		line-height: 25px;
		text-align: center;
		border-collapse: collapse;
		padding: 20px;
		margin-top: 20px;
		
	  thead{
		  tr{
			  background-color: #8f8f94;
		  }
	  }
	}
	table,
	table tr th,
	table tr td {
		border: 1px solid #e6e6e6;
	}
	tfoot td,
	thead td {
		background: #fafafa;
		font-size: 14px;
		word-wrap:break-word;
	}
</style>
