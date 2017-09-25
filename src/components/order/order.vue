<template>
	<!--在线订单管理页-->
	<div class="order-wrapper">
		<div class="caption">
			<span><i class="icon iconfont icon-order"></i>在线订单管理</span>
			<search-box class="searchBox" :oStyle="oStyle" oPlaceholder="请输入订单号"></search-box>
			<date class="date"></date>
		</div>
		<el-table :data="tableData" border style="width:100%" max-height="600" class="table">
			<el-table-column prop="newDate" label="订单日期" width="100"></el-table-column>
			<el-table-column prop="Id" label="订单号" width="150"></el-table-column>
			<el-table-column prop="CustomerName" label="客户姓名" width="150"></el-table-column>
			<el-table-column prop="status" label="订单状态" width="150"></el-table-column>
			<el-table-column prop="Count" label="订单数量" width="150"></el-table-column>
			<el-table-column prop="store" label="库存" width="100"></el-table-column>
			<el-table-column prop="address" label="地址" width="500"></el-table-column>
			<el-table-column label="操作" width="200" fixed="right">
				<template scope="scope">
					<!--scope="scope" 相当于作用域   scope.row表示每一行的数据对象 (人家element规定)-->
						<el-button @click="delSingleGoods(scope.row)" class="btn" type="danger" size="small">删除</el-button>
						<el-button @click="addOrderList(scope.row)" class="btn" type="success" size="small">增加</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--点击订单弹出-->
		<el-table :data="tableData" v-show="false">
			<el-table-column prop="goodsName" label="商品名称" width="150"></el-table-column>
			<el-table-column prop="count" label="数量" width="100"></el-table-column>
			<el-table-column prop="price" label="金额" width="100"></el-table-column>
			<el-table-column label="操作" width="200" fixed="right">
				<template scope="scope">
					<!--scope="scope" 相当于作用域   scope.row表示每一行的数据对象 (人家element规定)-->
						<el-button @click="delSingleGoods(scope.row)" class="btn" type="danger" size="small">删除</el-button>
						<el-button @click="addOrderList(scope.row)" class="btn" type="success" size="small">增加</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script type="text/ecmascript-6">
	import SearchBox from "base/search-box/search-box"
	import Date from "base/date/date"
	
	export default{
		props:{
			tableData:{
				type:Array,
				default:[]
			},
			CustomerId:{          //客户id
		    	type:Number,
		    	default:100001
		    },
		    address:{             //客户地址
		    	type:String,
		    	default:"空"
		    }
		},
		data(){
			return{
				oStyle:{
					width:"300px"
				},
				
			}
		},
		components:{
			SearchBox,
			Date
		}
	}
</script>

<style lang="scss">
	.el-tabs__content{
		overflow:visible;	
	},
	.order-wrapper{
		.caption{
			text-align:left;
			margin:20px;
			font-size:15px;
			position:relative;
			.searchBox{
				float:right;
					
			}
			.date{
				position:absolute;
				right:450px;
				top:0;
				z-index:999 !important;
			}
		}
	}
</style>