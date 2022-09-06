<template>
	<view>
		<view class="seaerch_warpper">
			<u-search placeholder="请输入名称" v-model="search"></u-search>
		</view>
		 <view class="mian_warpper" >
		      <view class="aside" >
				  <template v-for="(item,index) in MenuList">
					  <view class="menu_item" :class="index==currer?'menu_item_cur':''"  :style="{'background':index==currer?'#fff':'#ECECEC'}" @click="cut(index)">{{item.title}}</view>
				  </template>
				  
			  </view>
		      <view class="main">
				  <u-grid :col="2" :border="true" >			 
				  	 <u-grid-item  v-for="(children,childrenIndex) in MenuList[currer].children">
				  		<navigator :url="children.path" hover-class="none" animation-duration='100'>
				  		   <u-icon  :name="children.icon?children.icon:'order'" :size="52"  :label="children.title" labelPos="bottom" :color="children.color?children.color:'rgb(96, 98, 102)'"></u-icon>
				  	  </navigator>
				  	</u-grid-item>		
				   </u-grid>
			  </view>
		 </view>
		<Tabbar />
	</view>
</template>

<script>
	import Tabbar from "@/components/Tabbar/Tabbar.vue"
	export default {
		comments:{
			Tabbar, 
		},
		data() {
			return {
				search:'',
				MenuList:[],
				currer:0,
			}
		},
		created() {
			let menu=JSON.parse( uni.getStorageSync('menu')).menus;
			this.MenuList = menu[menu.findIndex((item)=>{return item.title == '报表'})].children;
		},
		mounted() {
			
		},
		methods: {
			cut(index){
				this.currer=index
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
 /deep/ .u-grid-item{
	 padding: 10px 0;
 }
.seaerch_warpper{
	height: 37px;
	padding: 8px 10px;
	border-bottom: 1px solid #ECECEC;
	
}
.mian_warpper{
	width: 100vw;
	height: calc(100vh - 103px);
	overflow: auto;
	display: flex;
}
.aside,
.main{
	height: 100%;
}
.aside{
	flex: 1;
	background-color: #ECECEC;
	
}
.main{
	flex: 3;
	// background-color: #ECECEC;
}
.menu_item{
	height: 45px;
	text-align: center;
	line-height: 45px;
	position: relative;
}
.menu_item_cur::before{
	content: "";
	position: absolute;
	border-left: 4px solid #2979ff;
	height: 13px;
	left: 0;
	top: 16px;
	}
</style>
