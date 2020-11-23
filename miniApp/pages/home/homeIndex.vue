<template>
	<view class="homeIndex">
		<scroll-view scroll-y>
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
			<view class="classBox">
				<homeTab :courseTypes="courseTypes"/>
			</view>
			<view class="newBox">
				<view class="title">
					最近更新
				</view>
				<view class="itemInfo">
					<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" mode="aspectFill"></image>
					<view class="itemInfo_info">
						<view class="itemInfo_top">
							<view class="name">
								音乐即自由
							</view>
							<view class="msg">
								上过是啊好你是在说什么的音乐好听呢，可能我也不知道呀
							</view>
						</view>
						<view class="bottom">
							村上有数
						</view>
					</view>
				</view>
				<view class="itemList">
					<view class="itemList_top">
						<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" mode=""></image>
						<view class="right">
							<view class="right_name">
								<text class="right_title ellipsis">塞纳河畔作案的啊开发，收益被按时间</text>
								<text class="right_name">村上有数</text>
							</view>
							<view class="feihua">
								如果有一种乐器可以代表什么，那么就说明这个乐器很厉害，除非你不会这个乐器。
							</view>
						</view>
					</view>
					<view class="itemList_bottom">
						<view class="itemList_bottom_box">
							<view class="_item">
								<text class="_item_tit ellipsis">1、法国手风琴音乐，总是充满法式的浪漫和幽香</text>
								<text class="iconfont">&#xe6be;</text>
							</view>
							<view class="_item">
								<text class="_item_tit ellipsis">1、法国手风琴音乐，总是充满法式的浪漫和幽香</text>
								<text class="iconfont">&#xe6be;</text>
							</view>
						</view>
						<view class="itemList_bottom_tol">
							<view class="">
								共10节
							</view>
							<view class="gosee">
								前往查看
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
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
	padding: 16rpx 40rpx 0 40rpx;
	background-color: #FAFAFA;
	.search{
		padding: 20rpx 31rpx;
		font-size: 30rpx;
		border-radius: 36rpx;
		display: flex;
		align-items: center;
		color: #D2D2D2;
		background-color: #F3F3F3;
	}
	.banner{
		margin-top: 32rpx;
		height: 240rpx;
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
	.classBox{
		margin-top: 20rpx;
	}
	.newBox{
		.title{
			font-size: 40rpx;
			padding: 40rpx 0 48rpx 0;
		}
		.itemInfo{
			padding: 32rpx;
			background-color: #ffffff;
			display: flex;
			image{
				width: 160rpx;
				height: 212rpx;
				margin-right: 40rpx;
			}
			.itemInfo_info{
				width: calc(100% - 200rpx);
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.itemInfo_top{
					.name{
						font-size: 32rpx;
					}
					.msg{
						margin-top: 20rpx;
						font-size: 24rpx;
						color: #999999;
					}
				}
				.bottom{
					color: #333333;
					font-size: 24rpx;
				}
			}
		}
		.itemList{
			padding: 32rpx;
			margin-top: 48rpx;
			background-color: #ffffff;
			.itemList_top{
				display: flex;
				margin-bottom: 29rpx;
				image{
					width: 124rpx;
					height: 124rpx;
					margin-right: 23rpx;
				}
				.right{
					width: calc(100% - 150rpx);
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.right_name{
						display: flex;
						align-items: flex-start;
						justify-content: space-between;
						.right_title{
							font-size: 28rpx;
							width: calc(100% - 150rpx);
						}
						.right_name{
							width: 120rpx;
							font-size: 24rpx;
						}
					}
					.feihua{
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
			.itemList_bottom{
				.itemList_bottom_box{
					margin-bottom: 16rpx;
					._item{
						font-size: 24rpx;
						font-weight: 400;
						color: #666666;
						line-height: 36rpx;
						display: flex;
						justify-content: space-between;
						margin-bottom: 16rpx;
						._item_tit{
							width: calc(100% - 62rpx);
						}
						.iconfont{
							width: 40rpx;
							height: 40rpx;
							background-color: #F6F6F6;
							text-align: center;
							line-height: 40rpx;
							font-size: 24rpx;
						}
					}
				}
				.itemList_bottom_tol{
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color: #999999;
					line-height: 36rpx;
					margin-top: 16rpx;
					.gosee{
						color: #F3563B;
					}
				}
			}
		}
	}
}

</style>
