<template>
  <div>
      <div class="top"> 
          <p>购物车</p>
          <div @click="remove">
              <van-icon name="delete" color=#989898; />
              <span>清空购物车</span>
          </div>
      </div>
    <div v-for="(items,index) in getlist" :key="index" class="content">
      <p class="title">{{items.name}}</p>
      <p style="color:red" class="mid">￥{{(items.price * items.num).toFixed(2)}}</p>
      <div class="num">
        <div class="down" @click="changenum(items.id,-1)"></div>
        <span>{{items.num}}</span>
        <div class="up" @click="changenum(items.id,1)"></div>
      </div>
    </div>
      <div style="height:90px"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
        isshow:true,
        havenumlist:[]
    };
  },
  created() {
    //   this.havenumlist = this.getlist;
  },
  methods: {
    changenum(id, num) {
      //将id 和 num 传到mutations 里 ，只有它可以改变vuex的state里的值
      this.$store.commit("changenum_x", { id, num });
      if(this.getlist.length > 0){
          this.isshow = true;
      }else  this.isshow = false;
    },
    remove(){
        this.$store.commit('clearnum_x');
    }
  },
  computed: {
    getlist() {
      return this.$store.getters.havegoodslist;
    },
  },
};
</script>

<style scoped lang='less'>
.content{
    padding: 10px 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title{
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.mid{
    margin: 0 15px;
}
.num{
    display: flex;
    align-items: center;
    color: red;
    font-weight: bold;
    span{
        margin-right: 10px;
    }
}
.up,
.down {
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: url(../assets/imgs/diancan.png) center no-repeat;
  background-size: 100%;
}
.down {
  background: url(../assets/imgs/down.png) center no-repeat;
}
.top{
    padding: 10px 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    div{
        color: #989898;
    }
}
</style>