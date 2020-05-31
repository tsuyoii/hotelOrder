<template>
    <div class="message">
        <el-dialog title="留言板" :visible.sync="messageDialog">
<!--            <div class="userbar">-->
<!--                <span class="username" v-text="currentUser.username">-->
<!--                    <i class="icon-style icon-user-md"></i>-->
<!--                </span>-->
<!--                <p>-->
<!--                    <span class="userword" v-text="currentUser.words" contenteditable="false"></span>-->
<!--                    <i class="icon-style icon-edit" @click="editUserWords()"></i>-->
<!--                </p>-->
<!--            </div>-->
            <div class="messagelist">
                <dl v-for="(msg,index) in messages" :index="index">
                    <dt>
                        <img src="../../../assets/img/my_head.png" style="width:45px">
                        <span class="msguname">{{msg.username}}</span>
                        <span class="msgtime">
                            <i class="el-icon-time"></i>
                            {{msg.time}}
                        </span>
                    </dt>
                    <dd class="messagewords">
                        <i class="el-icon-edit-outline"></i>
                        {{msg.message}}
                    </dd>
                    <dd class="replybar">
                        <span>
                            <el-button type="text" size="small" @click="handleReply(index)">
                                回复( <strong>{{msg.reply}}</strong>)
                            </el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </span>
                    </dd>
                </dl>
                <div class="wordsend">
                    <el-input placeholder="请输入留言" v-model="msgsend">
                        <el-button @click="subMessage" slot="append">提交</el-button>
                    </el-input>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Message",
        data(){
            return{
                messageDialog:true,
                currentUser:{username:'tiger',words:'xxxxx',userimg:''},
                messages:[],
                msgsend:'',
            }
        },
        methods:{
            Time: function() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var hours =
                    date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var minutes =
                    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                var seconds =
                    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate =
                    year +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate +
                    " " +
                    hours +
                    ":" +
                    minutes +
                    ":" +
                    seconds;
                return currentdate;
            },
            editUserwords(){},
            handleReply(index){
                this.messages[index].reply++;//回复数量
                this.msgsend = "回复@" + this.messages[index].username +" : ";
                this.messages[index].replywords = this.msgsend;
            },
            subMessage(index){
                if(this.msgsend == ""){
                    this.$message({
                        type:"warning",
                        message:"请先输入回复内容！"
                    });
                }else{
                    let obj = {};//评论信息对象的容器
                    obj.username = this.currentUser.username;
                    obj.userimg = this.currentUser.userimg;
                    obj.message = this.msgsend;
                    obj.time = this.Time();
                    obj.reply = 0;
                    //将评论信息压入评论信息列表
                    this.messages.push(obj);
                    this.$message({
                        type:"success",
                        message:"回复成功！"
                    });
                    this.msgsend="";//清空发送框
                }
            }
        }
    }
</script>

<style scoped>
.messagelist{
    position: relative;
}
.messagelist .msguname{
    font-weight: bold;
    margin: 10px;
}
.messagelist .msgtime{
     font-weight: lighter;
     margin-top:10px;
    float: right;
 }
.messagelist .messagewords{
    /*margin-top:10px;*/
    margin-left: 55px;
}
    .replybar{
        float: right;
    }
dl:after{
    content: '';
    clear: both;
    display: block;
}
</style>
