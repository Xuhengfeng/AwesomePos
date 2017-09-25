import {commonParams} from "./config"
import axios from "axios"

export function getOftenGoods(){ //获取常用商品
	const url='http://jspang.com/DemoApi/oftenGoods.php'
	const data=Object.assign({},commonParams,{
		DNT:1,
		format:'json'
	})
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}

export function getTypeGoods(){ //获取商品
	const url='http://jspang.com/DemoApi/typeGoods.php'
	const data=Object.assign({},commonParams,{
		DNT:1,
	})
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}
