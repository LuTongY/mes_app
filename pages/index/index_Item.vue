<template>
	<view>
		<div v-for="(item,index) in MenuList">
			<p class="TitleName">{{item.title}}</p>
			<u-grid :col="3" :border="false">			
				<u-grid-item  v-for="(children,childrenIndex) in item.children">
					<navigator :url="children.path" hover-class="none" animation-duration='100'>
					      <u-icon  style="margin: 0 auto;" :label="children.title" labelPos="bottom" :name="children.icon?children.icon:'order'" :size="56"  :color="children.color?children.color:'rgb(96, 98, 102)'"></u-icon>
				  </navigator>
				</u-grid-item>		
			</u-grid>
		</div>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				MenuList:[],
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		        console.log(option); //打印出上个页面传递的参数。
				let menus=JSON.parse(uni.getStorageSync('menu')).menus;
				let index=menus.findIndex((v)=>{return v.title=='首页'});
				this.MenuList=index>-1?menus[index].children[option.index].children:[];
		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss">
 .TitleName {
	padding: 20px 20px 0 20px;
	font-weight: 700;
	font-size: 18px;
};
 /deep/ grid-text,
 /deep/ .u-grid-item-box{
		text-align: center;
	}
</style>

