<template>
	<view class="gather">
		<view class="oneColumn">
			<view class="columnBOX" :style="{ width: '20%', 'text-align': 'center', display: 'inline-block', 'margin-bottom': '20rpx', flex: '0 0 20%'}"
			 :key="index" v-for="(item, index) in courseTypes" @click="changeTravel(item)">
				<image class="column-image" :src="item.photoURL"></image>
				<view class="column-title ellipsis">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			courseTypes: {
				//相关服务
				type: Array,
				default: []
			},
		},
		data() {
			return {
				
			};
		},
		onHide() {},
		onReady: function(res) {
			
		},
	};
</script>

<style lang="scss">
	.gather {
		.oneColumn{
			.columnBOX{
				width: 22% !important;
			}
		}

		.oneColumn {
			overflow: hidden;
			padding: 20rpx 20rpx 0 20rpx;
			color: #2a374b;
			z-index: 1;
			box-sizing: border-box;

			.column-image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 80rpx;
				background-color: #ffffff;

			}

			.column-title {
				font-size: 26rpx;
				color: #333333;
				margin-top: 17rpx;
			}

			.columnBox {
				display: inline-block;
				height: 134rpx;
				line-height: 134rpx;
				position: relative;
				text-align: center;
			}
		}
	}
</style>
