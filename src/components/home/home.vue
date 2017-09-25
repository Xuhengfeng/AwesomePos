<template>
    <div class="layout-wrapper">
        <Row type="flex" class="layout">
            <Col :span="spanLeft" class="layout-menu-left">
               	<left-nav :oSpan="spanLeft"></left-nav>
            </Col>
            <Col :span="spanRight" class="spanRight">
                <div class="layout-header">
                    <div class="layout-ceiling">
	                    <Button class="btnIcon" type="text" @click="toggleClick">
	                        <Icon type="navicon" size="32"></Icon>
	                    </Button>
					    <div class="layout-ceiling-main">
					        <a href="#">注册登录</a> |
					        <a href="#">帮助中心</a> |
					        <a href="#">安全中心</a> |
					        <a href="#">服务大厅</a>
					    </div>
					</div>
                </div>
                <div class="layout-content">
                    <pos></pos>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; xuhengfeng
                </div>
            </Col>
        </Row>
    </div>
    
    
</template>
<script>
	import leftNav from "common/leftNav/leftNav"
	import Pos from "components/Pos/Pos"
	
    export default {
        data () {
            return {
                spanLeft:1,
                spanRight:23
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft===1) {
                    this.spanLeft=2;
                    this.spanRight=22;
                }else{
                    this.spanLeft=1;
                    this.spanRight=23;
                }
            }
        },
        components:{
        	leftNav,
        	Pos
        }
    }
</script>

<style lang="scss">
    .layout-wrapper{
        width: 100%;
        height:100%;
        border: 1px solid #d7dde4;
        overflow: hidden;
        .layout{
        	width: 100%;
        	height: 100%;
        	overflow: hidden;
        	.layout-menu-left{
				background: #464c5b;
			}
        	.spanRight{
        		.layout-header{
				    height:40px;
				    background:#1d8ce0;
				    .layout-ceiling{
				        overflow: hidden;
				        .btnIcon{
				        	color:#fff;	
				        	padding-top:0;
				        	padding-bottom:0;
				        }
				        .layout-ceiling-main{
				            float: right;
				            margin-right:15px;
				            margin-top:10px;
				            color:#fff;
				            a{
				            	color:#fff;
				                font-size:12px;
				            }
				        }
				    }
				}
				.layout-breadcrumb{
				    padding: 10px 15px 0;
				}
				.layout-content{
				    min-height: 200px;
				    overflow: hidden;
				    background: #fff;
				    border-radius: 4px;
				}
				.layout-copy{
			        text-align: center;
			        padding: 10px 0 20px;
			        color: #9ea7b4;
			    }
        	}
        }
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>