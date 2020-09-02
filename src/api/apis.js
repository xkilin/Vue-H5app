import axios from 'axios'  //引入axios

export var ip = 'http://172.16.15.133:5000'; //请求基本路径
axios.defaults.baseURL= ip ;


//登录接口
// account：用户名    password：密码
// export var login = (account,password)=>axios.post('/users/checkLogin',{account,password});


// 商家信息
export var shop = ()=>axios.get('/shop/seller',{params:{}});

//商品数据
export var goodslist = ()=>axios.get('/goods/goods_list');

//评价
export var ratings = ()=>axios.get('/shop/ratings');
