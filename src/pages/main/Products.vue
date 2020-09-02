<template>
  <div class="box">
    <div class="box_left">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(items,index) in getgoodslist_x"
            :key="index"
            :title="items.name"
            @click="move(index)"
          />
        </van-sidebar>
        <div class="emty"></div>
      </div>
    </div>
    <div class="box_right">
      <div>
        <div v-for="(items,index) in getgoodslist_x" :key="index" style="width:100%" :id="index">
          <p class="title">{{items.name}}</p>
          <div v-for="(child,index) in items.foods" :key="index" class="right_goods">
            <img
              :src="child.imgUrl"
              alt
              style="width:80px;height:66px"
              @click="changedata(child.id)"
            />
            <div class="right_goodsright">
              <h3 @click="changedata(child.id)">{{child.name}}</h3>
              <p>月销量 {{child.sellCount}} &emsp;&emsp;&emsp;&emsp; 好评{{child.rating}}</p>
              <div class="price">
                <p>￥{{child.price}}</p>
                <div class="num">
                  <div v-show="!(child.num==0)" class="down" @click="changenum(child.id,-1)"></div>
                  <span v-show="!(child.num==0)">{{child.num}}</span>
                  <div class="up" @click="changenum(child.id,1)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="emty"></div>
      </div>
    </div>
    <transition name="slide-fade">
        <shopcar v-show="isshow" class="show" />
    </transition>
    <div class="bot" @click="show">
      <div class="Bot">
        <div
          class="bot_icon"
          :style="gethavelist.length>0?'background-color:#ffc500': 'background-color:#333'"
        >
          <van-icon
            name="shopping-cart"
            size="35"
            :color=" gethavelist.length>0 ?'#000':'#999'"
            :badge="gethavelist.length>0 ? gethavelistnum:''"
          />
          <div></div>
        </div>
        <div>
          <p style="color:#fff" class="p1">￥{{ totalprice.toFixed(2) }}</p>
          <p class="p2">另需配送费￥ 4 元</p>
        </div>
        <div
          class="div1"
          :style="gethavelist.length>0?((50-totalprice)<=0?'background-color:#ffc500':'background-color:#333'  ) : 'background-color:#333'"
        >{{ gethavelist.length>0 ? ((50-totalprice>0 ? '还差'+ ((50 - totalprice).toFixed(2))+'元' :'去结算')) :'50元起送' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { goodslist } from "@/api/apis";
import BScroll from "better-scroll";
import shopcar from "../ShopCar";
export default {
  data() {
    return {
      activeKey: 0,
      showdown: false,
      isshow: false,
    };
  },
  components: {
    shopcar,
  },
  methods: {
    changenum(id, num) {
      //将id 和 num 传到mutations 里 ，只有它可以改变vuex的state里的值
      this.$store.commit("changenum_x", { id, num });
      if (this.gethavelist.length == 0) {
        this.isshow = false;
      }
    },
    changedata(id) {
      this.$router.push({ path: "/productlist", query: { id } });
    },
    move(index) {
      this.box_right.scrollToElement(document.getElementById(index), 300);
    },
    show() {
      if (this.gethavelist.length > 0) {
        this.isshow = !this.isshow;
      } else this.isshow = false;
      console.log(this.isshow);
    },
  },
  created() {
    goodslist().then((res) => {
      // console.log(res);
      let arr = res.data.goodsList;
      for (var obj of arr) {
        for (var item of obj.foods) {
          item.num = 0;
        }
      }
      this.$store.commit("goodslist", arr);
    });
  },
  mounted() {
    this.box_left = new BScroll(
      document.getElementsByClassName("box_left")[0],
      {
        click: true,
      }
    );
    this.box_right = new BScroll(
      document.getElementsByClassName("box_right")[0],
      {
        click: true,
        probeType: 3,
      }
    );
    //右边菜单栏 滑动的时候 的 滑动事件
    this.box_right.on("scroll", (obj) => {
      //   console.log(this.getHeghtArr);
      for (let res of this.getHeghtArr) {
        if (Math.abs(obj.y) >= res.startY && Math.abs(obj.y) < res.endY) {
          this.activeKey = res.index;
        }
      }
    });
  },
  computed: {
    getHeghtArr() {
      console.log("计算属性运行了！！！！");
      var Heightarr = [];
      var totalHeight = 0;
      for (var i = 0; i < this.getgoodslist_x.length; i++) {
        let DivHeight = document.getElementById(i).offsetHeight;
        Heightarr.push({
          startY: totalHeight,
          endY: totalHeight + DivHeight,
          index: i,
        });
        totalHeight += DivHeight;
      }
      return Heightarr;
    },
    getgoodslist_x() {
      return this.$store.state.list;
    },
    gethavelist() {
      return this.$store.getters.havegoodslist;
    },
    gethavelistnum() {
      var goodsnum = 0;
      for (let obj of this.gethavelist) {
        goodsnum += obj.num;
      }
      return goodsnum;
    },
    totalprice() {
      var totalpro = 0;
      for (let obj of this.gethavelist) {
        totalpro += obj.num * obj.price;
      }
      return totalpro;
    },
  },
};
</script>

<style scoped lang='less'>
.box {
  width: 100%;
  display: flex;

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(300px);
    opacity: 0;
  }
  .box_left {
    background: #f7f8fa;
    overflow: scroll;
  }
  .box_right {
    flex: 1;
    overflow: scroll;
    width: 100%;
    .title {
      background: #eeeeee;
      height: 35px;
      line-height: 35px;
      padding-left: 20px;
    }
    .right_goods {
      display: flex;
      padding-left: 20px;
      box-sizing: border-box;
      margin-top: 15px;
      margin-bottom: 20px;
      width: 100%;
      > img {
        border-radius: 6px;
      }
      .right_goodsright {
        margin-left: 15px;
        width: 100%;
        h3 {
          font-size: 16px;
        }
        > p {
          margin-top: 8px;
          margin-bottom: 8px;
          font-size: 12px;
          color: #ccc;
        }
        .price {
          width: 100%;
          display: flex;
          font-size: 18px;
          font-weight: bold;
          justify-content: space-between;
          color: red;
          .num {
            display: flex;
            > span {
              margin: 0 15px 0 0;
            }
          }
          .up,
          .down {
            margin-right: 10px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: url(../../assets/imgs/diancan.png) center no-repeat;
            background-size: 100%;
          }
          .down {
            background: url(../../assets/imgs/down.png) center no-repeat;
          }
        }
      }
    }
  }
  .bot {
    text-align: center;
    width: 100%;
    position: fixed;
    border-radius: 25px;
    background: #222;
    height: 60px;
    left: 0;
    bottom: 10px;
    .Bot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .p1 {
        text-align: left;
      }
      .p2 {
        color: #999;
      }
      .div1 {
        width: 120px;
        height: 60px;
        line-height: 60px;
        color: #f7f8fa;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
      }
      .bot_icon {
        width: 50px;
        height: 50px;
        background: #333;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
      }
    }
  }
  .show {
    width: 100%;
    overflow: scroll;
    max-height: 300px;
    background: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0px;
  }
}
.emty {
  height: 60px;
}
</style>