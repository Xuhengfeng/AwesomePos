<template>
	<div class="search-wrapper">
		<Button class="searchIcon" type="primary" icon="ios-search">订单查询</Button>			
		<input class="searchInput"  :style="oStyle" v-model="value13" :placeholder="oPlaceholder"></input>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		props:{
			oPlaceholder:{
				type:String,
				default:"请输入"
			},
			oStyle:{
				type:Object,
				default:{
					width:"100px"
				}
			}
		}
	}
</script>

<style lang="scss">
	.search-wrapper{
		overflow:hidden;
		input,.searchIcon{
			float:right;	
			border-radius:0;
			height:34px;
		}
		input{
			box-sizing:border-box;
			padding:5px;
		}
	}
</style>