
// 全局过滤器
Vue.filter('money', function(value, type) {
  return value.toFixed(2) + type;
})

//创建vue实例
var vm=new Vue({
	//vue实例的挂载目标
	el:'#app',
	
	//数据对象
	data:{
	    totalMoney:0,          //总金额
	    productList:[],        //商品信息
	    checkAllFlag:false,    //全选标志
	    delFlag:false,         //删除标志
	    curProduct:''          //当前商品（删除）
	},
	//本地过滤器  用于{{}} 和 v-bind
	filters:{
		formatMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},
	//生命周期钩子 vue.1x 使用ready
	mounted:function(){
		this.$nextTick(function(){
			vm.cartView();
		})
	},
	//方法
	methods:{
		//渲染数据
		cartView:function(){
			var _this=this;
			this.$http.get("data/cartData.json", {"id": 123}).then(function(res) {
                _this.productList = res.data.result.list;         
            });
		},
		//改变数量
		changeMoney:function(product,key){
			if(key>0){
				product.productQuantity ++;
			}else{
				product.productQuantity --;
				if(product.productQuantity <1){
					product.productQuantity=1;
				}
			}
			this.calcTotalPrice();
		},
		//选择商品
		selectedProduct:function(item){
			if(typeof item.checked=='undefined'){
				this.$set(item,"checked",true);
			}else{
				item.checked=!item.checked;
			}
			this.calcTotalPrice();
		},
		//删除提示
		delConfirm:function(item){
			this.delFlag=true;
			this.curProduct=item;
		},
		//删除
		delProduct:function(){
			var index = this.productList.indexOf(this.curProduct);
	        this.productList.splice(index, 1);
	        this.delFlag = false;
		},
		//全选（取消全选）
		checkAll:function(flag){
			this.checkAllFlag=flag;
			var _this=this;
			this.productList.forEach(function(item,index){
				if(typeof item.checked=='undefined'){
					_this.$set(item,"checked",_this.checkAllFlag);
				}else{
					item.checked=_this.checkAllFlag;
				}
			});
			this.calcTotalPrice();
		},
		//计算总金额
		calcTotalPrice:function(){
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach(function(item,index){
				if(item.checked){
					_this.totalMoney+=item.productPrice*item.productQuantity;
				}
			});
		}
	}
});
