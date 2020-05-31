<template>
    <div class="replay">
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="订单号"
                    width="100"
                    prop="comment.book_id">
            </el-table-column>
            <el-table-column
                    label="酒店名"
                    width="180"
                    prop="hotel_name">
            </el-table-column>
            <el-table-column
                    label="预订房型"
                    width="100"
                    prop="room_type">
            </el-table-column>
            <el-table-column
                    label="客户名"
                    width="100"
                    prop="user_name">
            </el-table-column>
            <el-table-column
                    label="评论内容"
                    width="250"
                    prop="comment.comment_info">
            </el-table-column>
            <el-table-column
                    label="评分"
                    width="60"
                    prop="comment.comment_grade">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="标签"
                    width="100"
                    :filters="[{ text: '已回复', value: '已回复' }, { text: '未回复', value: '未回复' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.tag === '已回复' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.tag}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-popover
                            placement="top-start"
                            title="回复详情"
                            width="200"
                            trigger="hover"
                            :content="replyMsg">
                    <el-button
                            slot="reference"
                            v-show="scope.row.tag == '已回复'"
                            size="mini"
                            @click="handleView(scope.$index, scope.row)">查看</el-button></el-popover>
                    <el-button
                            size="mini"
                            @click="handleHuifu(scope.$index, scope.row)">回复</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

<!--        回复-->
        <div class="message">
            <el-dialog title="回复" :visible.sync="messageDialog">
                <div class="messagelist">
                    <dl v-for="(msg,index) in messages" :index="index">
                        <dt>
                            <img src="../../assets/img/my_head.png" style="width:45px">
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
                            <el-button type="text" size="small">删除</el-button>
                        </span>
                        </dd>
                    </dl>
                    <div class="wordsend">
                        <el-input placeholder="回复ta~" v-model="msgsend">
                            <el-button @click="subMessage" slot="append">提交</el-button>
                        </el-input>
                    </div>
                </div>
            </el-dialog>
        </div>


    </div>
</template>

<script>
    export default {
        name: "CommentManage",
        data() {
            return {
                tableData: [],//评论表
                search: '',
                adminId:null,

                //回复框
                messageDialog:false,
                currentUser:{
                    username:'tiger',
                    words:'xxxxx',
                    userimg:''
                },
                messages:[],
                msgsend:'',
                comment_grade:null,
                bookId:null,
                userId:null,
                roomid:null,
                commentid:null,
                comment:[],

                //回复查看
                replyMsg:'',
            }
        },
        created() {
            const _this = this;
            this.adminId = parseInt(window.sessionStorage.getItem('userId'));
            axios.get('/comment/comAdminList/'+this.adminId).then(resp =>{
                console.log(resp.data);
                _this.tableData = resp.data.data;
                for(let i=0;i<resp.data.data.length;i++){
                    let jsonStr = resp.data.data[i].comment.comment_reply;
                    if(null != jsonStr && "" != jsonStr){
                        _this.tableData[i].tag = '已回复';
                    }else{
                        _this.tableData[i].tag = '未回复';
                    }
                }
            })
        },
        methods: {
            //回复
            handleHuifu(index, row) {
                console.log(index, row);
                this.messageDialog = true;
                // this.commentid = row.comment.comment_id;
                this.comment = row.comment;
            },
            //评价弹出框
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
                var currentdatetime =
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
                var currentdate =
                    year +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate;
                return currentdate;
            },
            editUserwords(){},
            handleReply(index){
                this.messages[index].reply++;//回复数量
                this.msgsend = "回复@" + this.messages[index].username +" : ";
                this.messages[index].replywords = this.msgsend;
            },
            //评论发送
            subMessage(index){
                if(this.msgsend == ""){
                    this.$message({
                        type:"warning",
                        message:"请先输入回复内容！"
                    });
                }else{
                    let obj = {};//评论信息对象的容器
                    let obj1 = {};//存入数据库的评论信息对象的容器
                    obj.username = window.sessionStorage.getItem('userName');
                    obj1.user_id = this.comment.user_id;
                    obj.comment_grade = this.comment.comment_grade;
                    obj1.comment_grade = this.comment.comment_grade;
                    obj1.comment_info = this.comment.comment_info;
                    obj.userimg = this.currentUser.userimg;
                    obj.message = this.msgsend;
                    obj1.comment_reply = this.msgsend;
                    obj.time = this.Time();
                    obj1.comment_time = this.Time();
                    obj.reply = 0;
                    obj1.book_id = this.comment.book_id;
                    obj1.hotel_id = this.comment.hotel_id;
                    obj1.comment_id = this.comment.comment_id;
                    //将评论信息压入评论信息列表
                    this.messages.push(obj);
                    this.$message({
                        type:"success",
                        message:"回复成功！"
                    });
                    this.msgsend="";//清空发送框
                    axios.post('/comment/save',obj1).then(resp => {
                        console.log(resp)
                        window.location.reload();//动态刷新
                    })
                }
            },
            //删除
            handleDelete(index, row) {
                console.log(index, row);
                axios.delete('/comment/deleteById/'+row.comment.comment_id).then(resp => {
                    alert("删除成功");
                    console.log(resp);
                    window.location.reload();//动态刷新
                })
            },
            handleView(index,row){
                const _thas = this;
                axios.get('/comment/commentIdInfo/'+row.comment.comment_id).then(resp => {
                    console.log(resp)
                    _thas.replyMsg = resp.data.data.comment_reply;
                })
            },
            filterTag(value, row) {
                return row.tag === value;
            },
        },
    }
</script>

<style scoped>
    .messagelist{
        position: relative;
    }
    .messagelist .msguname{
        font-weight: bold;
        margin: 10px;
        position: absolute;
        /*top:-1px;*/
    }
    .messagelist .msgrate{
        margin: 10px;
        display: inline-block;
        width: 140px;
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
