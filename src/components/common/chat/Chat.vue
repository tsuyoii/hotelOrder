<template>
    <div>
        <el-card>
                        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin:0 30px">
                            <el-tab-pane label="消息" name="first">
                                <table>
                                    <tr v-for="item in messages" class="messtr">
                                        <td width="33%">
                                            <img src="../../../assets/img/my_head.png" width="60px"/>
                                        </td>
                                        <td><p style="margin: 3px">有人给你发来了消息，快<span @click="chat(item)" style="color: #409EFF;cursor: pointer">去看看</span>吧</p>
                                            <span style="color: #8c8c8c;font-size: small"></span>
                                        </td>
                                    </tr>
                                </table>
                            </el-tab-pane>
                            <el-tab-pane label="评论回复" name="second">
                                <table>
                                    <tr v-for="(item,indexreview) in reviewData" :key="indexreview" class="messtr">
                                        <td width="23%">
                                            <img src="../../../assets/img/my_head.png" width="60px"/>
                                        </td>
                                        <td><p style="margin: 3px">{{item.hotel_name}}
<!--                                            <span style="margin: 20px;padding:5px;border-radius:10px;border: #B3C0D1 1px solid;">  {{item.room_type}}</span>-->
                                            <el-tag style="margin-left: 20px;"
                                                    :key="item.room_type"
                                                    type="danger"
                                                    effect="plain">
                                                {{item.room_type}}
                                            </el-tag>
                                        </p>
                                            <p style="color: #8C8C8C;font-size: smaller">{{item.comment.comment_info}}</p>
                                            <span style="color: #8C8C8C;font-size: smaller"><div class="reply">店主回复：{{item.comment.comment_reply}}</div></span>
                                        </td>
                                    </tr>
                                </table>
                            </el-tab-pane>
                            <el-tab-pane label="通知" name="third">
                                <table>
                                    <tr v-for="item in tongzhiData" class="messtr">
                                        <td width="80%"><p>{{item.img}}</p><br>
                                            <span style="color: #8c8c8c;font-size: small">{{item.info}}</span>
                                        </td>
                                        <td>
                                            <el-tag
                                                    :key="item.img"
                                                    type="danger"
                                                    effect="plain">
                                                {{item.img}}
                                            </el-tag>
                                        </td>
                                    </tr>
                                </table>
                            </el-tab-pane>
                        </el-tabs>
        </el-card>
        <!--聊天-->
        <div class="chat">
            <el-dialog title="消息" :visible.sync="chatDialog">
<!--                <div class="header">-->
<!--                    <h3 class="hh">{{tittle}}</h3>-->
<!--                </div>-->
                <div class="main">
                    <div class="talkshow">
                        <div v-for="(msg,itemindex) in chatlist" :key="itemindex" class="talkbob">
                            <div  :class="msg.send_role=='user'?'atalk':'btalk'">
<!--                                                            <span>{{msg.name}}</span>-->
                                <span>{{msg.message_info}}</span>
<!--                                <img src="../../../assets/img/my_head.png" width="45px"/>-->
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
    </div>
</template>
<script>
    export default {
        name:'chat',
        data(){
            return{
                //列表
                messages:[],
                activeName: 'first',

                //聊天框
                tittle:'聊天界面',
                chatDialog:false,
                chatlist:[
                    // {user_id:11,message_info:''},//我说的话
                    // {user_id:1,message_info:'你好啊，有什么需要帮忙的吗'},//对方说的话
                ],
                aword:'',
                bword:'',
                role:'',
                msgitem:null,//用来记录messages中的item,是查看了哪个item,即user_id记录,


                //消息列表
                reviewData: [],

                //通知列表
                tongzhiData:[
                    {
                        date: '',
                        img: '入住提醒',
                        info: '您有订单即将开始，别忘了入住哦',
                    }, {
                        date: '',
                        img: '活动提醒',
                        info: '您收藏的星程酒店（北京清华大学东门店）发布了新活动，快去看看吧',
                    }, {
                        date: '',
                        img: '定价提醒',
                        info: '您选购的顾客定价房定价时间即将截止，快去定价吧',
                    }, {
                        date: '',
                        img: '订单提醒',
                        info: '恭喜你~  您选购的标准房已选购成功',
                    }
                ]
            }
        },
        created() {
            const _this = this;
            let user_id = parseInt(window.sessionStorage.getItem('userId'))
            //消息部分
            axios.get('/msg/hotelmsglist/'+user_id).then(res => {
                _this.messages = res.data.data;
                console.log(_this.messages)
            })

            //评论部分
            axios.get('/comment/comUserList/'+user_id).then(resp => {
                _this.reviewData = resp.data.data;
                console.log(resp.data.data);
            })
        },
        mounted(){
            this.$notify.info({
                title: 'Help',
                message: '管理所有活动通知'
            });
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            //列表

            //消息部分
            //聊天框
            chat(item) {
                this.msgitem = item;
                this.chatDialog = true;
                this.role = window.sessionStorage.getItem('role');
                const _this = this
                this.chatlist = [];//每次点进去查看聊天窗口时都先清空原来查看的其他用户的消息
                let user_id = parseInt(window.sessionStorage.getItem('userId'));
                let objj = {
                    'admin_id':item.toString(),
                    'user_id': user_id,
                    'send_role':this.role,
                }
                this.$http({
                    method: 'post',
                    url: '/msg/msgUserOrAdminlist',
                    data: objj
                }).then(function (res) {
                    for(let i in res.data.data){
                        _this.chatlist.push(res.data.data[i])
                    }
                    console.log( _this.chatlist)
                })

            },
            sendmsg1(){
                this.chatlist.push({admin_id:this.msgitem,message_info:this.aword,send_role:'user'});
                let objjj = {}
                objjj.send_role = window.sessionStorage.getItem('role');
                objjj.admin_id = this.msgitem;
                objjj.user_id = parseInt(window.sessionStorage.getItem('userId'));
                objjj.message_info = this.aword;
                this.aword="";
                // alert(typeof this.msgitem);
                // alert("111")
                // alert(typeof JSON.stringify(this.msgitem))
                axios.post('/msg/save',objjj).then(resp => {
                    console.log(resp)
                })
            },


        }
    }
</script>

<style scoped>
    .messtr{
        border-bottom: 1px solid #B3C0D1;
        height: 100px;
        width: 90%;
    }
    tr,td{
        padding: 10px;
        margin: 20px;
    }
    .reply{
        display: inline-block;
        background-color: #e9ecfb;
        padding: 7px 15px;
        border-radius: 10px;
    }

    .Message /deep/ .el-timeline-item__node--large{
        left: -17px;
        width: 45px;
        height: 45px;
        background-color:transparent;
    }
    .Message /deep/ .el-timeline-item__timestamp{
        color: white;
        /*width: 70%;*/
        line-height: 3;
        font-size: 17px;
        margin-left: 20px;
    }
    .Message{
        overflow:auto;
        width:95%;
        height: 100%;
        position: absolute;
        top: 13%;
        left: 5%;
        border-radius: 6px;
        background-color:transparent;
    }
    ::-webkit-scrollbar { width: 5px;}
    ::-webkit-scrollbar-track-piece { background-color: #ffffff;}
    ::-webkit-scrollbar-thumb { height: 30px; background-color: rgb(192, 192, 192); border-radius: 3px;}



    .hh{
        font-weight: normal;
        line-height: 50px;
        position: relative;
        top:-20px;
    }
    .chat{
    }
    .header{
        border: 1px solid #B3C0D1;
        border-radius: 5px;
        text-align: center;
        /*width: 90%;*/
        height: 50px;
        line-height: 50px;
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




<!--<template>-->
<!--    <div class="note" >-->
<!--        <div class="message">-->
<!--            &lt;!&ndash; <v-input ></v-input> &ndash;&gt;-->
<!--            <div class="input-con">-->
<!--                <span>昵称:</span>-->
<!--                <input type="text" :value1="value1" @input="updateValue" v-model="username"/>-->
<!--            </div>-->
<!--            &lt;!&ndash; <v-textarea  ref="message"></v-textarea> &ndash;&gt;-->
<!--            <div class="input-con">-->
<!--                <span>留言内容:</span>-->
<!--                <textarea :ref="message"  v-model="message" type="text" :value2="value2"  @input="updateValue"  placeholder="请输入留言内容"></textarea>-->
<!--            </div>-->
<!--            <div class="btn-con">-->
<!--                <input @click="handleSend" type="button" class="btn" value="发布"/>-->
<!--            </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; <v-list : ></v-list> &ndash;&gt;-->
<!--        <div class="list" list="list" @reply="handleReply">-->
<!--            <div  v-if="this.list.length">-->
<!--                <div v-for="(item, index) in list" :key="index" class="list-item">-->
<!--                    <div class="span-con">-->
<!--                        <span>{{item.name}}:</span>-->
<!--                    </div>-->
<!--                    <div class="list-msg">-->
<!--                        <div>{{item.message}}</div>-->
<!--                        <div class="list-reply">-->
<!--                            <a @click="listChange(index)" >回复</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div v-if="!this.list.length" class="list-nothing">-->
<!--                留言列表为空-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--    // import $ from "jquery";-->
<!--    // import {setCookie,getCookie}from '../js/cookieUtil.js'-->
<!--    // import vInput from '../components/vInput.vue'-->
<!--    // import vTextarea from '../components/vTextarea.vue'-->
<!--    // import vList from '../components/vList.vue'-->
<!--    export default {-->
<!--        name:'chat',-->
<!--        data () {-->
<!--            return {-->
<!--                username: '',-->
<!--                message: '',-->
<!--                // list: [],-->
<!--                message:''-->
<!--            }-->
<!--        },-->
<!--        // components: {-->
<!--        //   vInput,-->
<!--        //   vTextarea,-->
<!--        //   vList-->
<!--        // },-->
<!--        props: {-->
<!--            value1: {-->
<!--                type: [String, Number],-->
<!--                default: ''-->
<!--            },-->
<!--            value2: {-->
<!--                type: String,-->
<!--                default: ''-->
<!--            },-->
<!--            list: {-->
<!--                type: Array,-->
<!--                default: function () {-->
<!--                    return []-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            handleSend: function () {-->
<!--                if (this.username === '') {-->
<!--                    window.alert('请输入昵称')-->
<!--                    return-->
<!--                }-->
<!--                if (this.message === '') {-->
<!--                    window.alert('请输入留言内容')-->
<!--                    return-->
<!--                }-->
<!--                // 数组list存储了所有的留言内容，通过函数给list添加一项留言数据，添加成功后把文本框置空-->
<!--                this.list.push({-->
<!--                    name: this.username,-->
<!--                    message: this.message-->
<!--                })-->
<!--                this.message = ''-->
<!--            },-->
<!--            handleReply: function (index) {-->
<!--                var name = this.list[index].name-->
<!--                this.message = '回复@' + name + ':'-->
<!--                //this.$refs.message.thisFocus()-->
<!--                this.$emit('reply', index)-->
<!--            },-->
<!--            updateValue: function (event) {-->
<!--                this.$emit('input', event.target.value)-->
<!--            },-->
<!--            listChange: function (index) {-->
<!--                this.handleReply(index)-->
<!--            }-->
<!--            // thisFocus(){-->
<!--            //   $('#mesbox').focus();-->
<!--            // }-->
<!--        },-->



<!--        //  mounted(){-->
<!--        //   if(this.isLogin == undifined||this.isLogin=="")-->
<!--        //   {-->
<!--        //     this.$router.replace('/login');-->
<!--        //   }else{-->
<!--        //     //执行后续操作-->
<!--        //     this.phone = getCookie("phone");-->
<!--        //   }-->
<!--        //  },-->
<!--        //  computed:{-->
<!--        //    isLogin(){-->
<!--        //      this.userID = getCookie("userID");-->
<!--        //      return this.userID;-->
<!--        //    }-->
<!--        //  }-->



<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .message {-->
<!--        display: flex;-->
<!--        flex-direction: column;-->
<!--    }-->
<!--    .message div{-->
<!--        margin-bottom: 12px;-->
<!--        flex-direction: row;-->
<!--    }-->
<!--    .message input:focus,-->
<!--    .message textarea:focus{-->
<!--        border: 1px solid #3399ff;-->
<!--        border-radius: 5px;-->
<!--    }-->
<!--    .message .btn-con{-->
<!--        text-align: center;-->
<!--        display: inline-block;-->
<!--    }-->
<!--    .message .btn{-->
<!--        padding: 1px 5px;-->
<!--        border: 1px solid #39f;-->
<!--        border-radius: 4px;-->
<!--        color: #fff;-->
<!--        background-color: #39f;-->
<!--        cursor: pointer;-->
<!--        outline: none;-->
<!--    }-->
<!--    .input-con{-->
<!--        display: flex;-->
<!--        flex-direction: row;-->
<!--        justify-content: center;-->
<!--    }-->
<!--    span{-->
<!--        width: 100px;-->
<!--        display: inline-block;-->
<!--        text-align: right;-->
<!--        vertical-align: middle;-->
<!--    }-->
<!--    input{-->
<!--        border: 1px solid #e6e6ee;-->
<!--        padding: 4px 5px;-->
<!--        line-height: 24px;-->
<!--        height: 24px;-->
<!--        border-radius: 5px;-->
<!--        width: 300px;-->
<!--    }-->
<!--    .input-con{-->
<!--        display: flex;-->
<!--        flex-direction: row;-->
<!--        justify-content: center;-->
<!--    }-->
<!--    span{-->
<!--        width: 100px;-->
<!--        display: inline-block;-->
<!--        text-align: right;-->
<!--        vertical-align: top;-->
<!--    }-->
<!--    textarea{-->
<!--        border: 1px solid #e6e6ee;-->
<!--        padding: 4px 5px;-->
<!--        line-height: 24px;-->
<!--        border-radius: 5px;-->
<!--        width: 300px;-->
<!--        height: 100px;-->
<!--    }-->
<!--    .list{-->
<!--        margin: 50px 20px 0 20px;-->
<!--    }-->
<!--    .list-item{-->
<!--        display: flex;-->
<!--        flex-direction: row;-->
<!--        padding: 10px;-->
<!--        border-bottom: 1px solid #e3e8ee;-->
<!--        overflow: hidden;-->
<!--        flex: 5;-->
<!--    }-->
<!--    .span-con{-->
<!--        flex: 1;-->
<!--        margin-right: 10px;-->
<!--        color: #39f;-->
<!--    }-->
<!--    .list-msg{-->
<!--        flex: 9;-->
<!--        text-align: justify;-->
<!--    }-->
<!--    .list-msg .list-reply{-->
<!--        text-align: right-->
<!--    }-->
<!--    .list-msg a:hover{-->
<!--        color: #39f-->
<!--    }-->
<!--    .list-nothing{-->
<!--        text-align: center;-->
<!--        color: #9ea7b4;-->
<!--        padding: 20px;-->
<!--    }-->
<!--</style>-->



