<template>
  <div class="father">
    <div class="content">
      <div class="pic">
        <img :src="list.imgUrl" alt />
        <van-icon size="24px" color="#fff" name="arrow-left" @click="back" />
      </div>
      <div class="content_box">
        <h3>{{list.name}}</h3>
        <p class="p1">
          <span>月售{{list.sellCount}}份</span>
          <span>好评率{{list.rating}}</span>
        </p>
        <div class="buy">
          <p class="p2">
            <span style="font-size:18px">￥</span>
            {{list.price}}
          </p>
          <div class="icon">
            <div v-show="false">
              <van-goods-action-button color="#ffc500" dot text="立即购买" />
              <van-icon size="22px" name="shopping-cart" />
            </div>
            <div v-show="true" class="num">
              <div class="down" @click="changenum(list.id,-1)"></div>
              <span>{{list.num}}</span>
              <div class="up" @click="changenum(list.id,1)"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="product">
        <h3>商品介绍</h3>
        <p>{{list.goodsDesc}}</p>
      </div>
      <div class="rate">
        <h3>外卖评价</h3>
        <div v-for="(items,index) in list.ratings" :key="index" class="rating">
          <img :src="items.avatar" alt />
          <div class="rating_box">
            <div class="rating_box2">
              <h3>{{items.username}}</h3>
              <span>{{items.rateTime}}</span>
            </div>
            <div>{{items.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    back() {
      location.href = "/#/products";
    },
    changenum(id, num) {
      console.log(id, num);
      //将id 和 num 传到mutations 里 ，只有它可以改变vuex的state里的值
      this.$store.commit("changenum_x", { id, num });
      // if (this.gethavelist.length == 0) {
      //   this.isshow = false;
      // }
    },
  },
  created() {
    var goodsid = this.$route.query.id;
    var goodArr = this.$store.state.list;
    for (let obj of goodArr) {
      for (let child of obj.foods) {
        if (child.id == goodsid) {
          for (let res of child.ratings) {
            res.rateTime =
              new Date(res.rateTime).getFullYear() +
              "-" +
              new Date(res.rateTime).getMonth() +
              "-" +
              new Date(res.rateTime).getDate() +
              " " +
              new Date(res.rateTime).getHours() +
              ":" +
              new Date(res.rateTime).getMinutes() +
              ":" +
              new Date(res.rateTime).getSeconds();
          }
          this.list = child;
          break
        }
      }
    }
    // for (let child of arr2.ratings) {
    //   child.rateTime =
    //     new Date(child.rateTime).getFullYear() +
    //     "-" +
    //     new Date(child.rateTime).getMonth() +
    //     "-" +
    //     new Date(child.rateTime).getDate() +
    //     " " +
    //     new Date(child.rateTime).getHours() +
    //     ":" +
    //     new Date(child.rateTime).getMinutes() +
    //     ":" +
    //     new Date(child.rateTime).getSeconds();
    // }
    console.log(this.$store.state.list);
  },
};
</script>

<style scoped lang='less'>
.father {
  overflow: scroll;
  .content {
    width: 100%;
    background: #f3f6f6;
    .pic {
      position: relative;
      .van-icon-arrow-left {
        position: absolute;
        left: 15px;
        top: 10px;
      }
    }
    img {
      width: 100%;
      height: 300px;
    }
    .content_box {
      background: #ffffff;
      padding: 15px 20px;
      box-sizing: border-box;
      .p1 {
        margin: 4px 0 10px;
        span {
          margin-right: 20px;
          color: #999;
        }
      }
      .p2 {
        color: red;
        font-size: 22px;
        font-weight: bold;
      }
      .buy {
        display: flex;
        justify-content: space-between;
        .icon {
          position: relative;
          width: 140px;
          .van-icon {
            position: absolute;
            left: 16px;
            top: 8px;
          }
        }
      }
    }
    .product {
      background: #ffffff;
      margin-top: 25px;
      padding: 15px 20px;
      box-sizing: border-box;
      p {
        margin-top: 15px;
      }
    }
    .rate {
      background: #ffffff;
      margin-top: 25px;
      padding: 15px 20px;
      box-sizing: border-box;
      .rating {
        display: flex;
        margin-top: 20px;
        padding: 20px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eeeeee;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .rating_box {
          flex: 1;
          .rating_box2 {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
          }
        }
      }
    }
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
.num {
  display: flex;
  > span {
    margin: 0 15px 0 0;
  }
}
</style>