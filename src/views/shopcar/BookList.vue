<template>
    <el-card class="ordermanage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部订单" name="first">
<!--                :data="orderData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
                <el-table
                        :data="orderData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        style="width: 100%">
<!--                    :data="orderData.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
                    <el-table-column
                            label="酒店名称"
                            prop="hotel_name"
                            width="160px">
                    </el-table-column>
                    <el-table-column
                            label="预订房型"
                            prop="room_type"
                            width="130px">
                    </el-table-column>
                    <el-table-column
                            label="预订数量"
                            width="100px">
                        <template slot-scope="scope">1间</template>
                    </el-table-column>
                    <el-table-column
                            label="预订时间"
                            prop="date">
                        <template slot-scope="scope">{{scope.row.book.book_start}}至{{scope.row.book.book_end}}</template>
                    </el-table-column>
                    <el-table-column
                            label="订单价格"
                            prop="price"
                            width="100">
                        <!--要使用{{}}展示时，需要用到template slot-scop属性才能获取元素值-->
                        <template slot-scope="scope">{{scope.row.book.book_price}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="tag"
                            label="标签"
                            width="100"
                            :filters="[{ text: '待支付', value: '待支付' }, { text: '已支付', value: '已支付' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.book.book_state === '待支付' ? 'danger' : 'success'"
                                    disable-transitions>{{scope.row.book.book_state}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    v-if="scope.row.book.book_state === '待支付'"
                                    size="mini"
                                    @click="handlePayfor(scope.$index, scope.row)">支付</el-button>
                            <el-button
                                    v-else
                                    size="mini"
                                    @click="handleReview(scope.$index, scope.row)">评价</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">退订</el-button>
                            <el-button
                                    size="mini"
                                    type="warning"
                                    @click="handleChange(scope.$index, scope.row)">换房</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--评价留言板-->
                <div class="message">
                    <el-dialog title="评价" :visible.sync="messageDialog">
                        <div class="messagelist">
                            <dl v-for="(msg,index) in messages" :index="index">
                                <dt>
                                    <img src="../../assets/img/my_head.png" style="width:45px">
                                    <span class="msguname">{{msg.username}}</span>
                                    <span class="msgrate"><el-rate
                                            v-model="msg.comment_grade"
                                            disabled
                                            show-score
                                            text-color="#ff9900"
                                            score-template="{value}"></el-rate></span>
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
                                <el-rate class="rate"
                                        v-model="comment_grade"
                                        show-score
                                        show-text
                                        text-color="#ff9900"
                                        score-template="{value}">
                                </el-rate>
                                <el-input class="rate"
                                        placeholder="或直接输入分值"
                                        v-model="comment_grade"
                                        clearable>
                                </el-input>
                                <el-input placeholder="感谢您的光临，请给我们给个评价吧~" v-model="msgsend">
                                    <el-button @click="subMessage" slot="append">提交</el-button>
                                </el-input>
                            </div>
                        </div>
                    </el-dialog>
                </div>
                <!-- 分页-->
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 20, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="orderData.length"
                        style="text-align:center">
                </el-pagination>
<!--                <el-pagination-->
<!--                        :page-size="20"-->
<!--                        :pager-count="11"-->
<!--                        layout="prev, pager, next"-->
<!--                        :total="200"-->
<!--                        @current-change="page"-->
<!--                        style="text-align:center">-->
<!--                </el-pagination>-->
            </el-tab-pane>
<!--            <el-tab-pane label="待付款" name="second">待付款</el-tab-pane>-->
<!--            <el-tab-pane label="待入住" name="third">待入住</el-tab-pane>-->
<!--            <el-tab-pane label="待评价" name="fourth">待评价</el-tab-pane>-->
<!--            <el-tab-pane label="退款/售后" name="five">退款/售后</el-tab-pane>-->
        </el-tabs>
    </el-card>
</template>

<script>
    export default {
        name: "OrderManage",
        data() {
            return {
                //分页
                currentPage:1, //初始页
                pagesize:10, // 每页的数据


                activeName: 'first',
                orderData: [
                    // {id:1,img:'',name:'多客连锁酒店',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'已付款'},
                    // {id:1,img:'',name:'如家连锁酒店',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'待付款'},
                    // {id:1,img:'',name:'苏宝连锁酒店',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'待入住'},
                    // {id:1,img:'',name:'多客连锁酒店',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'待评价'},
                    // {id:1,img:'',name:'多客连锁酒店',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'已付款'},
                ],
                search: '',

                //评价
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
            }
        },
        created() {
            const _this = this;
            //根据用户id查询该用户的订单
            let uid = parseInt(window.sessionStorage.getItem('userId'))
            axios.post('http://127.0.0.1:8099/book/bookIdlist/'+uid).then((resp)=>{
                console.log(resp)
                _this.orderData = resp.data.data;
                // for(let i=0;i<resp.data.data.length;i++)
                // {
                //     _this.orderData[i].hotel_name = resp.data.data[i].hotel_name;
                //     _this.orderData[i].room_type = resp.data.data[i].room_type;
                // }
            })
        },
        methods: {
            //分页
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize) //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage) //点击第几页
            },


            page(currentPage){
                alert(currentPage)
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            //支付
            handlePayfor(index,row){
                this.$router.push({
                    path: '/hotelPayfor',
                    query: {
                        roomId: row.book.room_id,
                        hotelId:row.hotel_id,
                    }
                })
            },
            //评价
            handleReview(index, row) {
                console.log(index, row);
                this.messageDialog = true;
                this.bookId = row.book.book_id;
                this.hotelId = row.hotel_id;
                this.userId = row.book.user_id;
                this.roomid = row.book.room_id;
            },
            //退订
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('真的要退吗，不再考虑一下了吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('/book/deleteById/'+row.book.book_id).then(resp => {
                        alert("退房成功");
                        console.log(resp);
                        window.location.reload();//动态刷新
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退订'
                    });
                });
            },
            //换房
            handleChange(index,row){
                this.$confirm('确定换房?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('/book/deleteById/'+row.book.book_id).then(resp => {
                        alert("退房成功");
                        console.log(resp);
                        this.$router.push({
                            path:'/hotelFind'
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
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
                    obj1.user_id = this.userId;
                    obj.comment_grade = this.comment_grade;
                    obj1.comment_grade = this.comment_grade;
                    //客户评分后，取出该酒店及房型的评分，加上新评分后取平均
                    // let data1 = {
                    //     'room_id':this.roomid,
                    //     'grade':this.comment_grade,
                    //     'hotel_id':this.hotelId
                    // }
                    // alert("room_id"+data1.room_id)
                    // alert(data1.grade)
                    // alert(data1.hotel_id)
                    // axios.get('/room/saveGrade',data1).then(resp => {
                    //     console.log(resp)
                    // })

                    obj.userimg = this.currentUser.userimg;
                    obj.message = this.msgsend;
                    obj1.comment_info = this.msgsend;
                    obj.time = this.Time();
                    obj1.comment_time = this.Time();
                    obj.reply = 0;
                    obj1.book_id = this.bookId;
                    obj1.hotel_id = this.hotelId;
                    obj1.room_id = this.roomid;
                    //将评论信息压入评论信息列表
                    this.messages.push(obj);
                    this.$message({
                        type:"success",
                        message:"回复成功！"
                    });
                    this.msgsend="";//清空发送框
                    axios.post('/comment/save',obj1).then(resp => {
                        console.log(resp)
                    })


                    axios.post('/room/saveGrade',obj1).then(resp => {
                        console.log(resp)
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .ordermanage{
        width:99%;
        margin:20px auto;
    }
    .rate{
        margin: 3px;
        width: 150px;
    }
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

