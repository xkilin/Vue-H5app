<template>
  <div class="father">
    <div class="head">
      <!-- 蒙版层 -->
      <van-overlay :show="show">
        <div @click.stop class="mengban" @click="show = false">
          <div class="mengban_top">
            <h3>{{list.name}}</h3>
            <van-rate
              v-model="list.score"
              color="#ffd21e"
              allow-half
              void-icon="star"
              void-color="#eee"
              readonly
            />
          </div>
          <van-divider>
            <h3>优惠信息</h3>
          </van-divider>
          <div v-for="(items,index) in list.supports" :key="index" class="mengban_sup">
            <img src="../assets/imgs/jian.png" alt />
            <p>{{items}}</p>
          </div>
          <van-divider>
            <h3>商家信息</h3>
          </van-divider>
          <p>{{list.bulletin}}</p>
        </div>
      </van-overlay>
      <div class="top" @click="show = true">
        <img :src="list.avatar" alt />
        <div class="top_right">
          <h3>{{list.name}}</h3>
          <p>
            <span>商家配送</span> /
            <span>配送费:{{list.deliveryPrice}}元</span>
          </p>
          <div class="suppot">
            活动:
            <img
              style="width:20px;height:20px;margin-left:10px"
              src="../assets/imgs/jian.png"
              alt
            />
            <p>
              <span
                style="margin-right:8px"
                v-for="(items,index) in list.supports"
                :key="index"
              >{{items}}</span>
            </p>
            <div class="num">
              <span>5个</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>
      <van-notice-bar background="#ccc" color="#fff" left-icon="volume-o" :text="list.bulletin" />
    </div>
    <div class="nav">
      <a href="/#/products" :class="{change_color:num==1}" @click="changecolor(1)">商品</a>
      <a href="/#/evaluate" :class="{change_color:num==2}" @click="changecolor(2)">评价</a>
      <a href="/#/merchant" :class="{change_color:num==3}" @click="changecolor(3)">商家</a>
    </div>
    <div class="content">
      <transition name="slide-fade">
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { shop } from "@/api/apis";
export default {
  data() {
    return {
      list: [],
      arr: [],
      num: 1,
      show: false,
    };
  },
  methods: {
    changecolor(a) {
      this.num = a;
    },
  },
  created() {
    shop().then((res) => {
      console.log(res);
      this.list = res.data.data;
      localStorage.score = res.data.data.score;
    });
  },
};
</script>

<style scoped lang='less'>


.father {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .head {
    width: 100%;
    background: url(../assets/111.jpg) center no-repeat;

    .suppot {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      p {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .top {
      padding: 10px 15px;
      box-sizing: border-box;
      display: flex;
      margin-bottom: 10px;
      width: 100%;
      img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        margin-right: 10px;
      }
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 10px;
      }
      .top_right {
        width: 70%;
      }
    }
  }
  .nav {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #cccccc;
    a {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      color: black;
    }
    .change_color {
      border-bottom: 2px solid red;
    }
  }
  .content {
    flex: 1;
    display: flex;
    width: 100%;
    overflow: hidden;

    /* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all 0s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(300px);
  opacity: 0;
}



  }
  .num {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
    color: #ffffff;
    width: 60px;
    line-height: 25px;
    border-radius: 15px;
    background: rgba(11, 11, 11, 0.5);
  }
}
.mengban {
  color: #ffffff;
  text-align: justify;
  padding: 20px 20px;
  box-sizing: border-box;
  p {
    line-height: 33px;
  }
  .mengban_top {
    text-align: center;

    h3 {
      margin: 30px 0;
    }
  }
  h3 {
    color: #ffffff;
  }
  .mengban_sup {
    display: flex;
    color: #ffffff;
    margin-top: 25px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
  }
}
</style>