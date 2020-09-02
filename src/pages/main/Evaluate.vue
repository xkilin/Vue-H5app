<template>
  <div class="father">
    <div class="top">
      <div class="left">
        <p class="score">{{score}}</p>
        <p>商家评分</p>
      </div>
      <div class="mid">
        <p>
          <span>口味</span>
          <van-rate
            v-model="value"
            color="#ffd21e"
            allow-half
            void-icon="star"
            void-color="#eee"
            readonly
          />
        </p>
        <p>
          <span>包装</span>
          <van-rate
            v-model="value"
            color="#ffd21e"
            allow-half
            void-icon="star"
            void-color="#eee"
            readonly
          />
        </p>
      </div>
      <div class="right">
        <p style="font-size: 27px;color:#999">4.8</p>
        <p>配送评分</p>
      </div>
    </div>
    <div class="bot">
      <div>
        <div class="ratenav">
          <span :class="{sp:num==1}" @click="change_content(1)">全部（{{len1}}）</span>
          <span :class="{sp:num==2}" @click="change_content(2)">满意（{{len2}}）</span>
          <span :class="{sp:num==3}" @click="change_content(3)">不满意（{{len3}}）</span>
        </div>
        <div v-for="(items,index) in newlist" :key="index" class="content">
          <img :src="items.avatar" alt />
          <div class="content_right">
            <div class="content_box1">
              <h3>{{items.username}}</h3>
              <span>{{items.rateTime}}</span>
            </div>
            <div class="content_box2">
              <van-rate
                v-model="items.score"
                color="#ffd21e"
                allow-half
                void-icon="star"
                void-color="#eee"
                readonly
              />
              <span>{{items.deliveryTime}} 分钟送达</span>
            </div>
            <div>{{items.text}}</div>
            <div class="content_box3">
              <van-icon
                style="margin-right:10px;margin-top:10px"
                name="good-job-o"
                size="20"
                color="#FFB000"
              />
              <div>
                <span
                  v-for="(child,index) in items.recommend"
                  :key="index"
                  class="content_span"
                >{{child}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ratings } from "@/api/apis";
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      value: 4.5,
      list: [],
      newlist: [],
      score: 0,
      num: 1,
      len1: 0,
      len2: 0,
      len3: 0,
    };
  },
  methods: {
    change_content(a) {
      this.num = a;
      if (a == 1) {
        this.newlist = this.list.filter((res) => {
          return res.score >= 0;
        });
      } else if (a == 2) {
        this.newlist = this.list.filter((res) => {
          return res.score >= 4;
        });
      } else if (a == 3) {
        this.newlist = this.list.filter((res) => {
          return res.score < 4;
        });
      }
    },
  },
  created() {
    //获取商家评分
    this.score = localStorage.score;
    ratings().then((res) => {
      console.log(res);
      let arr = res.data.data;
      //转换时间
      for (let obj of arr) {
        obj.rateTime =
          new Date(obj.rateTime).getFullYear() +
          "-" +
          new Date(obj.rateTime).getMonth() +
          "-" +
          new Date(obj.rateTime).getDate() +
          " " +
          new Date(obj.rateTime).getHours() +
          ":" +
          new Date(obj.rateTime).getMinutes() +
          ":" +
          new Date(obj.rateTime).getSeconds();
        if (obj.score >= 4) {
          this.len2++;
        } else if (obj.score < 4) {
          this.len3++;
        }
      }
      this.list = arr;
      this.newlist = arr;
      this.len1 = this.newlist.length;
    });
  },
  mounted(){
    let bot = new BScroll(document.getElementsByClassName('bot')[0],{click:true})
    bot;
  }
};
</script>

<style scoped lang='less'>
.father {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #eeeeee;
  .top {
    padding: 8px 0;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background: #ffffff;
    .left,
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .score {
        font-size: 27px;
        color: #ffb000;
      }
    }
    .mid {
      p {
        display: flex;
        align-items: center;
        margin-top: 10px;
        span {
          margin-right: 10px;
          font-size: 14px;
          color: #666;
        }
      }
    }
    .right {
      color: #999;
    }
  }
  .bot {
    flex: 1;
    overflow: scroll;
    margin-top: 30px;
    background: #ffffff;
    padding: 0 15px;
    box-sizing: border-box;
    .ratenav {
      span {
        display: inline-block;
        padding: 8px 12px;
        border: 1px solid #cccccc;
      }
      .sp {
        background: #ffb000;
      }
      width: 340px;
      margin: 15px auto;
    }
    .content {
      display: flex;
      margin-top: 15px;
      padding: 8px 0 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #cccccc;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 15px;
      }
      .content_right {
        flex: 1;
        .content_box1 {
          display: flex;
          justify-content: space-between;
        }
        .content_box2 {
          display: flex;
          margin: 10px 0;
          span {
            margin-left: 15px;
          }
        }
        .content_box3 {
          display: flex;
          margin-top: 10px;
        }
        .content_span {
          display: inline-block;
          padding: 5px 8px;
          box-sizing: border-box;
          color: #cccccc;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 12px;
          margin-left: 6px;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>