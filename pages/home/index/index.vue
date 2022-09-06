<template>
	<view class="warpper">
	     <view class="user">
			 <view style="display: flex;padding: 6vh 0 0 30px;">
				 <view >
					
				 </view>
				 <view style="padding-left:15px ;">
					 <h2>路通</h2>
					 <p style="padding: 5px 0;">共识、共拼、共赢、共荣</p>
				 </view>
			 </view>
			 <view class="cutting">
				 <view class='userAvatar'>
				    <p style="text-align: center;font-size: 22px;padding-bottom:30px;color: #fff;">{{name}}</p>
				    <u-avatar   :src="require('@/static/img/user.gif')" size='120' ></u-avatar>
				 </view>
			 </view>
		 </view>
		 <view class="list">
			 	<u-cell-group>
			 		<u-cell icon="setting-fill" title="个人设置"></u-cell>
			 		<u-cell icon="integral-fill" title="会员等级" value="新版本"></u-cell>
			 	</u-cell-group>
		 </view>
		 <view class="logout">
			 <u-modal :show="modal" title="退出登录" content='确定要退出登录吗?' @confirm="logoutBtn" showCancelButton @cancel="modal=false"></u-modal>
			 <u-button type="primary"  shape="circle" text="退出登录" @click="modal=true"></u-button>
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
				modal:false,
				name:JSON.parse(uni.getStorageSync("account")).truename,
			}
		},
		mounted() {
		},
		methods: {
			 logoutBtn(){
				 this.$Api.login.logout().then((res)=>{
					 if(res.data.code==200){
						 uni.removeStorageSync('accessToken');
						 uni.removeStorageSync('menu');
						 this.$store.dispatch('updateTabbarIndex',0);
						 uni.reLaunch({url:'/pages/login/login'})
					 }
				 })
			}
		}
	}
</script>

<style scoped lang="scss">
	uni-page-body,
	.warpper{
		height: 100%;
	}
	.user{
		width: 100%;
		background: #367EF8;
		height: 18vh;
		position: relative;
		margin-bottom: 130px;
		border-radius: 0 0 50px 50px
	}
	.cutting{
		width: 100%;
		    height: 200px;
		    background: #367EF8;
		    position: absolute;
		    bottom: -61px;
		    border-radius: 0 0 50% 50%;
		.userAvatar{
			position: absolute;
			bottom: -40px;
			margin-left:calc(50% - 60px);
		}
	}
 .warpper{
 }
 .logout{
	 padding: 0 10px;
	 position: fixed;
	 bottom: 60px;
	 right: 0;
	 left: 0;
 }
</style>
