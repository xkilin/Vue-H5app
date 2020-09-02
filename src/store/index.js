import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        list: [], //商品数组
    },
    mutations: {
        //获取商品列表
        goodslist(state, newarr) {
            state.list = newarr;
        },
        //改变商品数量
        changenum_x(state, res) {
            for (var obj of state.list) {
                for (var item of obj.foods) {
                    if (item.id == res.id) {
                        item.num += res.num;
                        return
                    }
                }
            }
        },
        //使所有商品数量为0
        clearnum_x(state){
            for (var obj of state.list) {
                for (var item of obj.foods) {
                   item.num = 0;
                }
            }
        }


    },
    getters: {
        havegoodslist(state){
            let arr = [];
            for(let obj of state.list){
                for(let child of obj.foods){
                    if(child.num > 0){
                        arr.push(child)
                    }
                }
            }
            return arr;
        }
    }
})

export default store