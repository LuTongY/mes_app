<template>
  <view class="root">
	<view class="wapper">
		<u-no-network></u-no-network>
		<view class="inform">
			<view class="inform_warpper">
				<view class="inform_warpper_title">
					<text>最新</text>
					<text>公告</text>	
				</view>
				<text>丨</text>
				<view class="inform_warpper_content">
					 <u-notice-bar :text="notice_bar" direction='column'></u-notice-bar>
					<!-- <text>冠达星信息平台上线通知</text>	 -->
				</view>
			</view>
		</view>
	  <view class="navigation-case">
		<!-- 轮播图 -->
		<view class="swiper">
			 <u-swiper
			           :list="swiperData"
			            keyName="image"
			            showTitle
			            circular
			    ></u-swiper>
		</view>
		</view>
		<!-- 菜单导航 -->
		<view class="menu">
			<view  class="menu_item_warpper">
				<view class="menu_item" v-for="(item,index) in MenuList"  @click="nextPage(index)">
					<view class="menu_icon" :style="{background:background[index]?background[index]:'#5C93F4'}">
						<u-icon :name="item.icon?item.icon:'star'" :size="36" labelSize='16px'  labelPos="bottom" :color="item.color?item.color:'#fff'"></u-icon>
					</view>
					
					<view class="menu_title">
						<view>{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 车间列表 -->
		<view class="workshopList">
			<view class="workshop_Item" v-for="(item,index) in workshopList">
				<view class="workshop_Item_warpper">
					<view class="workshop_Item_warpper_name">{{item.name}}</view>
					<view class="workshop_Item_warpper_img" >
					<!-- 	{{imgSever}} -->
						<!-- {{$store.state.imgSever+item.imgUrl}} -->
						<image :src="imgSever+item.imgUrl" alt="" style="height: 80%;width: 80%;margin: 0 auto;">
					</view>
					<view class="workshop_Item_warpper_text">{{item.name}}</view>
				</view>	
			</view>
		</view>

	
	</view>
	<Tabbar />
</view>
</template>
<script>
	import Tabbar from "@/components/Tabbar/Tabbar.vue"
	export default {
		components: {
			Tabbar,
		},
		computed:{
			imgSever:function(){
				return this.$store.state.imgSever;
			}
		},
		mounted() {
			let menus = JSON.parse(uni.getStorageSync('menu')).menus
			let index = menus.findIndex((v) => {
				return v.title == '首页'
			})
			this.MenuList = index > -1 ? menus[index].children : []
		},
		data() {
			return {
				notice_bar:['冠达星信息平台上线通知','派工模式启用通知'],
				swiperData:[
					{
                    image: 'http://120.37.137.59:9900/upload/mobileApplet/2008.png',
                    title: '五里工业园',
                   },
				   {
				       image: 'http://120.37.137.59:9900/upload/mobileApplet/2003.png',
				       title: '池店工厂',
				      },
                ],
				search: '',
				title: 'Hello',
				MenuList: [],
				background:['#5C93F4','#FC9053','#F4746E','#55D7B9','#56D8BA','#FA5C60','#FC8C53','#5C93F4'],
				workshopList:[{'imgUrl':'factory/zg.png','name':'制管车间'},{'imgUrl':'','name':'五金车间'},{'imgUrl':'','name':'涂装车间'},{'imgUrl':'','name':'板式车间'},{'imgUrl':'','name':'注塑车间'},{'imgUrl':'','name':'包装车间'}],
			}
		},
		onLoad() {
			uni.hideTabBar()
		},
		methods: {
			nextPage: function(index) {
				uni.navigateTo({
					url: "/pages/index/index_Item?index=" + index,
				})
			},
			GoScan: function(url) {
				this.scan(url);
			},
			scan: function(url) {
				let _this = this;
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						let scanText = {
							id: res.result
						};
						uni.navigateTo({
							url: url,
							success: function(res) {
								uni.$emit('StartScan', {
									scanText
								})
							}
						})

					},
					fail: function(err) {
						uni.showToast({
							icon: 'none',
							position: 'top',
							title: err.errMsg
						})
					}
				});
			},
		}
	}
</script>

<style scoped lang="less">
	.root{
		height: 100vh;
		overflow: hidden;
	}
	.wapper {
		height: calc(100vh - 50px);
		overflow: auto;
		background: #FFFFFF;
		.navigation-case{
			padding: 0 20px;
			.swiper{
			   padding: 20px 0;	
			}
	
		}
	}
		.menu{			
				.menu_item_warpper{
					display: flex;
					flex-flow: row wrap;
				   align-content: flex-start;
				.menu_item{
					flex: 0 0 25%;
					text-align: center;
					padding: 5px 0;
					overflow: hidden;
					.menu_icon{
						background-color: #5D95F6;
						display: inline-block;
						padding: 7px;
						border-radius: 20px;
					}
				   .menu_title{
					   text-align: center;
					   padding: 5px 0;
					   font-weight: 600;
					   font-family: '微软雅黑';
					   color: #838488;
					   view{
						   overflow: hidden;
						   white-space:nowrap;
						   text-overflow:ellipsis;
					   };
				   }
				}
				}
			}
	.userinfo_warpper {
		padding-bottom: 6px;
		display: flex;
		.user {
			flex:1;
			line-height: 60px;
			padding-left: 15px;
			font-weight: 700;
			color: #383C3D;
			font-family: '微软雅黑';
		}
		.avatar{
			flex: 0 0 48px;
		}
		.bell{
			flex:  0 0 28px;
			line-height: 60px;
		}
	}
	.inform{
		width: 100vw;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		height: 40px;
		line-height: 40px;
		.inform_warpper{
			display: flex;
			.inform_warpper_title{
				flex: 0 0 80px;
				text-align: center;
				background-color: rgb(253, 246, 236);
				font-weight: 600;
				font-family: '微软雅黑';
			}
			>text{
				color: #eee;
				background-color: rgb(253, 246, 236);
			}
			.inform_warpper_content{
				// padding-left: 16px;
				flex: 1
			}
			
		}
	}
/deep/.u-notice-bar{
	padding: 0 !important;
	height: 40px;
}
.u-notice-bar{
	padding: 0 !important;
	height: 40px;
}
/deep/.u-notice{
	margin-top: 10px !important;
}
@workshop_Item_warpper_padding:8px;
.workshopList{
	padding: 20px 0;
	display: flex;
	height: 200px;
	flex-wrap: wrap;
	.workshop_Item{
		flex: 0 0 50%;
		width: 100%;
		height: 100%;
		.workshop_Item_warpper{
			margin: 0 auto;
			width:  calc(100% - @workshop_Item_warpper_padding*2);
			height: calc(100% - @workshop_Item_warpper_padding*2);
			border: 1px solid #eee;
			display: flex;
			flex-direction: column;
			.workshop_Item_warpper_img{
				flex: 1;
			}
			.workshop_Item_warpper_name{
				flex: 0 0 30px;
				line-height: 30px;
				text-align: center;
				height: 20%;
				border-bottom: 1px solid #eee;
			}
			.workshop_Item_warpper_text{
				flex: 0 0 30px;
				border-top: 1px solid #eee;
				line-height: 30px;
			}
			
			
		}
		
	}
}
</style>
