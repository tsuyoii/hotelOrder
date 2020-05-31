<!-- 表格式预约及查询 -->
<template>

<!--    <Chat></Chat>-->
    <div>
        <div id="firstfind">
            <el-card class="box-card" shadow="hover" style="width:900px;margin: 20px auto;" v-show="firstStep">

                <el-form label-width="80px" :model="formRoom" ref="formRoom"  class="demo-dynamic" style="width:500px;">
                    <span>酒店查询预约</span>
                    <el-divider></el-divider>
                    <el-form-item label="入住城市" prop="destarea" style="margin:30px;">
                        <city style="width:250px"  v-model="destarea" v-on:areachange="getCity($event)"
                                                                @change="handleChange"></city>
                    </el-form-item>
                    <el-form-item label="预约时间" style="margin:30px">
                        <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="关键词" prop="imply" style="margin:30px;">
                        <el-autocomplete popper-class="my-autocomplete" v-model="imply" :fetch-suggestions="querySearch" placeholder="(关键词选填)酒店名" @select="handleSelect">
                            <i class="el-icon-search" slot="prefix" @click="handleIconClick"></i>
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.value }}</div>
                                <span class="addr">{{ item.address }}</span>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                </el-form>
                <el-button @click="resetForm('formRoom')">重置</el-button>
                <el-button type="success" @click="hotelfind" style="background: #8FBC8F;
    color: white;">查找酒店</el-button>
            </el-card>
<!--            右侧轮播图-->
            <el-card  style="float: right;width:400px;padding: 0px;margin-right:100px;margin-top:-420px;height:410px;z-index:100">
                <el-carousel indicator-position="outside" height="400px" style="width:389px;padding: 0px;top:-17px;left:-15px">
                    <el-carousel-item v-for="url in urls" :key="url">
                        <el-image :src="require('../../assets/img/hotelFind/'+url+'.png')" fit="fit"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </el-card>
        </div>
    </div>
</template>
<script>
    import Chat from '../../components/common/chat/Chat'
    import city from '../../components/common/citySelect/city'
    export default {
        components:{
            city,
            Chat
        },
        data() {
            return {
                firstStep: true,
                destarea:'',
                // date:['2020-1-4','2020-1-5'],
                date:'',
                imply: '',
                urls: [
                    'undraw_adventure_4hum',
                    'undraw_heatmap_uyye',
                    'undraw_journey_lwlj',
                    'undraw_special_event_4aj8',
                    'undraw_travelers_qlt1',
                ],
            };
        },
        methods: {
            hotelfind() {
                this.$router.push({
                    path: '/category',
                    name:'酒店查找',
                    params:{
                        destarea:this.destarea,
                        date:this.date,
                        imply:this.imply
                    }
                })
            },
            resetForm(formName) {
                this.destarea='';
                this.date=[];
                this.imply='';
                this.$refs[formName].resetFields();
            },
            handleChange(item){
                console.log(item);
                console.log(this.destarea);
            },
            getCity(event){
                this.destarea = event;
                console.log(event)
                alert(this.destarea)
            },
            //关键词查找
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [
                    { "value": "星程酒店（北京清华大学东门店）", "address": "海淀区双清路6号（物美超市同栋）" },
                    { "value": "99旅馆连锁(北京昌平火车北站西关路店) ", "address": "昌平区西关路16号（皇城股骨头医院斜对面）" },
                    { "value": "喆·啡酒店(北京三元桥燕莎国展店)", "address": " 朝阳区左家庄前街1号百灵大厦5楼" },
                    { "value": "城市便捷酒店(武汉武展店) ", "address": "硚口区利济东街105号（航发大厦）" },
                    { "value": "城市便捷酒店(武汉汉南步行街店) ", "address": "汉南区银莲路71号（汉南客运站旁）" },
                    { "value": "如家商旅酒店(上海临港海洋公园滴水湖店)", "address": "浦东新区水芸路441号（近龙竹路，滴水湖西岛斜对面）" },
                    { "value": "维也纳酒店(上海虹桥枢纽虹梅南路店)", "address": "闵行区向阳路228弄（近吴中汽配城、森马工业园）" },
                    { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                    { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                    { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                    { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                    { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
                    { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
                    { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
                    { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
                    { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
                    { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
                    { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
                    { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
                    { "value": "枪会山", "address": "上海市普陀区棕榈路" },
                    { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
                    { "value": "钱记", "address": "上海市长宁区天山西路" },
                    { "value": "壹杯加", "address": "上海市长宁区通协路" },
                    { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
                    { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
                    { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
                    { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
                    { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
                    { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
                    { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
                    { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
                    { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
                    { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
                    { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
                    { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
                    { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
                    { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
                    { "value": "浏阳蒸菜", "address": "天山西路430号" },
                    { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
                    { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
                    { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
                    { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
                    { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
                    { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
                    { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
                    { "value": "阳阳麻辣烫", "address": "天山西路389号" },
                    { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
                ];
            },
            handleSelect(item) {
                console.log(item);
                console.log(this.imply);
                console.log(this.destarea);
                console.log(this.date);
            },
            handleIconClick(ev) {
                console.log(ev);
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
        }
    }

</script>
<style>
    /*img{*/
    /*    width: 400px;*/
    /*}*/
    .el-image{
        background-color: #8FBC8F;
        width: 430px;
        height: 320px;
        margin-top: 60px;
        margin-left: -30px;
    }
    .my-autocomplete,li {
                line-height: normal;
                padding: 7px;
            }
    .my-autocomplete,.name {
                text-overflow: ellipsis;
                overflow: hidden;
            }
    .my-autocomplete,.addr {
                font-size: 12px;
                color: #b4b4b4;
            }
    .my-autocomplete,.highlighted .addr {
                color: #ddd;
            }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        /*line-height: 300px;*/
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        /*background-color: #d3dce6;*/
        background-color: #99a9bf
    }

    el-button{
        text-align: center;
        padding:0px;
    }
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .addressBook {
        padding: 50px;
        background: white;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 3%;
        left: 3%;
        border-radius: 6px;
    }

    .excel /deep/ .el-dialog {
        border: 10px solid #F0BAB4;
        width: 33%
    }

    .editForm /deep/ .el-dialog {
        border: 1px solid rgb(243, 231, 230);
        width: 40%
    }

</style>










<!--<template>-->
<!--    <div>-->
<!--        <el-form :model="hotelform" ref="hotelformRef">-->
<!--            <el-form-item label="酒店名称" :label-width="formLabelWidth">-->
<!--                <el-input v-model="hotelform.name" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="酒店类型" :label-width="formLabelWidth">-->
<!--                <el-select v-model="hotelform.type" placeholder="请选择酒店类型">-->
<!--                    <el-option label="经济型" value="jingji"></el-option>-->
<!--                    <el-option label="标准型" value="biaozhun"></el-option>-->
<!--                    <el-option label="豪华型" value="haohua"></el-option>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="酒店位置" :label-width="formLabelWidth">-->
<!--                <el-input id="myInput" aria-placeholder="请输入位置或自动定位" v-model="hotelform.address"></el-input>-->
<!--                <a href="javascript:;" id="myGprs">-->
<!--&lt;!&ndash;                    <i class="el-icon-location-outline" @click="getGpsList"/>&ndash;&gt;-->
<!--                </a>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="详情概览" :label-width="formLabelWidth">-->
<!--                <el-input type="textarea" v-model="hotelform.info"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="住店须知" :label-width="formLabelWidth">-->
<!--                <el-input type="textarea" v-model="hotelform.warning"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="酒店图片" :label-width="formLabelWidth">-->
<!--                <el-upload-->
<!--                        ref="hotelImgFile"-->
<!--                        action="http://localhost:8099/hotel/upload"-->
<!--                        list-type="picture-card"-->
<!--                        :on-preview="handleImgPreview"-->
<!--                        :on-remove="handleImgRemove"-->
<!--                        :on-success="handleImgSuccess" >-->
<!--                    <i class="el-icon-plus"></i>-->
<!--                </el-upload>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="视频介绍" :label-width="formLabelWidth">-->
<!--                <el-upload class="avatar-uploader el-upload&#45;&#45;text"-->
<!--                           action="http://localhost:8099/hotel/upload"-->
<!--                           :show-file-list="false"-->
<!--                           accept=".mp4"-->
<!--                           :on-success="handleVideoSuccess"-->
<!--                           :before-upload="beforeUploadVideo"-->
<!--                           :on-progress="uploadVideoProcess">-->
<!--                    <video v-if="showVideoPath !='' && !videoFlag"-->
<!--                           :src="showVideoPath"-->
<!--                           class="avatar video-avatar"-->
<!--                           controls="controls">您的浏览器不支持视频播放</video>-->
<!--                    <i v-else-if="showVideoPath =='' && !videoFlag"-->
<!--                       class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                    <el-progress v-if="videoFlag == true"-->
<!--                                 type="circle"-->
<!--                                 :percentage="videoUploadPercent"-->
<!--                                 style="margin-top:30px;"></el-progress>-->
<!--                    <el-button class="video-btn"-->
<!--                               slot="trigger"-->
<!--                               size="small"-->
<!--                               v-if="isShowUploadVideo"-->
<!--                               type="primary">选取文件</el-button>-->
<!--                </el-upload>-->
<!--                <P v-if="isShowUploadVideo"-->
<!--                   class="text">请保证视频格式正确，且不超过20M</P>-->
<!--            </el-form-item>-->
<!--&lt;!&ndash;            <el-form-item label="酒店功能" :label-width="formLabelWidth">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-checkbox :indeterminate="hotelform.isIndeterminate" v-model="hotelform.checkAll" @change="handleCheckAllChange()">全选</el-checkbox>&ndash;&gt;-->
<!--&lt;!&ndash;                <div style="margin: 15px 0;"></div>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-checkbox-group v-model="hotelform.checkedFuncs" @change="handleCheckedFuncChange()">&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-checkbox v-for="item in hotelform.func" :label="item" :key="item">{{item}}</el-checkbox>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-checkbox-group>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--&lt;!&ndash;            <el-button type="warning">取 消</el-button>&ndash;&gt;-->
<!--            <el-button type="primary" @click="hotelAddSubmit()">确 定</el-button>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    const funcOptions = ['WiFi','停车位','行李寄存','淋浴室'];-->
<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            formLabelWidth: '120px',//表单Label宽度-->
<!--            //视频参数-->
<!--            showVideoPath:"http://static.smartisanos.cn/common/video/t1-ui.mp4",//视频路径-->
<!--            videoFlag:false , //是否显示进度条-->
<!--            videoUploadPercent:"", //进度条的进度，-->
<!--            isShowUploadVideo:false, //显示上传按钮-->

<!--            hotelform:{-->
<!--                //酒店功能与全选相关-->
<!--                func:funcOptions,-->
<!--                checkAll: true,-->
<!--                checkedFuncs: ['WiFi', '停车位'],-->
<!--                isIndeterminate: true,-->
<!--            },-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        //全选-->
<!--        handleCheckAllChange(val) {-->
<!--            if(this.hotelform.checkAll){-->
<!--                this.hotelform.checkedFuncs = funcOptions;-->
<!--            }-->
<!--            else{-->
<!--                this.hotelform.checkedFuncs =[];-->
<!--            }-->
<!--            this.hotelform.checkedFuncs = val ? funcOptions : [];-->
<!--            this.hotelform.isIndeterminate = false;-->
<!--        },-->
<!--        handleCheckedFuncChange(val) {-->
<!--            let checkedCount = value.length;-->
<!--            this.hotelform.checkAll = checkedCount === this.hotelform.func.length;-->
<!--            this.hotelform.isIndeterminate = checkedCount > 0 && checkedCount < this.hotelform.func.length;-->
<!--            this.hotelform.checkedFuncs = val;-->
<!--            },-->
<!--        //图片移除-->
<!--        handleImgRemove(file, fileList) {-->
<!--            console.log(file, fileList);-->
<!--        },-->
<!--        //图片上传成功时的钩子函数-->
<!--        handleImgSuccess(res,file){-->
<!--            // console.log(file);-->
<!--            // console.log(this.hotelform);-->
<!--        //     //取到图片文件，通过ref关联-->
<!--            let myFile = this.$refs.hotelImgFile;-->
<!--        //     // console.log(myFile);-->
<!--        //     // console.log(myFile.file-list)-->
<!--        //     // let file = document.getElementById("hotelimgs").files;-->
<!--        //     // console.log(file);-->
<!--        //     var file = myFile.files[0];-->
<!--        //     //let file = myFile.files.item(0);-->
<!--        //     //let file = myFile.uploadFiles;-->
<!--            let formData = new FormData();-->
<!--        //-->
<!--            formData.append("file",file);-->
<!--            // formData.append("hotel_name",this.hotelform.name);-->
<!--            // formData.append("hotel_type",this.hotelform.type);-->
<!--            // formData.append("hotel_address",this.hotelform.address);-->
<!--            // // formData.append("hotel_func",this.hotelform.checkedFuncs);-->
<!--            // formData.append("hotel_info",this.hotelform.info);-->
<!--            // console.log(formData)-->
<!--            // const result = axios({-->
<!--            //     method:'post',-->
<!--            //     url:'/hotel/upload',-->
<!--            //     data:formData,-->
<!--            //     headers:{-->
<!--            //         'Content-Type':'multipart/form-data'-->
<!--            //     }-->
<!--            // })-->

<!--            // console.log(result);-->
<!--            //     .then((res)=>{-->
<!--            //     console.log("then");-->
<!--            //     console.log(res.data);-->
<!--            //     console.log(res);-->
<!--            // })-->
<!--        //   this.$message({-->
<!--        //       type:'info',-->
<!--        //       message:'图片上传成功',-->
<!--        //       duration:6000-->
<!--        //   });-->
<!--          if(file.response.data!=null){-->
<!--              this.hotelform.img = file.response.data;//将返回的文件储存路径赋值给hotel_img字段-->
<!--              alert(this.hotelform.img);-->
<!--          }-->
<!--          else {-->
<!--              alert("发生错误")-->
<!--          }-->
<!--        },-->
<!--        handleImgPreview(file) {-->
<!--            console.log(file);-->
<!--        },-->
<!--        //视频处理-->
<!--        //视频上传前回调-->
<!--        beforeUploadVideo (file) {-->
<!--            const isLt20M = file.size / 1024 / 1024 < 20;-->
<!--            if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'-->
<!--                this.$message.error('请上传正确的视频格式');-->
<!--                return false;-->
<!--            }-->
<!--            if (!isLt20M) {-->
<!--                this.$message.error('上传视频大小不能超过20MB哦!');-->
<!--                return false;-->
<!--            }-->
<!--            this.isShowUploadVideo = false;-->
<!--        },-->
<!--        //视频进度条-->
<!--        uploadVideoProcess (event, file, fileList) {-->
<!--            this.videoFlag = true;-->
<!--            this.videoUploadPercent = file.percentage.toFixed(0) * 1;-->
<!--        },-->
<!--        //视频上传成功回调-->
<!--        handleVideoSuccess (res, file) {-->
<!--            this.isShowUploadVideo = true;-->
<!--            this.videoFlag = false;-->
<!--            this.videoUploadPercent = 0;-->
<!--            if (res.errorCode == "00") {-->
<!--                this.showVideoPath = res.sprbody.urlAddress;-->
<!--                // this.videoForm.showVideoPath = res.data.uploadUrl;-->
<!--            } else {-->
<!--                this.$message.error('视频上传失败，请重新上传！');-->
<!--            }-->
<!--        },-->

<!--        //提交酒店添加表单-->
<!--        hotelAddSubmit(){-->
<!--            let formData = new FormData();-->
<!--            //formData.append可以直接添加之前未声明的字段，这里的name与数据库中的字段名对应-->
<!--            formData.append("hotel_name",this.hotelform.name);-->
<!--            formData.append("hotel_type",this.hotelform.type);-->
<!--            formData.append("hotel_address",this.hotelform.address);-->
<!--            // formData.append("hotel_func",this.hotelform.checkedFuncs);-->
<!--            formData.append("hotel_info",this.hotelform.info);-->
<!--            formData.append("hotel_img",this.hotelform.img);-->
<!--            this.$http.post('/hotel/save',formData).then(result => {-->
<!--                console.log(formData.getAll("hotel_name"));-->
<!--                console.log(result);-->
<!--                // if(result.body.success){-->
<!--                //     //保存成功-->
<!--                //     this.$message({-->
<!--                //         type:'success',-->
<!--                //         message:result.body.message,-->
<!--                //         duration:6000-->
<!--                //     })-->
<!--                // }-->
<!--            })-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->

<!--</style>-->



<!--<template>-->
<!--    <div>-->
<!--        <el-form :model="hotelform" ref="hotelformRef">-->
<!--            <el-form-item label="酒店名称" :label-width="formLabelWidth">-->
<!--                <el-input v-model="hotelform.name" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="酒店类型" :label-width="formLabelWidth">-->
<!--                <el-select v-model="hotelform.type" placeholder="请选择酒店类型">-->
<!--                    <el-option label="经济型" value="经济型"></el-option>-->
<!--                    <el-option label="标准型" value="标准型"></el-option>-->
<!--                    <el-option label="豪华型" value="豪华型"></el-option>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="酒店位置" :label-width="formLabelWidth">-->
<!--                <el-input id="myInput" aria-placeholder="请输入位置或自动定位" v-model="hotelform.address"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="详情概览" :label-width="formLabelWidth">-->
<!--                <el-input type="textarea" v-model="hotelform.info"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="住店须知" :label-width="formLabelWidth">-->
<!--                <el-input type="textarea" v-model="hotelform.warning"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="酒店图片" :label-width="formLabelWidth">-->
<!--                <el-upload-->
<!--                        ref="hotelImgFile"-->
<!--                        action="http://127.0.0.1:8099/hotel/uploadImgs"-->
<!--                        list-type="picture-card"-->
<!--                        multiple-->
<!--                        :auto-upload="false"-->
<!--                        :http-request="uploadImgReq">-->
<!--                    <i class="el-icon-plus"></i>-->
<!--                </el-upload>-->
<!--            </el-form-item>-->
<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--            <el-button type="warning">取 消</el-button>-->
<!--            <el-button type="primary" @click="hotelAddSubmit()">确 定</el-button>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    const funcOptions = ['WiFi','停车位','行李寄存','淋浴室'];-->
<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                formLabelWidth: '120px',//表单Label宽度-->
<!--                hotelform:{},-->
<!--                imgfiles:""-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            uploadImgReq(file){-->
<!--                this.imgfiles.append('file',file.file);-->
<!--            },-->
<!--            hotelAddSubmit(){-->
<!--                this.imgfiles = new FormData();-->
<!--                this.$refs.hotelImgFile.submit();-->
<!--                this.imgfiles.append('WS_CODE',"12133");-->
<!--                let config = {-->
<!--                    headers:{-->
<!--                        'Content-Type':'multipart/form-data'-->
<!--                    }-->
<!--                }-->
<!--                axios.post("/hotel/uploadImgs",this.imgfiles,config).then(res => {-->
<!--                    console.log(res)-->
<!--                }).catch(res => {-->
<!--                    console.log(res)-->
<!--                })-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->
<!--<style scoped>-->

<!--</style>-->
