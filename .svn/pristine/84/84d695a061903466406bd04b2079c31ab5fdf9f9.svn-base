<template>
	<view>
		<div v-for="(item,index) in MenuList">
			<p class="TitleName">{{item.name}}</p>
			<u-grid :col="4" :border="false">			
				<u-grid-item  v-for="(children,childrenIndex) in item.children">
					<navigator :url="children.url" hover-class="none" animation-duration='100'>
					   <u-icon :name="children.icon" :size="56" :color="children.color"></u-icon>
					   <view class="grid-text">{{children.name}}</view>
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
				MenuList:[
					{name:"刷卡报工",id:'0',children:[{name:"组长派工",url:'/pages/production/Report/Report',icon:"order"},{name:"刷卡报工",url:"/pages/production/Report/Report",icon:"order"},{name:'派工委托',url:'/pages/production/Report/Report',icon:"order"}]},
					{name:"报表查看",id:'0',children:[{name:"派工列表",url:'/pages/production/Report/Report',icon:"order"},{name:"完工列表",url:"/pages/production/Report/Report",icon:"order"}]},
					]
			}
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
