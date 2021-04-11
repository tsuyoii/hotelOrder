<template>
    <div class="custom-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="房价统计" name="first">
                <!--侧栏温馨提示-->
                <el-card style="float: right;margin-top:20px;width: 28%">
                    <span class="search1">
                        <h3>温馨提示</h3><br>
                        <p>酒店决定该房以最终定价进行收费，酒店给出参考价格，进行评价参考,如未按时定价，将按原价自动扣款</p>
                    </span><br>

                    <span class="search1">
                        <h3>住店须知</h3><br>
                        <p>入住日当天12点前可免费取消，如已过最晚可取消时间（入住日晚12点），订单确认后不可取消/变更，如未入住，酒店将扣除全额房费</p>
                    </span><br>
                </el-card>

                <table class="box-card" shadow="hover" style="margin-top: 10px;">
                    <tr v-for="(item,index) in roomTable" :key="item" class="textitem">
                        <td><img :src="'data:image/jpeg;base64,'+item.room_img" class="image"></td>
                        <td class="info">
                            <el-avatar size="small" style="color:white;text-align:center;background-color: #3b4f62;">{{index+1}}</el-avatar>
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
                                <el-button style="z-index:1;font-size:medium;color:#87c38f;float:right;margin-top:-19px;margin-right:10px" size="small" @click="IntoRoom(item)">查看</el-button><br>
                                <el-button style="z-index:1;font-size:medium;color:#87c38f;float:right;margin-top:-33px;margin-right:10px" size="small" @click="PriceDetail(item)">详情</el-button><br>
                                <hr style="position: absolute;top:-20px">
                                <i class="el-icon-user">可住{{item.room_capacity}}人  </i><span>       </span>
                                <i class="el-icon-help">面积{{item.room_size}}平方  </i>
                            </div>
                        </td>
                    </tr>
                </table>

                <!--查看定价详情-->
                <el-dialog title="历史定价详情" :visible.sync="DetaildialogVisible">
                    <el-table :data="appraiseData">
                        <el-table-column property="book.book_end" label="日期" width="150"></el-table-column>
                        <el-table-column property="user_name" label="姓名" width="200"></el-table-column>
                        <el-table-column property="book.book_appraise" label="定价"></el-table-column>
                    </el-table>
                </el-dialog>

            </el-tab-pane>
            <el-tab-pane label="我的定价房" name="second">
                <!--我居住的定价房-->
                <el-table
                        :data="orderData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="酒店名称"
                            prop="hotel_name"
                            width="160px">
                    </el-table-column>
                    <el-table-column
                            label="订单号"
                            prop="book_id"
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
<!--                    <el-table-column-->
<!--                            label="订单价格"-->
<!--                            prop="price"-->
<!--                            width="100">-->
<!--                        &lt;!&ndash;要使用{{}}展示时，需要用到template slot-scop属性才能获取元素值&ndash;&gt;-->
<!--                        <template slot-scope="scope">{{scope.row.book.book_price}}</template>-->
<!--                    </el-table-column>-->
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
                                    type="danger"
                                    @click="handlePayfor(scope.$index, scope.row)">定价支付</el-button>
                            <el-button
                                    v-else
                                    size="mini"
                                    @click="handleReview(scope.$index, scope.row)">评价</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--定价框-->
                <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%">
                    <span><el-input v-model="appraise" :placeholder="yuanjia"></el-input></span>
                    <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="handleClose(appraise)">确 定</el-button>
                        </span>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="数据分析" name="third">
                <div id="daycharts" style="width:1030px;height: 400px"></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script scoped>
    export default {
        name: "CustomAppraise",
        data() {
            return {
                activeName: 'first',
                roomTable:[],
                appraiseData: [
                    // {book_end: '2016-05-02',nameId:1, name: '王小虎', book_appraise: '￥70.00'},
                    //             {book_end: '2016-05-04', nameId:2, name: '王小虎', book_appraise: '￥80.00'}
                                ],
                orderData:[],
                updateData: {
                    book_id: '',
                    book_start:'',
                    book_end:'',
                    book_state:'',
                    book_price:'',
                    book_appraise:0,
                    user_id:0,
                    admin_id:0,
                    room_id:0
                },
                DetaildialogVisible: false,//该酒店定价历史详情
                dialogVisible:false,//定价框
                formLabelWidth: '120px',
                yuanjia:'0',//原价，建议价格
                appraise:'',//定价
                bookrefreshId:0,//获取要定价的订单详情
            };
        },
        created() {
            const _this = this;
            axios.get('/room/allCustomRoom').then(resp => {
                console.log(resp);
                _this.roomTable = resp.data;
                if(_this.roomTable.room_type == "顾客定价房") {
                    _this.roomTable.isCustomPrice = true;
                }
            })

                //根据用户id查询该用户的定价房订单
                let uid = parseInt(window.sessionStorage.getItem('userId'))
                axios.post('http://127.0.0.1:8099/book/bookIdlist/'+uid).then((resp)=>{
                    console.log(resp.data.data)
                    _this.orderData = resp.data.data;
                    for(let i in resp.data.data) {
                        _this.orderData[i].book_id = resp.data.data[i].book.book_id;
                    }
                })
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            //点击查看进入该酒店详情页
            IntoRoom(item){
                this.$router.push({
                    path:"/hotelInfo",
                    query:{hotelId:item.hotel_id}
                })
            },
            //预订
            order(item){
                if (item.room_state == "空闲") {
                    if(item.room_type == "定价房") {
                        alert('此房间为定价房，可先填写订单，入住离开后再付款')
                    }
                    this.$router.push({
                        path: '/hotelPayfor',
                        query: {
                            roomId: item.room_id,
                            hotelId: item.hotel_id,
                        }
                    })
                    alert("即将跳转到支付页面")
                } else {
                    alert("抱歉！该房间已预订")
                }
            },
            //点击详情可查看定价详情
            PriceDetail(item){
                this.DetaildialogVisible = true;
                const _this = this;
                // item.room_id
                axios.get('/book/BookRoomInfo/'+item.room_id).then(resp => {
                    console.log(resp.data.data)
                    _this.appraiseData = resp.data.data;
                    // for(let i in resp.data.data) {
                    //     _this.appraiseData[i].name = resp.data.data[i].user_name;
                    //     _this.appraiseData[i].book_end = resp.data.data[i].book.book_end;
                    //     _this.appraiseData[i].book_appraise = resp.data.data[i].book_appraise;
                    // }
                })
            },
            handlePayfor(index,row){
                this.updateData.book_id = row.book.book_id;
                this.updateData.book_start = row.book.book_start;
                this.updateData.book_end = row.book.book_end;
                this.updateData.book_state = '已支付';
                this.updateData.book_price = row.book.book_price;

                this.updateData.user_id = row.book.user_id;
                this.updateData.admin_id = row.book.admin_id;
                this.updateData.room_id = row.book.room_id;
                this.dialogVisible = true;
                this.yuanjia = '建议价格：'+row.room_price;
            },
            //是否确认定价
            handleClose(){
                this.updateData.book_appraise = this.appraise;
                console.log(this.updateData)
                axios.put('/book/update',this.updateData).then(resp =>{
                    console.log(resp)
                    alert("更新成功！")
                });
                this.dialogVisible = false;
            },
            //评价
            handleReview(index,row){

            },

            //数据分析
            drawChart() {
                var echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("daycharts"));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '定价房定价折线图',
                        subtext: '每月统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['最高定价', '最低定价']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '￥{value}.00'
                        }
                    },
                    series: [
                        {
                            name: '当月最高定价',
                            type: 'line',
                            data: [87, 75, 77, 89, 62, 98, 100,120,69,74,76,82],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '当月最低定价',
                            type: 'line',
                            data: [30,50,60,55,35,43,49,75,65,32,49,55],
                            markPoint: {
                                data: [
                                    {name: '月最低', value: 30, xAxis: 0, yAxis: 30}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            position: 'start',
                                            formatter: '最大值'
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
        },
        mounted() {
            this.drawChart();
        }
    }
</script>

<style scoped>
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
</style>
