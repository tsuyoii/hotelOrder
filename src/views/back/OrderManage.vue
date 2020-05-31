<template>
    <el-card class="ordermanage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部订单" name="first">
                <el-table
                        :data="orderData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        style="width: 100%">
                    <el-table-column
                            label="预订用户"
                            prop="user_name"
                            width="80px">
                    </el-table-column>
                    <el-table-column
                            label="所属酒店"
                            prop="hotel_name"
                            width="100px">
                    </el-table-column>
                    <el-table-column
                            label="预订房间"
                            prop="room_number"
                            width="80px">
                    </el-table-column>
                    <el-table-column
                            label="预订数量"
                            width="80px">
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
                            width="80px">
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
                                    size="mini"
                                    @click="handleContact(scope.$index, scope.row)">联系</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                            <el-button
                                    size="mini"
                                    type="warning"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>


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
                    {id:1,img:'',name:'王小虎',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'已付款'},
                    {id:1,img:'',name:'李小凤',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'待付款'},
                    {id:1,img:'',name:'龚梦玲',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'待入住'},
                    {id:1,img:'',name:'李南',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'待评价'},
                    {id:1,img:'',name:'徐欣',number:1,type:'标准双床房',date:'2020-01-16至2020-01-17',price:149.00,tag:'已付款'},
                ],
                search: ''
            }
        },
        created() {
            const _this = this;
            //根据商家id查询该商店所有的订单
            // let aid = parseInt(window.sessionStorage.getItem('userId'))
            let aid = 1;
            axios.post('http://127.0.0.1:8099/book/bookAdminlist/'+aid).then((resp)=>{
                console.log(resp.data.data)
                _this.orderData = resp.data.data;
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
            //联系用户
            handleContact(index, row) {
                console.log(index, row);
            },
            //查看订单
            handleView(index,row){

            },
            //删除订单
            handleDelete(index, row) {
                const _this = this;
                console.log(index, row);
                this.$confirm('删除后无法恢复，确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // axios.delete('/book/deleteById/'+row.book.book_id).then(resp => {
                    //     alert("退房成功");
                    //     console.log(resp);
                    //     window.location.reload();//动态刷新
                    // })
                    _this.orderData.splice(index,1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退订'
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
            }
        }
    }
</script>

<style scoped>
.ordermanage{
    width:99%;
    margin:20px auto;
}
</style>
