<template>
    <div class="analyse">
        <el-row :gutter="12">
            <el-col class="topnum" :span="6">
                <el-card shadow="hover">
                    总销售额
                    <i class="el-icon-warning-outline" style="float: right"></i>
                    <p>￥{{totalPrice}}</p>
                    <span>周同比</span><i class="el-icon-top" style="color: #8FBC8F;margin-right: 20px;"></i>
                    <span>日同比</span><i class="el-icon-bottom" style="color: orangered"></i>
                    <el-divider></el-divider>
                    <span>日销售额  {{dayPrice}}</span>
                </el-card>
            </el-col>

            <el-col class="topnum"  :span="6">
                <el-card shadow="hover">
                    访问量
                    <i class="el-icon-warning-outline" style="float: right"></i>
                    <p>{{totalClick}}</p>
                    <div id="daycharts" style="width:99%;height:90px;margin-top:-25px"></div>
<!--                    <el-divider></el-divider>-->
                    <span>日访问量  {{dayClick}}</span>
                </el-card>
            </el-col>

            <el-col class="topnum"  :span="6">
                <el-card shadow="hover">
                    支付笔数
                    <i class="el-icon-warning-outline" style="float: right"></i>
                    <p>{{totalPayfor}}</p>
                    <div id="daycharts2" style="width:99%;height:90px;margin-top:-25px"></div>
                    <!--                    <el-divider></el-divider>-->
                    <span>转化率  {{dayPayfor}}%</span>
                </el-card>
            </el-col>

            <el-col class="topnum"  :span="6">
                <el-card shadow="hover">
                    业绩榜单
                    <i class="el-icon-warning-outline" style="float: right"></i>
                    <p>{{totalPayfor}}</p>
                    <el-progress :text-inside="true" :stroke-width="15" :percentage="70"></el-progress>
                    <el-divider></el-divider>
                    <span>周同比</span><i class="el-icon-top" style="color: #8FBC8F;margin-right: 20px;"></i>
                    <span>日同比</span><i class="el-icon-bottom" style="color: orangered"></i>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col>
                <el-card  shadow="never">

                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="订单量" name="first">
                            <div class="block">
                                <el-date-picker
                                        v-model="daterange"
                                        type="monthrange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始月份"
                                        end-placeholder="结束月份"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                            <div id="daycharts3" style="width:730px;height: 400px"></div>
                            <div class="paimin">
                                酒店销售额排名
                                <ul>
                                    <li v-for="(item,index) in hotelPaimin"><span style="margin-right: 30px">{{index+1}}</span>{{item.name}}
                                        <img src="../../assets/img/fire.png" v-show="index<=2" style="width: 15px;margin-left: 50px"/>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="销售额" name="second">
                            <div id="daycharts4" style="width:800px;height: 400px"></div>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // import echarts from 'echarts';
    import BaiDuMap from "../../components/common/baidumap/BaiDuMap";
    export default {
        name: "numAnalyse",
        components:{
            BaiDuMap
        },
        data(){
            return{
                totalPrice:126560,
                week:12,
                day:11,
                dayPrice:12423,

                totalClick:8846,
                dayClick:1234,

                totalPayfor:6560,
                dayPayfor:60,

                activeName:'first',
                daterange:'',
                pickerOptions: {
                    shortcuts: [{
                        text: '本月',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(new Date().getFullYear(), 0);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(start.getMonth() - 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                hotelPaimin:[
                    {id:1,name:'维也纳酒店'},
                    {id:2,name:'城市便捷酒店'},
                    {id:3,name:'如家商旅酒店'},
                    {id:4,name:'喆·啡酒店'},
                    {id:5,name:'星程酒店'},
                    {id:6,name:'甲方酒店'},
                    {id:7,name:'珍珠巷奶茶馆'},
                ]
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            drawChart() {
                var echarts = require('echarts');
                var base = +new Date(1968, 9, 3);
                var oneDay = 24 * 3600 * 1000;
                var date = [];

                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("daycharts"));
                // 指定图表的配置项和数据
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        bottom: '30%',
                        top:'0%',
                        containLabel: false//是否包含刻度尺，默认不包含
                    },
                    xAxis: {
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                        },
                        // 取消坐标轴
                        axisLine:{
                            show:false
                        },
                        //取消坐标刻度线
                        axisTick:{
                            show:false
                        },
                        //取消显示坐标值
                        axisLabel:{
                            show:false
                        },
                        data: date
                    },
                    yAxis: {
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                        },
                        // 取消坐标轴
                        axisLine:{
                            show:false
                        },
                        //取消坐标刻度线
                        axisTick:{
                            show:false
                        },
                        //取消显示坐标值
                        axisLabel:{
                            show:false
                        },
                    },
                    series: [
                        {
                            name: '模拟数据',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            itemStyle: {
                                color: 'rgb(255, 70, 131)'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }])
                            },
                            data:[80,32,76,89,35,22,117,56,72,77,37]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            drawChart2() {
                var echarts = require('echarts');
                let myChart2 = this.$echarts.init(document.getElementById("daycharts2"));
                let option2 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        bottom: '30%',
                        top:'0%',
                        containLabel: false//是否包含刻度尺，默认不包含
                    },
                    xAxis:{
                        data: ['北京','上海','广东','重庆','武汉','厦门','深圳','成都'],
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                        },
                        // 取消坐标轴
                        axisLine:{
                            show:false
                        },
                        //取消坐标刻度线
                        axisTick:{
                            show:false
                        },
                        //取消显示坐标值
                        axisLabel:{
                            show:false
                        },
                    },
                    yAxis:{
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                        },
                        // 取消坐标轴
                        axisLine:{
                            show:false
                        },
                        //取消坐标刻度线
                        axisTick:{
                            show:false
                        },
                        //取消显示坐标值
                        axisLabel:{
                            show:false
                        },
                    },
                    series: [
                        {
                            name: '模拟数据',
                            type: 'bar',
                            barWidth: '35%',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#fccb05'
                                    }, {
                                        offset: 1,
                                        color: '#f5804d'
                                    }]),
                                    barBorderRadius: 12,
                                },
                            },
                            data: [80,52,76,89,35,82,117,56,72,77,37]
                        }
                    ],
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart2.setOption(option2);
            },
            //订单量
            drawChart3() {
                var echarts = require('echarts');
                var category = [];
                var dottedBase = +new Date();
                var lineData = [];
                var barData = [];
                var areaData = [];
                for (var i = 0; i < 20; i++) {
                    var date = new Date(dottedBase += 3600 * 24 * 1000);
                    category.push([
                        date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate()
                    ].join('-'));
                    var b = parseInt(Math.random() * 10);
                    var d = parseInt(Math.random() * 10);
                    barData.push(b);
                    lineData.push(d + b);
                    areaData.push(d);
                }
                let myChart3 = this.$echarts.init(document.getElementById("daycharts3"));
                let option3 = {
                    title: {
                        text: '',
                        subtext: '酒店订单量统计--根据下单时间区分，每天有多少订单'
                    },
                    backgroundColor: '#0f375f',
                    tooltip: {
                        //
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                    },
                    legend: {
                        data: ['全城最高销量', '本店订单量'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    //
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 65,
                            end: 85
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 65,
                            end: 85
                        }
                    ],
                    xAxis: {
                        data: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    yAxis: {
                        splitLine: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    series: [{
                        name: '全城最高销量',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 15,
                        data: lineData
                    }, {
                        name: '本店订单量',
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#14c8d4'},
                                    {offset: 1, color: '#43eec6'}
                                ]
                            )
                        },
                        data: barData
                    }
                        , {
                            name: '相差',
                            type: 'bar',
                            barGap: '-100%',
                            barWidth: 10,
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: 'rgba(20,200,212,0.5)'},
                                        {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                                        {offset: 1, color: 'rgba(20,200,212,0)'}
                                    ]
                                )
                            },
                            z: -12,
                            data: areaData
                        }, {
                            name: '相差',
                            type: 'pictorialBar',
                            symbol: 'rect',
                            itemStyle: {
                                color: '#0f375f'
                            },
                            symbolRepeat: true,
                            symbolSize: [12, 4],
                            symbolMargin: 1,
                            z: -10,
                            data: areaData
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart3.setOption(option3);
            },
            //销售额
            drawChart4(){
                var echarts = require('echarts');
                let myChart4 = this.$echarts.init(document.getElementById("daycharts4"));
                var colors = ['#5793f3', '#d14a61', '#675bba'];
                var lineData = [];
                var barData = [];
                var areaData = [];
                for (var i = 0; i < 12; i++) {
                    var d = parseInt(60+Math.random() * 100);
                    var b = parseInt(60+Math.random() * 100);
                    barData.push(d);
                    lineData.push(d + b);
                    areaData.push(b);
                }
                let option4 = {
                    color: colors,
                    // backgroundColor: '#333333',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        right: '20%'
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['顾客定价房销售额', '其他房型销售额', '总销售额']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '顾客定价房销售额',
                            min: 0,
                            max: 400,
                            position: 'right',
                            axisLine: {
                                lineStyle: {
                                    color: colors[0]
                                }
                            },
                            axisLabel: {
                                formatter: '￥{value}.00'
                            }
                        },
                        {
                            type: 'value',
                            name: '其他房型销售额',
                            min: 0,
                            max: 400,
                            position: 'right',
                            offset: 80,
                            axisLine: {
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            axisLabel: {
                                formatter: '￥{value}.00'
                            }
                        },
                        {
                            type: 'value',
                            name: '总销售额',
                            min: 0,
                            max: 400,
                            position: 'left',
                            axisLine: {
                                lineStyle: {
                                    color: colors[2]
                                }
                            },
                            axisLabel: {
                                formatter: '￥{value}.00'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '顾客定价房销售额',
                            type: 'bar',
                            data: areaData
                        },
                        {
                            name: '其他房型销售额',
                            type: 'bar',
                            yAxisIndex: 1,
                            data: barData
                        },
                        {
                            name: '总销售额',
                            type: 'line',
                            yAxisIndex: 2,
                            data: lineData
                        }
                    ]
                };
                myChart4.setOption(option4);
            }
        },
        mounted() {
            this.drawChart();
            this.drawChart2();
            this.drawChart3();
            this.drawChart4();
        }
    }
</script>


<style scoped>
    .paimin li{
        margin-top: 20px;
        padding-left: 15px;
        color: rgb(89,89,89);
        list-style: none;
    }
    .paimin li:nth-child(1)>span,li:nth-child(2)>span,li:nth-child(3)>span{
        background-color: #3b4f62;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        text-align: center;
        color: white;
    }
    .paimin li:nth-child(n+4)>span{
        background-color: white;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        text-align: center;
    }
    .paimin{
        float: left;
        width: 249px;
        /*margin-top: -25px;*/
        /*margin-left: -20px;*/
        /*background-color: #8FBC8F;*/
        font-size: 16px;
    }
    #daycharts3{
        float: left;
        border-radius: 5px;
    }
    .block{
        float: right;
        margin-top: 0px;
    }
.el-row{
    margin-top: 10px;
}
p{
    /*display: block;*/
    color: #3d3e3e;
    font: 25px/35px arial,sans-serif,"微软雅黑";
    margin: 10px 0 20px -5px;
}
span{
    color: #909399;
}
    .topnum {
        padding: 20px;
        /*height: 200px;*/
        /*margin-bottom: 30px;*/
    }
</style>



<!--渐进变色柱状图-->
<!--let option = {-->
<!--backgroundColor:'#323a5e',//背景色-->
<!--// backgroundColor:'white',//背景色-->
<!--tooltip: {-->
<!--trigger: 'axis',-->
<!--axisPointer: { // 坐标轴指示器，坐标轴触发有效-->
<!--type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'-->
<!--}-->
<!--},-->
<!--grid: {-->
<!--left: '0%',-->
<!--right: '0%',-->
<!--bottom: '0%',-->
<!--top:'0%',-->
<!--containLabel: false//是否包含刻度尺，默认不包含-->
<!--},-->
<!--legend:{//图例组件-->
<!--data: ['累计确诊', '治愈数', '死亡数'],//这里的data值要和series里每一组数据的name相同-->
<!--right: 'center',-->
<!--top:'10%',-->
<!--textStyle: {-->
<!--color: "#fff"-->
<!--},-->
<!--itemWidth: 12,//图例组件宽度-->
<!--itemHeight: 10,//图例组件高度-->
<!--itemGap: 35//每项之间的间隔-->
<!--},-->
<!--xAxis:{-->
<!--type: 'category',-->
<!--data: ['美国','意大利','西班牙','德国','法国','伊朗','葡萄牙','以色列'],-->
<!--axisLine: {-->
<!--lineStyle: {-->
<!--color: 'white'-->
<!--}-->
<!--},-->
<!--},-->
<!--yAxis:{-->
<!--type: 'value',-->
<!--max:'20000',//纵坐标轴的最大刻度-->
<!--axisLine: {-->
<!--show: false,//不显示纵坐标轴-->
<!--lineStyle: {-->
<!--color: 'white'-->
<!--}-->
<!--},-->
<!--splitLine: {-->
<!--show: true,-->
<!--lineStyle: {-->
<!--color: 'rgba(255,255,255,0.3)'-->
<!--}-->
<!--},-->
<!--axisLabel: {}-->
<!--},-->
<!--series: [-->
<!--{-->
<!--name: '累计确诊',-->
<!--type: 'bar',-->
<!--barWidth: '15%',-->
<!--itemStyle: {-->
<!--normal: {-->
<!--color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{-->
<!--offset: 0,-->
<!--color: '#fccb05'-->
<!--}, {-->
<!--offset: 1,-->
<!--color: '#f5804d'-->
<!--}]),-->
<!--barBorderRadius: 12,-->
<!--},-->
<!--},-->
<!--data: [160020, 101739, 85195, 66885, 44550, 41495,  6480, 4695]-->
<!--},-->
<!--{-->
<!--name: '治愈数',-->
<!--type: 'bar',-->
<!--barWidth: '15%',-->
<!--itemStyle: {-->
<!--normal: {-->
<!--color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{-->
<!--offset: 0,-->
<!--color: '#8bd46e'-->
<!--}, {-->
<!--offset: 1,-->
<!--color: '#09bcb7'-->
<!--}]),-->
<!--barBorderRadius: 11,-->
<!--}-->
<!--},-->
<!--data: [5595, 14620, 16780, 13500, 7924, 13911,256, 3302]-->
<!--},-->
<!--{-->
<!--name: '死亡数',-->
<!--type: 'bar',-->
<!--barWidth: '15%',-->
<!--itemStyle: {-->
<!--normal: {-->
<!--color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{-->
<!--offset: 0,-->
<!--color: '#248ff7'-->
<!--}, {-->
<!--offset: 1,-->
<!--color: '#6851f1'-->
<!--}]),-->
<!--barBorderRadius: 11,-->
<!--}-->
<!--},-->
<!--data: [2953, 11591, 7340, 645, 3024, 2757, 1408, 180]-->
<!--}],-->
<!--dataZoom: [//滑动组件-->
<!--{-->
<!--type:"slider",//水平滑块，选择区间-->
<!--show: true,-->
<!--height: 12,-->
<!--xAxisIndex: [0],-->
<!--bottom:'8%',-->
<!--start: 10,-->
<!--end: 90,-->
<!--handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',-->
<!--handleSize: '110%',-->
<!--handleStyle:{-->
<!--color:"#d3dee5",-->
<!--},-->
<!--textStyle:{ color:"#fff"},-->
<!--borderColor:"#90979c"-->
<!--},-->
<!--{-->
<!--type: "inside",//纵向滑动,缩放-->
<!--show: true,-->
<!--height: 15,-->
<!--start: 1,-->
<!--end: 35-->
<!--}-->
<!--],-->
<!--};-->
