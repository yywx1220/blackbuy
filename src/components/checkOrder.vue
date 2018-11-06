<template>
<div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form-item label="收货人姓名" prop="accept_name" >
                                    <el-input v-model="ruleForm.accept_name" style="width:500px" ></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区" prop="area" >
                                    <v-distpicker @selected="areaChange" :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址" prop="address">
                                    <el-input v-model="ruleForm.address"  style="width:500px"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="mobile">
                                    <el-input v-model="ruleForm.mobile"  style="width:500px"></el-input>
                                </el-form-item>
                               <el-form-item label="电子邮箱" prop="email">
                                    <el-input v-model="ruleForm.email"  style="width:500px"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码" prop="post_code">
                                    <el-input v-model="ruleForm.post_code"  style="width:500px"></el-input>
                                </el-form-item>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                    <em>手续费：0.00元</em>
                                    <!-- <label>
                                        <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1">
                                        <input name="payment_price" type="hidden" value="0.00">在线支付
                                        <em>手续费：0.00元</em>
                                    </label> -->
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio-group v-model="ruleForm.express_id">
                                        <el-radio @change="changeExpress(20)"  :label="1">顺丰 <em> 费用：20.00元</em></el-radio>
                                        <el-radio @change="changeExpress(12)"  :label="2">圆通 <em>费用：12.00元</em></el-radio>
                                        <el-radio @change="changeExpress(10)"  :label="3">韵达 <em>费用：10.00元</em></el-radio>
                                    </el-radio-group>
                                    <!-- <label>
                                        <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                        <input name="express_price" type="hidden" value="20.00">顺丰快递
                                        <em>费用：20.00元</em>
                                        <span class="Validform_checktip"></span>
                                    </label> -->
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in ruleForm.goodList" :key="item.id">
                                        <td width="68">
                                            <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                                
                                            <!-- </a> -->
                                        </td>
                                        <td>
                                            <router-link :to=" '/detail/'+item.id">{{item.title}}</router-link>
                                            <!-- <a target="_blank" href="/goods/show-89.html">{{item.title}}</a> -->
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price*item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="ruleForm.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{ruleForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{ruleForm.goodsAmount+ruleForm.expressMoment}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <router-link to="/shopcart" class="btn button">返回购物车</router-link>
                                        <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                        
                                        <a id="btnSubmit" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>


</div>
</template>
<script>
import VDistpicker from 'v-distpicker';
export default {
    name:"checkOrder",
    components: { VDistpicker },
    data:function(){
        var validateMobile  = (rule, value, callback) => {
            var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8} $/;
            if (value==="") {
                callback(new Error('请输入手机号'));
            }
            setTimeout(() => {

              if (reg.test(value) == false) {
                callback(new Error('请输入正确的手机号'));
              } else {
              
                  callback();

              }
            }, 1000);
        };
        var validateEmail  = (rule, value, callback) => {
            var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                if (value==="") {
                    callback(new Error('请输入邮箱'));
                }
            setTimeout(() => {

              if (reg.test(value) == false) {
                callback(new Error('请输入正确的邮箱'));
              } else {
              
                  callback();

              }
            }, 1000);
        };
        var validatePostCode  = (rule, value, callback) => {
            var reg =/^[1-9]\d{5}(?!\d)$/;
                if (value==="") {
                    callback(new Error('请输入邮编号'));
                }
            setTimeout(() => {    
              if (reg.test(value) == false) {
                callback(new Error('请输入正确的邮编号'));
              } else {      
                  callback();  
              }
            }, 1000);
        };
        return {
            ruleForm: {
                accept_name: '',
                address: '',
                mobile:'',
                email:'',
                post_code:'',
                area:{
                     "province": {
                        "code": "140000",
                         "value": "山西省"
                    },
                    "city": {
                      "code": "140100",
                      "value": "太原市"
                    },
                    "area": {
                      "code": "140109",
                      "value": "万柏林区"
                    }
                },
                payment_id: '6',
                express_id:'1',
                goodsids:'',
                goodList:[],
                cargoodsobj:{},
                expressMoment:20,
                goodsAmount:0,
                message:''
                
            },
            rules: {
                accept_name: [
                    { required: true, message: '请输入收货人姓名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
                ],
                address:[
                    { required: true, message: '请输入收货地址', trigger: 'blur' },
                    { min: 3,  message: '不能少于3个字符', trigger: 'change' }
                ],
                mobile:[
                     { validator: validateMobile, trigger: 'change' }
                ],
                email:[
                    { validator: validateEmail, trigger: 'change' }
                ],
                post_code:[
                    { validator: validatePostCode, trigger: 'change' }
                ]
         
            }
        }
    },
    methods:{
        areaChange(data){
            // console.log(data);
            this.ruleForm.area = data;
        },

        changeExpress(expressPrice){
            // console.log(expressPrice);
            this.ruleForm.expressMoment = expressPrice;
            
        }
    },
    computed:{
        totalCount(){
            let num = 0;
            this.ruleForm.goodList.forEach(v=>{
                num += v.buycount;
            })
            return num;
        },
        // totalAmount(){
        //     let totalAmount = 0;
        //     this.ruleForm.goodList.forEach(v=>{
        //         totalAmount += v.buycount*v.sell_price;
        //     });
        //     return totalAmount;
        // }
    },
    created(){
        this.ruleForm.goodsids = this.$route.params.ids;
        this.$axios.get(`site/validate/order/getgoodslist/${this.ruleForm.goodsids}`)
        .then(response=>{
            // console.log(response);
            let tempObj = {};
            response.data.message.forEach(v=>{
                v.buycount = this.$store.state.shopCartData[v.id];
                tempObj[v.id] = v.buycount;
                this.ruleForm.goodsAmount += (v.buycount*v.sell_price);
            })
            this.ruleForm.goodList = response.data.message;
            this.ruleForm.cargoodsobj = tempObj;
        })
    },
    beforeCreate() {
        //创建之前判断是否登录
        // this.$axios.get('site/account/islogin').then(response=>{
        //     // console.log(response);
        //     if(response.data.code == 'nologin'){
        //         this.$router.push('/index');
        //     }else{

        //     }
            
        // })
    }
}
</script>

<style>
img{
    width: 100px;
}
</style>