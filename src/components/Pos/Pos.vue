<template>
  <div class="pos">
   		<el-row>
   			<el-col :span="span" class="posOrder" ref="posOrder">
   				<div class="tabs-wrapper">
   					<el-tabs v-model="activeName" @tab-click="handleClick">
   						<el-tab-pane label="点餐" name="first">
   							<div class="table-wrapper">
   								<el-table :data="tableData" border style="width:100%" max-height="300" class="table">
	   								<el-table-column prop="goodsName" label="商品名称" width="150"></el-table-column>
	   								<el-table-column prop="count" label="数量" width="100"></el-table-column>
	   								<el-table-column prop="price" label="金额" width="100"></el-table-column>
	   								<el-table-column prop="store" label="库存" width="100"></el-table-column>
	   								<el-table-column label="操作" width="100" fixed="right">
	   										<template scope="scope">
	   											<!--scope="scope" 相当于作用域   scope.row表示每一行的数据对象 (人家element规定)-->
	   												<el-button @click="delSingleGoods(scope.row)" class="btn" type="text" size="small">删除</el-button>
	   												<el-button @click="addOrderList(scope.row)" class="btn" type="text" size="small">增加</el-button>
	   										</template>
	   								</el-table-column>
   								</el-table>
   							</div>
   						</el-tab-pane>
   						<el-tab-pane label="订单" name="second">
   							<order></order>
   						</el-tab-pane>
   						<el-tab-pane label="外卖" name="three">
   							配送地址	
   						</el-tab-pane>
   					</el-tabs>
   				</div>
   				<div class="total-wrapper">
   						<div class="total">
   							<span class="totalCount">数量:<span>{{this.totalCount}}</span></span>
   							<span class="totalMoney">金额:<span>{{this.totalMoney|Money}}</span></span>
   						</div>
   				</div>
   				<div class="btnGroup">
   					<el-button type="warning" @click="showConfirm">挂单</el-button>
   					<el-button type="danger" @click="delAllGoods">删除</el-button>
   					<!--注意这块的结账是要回传给数据库的,将数据保存到数据库-->
   					<el-button type="success" @click="checkout">结账</el-button>
   					<!--就近管理-->
   					<confirm @cancel="activeTab"  ref="confirm" title="正在进行挂单操作,是否进行挂单..."  confirmBtnText="确定" >
   						<my-form></my-form>
   					</confirm>
   				</div>
   			</el-col>
   			<el-col :span="17" class="oftenGoods" ref="oftenGoods" v-show="showFlag">
   					<div class="goods">
   						<h3 class="title">常用商品</h3>
							<ul class="goodsList">
								<li @click="addOrderList(item)" v-for="item in oftenGoods">
									<span>{{item.goodsName}}</span>
									<span class="oPrice">{{item.price|formatMoney}}</span>
								</li>
							</ul>
   					</div>
   					<div class="goods-wrapper">
	   					<el-tabs>
	   						<el-tab-pane label="汉堡">
									<ul class="desc">
										<li @click="addOrderList(item)" v-for="item in type0Goods">
											<div class="icon">
												<img width="100" height="100" :src="item.goodsImg">
											</div>
											<div class="text">
												<h2 class="foodName">{{item.goodsName}}</h2>
												<span class="foodPrice">{{item.price|formatMoney}}</span>
											</div>
										</li>
									</ul>
	   						</el-tab-pane>
	   						<el-tab-pane label="小食">
	   							<ul class="desc">
										<li @click="addOrderList(item)" v-for="item in type1Goods">
											<div class="icon">
												<img width="100" height="100" :src="item.goodsImg">
											</div>
											<div class="text">
												<h2 class="foodName">{{item.goodsName}}</h2>
												<span class="foodPrice">{{item.price|formatMoney}}</span>
											</div>
										</li>
									</ul>
	   						</el-tab-pane>
	   						<el-tab-pane label="饮食">
	   							<ul class="desc">
										<li @click="addOrderList(item)" v-for="item in type2Goods">
											<div class="icon">
												<img width="100" height="100" :src="item.goodsImg">
											</div>
											<div class="text">
												<h2 class="foodName">{{item.goodsName}}</h2>
												<span class="foodPrice">{{item.price|formatMoney}}</span>
											</div>
										</li>
									</ul>
	   						</el-tab-pane>
	   						<el-tab-pane label="套餐">
	   							<ul class="desc">
										<li v-for="item in type3Goods">
											<div class="icon">
												<img width="100" height="100" :src="item.goodsImg">
											</div>
											<div class="text">
												<h2 class="foodName">{{item.goodsName}}</h2>
												<span class="foodPrice">{{item.price|formatMoney}}</span>
											</div>
										</li>
									</ul>
	   						</el-tab-pane>
		   				</el-tabs>
   					</div>
   			</el-col>
   		</el-row>
  </div>
</template>

<script>
	import MyForm from "common/myform/myform"
	import Confirm from "common/confirm/confirm"
	import Order from "components/order/order"
	import {getOftenGoods,getTypeGoods} from "src/api/pos"
	import axios from "axios"
	
	export default {
	  data(){
		  return{//一定要记住 dom中的插值不一定都是直接在data里面获取的,也可以是函数返回
		  	activeName:'first',   //默认标签页 第一页显示
		  	totalCount:0,         //总数量
  			totalMoney:0,         //总金额
		    tableData:[],         //订单
		    oftenGoods:[],        //常用商品
		    type0Goods:[],        //汉堡
		    type1Goods:[],        //小食
		    type2Goods:[],        //饮食
		    type3Goods:[],        //套餐
		    showFlag:true,        //默认显示右侧商品
		  }
	  },
  mounted(){
  	const Height=document.body.clientHeight
  	this.$refs.posOrder.$el.style.height=Height+'px'
  	this.$refs.oftenGoods.$el.style.height=Height+'px'
  },
  created(){
  	this._getOftenGoods()
  	this._getTypeGoods()
  },
  methods:{
  	handleClick(tab,event){
  		const oIndex1=1           //订单
  		const oIndex2=2           //外卖
  		const index=parseInt(tab.index)
  		if(index===oIndex1||index===oIndex2){
  			this.showFlag=false
  		}else{
  			this.showFlag=true
  		}
  	},
  	activeTab(){                        //在comfirm对话框中调用函数
  		this.activeName="second"          //将标签页设置到第二页
  		this.showFlag=false
  	},
  	addOrderList(goods){
  		//每次清零操作
  		this.totalMoney=0
  		this.totalCount=0
  		//判断商品是否已存在订单列表中
  		let isHave=false
  		for(let i=0;i<this.tableData.length;i++){
  			if(this.tableData[i].goodsId===goods.goodsId){
  					isHave=true
  			}  			
  		}
  		if(isHave){//存在  es6箭头函数有{}包括的是带有返回值得函数,否则不带返回值,带{}是常规写法
  			let arr=this.tableData.filter(item=>item.goodsId===goods.goodsId)//表示满足条件的保留下来,filter()不会更改原始数组。
				//arr表示留下来的那个数组对象,可以拿到count
  			arr[0].count++
  		}else{
  			let newGoods={
  					"goodsId":goods.goodsId,
  					"goodsName":goods.goodsName,
  					"price":goods.price,
  					"count":1,
  					"store":300
  			}
  			this.tableData.push(newGoods)
  		}
  		this.getAllMoney()
  	},
  	//删除当个商品
  	delSingleGoods(goods){
  		this.tableData=this.tableData.filter(item=>item.goodsId!=goods.goodsId)//除了他自己,其他都保留
  		this.getAllMoney()
  	},
  	//删除全部
  	delAllGoods(){
  		this.tableData=[]
  		this.totalMoney=0
  		this.totalCount=0
  	},
  	//汇总数量和金额
  	getAllMoney(){
  		//每次汇总要清零操作
  		this.totalMoney=0
  		this.totalCount=0
  		this.tableData.forEach((element)=>{
  			this.totalCount+=element.count
  			this.totalMoney=this.totalMoney+(element.price*element.count)
  		})
  	},
  	//模拟结账
  	checkout(){
  		if(this.totalCount!=0){
  			//结账之后要清零操作
  			this.tableData=[]
  			this.totalMoney=0
  			this.totalCount=0
  			this.$message({
  				message:'结账成功,感谢你又为店里出了一份力!',
  				type:'success'//Element 注册了一个$message方法用于调用，Message 可以接收一个字符串作为参数，它会被显示为正文内容。
  			})
  		}else{
  				this.$message.error('不能空结,老板了解你急切的心情！')
  		}
  	},
  	showConfirm(){
  		if(this.totalCount!=0){
  			this.$refs.confirm.show()  			
  		}else{
  			this.$message.error('没有添加任何商品,无法挂单!')
  		}
  	},
  	//获取后台常用商品数据
  	_getOftenGoods(){
		getOftenGoods().then((res)=>{
				if(res){
					this.oftenGoods=res
				}
			})
  	},
  	//获取后台商品数据
  	_getTypeGoods(){
			getTypeGoods().then((res)=>{
				if(res){
					this.type0Goods=res[0]
					this.type1Goods=res[1]
					this.type2Goods=res[2]
					this.type3Goods=res[3]
				}
			})
	  }
  },
	filters:{//价格过滤
		Money(value){//value是 | 前面的对象
			return `${value.toFixed(2)}元`
		},
		formatMoney(value){
			return `¥${value.toFixed(2)}元`
		}
	},
	computed:{
		span(){                      //计算属性的数据也可以直接在dom中使用,不一定要把数据都写在data里面
			return this.showFlag?7:24  //当右侧商品不存在的时候  进行通栏设置
		}
	},
  components:{
  	Confirm,
  	Order,
  	MyForm
  }
}
</script>


<style lang="scss">
	.pos{
		overflow:hidden;		
			/*左边*/
			.posOrder{
				overflow:hidden;
				background:#f9fafc;
				border-right:1px solid #c0ccda;
				.total-wrapper{
					overflow:hidden;
					background:#fff;
					border-bottom:1px solid #c0ccda;
					.total{
						float:right;
						margin-right:50px;
						padding:10px;
						.totalCount,.totalMoney{
							display:inline-block;
							margin-right:10px;
							font-size:18px;
							font-family:"微软雅黑";
							span{
								padding:5px;
								font-size:15px;
								color:red;
							}
						}
					}
				}
				.btnGroup{
					text-align:center;
					margin-top:15px;
				}
			}
			/*右边*/
			.oftenGoods{
				overflow:hidden;
				background:#ebf2ff;
				.goods{
					.title{
						padding:10px;
						height:42px;
						text-align:left;
						border-bottom:1px solid #d3dce6;
						background:#f9fafc;
						font-size:normal;
						color:rgba(0,0,0,.8)
					}
					.goodsList{
						padding:20px 40px;
						background:#f9fafc;
						overflow:hidden;
						li{
							float:left;
							padding:5px;
							background:#fff;
							margin-right:10px;
							margin-bottom:10px;
							border:1px solid #e5e9f2;
							letter-spacing:1px;
							cursor:pointer;
							.oPrice{
								color:#58b7ff;
								font-family:"微软雅黑"
							}
						}
					}
				}
				.goods-wrapper{
					.desc{
						overflow:hidden;
						padding:20px 30px;
						li{
							float:left;
							display:flex;
							margin:10px;
							background:#fff;
							width:200px;
							cursor:pointer;
							box-shadow:2px 2px 5px brown;
							.icon{
								flex:0 0 100px;
								width:100px;
								img{
									vertical-align:top;
								}
							}
							.text{
								flex:1;
								padding:10px;
								flex-direction:column;
								justify-content:center;
								overflow:hidden;
								font-size:10px;
								color:brown;
								.foodName{
									line-height:20px;
								}
								.foodPrice{
									display:block;
									font-size:15px;
									margin-top:10px;
									color:black;
									font-family:"微软雅黑";
									font-weight:bold;
								}
							}
						}
					}
				}
				
			}
	}
</style>
