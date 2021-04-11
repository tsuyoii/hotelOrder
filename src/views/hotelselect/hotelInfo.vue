<template>
    <div class="hotelInfo">
        <div class="describe">
            <span style="font-size:xx-large">{{title}}</span>
            <span style="margin-left: 20px">{{ type}}</span>
            <span style="margin-top: 20px">{{address}}</span>
            <a href="#ditu"><i class="el-icon-location" style="font-size:medium;color:#87c38f;">查看地图</i></a>
            <div  style="height: 320px">
                <!-- 轮播图-->
                <div style="width:90%;height: 320px;">
                    <el-carousel indicator-position="outside">
                            <el-carousel-item v-for="url in urls" :key="url" v-if="url">
                                <img :src="'data:image/jpeg;base64,'+url" fit="contain" style="height: 100%;width: 100%"/>
                            </el-carousel-item>
                    </el-carousel>
                </div>
                <!--视频展示-->
<!--                注意：存入数据库时我已经加上了'data:video/mp4;base64,'前缀，所以取出时不需要再加，否则就无法展示-->
<!--                注意；这里有个坑，由于父子组件传值时是异步获取数据，可能出现父组件还没传值，子组件就渲染完成的情况，这时
                            子组件就无法获取值，因此加入了v-if的判断，当videopath有值了才渲染子组件-->
                <dplayer class="player-video" :path="videopath" v-if="videopath"></dplayer>
<!--                <video controls autoplay :src="'data:video/mp4;base64,'+ videopath"></video>-->
            </div>
        </div>
        <div class="maodian">
            <a href="#gailan">概览</a>
            <a href="#ditu">位置</a>
            <a href="#fangxing">房型</a>
            <a href="#pinglun">评论</a>
        </div>
        <hr style="height: 3px;background-color:lightgrey">
        <!-- 酒店详情介绍-->
        <h3 id="gailan">概览</h3>
        <div style="float: left;width:70%;margin: 20px 0">
            <el-card shadow="never">
                <!--评分-->
                <el-rate
                        v-model="totalgrade"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                </el-rate>
            </el-card>
            <el-card shadow="hover" class="hotelinfo">
                <div class="sum-score-circle" style="font-family:MThom,X-LocaleSpecific-Sans,Arial,
                                                            sans-serif;border-radius:100%;background:#3d3e3e;
                                                            margin-bottom:8px;display:-webkit-box;display:flex;
                                                            -webkit-box-align:center;align-items:center;
                                                            -webkit-box-pack:center;justify-content:center;
                                                            color:#fff;float:right;right:120px;border-radius:50px;
                                                            width:100px;height:100px;text-align:center;
                                                            font-size:xx-large;">超赞</div>
                <!--详情介绍-->
                <p><b>电话：010-68853008</b></p>
                <span>2014年装修   2014年开业</span><br>
                <p>酒店3月26日晚22点至凌晨2点停电检修，停电期间无法供应热水，为您带来的不便，深感抱歉 交通便利，距离苹果园地铁站店仅1000米，步行10分钟，是距地铁口近的一家酒店，隔壁既是喜隆多国际购物中心，内设永辉超市、保利影城、纯K KTV，星巴克、肯德基、呷哺呷哺等各种吃喝玩乐、购物休闲场所！性价比高<br></p>
                <span><i class="el-icon-suitcase">无线上网</i>   </span>
                <span><i class="el-icon-suitcase">有线上网</i>   </span>
                <span><i class="el-icon-suitcase">行李寄存</i>   </span>
                <span><i class="el-icon-suitcase">热水洗浴</i>   </span><br>
                <span>{{info}}</span>
                <div class="tag-group">
                    <el-tag
                            v-for="item in style"
                            :key="item.label"
                            :type="item.type"
                            effect="light"
                            style="margin: 5px;">
                        {{ item.label }}
                    </el-tag>
                </div>
                <a href="#ditu"><i class="el-icon-location" style="font-size:medium;color:#87c38f;float:right;">查看地图</i></a><br>
            </el-card>
        </div>
        <!--侧栏搜索框-->
        <el-card style="float: right;margin-top:20px;width: 28%">
            <span class="search1">
                住店详情<br>
                <el-date-picker
                        v-model="value1"
                        type="daterange"
                        style="margin-top: 10px;width: 100%"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker><br>
                <el-input prefix-icon="el-icon-user" placeholder="住店人数" style="margin-top: 10px;"  @change="handleChange" :min="1" :max="10" v-model="peopleNum"></el-input><br>
                <el-button type="primary" plain style="margin-top: 10px;" @click="chat">联系商家</el-button>
                <el-button type="warning" plain style="margin-top: 10px;">收藏酒店</el-button><br>
            </span><br>

            <span class="search1">
                住店须知<br>
                <p>入住日当天12点前可免费取消，当前已过最晚可取消时间（4月6日12点），订单确认后不可取消/变更，如未入住，酒店将扣除全额房费</p>
                <el-button type="success" plain style="margin-top: 10px;" @click="chat">联系商家</el-button>
                <el-button type="warning" plain style="margin-top: 10px;">收藏酒店</el-button><br>
            </span><br>
        </el-card>

        <!--聊天-->
        <div class="chat">
            <el-dialog title="消息" :visible.sync="chatDialog">
<!--                <div class="header">-->
<!--                    <h3 class="hh">{{title}}</h3>-->
<!--                </div>-->
                <div class="main">
                    <!--            这里的内容需要用循环写入
                                        1.把每个人说的话单独放在一个数组中
                                        2.点击按钮，将数据push进入该对象说的话的数组中
                                        3.输出：自己的在右边
                                                对方的在左边-->
                    <div class="talkshow">
                        <div v-for="(msg,itemindex) in chatlist" :key="itemindex" class="talkbob">
                            <div  :class="msg.send_role==role?'atalk':'btalk'">
                                <!--                            <img :src="msg.img" width="45px"/>-->
                                <!--                            <span>{{msg.name}}</span>-->
                                <span>{{msg.message_info}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sendbox">
                    <el-input v-model="aword" @keyup.enter="sendmsg1">
                        <el-button @click="sendmsg1" slot="append">发送</el-button>
                    </el-input>
                </div>
            </el-dialog>
        </div>

        <!--地图-->
        <h3 id="ditu" style="clear: both">位置</h3>
        <el-card style="width: 70%">
           <BaiDuMap :addr="address" v-if="address"></BaiDuMap>
        </el-card>
        <!-- 酒店房型列表展示-->
        <h3 id="fangxing">房型</h3>
        <table class="box-card" shadow="hover" style="margin-top: 10px;">
            <tr v-for="item in roomTable" :key="item" class="textitem">
                <td><img :src="'data:image/jpeg;base64,'+item.room_img" class="image"></td>
                <td class="info">
                    <el-avatar size="small" style="color:white;text-align:center;background-color: #3b4f62;">{{item.room_id}}</el-avatar>
                    <span style="position:relative;font: large bold;margin-left: 5px;top:-8px">{{ item.room_type }}</span>
                    <span style="margin-left: 20px" v-show="item.isCustomPrice">
                        <el-tag
                                key="定价房"
                                type="warning"
                                effect="plain">定价房
                        </el-tag>
                    </span>
                    <span style="font:large bold;float:right;color: #ff9900">￥{{ item.room_price }}元<br>
                        <el-rate
                                    v-model="item.room_grade"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}">
                        </el-rate>
                    </span><br>
                    <br>
                    <div class="shebei">
                        <i class="el-icon-dish">含餐饮  </i><span>       </span>
                        <i class="el-icon-suitcase">行李寄存  </i><span>       </span>
                        <i class="el-icon-suitcase">独立卫浴  </i><span>       </span>
                        <i class="el-icon-chat-line-square">评论</i>
                        <el-button  plain style="z-index:1;font-size:medium;background-color:#8FBC8F;border:0px;color:white;float:right;margin-top:-5px;margin-right: 10px" size="small" @click="order(item)">预订</el-button><br>
                        <el-button style="z-index:1;font-size:medium;color:#87c38f;float:right;margin-top:-19px;margin-right:10px" size="small">查看</el-button><br>
                        <hr style="position: absolute;top:-20px">
                        <i class="el-icon-user">可住{{item.room_capacity}}人  </i><span>       </span>
                        <i class="el-icon-help">面积{{item.room_size}}平方  </i>
                    </div>
                </td>
            </tr>
        </table>
        <!--评论-->
        <h3 id="pinglun">评论</h3>
        <el-card class="page-card" style="width:70%;margin:20px 0;">
            <div class="react-root" id="J-comments">
                <div class="comment-container" id="productCommentsList" data-reactroot="">
                    <div itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
                        <div class="comment-header">
                            <div class="sum-score">
                                <div class="sum-score-circle" itemprop="totalgrade">{{totalgrade}}</div>
                            </div>
                            <div class="sum-description">
                                <div class="text-m-bold text-color-deep">超赞</div>
                                <button class="rating-stars mt-2" disabled="">
                                    <i class="rating-star stared" style="width:100%"></i>
                                    <i class="rating-star unstared"></i>
                                </button>
                            </div>
                            <ul class="score-chart">
                                <li>
                                    <div class="score-chart-item green">
                                        <div class="score">4.7</div>
                                        <div class="score-bg" style="height:95%"></div>
                                    </div>
                                    <div class="score-chart-category">卫生</div>
                                </li>
                                <li>
                                    <div class="score-chart-item green">
                                        <div class="score">4.1</div>
                                        <div class="score-bg" style="height:100%"></div>
                                    </div>
                                    <div class="score-chart-category">环境</div>
                                </li>
                                <li>
                                    <div class="score-chart-item green">
                                        <div class="score">4.3</div>
                                        <div class="score-bg" style="height:95%"></div>
                                    </div>
                                    <div class="score-chart-category">位置</div>
                                </li>
                                <li>
                                    <div class="score-chart-item green">
                                        <div class="score">4.9</div>
                                        <div class="score-bg" style="height:100%"></div>
                                    </div>
                                    <div class="score-chart-category">服务</div>
                                </li>
                            </ul>
                        </div>
                        <div class="hr mt-4"></div>
                    </div>
                    <div class="comment-list mt-4">
                        <div class="comment-content-item"  v-for="ritem in review" :key="ritem">
                            <img class="avatar" :src="'data:image/jpeg;base64,'+ritem.user_img" alt="用户头像" v-if="ritem.user_img!=null">
                            <img class="avatar" src="../../assets/img/my_head.png" alt="用户头像" v-else>
                            <div class="content">
                                <div class="text-deep">{{ritem.user_name}}</div>
                                <div class="text-weak mt-1">
                                    <button class="rating-stars " disabled="">
                                        <i class="rating-star stared" style="width: 100%;"></i>
                                        <i class="rating-star unstared"></i>
                                    </button>
                                    {{ritem.comment.comment_time}}发布
                                </div>
                                <div class="mt-3 comment-content-item__tags">
                                    <div class="base-tag skyblue normal">
                                        <span class="tag-content">{{ritem.room_type}}</span>
                                    </div>
                                </div>
                                <div class="mt-3 comment-content-item__body">
                                    {{ritem.comment.comment_info}}
                                </div>
                                <div class="comment-content-item__reply">
                                    房东回复：{{ritem.comment.comment_reply}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comment-container__footer">
                        <div class="comment-container__more-btn">展开更多评价
                            <svg class="mt-icon" aria-hidden="true" style="font-size: 10px; color: inherit;">
                                <use xlink:href="#icon-phx-arrow-down-cricle"></use>
                            </svg>
                        </div>
                        <div class="comment-container__collapse-btn">收起</div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import BaiDuMap from "../../components/common/baidumap/BaiDuMap";
    import dplayer from "../../assets/video/dplayer";
    export default {
        name: "hotelinfo",
        components:{
            dplayer,
            BaiDuMap
        },
        data(){
            return{
                adminId:0,
                //选择的房间编号
                roomId:0,
                //选择的酒店编号
                hotelId:0,
                title:'如家酒店',
                type:'经济型',
                address:'',
                totalgrade:4.3,
                value1:'',
                videopath:'',
                urls: [
                    // 'hotel2',
                    // 'hotel3',
                    // 'hotel4',
                    // 'hotel5',
                    // 'hotel6',
                    // 'hotel7',
                    // 'hotel8',
                    // 'hotel9',
                    // 'hotel10',
                ],
                roomTable:[
                    // {id:1,type:'标准间',state:0,size:15,isCustomPrice:true,capacity:2,grade:3.7,price:127},
                    // {id:2,type:'商务大床房',state:0,size:15,isCustomPrice:true,capacity:2,grade:3.7,price:133},
                    // {id:3,type:'标准大床房',state:-1,size:13,isCustomPrice:false,capacity:2,grade:3.7,price:133},
                    // {id:4,type:'大床房',state:0,size:18,isCustomPrice:false,capacity:2,grade:3.7,price:133},
                    // {id:5,type:'高级大床房',state:1,size:15,isCustomPrice:true,capacity:2,grade:3.7,price:133},
                    // {id:6,type:'钟点房',state:0,size:11,isCustomPrice:false,capacity:2,grade:3.7,price:133}
                ],
                style: [
                { type: '', label: '钟点房' },
                { type: 'success', label: '大床房' },
                { type: 'info', label: '高级大床房' },
                { type: 'danger', label: '四人间' },
                { type: 'warning', label: '顾客定价房' }
            ],
                review:[
                    {name:'_****6',date:'2020.04.01',type:'大床房',message:'民宿老板人超级好,房间也特别好看,摇床太有少女感了,位置也好找,就在万达边上,下次来还会入住的',reply:'哈哈哈哈感谢您的光临拍的照片美呆！祝您天天开心～'},
                    {name:'_****6',date:'2020.04.01',type:'大床房',message:'民宿老板人超级好,房间也特别好看,摇床太有少女感了,位置也好找,就在万达边上,下次来还会入住的',reply:'哈哈哈哈感谢您的光临拍的照片美呆！祝您天天开心～'},
                    {name:'_****6',date:'2020.04.01',type:'大床房',message:'民宿老板人超级好,房间也特别好看,摇床太有少女感了,位置也好找,就在万达边上,下次来还会入住的',reply:'哈哈哈哈感谢您的光临拍的照片美呆！祝您天天开心～'},
                    {name:'_****6',date:'2020.04.01',type:'大床房',message:'民宿老板人超级好,房间也特别好看,摇床太有少女感了,位置也好找,就在万达边上,下次来还会入住的',reply:'哈哈哈哈感谢您的光临拍的照片美呆！祝您天天开心～'},
                    {name:'_****6',date:'2020.04.01',type:'大床房',message:'民宿老板人超级好,房间也特别好看,摇床太有少女感了,位置也好找,就在万达边上,下次来还会入住的',reply:'哈哈哈哈感谢您的光临拍的照片美呆！祝您天天开心～'},
                    {name:'_****6',date:'2020.04.01',type:'大床房',message:'民宿老板人超级好,房间也特别好看,摇床太有少女感了,位置也好找,就在万达边上,下次来还会入住的',reply:'哈哈哈哈感谢您的光临拍的照片美呆！祝您天天开心～'},
                    {name:'_****6',date:'2020.04.01',type:'大床房',message:'民宿老板人超级好,房间也特别好看,摇床太有少女感了,位置也好找,就在万达边上,下次来还会入住的',reply:'哈哈哈哈感谢您的光临拍的照片美呆！祝您天天开心～'},
                ],
                value:4.3,
                activeName: 'second',
                peopleNum:'',

                //聊天
                chatDialog:false,
                chatlist:[
                    // {user_id:11,message_info:''},//我说的话
                    // {user_id:1,message_info:'你好啊，有什么需要帮忙的吗'},//对方说的话
                ],
                aword:'',
                bword:'',
                role:'',
            }
        },
        created() {
            this.hotelId = this.$route.query.hotelId;
            const _this = this;
            axios.get('/hotel/hotelIdInfo/'+_this.hotelId).then(resp => {
                console.log(resp);
                _this.title = resp.data.data.hotel_name;
                _this.type = resp.data.data.hotel_type;
                _this.address= resp.data.data.hotel_address;
                _this.info = resp.data.data.hotel_info;
                _this.totalgrade = resp.data.data.hotel_grade;
                _this.adminId = resp.data.data.admin_id;
                _this.videopath =resp.data.data.hotel_video;
                // alert(_this.videopath)
                //有多张图片时，取第一张作为封面，存入时添加,分隔，取出时通过split方法取
                    let imgsa = resp.data.data.hotel_img
                    _this.urls = (imgsa || "").split(',');//传过来可能有空值
            })
            axios.get('/room/roomlist/'+_this.hotelId).then(resp => {
                console.log(resp);
                _this.roomTable = resp.data.data;
                if(_this.roomTable.room_type == "顾客定价房"){
                    _this.roomTable.isCustomPrice = true;
                }
            })
            axios.get('/comment/comHotelList/'+_this.hotelId).then(resp => {
                console.log(resp.data.data)
                _this.review = resp.data.data
                // if(_this.review.user_img == null){
                //
                // }
            })
        },
        methods:{
            handler ({BMap, map}) {
                console.log(BMap, map)
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 15
            },
            order(item){
                if (item.room_state == "空闲") {
                    if(item.room_type == "定价房") {
                        alert('此房间为定价房，可先填写订单，入住离开后再付款')
                    }
                    this.$router.push({
                        path: '/hotelPayfor',
                        query: {
                            roomId: item.room_id,
                            hotelId: this.hotelId,
                        }
                    })
                    alert("即将跳转到支付页面")
                } else {
                    alert("抱歉！该房间已预订")
                }
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleChange(value) {
                console.log(value);
            },


            //聊天
            //展示聊天记录
            chat(){
                this.role = window.sessionStorage.getItem('role');
                this.chatDialog = true;
                const _this = this
                let user_id = window.sessionStorage.getItem('userId');
                let objj = {
                    'user_id': user_id,
                    'hotel_id': _this.hotelId
                }
                this.$http({
                    method: 'post',
                    url: '/msg/msglist',
                    data: objj
                }).then(function (res) {
                    for(let i in res.data.data){
                        _this.chatlist.push(res.data.data[i])
                    }
                    console.log( _this.chatlist)
                })
            },
            sendmsg1(){
                this.chatlist.push({user_id:11,message_info:this.aword,send_role:'user'});
                let objjj = {}
                    objjj.send_role = window.sessionStorage.getItem('role');
                    objjj.user_id = parseInt(window.sessionStorage.getItem('userId'));
                    objjj.admin_id = parseInt(this.adminId);
                    objjj.message_info = this.aword;
                this.aword="";
                axios.post('/msg/save',objjj).then(resp => {
                    console.log(resp)
                })
            },
            // sendmsg2(){
            //     this.chatlist.push({user_id:1,message_info:this.bword});
            // },
        }
    }
</script>
<style scoped>
/* 评论样式*/
    @import "//s3plus.meituan.net/v1/mss_65766da973d14523b3d781fe3ac2bbac/www-assets/views/product-detail/product-detail-v931eef9b.css";
    @import "//s3plus.meituan.net/v1/mss_65766da973d14523b3d781fe3ac2bbac/www-assets/1-vbafb26ae.css";
    .maodian{
        font-size: large;
    }
    h3{
        color: #3d3e3e;
        font-size: large;
        font-weight: normal;
    }
    a{
        color:#3d3e3e;
        margin-right:10px;
    }
    a:hover{
        color: #409EFF;
        margin-right: 10px;
    }
    .el-divider{
        margin: 10px auto;
    }
    .float-box{
        width: 80px;
        height: 150px;
        margin-top:-170px;
        margin-left: 500px;
        z-index: 1;
        background-color: rgba(38,34,34,0.8);
        color: white;
        font-size: smaller;
    }
    .player-video{
        width:46%;
        float: right;
        margin-top: -320px;
        height: 300px;
    }
    .hotelInfo{
        height: auto;
        overflow: hidden;
    }
    .describe{
        height: 370px;
    }
    .info{
        width: 100%;
        height: 125px;
        float: right;
        /*left:20%;*/
        /*padding: 15px;*/
    }
    p{
        font-size: small;
    }
    span{
        padding-right: 10px;
    }
    .info span{
        font-size: small;
        margin-top: 15px;
    }
/*    这里根据不同的图片需要调整大小，该问题待解决*/
    .el-carousel{
        width: 590px;
        height: 330px;
        border-radius: 2px;
        z-index: 0;
    }
    .el-carousel__item {
        color: #475669;
        font-size: 18px;
        /*opacity: 0.75;*/
        line-height: 300px;
        margin: 0;
        z-index: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .textitem{
        height: 100px;
    }
    .image{
        height: 100px;
        margin: 20px;
        width: 70%;
    }
    table{
        width: 70%;
        margin-bottom: 20px;
        /*border: 1px solid rgb(235,238,245);*/
        border-radius: 5px;
        padding: 20px;
        /*background-color: white;*/
        border:1px solid #e4e7f6;
        /*border-radius: 2px;*/
        box-shadow:3px 3px 5px rgba(195, 195, 195, 0.3);
        background-color: white;
        /*border-collapse: collapse;*/
    }
    td{
        /*border-bottom: 1px solid rgb(235,238,245);*/
        /*border: 1px solid #ff9900;*/
        width:30%;
    }
    tr{
        border-bottom: 1px solid rgb(235,238,245);
    }
    .timeline{
        margin: 20px 0;
    }
    .shebei{
        margin-top: 10px;
        font-weight: lighter;
        font-size: small;
    }
.el-carousel__item{
    /*background-color: #d3dce6;*/
    width: 90%;
}
.player-video{
    width: 49%;
    float: right;
    margin-top: -320px;
    height: 300px;
}

.hh{
    font-weight: normal;
    line-height: 50px;
}
.chat{
}
.header{
    border: 1px solid #B3C0D1;
    border-radius: 5px;
    text-align: center;
    /*width: 90%;*/
    height: 50px;
    margin: 0 auto;
}
.main{
    height: 300px;
    overflow-y: auto;
}
.atalk{
    float: right;
    text-align: center;
    margin: 10px;
    padding: 5px 10px;
    background-color: #ededf4;
    border: 1px solid ghostwhite;
    border-radius: 10px;
}
.talkbob:after{
    content: "";
    display: block;
    clear: both;
}
.btalk{
    float: left;
    text-align: center;
    margin: 10px;
    padding: 5px 10px;
    background-color: #ededf4;
    border: 1px solid ghostwhite;
    border-radius: 10px;
}
</style>
