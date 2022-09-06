<template>
	<view class="warpper">
		<view class="search">
			<view>
				<view class="" style="padding: 8px;">
					<u-search placeholder="搜索(任意字段)" v-model="search"></u-search>
				</view>
				
			</view>
			<view style="border-top: 1px solid #eee;">
				<date @confirm='GetList' />
			</view>
		</view>
		<view class="table">
			<gdx-table :data='fiflterData' :column='column' :footer='footer'></gdx-table>
		</view>
		<loading :load="loading"></loading>
	</view>
</template>

<script>
	import loading from "@/components/loading/loading.vue"
	export default{
		data(){
			return{
				search:'',
				data:[],
				column:[{label:'订单号',prop: 'order'},{label:'名称',prop: 'invName'},{label:'计划数量',prop: 'quantity',sum:true},{label:'入库数量',prop: 'orderQualifyQty',sum:true},{label:'状态',prop: 'status'}],
				footer:[],
				loading:false,
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
				return list;
			},
		},
		mounted() {
			this.GetList();
		},
		methods:{
			GetList(date=[this.$moment().format('YYYY-MM-DD'),this.$moment().format('YYYY-MM-DD')]){
				this.popupShow=false;
				this.loading=true;
				let obj={
					'pagesize' :10000000,
					'page' :1,
					'search[produceDate][0]' :date[0],
					'search[produceDate][1]' :date[1] ?? date[0] ,
				}
				this.$Api.report.pack.getPackTask(obj).then((res)=>{
					if(res.data.code==200){
						this.data=res.data.data.rows || [];
					}
					this.loading=false;
				})
			},
		searchData(array){
						  let bool
						  Object.values(array).filter(filterItem=>{
							  // console.log(toString(filterItem));s
						  	if(filterItem && filterItem.toString().indexOf(this.search)>-1){
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
	.warpper{
		height: 100vh;
		.search{
			height: 100px;
			>view{
				height: 50px;
			}
		}
		.table{
			height: calc(100vh - 100px);
		}
	}
</style>