<template>
	<div class="leftNav">
		<router-link to="/Home" class="tab-item">
			<i class="icon iconfont icon-goumai"></i>
			<span>收银</span>
		</router-link>
		<router-link to="/Home"  class="tab-item">
			<i class="icon iconfont icon-hanbao"></i>
			<span>商品</span>
		</router-link>
		<router-link to="/Home"  class="tab-item">
			<i class="icon iconfont icon-dianpu"></i>
			<span>会员</span>
		</router-link>
		<router-link to="/Home"  class="tab-item">
			<i class="icon iconfont icon-zuanshi"></i>
			<span>统计</span>
		</router-link>
		<router-link to="/Home"  class="tab-item">
			<i class="icon iconfont icon-gongnengjianyi"></i>
			<span>设置</span>
		</router-link>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		props:{
			oSpan:{//注意这是element的24栅格布局 属性 宽度
				type:Number,
				default:1
			}
		},
		mounted(){
			this._change()
		},
		methods:{
			_change(){
				let elems=document.getElementsByClassName('leftNav')[0].getElementsByTagName('span')
				if(this.oSpan===1){
					//原生的dom操作,有多个元素的记得一定要加下标
					for(let i=0;i<elems.length;i++){
					   elems[i].style.display="none";
					}
				}else{
					for(let i=0;i<elems.length;i++){
					    elems[i].style.display="inline-block";
					}
				}
			}
		},
		watch:{
			oSpan(){
				this._change()
			}
		}
	}
</script>

<style lang="scss">
	.leftNav{
		float:left;
		width:100%;
		height:100%;
		font-size:10px;
		background:#1d8ce0;
		border-right:1px solid #20a0ff;
		.tab-item{
			display:block;
			padding:10px 18px;
			list-style:none;
			border-bottom:1px solid #20a0ff;
			text-decoration:none;
			white-space:nowrap;
			color:#fff;
			.iconfont{
				font-size:24px;
			}
			i,span{
				display:inline-block;
				font-size:18px;
				letter-spacing:2px;
			}
			span{
				margin-left:5px;
			}
		}
	}
</style>