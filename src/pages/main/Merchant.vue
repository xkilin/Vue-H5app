<template>
  <div class="father">
    <div class="shop_top">
      <div>
        <h3>{{list.name}}</h3>
        <div class="shop_topdiv">
          <van-rate
            v-model="list.score"
            color="#ffd21e"
            allow-half
            void-icon="star"
            void-color="#eee"
            readonly
          />
          <span>(661)</span>
          <span>月售{{list.sellCount}}单</span>
        </div>
      </div>
      <div class="box2">
        <van-icon @click="changcolor" size='26' :color="color?'red':'#ccc'" name="like" class="icon" />
        <p>{{ color?'已收藏':'未收藏' }}</p>
      </div>
      
    </div>
    <div class="shop_mid">
        <div>
            <p>起送价</p>
            <p><span>{{list.minPrice}}</span> 元 </p>
        </div>
        <div>
            <p>商家配送</p>
            <p><span>{{list.deliveryPrice}}</span> 元 </p>
        </div>
        <div>
            <p>平均配送时间</p>
            <p><span>{{list.deliveryTime}}</span> 分钟 </p>
        </div>
    </div>

    <div class="shop_bot">
        <h3>活动与公告</h3>
        <p>
            {{list.bulletin}}
        </p>
    </div>
    <!-- <div class="shop_sup"> -->
        <div v-for="(items,index) in list.supports" :key="index" class="shop_sup">
            <img src="../../assets/imgs/jian.png" alt="">
            <p>
                {{items}}
            </p>
        </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { shop } from "@/api/apis";
export default {
  data() {
    return {
      list: [],
      color:false
    };
  },
  methods:{
      changcolor(){
          this.color = !this.color
      }
  },
  created() {
    shop().then((res) => {
      console.log(res);
      this.list = res.data.data;
    });
  },
};
</script>

<style scoped lang='less'>
.father{
    width: 100%;
  overflow: scroll;
    background: #eeeeee;
}
.shop_top {
    background: #ffffff;
    padding: 30px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  .shop_topdiv {
    margin-top: 15px;
    display: flex;
    align-items: center;
    span{
        margin-left: 10px;
    }
  }
  .box2{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  h3 {
    font-size: 17px;
  }
}
.shop_mid{
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0;
    box-sizing: border-box;
    p{
        text-align: center;
        color: #aaaaaa;
        margin-top: 10px;
        span{
            color: #000;
            font-size: 20px;
            font-weight: bold;
        }
    }
}
.shop_bot{
    margin-top: 20px;
    padding: 15px 20px;
    box-sizing: border-box;
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
    P{
        margin-top: 15px;
        color: red;
        text-align: justify;
    }
}
.shop_sup{
    background: #ffffff;
    display: flex;
    padding: 20px 20px;
    box-sizing: border-box;
    img{
        width: 20px;
        height: 20px;
        margin-right: 15px;
    }
}
</style>