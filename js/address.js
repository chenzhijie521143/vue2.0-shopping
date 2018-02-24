new Vue({
	el:".container",
	
	//数据
	data:{
		addressList:[],
		limitNum:3,
		currentIndex: 0,
		shippingMethod:1,
	},
	//生命周期钩子
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
		});
	},
	//计算属性
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	//方法
	methods:{
		getAddressList:function(){
			this.$http.get("data/address.json").then(response=>{
				var res=response.data;
				if(res.status=="0"){
					this.addressList=res.result;
				}
			});
		},
		loadMore:function(){
			this.limitNum=this.addressList.length;
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(item,index){
				if(item.addressId == addressId){
					item.isDefault=true;
				}else{
					item.isDefault=false;
				}
			});
		}
	}
});
