<template>
	<div class="confirm">
		<el-dialog :title="title" :visible.sync="dialogVisible" size="tiny">
		  <span>{{text}}</span>		
		  <slot></slot>
		  <span slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="cancel">{{confirmBtnText}}</el-button>
		    <el-button @click="confirm">{{cancelBtnText}}</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		props:{
			title:{
				type:String,
				default:'提示'
			},
			text:{
				type:String,
				default:''
			},
			confirmBtnText:{
				type:String,
				default:'确定'
			},
			cancelBtnText:{
				type:String,
				default:'取消'
			}
		},
		data(){
			return{
				dialogVisible:false,
			}
		},
		methods:{
			hide(){
				this.dialogVisible=false
			},
			show(){
				this.dialogVisible=true
			},
			cancel(){
				this.hide()
				this.$emit('cancel')//让外面去调用
			},
			confirm(){
				this.hide()
				this.$emit('confirm')//让外面去调用
			}
		}		
	}
</script>

<style lang="scss">

</style>