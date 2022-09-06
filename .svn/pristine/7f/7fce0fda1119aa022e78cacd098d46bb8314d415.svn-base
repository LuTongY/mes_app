<template>
	<view>	
	         <p>常用</p>
			<Tabbar />
	</view>
</template>

<script>
import Tabbar from "@/components/Tabbar/Tabbar.vue"
 export default{
	comments:{
		Tabbar, 
	},
	data(){
		return{
			data:[],
			column:[{label:'现金流量项目',width:'250px',prop:'citemname'},{label:'收入',prop:'Debit'},{label:'支出',prop:'Credit'}],
		}
	},
	mounted() {
		
	},
	methods:{
		GetList(data){
			data?this.b_date=data.value:Number(new Date())
			this.timeShow=false
			console.log(this.$moment(this.b_date).format('YYYY-MM-DD'));
			this.$Api.report.finance.teller.GetList({'search[b_date]':this.$moment(this.b_date).format('YYYY-MM-DD')}).then((res)=>{
				if(res.data.code==200){
					this.data=res.data.data.rows
				}
			})
		},
	}
}
</script>

<style>
</style>
