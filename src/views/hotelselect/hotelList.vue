<template>
    <div class="hotelList">

        <!--侧边热门城市徘行-->
        <el-card style="float: right;margin-top:25px;width: 28%">
            <el-table
                    :data="paimin"
                    style="width: 100%;border: white">
                <el-table-column
                        prop="id"
                        label=""
                        width="12">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="热门酒店徘行"
                        width="180">
                </el-table-column>
            </el-table>
        </el-card>

        <span>智能排序</span>
        <table class="box-table">
            <tr v-for="item in hotelTable" :key="item" class="text item" @click="enterHotel">
                <td style="width:30%;padding: 15px"><img src="../../assets/img/hotel/hotel7.png" class="image"></td>
                <td style="padding-right: 15px">
                    <div class="info">
    <!--                    <span style="border-radius:100px;width:2px;height:2px;border:1px solid #87c38f;font-size: x-large">{{ item.id }} </span>-->
                        <el-avatar size="small" style="color:white;background-color: #3b4f62"> {{ item.id }} </el-avatar>
                        <span style="font: x-large bold;margin-left:30px;display:block;margin-top: -33px">{{ item.title }}</span>
                        <span style="font: x-large bold;float: right;color: #ff9900;margin-top: -30px">{{ item.grade }}<br>
                            <el-rate
                                    v-model="item.grade"
                                    disabled
                                    show-text
                                    text-color="#ff9900"
                                    score-template="{value}">
                            </el-rate>
                        </span><br>
                        <span style="margin-top: 20px">{{ item.address}}<br></span>
<!--                        <i class="el-icon-chat-line-square" style="font-size: x-large"></i><br>-->
                        <div class="shebei">
                            <i class="el-icon-dish">含餐饮  </i>
                            <i class="el-icon-suitcase">行李寄存  </i>
                            <i class="el-icon-location" style="font-size:medium;color:#87c38f;float:right;top:40px">查看位置</i><br>
                        </div>
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
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "hotelList",
        props:['searchHotel'],
        data() {
            return {
                city1:this.searchHotel.destarea,
                date1:this.searchHotel.date,
                imply1:this.searchHotel.imply,

                hotelTable:[
                    {id:1,title:'速8酒店',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7},
                    {id:2,title:'全季酒店（北门广潮）',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7},
                    {id:3,title:'如家酒店',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7},
                    {id:4,title:'汉庭酒店',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7},
                    {id:5,title:'IU酒店',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7},
                    {id:6,title:'海友良品酒店',type:'经济型',area:'上海',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7}
                ],
                style: [
                    { type: '', label: '钟点房' },
                    { type: 'success', label: '大床房' },
                    { type: 'info', label: '高级大床房' },
                    { type: 'danger', label: '四人间' },
                    { type: 'warning', label: '顾客定价房' }
                ],
                paimin:[
                    {id: 1, name: '如家酒店'},
                    {id: 2, name: '速8酒店'},
                    {id: 3, name: '丽枫酒店'},
                    {id: 4, name: '美佳酒店'}
                ]
            };
        },
        created() {
            const _this = this;
            axios.get('http://127.0.0.1:8099/category/hotellist').then((resp) =>{
                console.log(resp);
                _this.hotelTable = resp.data;
            })
        },
        methods:{
            enterHotel(){
                alert(this.city1);
                alert(this.date1);
                alert(this.imply1);
            }
        }
    }
</script>

<style scoped>
    .hotelList{
        width: 100%;
        margin-left: 50px;
    }
    .image{
        width:100%;
        height: auto;
        margin: 0px;
    }
    .text {
        font-size: 14px;
        max-height: 200px;
        line-height: inherit;
    }
    .info{
        width: 100%;
        /*float: right;*/
        /*left:20%;*/
        /*top:-180px;*/
        padding: 15px;
    }
    .info span{

    }
    tr.item {
        /*padding: 18px 0;*/
        border-bottom: 1px solid #e4e7f6;
        cursor: pointer;
    }

    table.box-table{
        border:1px solid #e4e7f6;
        border-radius: 2px;
        box-shadow:3px 3px 8px rgba(168, 168, 168, 0.3);
        background-color: white;
        width: 70%;
        margin-top: 10px;
    }
</style>

