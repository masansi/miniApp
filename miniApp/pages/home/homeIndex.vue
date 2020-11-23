<template>
	<view class="homeIndex">
		<view class="search">
			<text class="iconfont">&#xe67b;</text>
			<text>搜索课程</text>
		</view>
		<view class="banner">
			<swiper :autoplay="true" :interval="3000" :duration="2000" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<!-- <image :src="item.image" mode="aspectFill" @error="imageError"></image> -->
					<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" mode="aspectFill" ></image>
				</swiper-item>
			</swiper>
			<view class="radius">
				<view class="item" v-for="(item, index) in bannerList" :key="index"  :class="[{'active': swiperIndex === index}]"></view>
			</view>
		</view>
		<view class="">
			<homeTab :courseTypes="courseTypes"/>
		</view>
	</view>
</template>

<script>
	import { homepage } from '@/api/user.js'
	import homeTab from '@/common/components/home/homeTab'
	export default {
		components: {
			'homeTab': homeTab
		},
		data() {
			return {
				bannerList: [],
				courseTypes: [],
				hots: [],
				lecturers: [],
				recommends: [],
				swiperIndex: 0
			};
		},
		onLoad() {
			homepage().then(res=>{
				console.log(res)
				if(res.code === 200) {
					let data = res.data;
					this.bannerList = data.banners;
					this.courseTypes = data.courseTypes;
					this.hots = data.hots;
					this.lecturers = data.lecturers;
					this.recommends = data.recommends;
				}
			})
		},
		methods:{
			swiperChange(e){
				let i = e.detail.current;
				this.swiperIndex = i;
			}
		}
	}
</script>

<style lang="less">
.homeIndex{
	height: 100vh;
	padding: 20rpx 40rpx 0 40rpx;
	background-color: #FAFAFA;
	.search{
		padding: 20rpx 30rpx;
		font-size: 28rpx;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		color: #D3D3D3;
		background-color: #F3F3F3;
	}
	.banner{
		margin-top: 40rpx;
		height: 300rpx;
		position: relative;
		width: 100%;
		border-radius: 10rpx;
		overflow: hidden;
		swiper{
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.radius{
			position: absolute;
			z-index: 2;
			bottom: 0;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40rpx;
			.item{
				height: 15rpx;
				width: 15rpx;
				border-radius: 50%;
				background-color: #ffffff;
				margin-right: 20rpx;
			}
			.item.active{
				width: 30rpx;
				border-radius: 20rpx;
				background-color: #FFE031;
			}
		}
		
	}
	
}

</style>
