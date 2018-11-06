<template>

    <div>
        <!-- <input type="button" value="detail累加" @click="detailAdd"> -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"  v-if="images.normal_size.length!=0">
                               <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions"/>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <!-- <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small"> -->
                                                        <!---->
                                                        <!-- <input autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false"> -->
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                        <el-input-number v-model="num1" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                                    <!-- </div> -->
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="detailAdd" ref="toCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="selectIndex=0" href="javascript:;" :class="{selected:selectIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="selectIndex=1" href="javascript:;" :class="{selected:selectIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                             </Affix>
                            <div class="tab-content entry" v-html="goodsinfo.content" v-show="selectIndex==0">
                                
                            </div>
                            <div class="tab-content" v-show="selectIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="message" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="subComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | beautifyTimePro('YYYY/MM/DD HH:mm:ss')}}</span>
                                                    <!-- <span>2017/10/23 14:58:59</span> -->
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :current="pageIndex" @on-change="pageChange" @on-page-size-change="pageSizeChange" :total="totalCount" placement="top" :page-size-opts=[8,18,28,38] :page-size=8  show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to=" '/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to=" '/detail/'+item.id ">
                                                {{item.title}}
                                            </router-link>
                                            
                                            <!-- </a> -->
                                            <span>{{item.add_time|beautifyTime('-','-','')}}</span>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img class="fly-img" ref="flyImg" :src="imglist[0].original_path" alt="">
    </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "detail",
  data: function() {
    return {
      goodId: "",
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      num1: 1,
      selectIndex: 0,
      pageIndex: 1,
      pageSize: 8,
      totalCount: 0,
      comments: [],
      message: "",
      images: {
        normal_size: [
          {
            id: 1,
            url:
              "http://img3.imgtn.bdimg.com/it/u=3484625260,2833435911&fm=26&gp=0.jpg"
          },
          {
            id: 2,
            url:
              "http://img2.imgtn.bdimg.com/it/u=3260609003,3965213395&fm=26&gp=0.jpg"
          }
        ]
      },
      //放大
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      },
      isFinish: true
    };
  },

  methods: {
    handleChange(value) {
    //   console.log(value);
    },
    getGoodInfo() {
      this.images.normal_size = [];
      this.$axios
        .get("/site/goods/getgoodsinfo/" + this.goodId)
        .then(response => {
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          let tmp_normal_size = [];
          this.imglist.forEach(v=>{
              tmp_normal_size.push({
                  id: v.id,
                  url: v.thumb_path
              })
          })
          this.images.normal_size = tmp_normal_size;
        });
    },
    //获取评论
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          // console.log(response);
          this.totalCount = response.data.totalcount;
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
          this.comments = response.data.message;
        });
    },
    pageChange(pageNum) {
      // console.log(pageNum);
      this.pageIndex = pageNum;
      this.getComments();
    },
    pageSizeChange(pageSizeNum) {
      // console.log(pageSizeNum);
      this.pageSize = pageSizeNum;
      this.pageIndex = 1;
      this.getComments();
    },
    subComment() {
      if (this.message == "") {
        this.$Message.warning("没有输入内容");
        return;
      }
      this.$axios
        .post("site/validate/comment/post/goods/"+this.goodId, {
          commenttxt: this.message
        })
        .then(response => {
          // console.log(response);
          // this.comments.push(response.config.data.txtContent);
          this.pageIndex = 1;
          this.getComments();
          this.message = "";
          this.$Message.success("评论成功");
          // this.$Message.error('发生错误');
          // this.pageIndex = 1;
        });
    },
    detailAdd(){
       if(this.isFinish == false) return

       this.isFinish = false;
        $(this.$refs.toCart).addClass('disabled')
        let startPos = $(this.$refs.toCart).offset();
        // console.log(startPos);
        //购物车位置
        let targetPos = $(this.$parent.$refs.cart).offset();
        // console.log(targetPos);
        $(this.$refs.flyImg).css(startPos).show().addClass('animate').animate({
            top: targetPos.top,
            left: targetPos.left,
            
            
        },1000,()=>{
            $(this.$refs.flyImg).hide().removeClass('animate');
            //修改购物车的数据
             this.$store.commit('addCart',{id:this.goodId,buycount:this.num1});
             this.isFinish = true;
             $(this.$refs.toCart).removeClass('disabled')
             
        });
        // this.$$(this.$refs.flyImg).animate({
        //     left:startPos.left,
        //     top: startPos.top,
        
        // })
        
        
    }
  },
  //生命周期函数
  created() {
    this.goodId = this.$route.params.goodId;
    this.getGoodInfo();
    this.getComments();
  },
  watch: {
    $route(to, from) {
      //   console.log(to);
      this.goodId = to.params.goodId;
      this.getGoodInfo();
      this.getComments();
      this.num1 = 1;
    }
  }
};
</script>
<style>
.tab-content img {
  display: block;
}
.pic-box {
  width: 385px;
  /* height: 320px; */
}
.fly-img{
    position: absolute;
    width: 60px;
    height: 60px;
    
    
}

.fly-img.animate{
    transform: rotate(3600deg) scale(0.2,0.2);
    opacity: 0;
    transition: transform 1s,opacity 2s;
}

.add.disabled{
    background-color: gray !important;
    cursor: not-allowed !important;
}
</style>
