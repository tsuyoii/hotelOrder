<template>
    <div class="hotelmanage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="酒店详情" name="first">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>酒店详情</span>
                        <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="hotelDialogVisible = true">修改</el-button>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <div class="img">
                        <el-carousel height="200px">
                            <el-carousel-item v-for="url in imgsurl" :key="url">
                                <img :src="'data:image/jpeg;base64,'+ url" fit="contain" style="height: 200px;width: 100%"/>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="message">
                        <el-table :data="hotelData" style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="酒店名称">
                                            <span>{{ props.row.name }}</span>
                                        </el-form-item>
                                        <el-form-item label="酒店类型">
                                            <span>{{ props.row.type }}</span>
                                        </el-form-item>
                                        <el-form-item label="所在城市">
                                            <span>{{ props.row.area }}</span>
                                        </el-form-item>
                                        <el-form-item label="详细地址">
                                            <span>{{ props.row.address }}</span>
                                        </el-form-item>
                                        <el-form-item label="提供服务">
                                            <span>{{ props.row.func }}</span>
                                        </el-form-item>
                                        <el-form-item label="酒店评分">
                                            <span>{{ props.row.address }}</span>
                                        </el-form-item>
                                        <el-form-item label="酒店描述">
                                            <span>{{ props.row.info }}</span>
                                        </el-form-item>
                                        <el-form-item label="酒店视频">
                                            <!-- <span>{{ props.row.video }}</span> -->
                                            <span><video controls autoplay :src="showVideoPath"></video></span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column label="" prop="name"></el-table-column>
                            <el-table-column label="" prop="type"></el-table-column>
                            <el-table-column label="" prop="grade"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
                <!-- 酒店信息修改 -->
                <el-dialog title="酒店信息" :visible.sync="hotelDialogVisible">
                    <el-form :model="hotelform" ref="hotelData">
                        <el-form-item label="酒店名称" :label-width="formLabelWidth">
                            <el-input v-model="hotelform.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="酒店类型" :label-width="formLabelWidth">
                            <el-select v-model="hotelform.type" placeholder="请选择酒店类型">
                                <el-option label="经济型" value="经济型"></el-option>
                                <el-option label="标准型" value="标准型"></el-option>
                                <el-option label="商务型" value="商务型"></el-option>
                                <el-option label="度假型" value="度假型"></el-option>
                                <el-option label="豪华型" value="豪华型"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在城市" :label-width="formLabelWidth">
                            <!-- <city></city> -->
                        </el-form-item>
                        <el-form-item label="详细地址" :label-width="formLabelWidth">
                            <el-input id="myInput" aria-placeholder="请输入位置或自动定位" v-model="hotelform.address"></el-input>
                            <a href="javascript:;" id="myGprs">
                                <i class="el-icon-location-outline" @click="getAddress"/>
                            </a>
                        </el-form-item>
                        <el-form-item label="提供服务" :label-width="formLabelWidth">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="checkedFuncs" @change="handleCheckedFuncChange">
                                <el-checkbox v-for="func in funcs" :label="func" :key="func">{{func}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="酒店描述" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="hotelform.info"></el-input>
                        </el-form-item>
                        <el-form-item label="酒店图片" :label-width="formLabelWidth">
                            <el-upload
                                    ref="hotelImgFile"
                                    action="http://127.0.0.1:8099/hotel/uploadImgs"
                                    list-type="picture-card"
                                    multiple
                                    :auto-upload="false"
                                    :http-request="uploadImgReq">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-button type="primary" @click="updateImg">确 定</el-button>
                        </el-form-item>
                        <el-form-item label="视频介绍" :label-width="formLabelWidth">
                            <el-upload class="avatar-uploader el-upload&#45;&#45;text"
                                       action="http://localhost:8099/hotel/upload"
                                       :show-file-list="false"
                                       accept=".mp4"
                                       :on-success="handleVideoSuccess"
                                       :before-upload="beforeUploadVideo"
                                       :on-progress="uploadVideoProcess">
                                <video v-if="showVideoPath !='' && !videoFlag"
                                       :src="showVideoPath"
                                       autoplay
                                       class="avatar video-avatar"
                                       controls="controls">您的浏览器不支持视频播放</video>
                                <i v-else-if="showVideoPath =='' && !videoFlag"
                                   class="el-icon-plus avatar-uploader-icon"></i>
                                <el-progress v-if="videoFlag == true"
                                             type="circle"
                                             :percentage="videoUploadPercent"
                                             style="margin-top:30px;"></el-progress>
                                <el-button class="video-btn"
                                           slot="trigger"
                                           size="small"
                                           v-if="isShowUploadVideo"
                                           type="primary">选取文件</el-button>
                            </el-upload>
                            <P v-if="isShowUploadVideo" class="text">请保证视频格式正确，且不超过20M</P>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="hotelDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateHotel">完成</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>

            <el-tab-pane label="房间列表" name="second">
                <el-button type="primary" icon="el-icon-plus" circle style="float: right" @click="roomAddDialogVisible=true"></el-button>
                <el-table
                        ref="roomTable"
                        :data="roomData"
                        style="width: 96%">
                    <el-table-column
                            label="房间图片"
                            width="130">
                        <template width="90" slot-scope="scope">
                            <img style="width:80px;height:80px;border:none;" :src="'data:image/jpeg;base64,'+scope.row.room_img">
                        </template>
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="hname"-->
                    <!--                            label="酒店名称"-->
                    <!--                            width="80">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            prop="room_number"
                            label="房间号"
                            sortable
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="room_type"
                            label="房间类型"
                            sortable
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="room_price"
                            label="价格"
                            sortable
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="room_size"
                            label="面积"
                            sortable
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="room_capacity"
                            label="容量"
                            sortable
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="room_state"
                            label="状态"
                            width="100"
                            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                            :filter-method="roomfilterTag"
                            filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.room_state === '空闲' ? 'primary' : 'success'"
                                    disable-transitions>{{scope.row.room_state}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="room_func"
                            label="功能"
                            width="280">
                        <!--                        <template slot-scope="scope">-->
                        <!--                            <el-tag-->
                        <!--                                    v-for="tag in scope.row.room_func"-->
                        <!--                                    :key="tag"-->
                        <!--                                    closable>-->
                        <!--                                {{tag}}-->
                        <!--                            </el-tag>-->
                        <!--                        </template>-->
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="roomhandleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="roomhandleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog title="房间信息添加" :visible.sync="roomAddDialogVisible">
                    <el-form :model="roomform">
                        <el-form-item label="房间号" :label-width="formLabelWidth">
                            <el-input v-model="roomform.number" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="房间类型" :label-width="formLabelWidth">
                            <el-select v-model="roomform.type" placeholder="请选择房间类型">
                                <el-option label="经济型" value="经济型"></el-option>
                                <el-option label="标准型" value="标准型"></el-option>
                                <el-option label="商务型" value="商务型"></el-option>
                                <el-option label="度假型" value="度假型"></el-option>
                                <el-option label="豪华型" value="豪华型"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="价格" :label-width="formLabelWidth">
                            <el-input v-model="roomform.price" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="面积" :label-width="formLabelWidth">
                            <el-input v-model="roomform.size" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="容量" :label-width="formLabelWidth">
                            <el-input v-model="roomform.capacity" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="服务" :label-width="formLabelWidth">
                            <el-tag :key="tag"
                                    v-for="tag in roomFuncTags"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                    class="input-new-tag"
                                    v-if="inputVisible"
                                    v-model="inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm"
                                    @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                        </el-form-item>
                        <el-form-item label="房间图片" :label-width="formLabelWidth">
                            <el-upload
                                    ref="hotelImgFile"
                                    action="http://localhost:8099/hotel/upload"
                                    list-type="picture-card"
                                    :on-preview="handleImgPreview"
                                    :on-remove="handleImgRemove"
                                    :on-success="handleRoomImgSuccess" >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <!--                            <el-button type="primary" @click="updateImg">确 定</el-button>-->
                        </el-form-item>
                        <el-form-item label="房间状态" :label-width="formLabelWidth">
                            <el-select v-model="roomform.state" placeholder="请选择房间此时状态情况">
                                <el-option label="维修中" value="-1"></el-option>
                                <el-option label="空闲" value="0"></el-option>
                                <el-option label="待入住" value="1"></el-option>
                                <el-option label="已入住" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="roomDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addRoom">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="房间信息修改" :visible.sync="roomEditDialogVisible">
                    <el-form :model="roomformEdit">
                        <el-form-item label="房间编号" :label-width="formLabelWidth">
                            <el-input v-model="roomformEdit.room_id" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="房间号" :label-width="formLabelWidth">
                            <el-input v-model="roomformEdit.room_number" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="房间类型" :label-width="formLabelWidth">
                            <el-select v-model="roomformEdit.room_type" placeholder="请选择房间类型">
                                <el-option label="单人间" value="单人间"></el-option>
                                <el-option label="标准间" value="标准间"></el-option>
                                <el-option label="钟点房" value="钟点房"></el-option>
                                <el-option label="双人间" value="双人间"></el-option>
                                <el-option label="家庭房" value="家庭房"></el-option>
                                <el-option label="大床房" value="大床房"></el-option>
                                <el-option label="商务房" value="商务房"></el-option>
                                <el-option label="顾客定价房" value="顾客定价房"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="价格" :label-width="formLabelWidth">
                            <el-input v-model="roomformEdit.room_price" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="面积" :label-width="formLabelWidth">
                            <el-input v-model="roomformEdit.room_size" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="容量" :label-width="formLabelWidth">
                            <el-input v-model="roomformEdit.room_capacity" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="服务" :label-width="formLabelWidth">
                            <el-tag :key="tag"
                                    v-for="tag in roomFuncTags"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                    class="input-new-tag"
                                    v-if="inputVisible"
                                    v-model="inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm"
                                    @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                        </el-form-item>
                        <el-form-item label="房间图片" :label-width="formLabelWidth">
                            <el-upload
                                    ref="hotelImgFile"
                                    action="http://localhost:8099/hotel/upload"
                                    list-type="picture-card"
                                    :on-preview="handleImgPreview"
                                    :on-remove="handleImgRemove"
                                    :on-success="handleRoomImgSuccess" >
                                <img :src="roomformEdit.img" width="147px" height="147px"/>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="房间状态" :label-width="formLabelWidth">
                            <el-select v-model="roomformEdit.room_state" placeholder="请选择房间此时状态情况">
                                <el-option label="维修中" value="-1"></el-option>
                                <el-option label="空闲" value="0"></el-option>
                                <el-option label="待入住" value="1"></el-option>
                                <el-option label="已入住" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="roomEditDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateRoom">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import BaiDuMap from "../../components/common/baidumap/BaiDuMap";
    const funcOptions = ['WiFi','停车位','行李寄存','淋浴室'];
    export default {
        name: 'hotelManage',
        components:{
            BaiDuMap
        },
        data(){
            return{
                activeName:'first',//控制面板
                hotelDialogVisible :false,//酒店添加及修改表单
                formLabelWidth: '120px',//酒店修改表单标签宽度
                //酒店展示数据
                hotelData: [
                    {name: '', type: '', area: '', address: '上海市普陀区真北路', func: 'WiFi|停车位|行李寄存|淋浴室', grade: 4.1, info:'', img:'', video:'',}
                ],
                //多图片轮播展示
                imgsurl:[],
                //多图片用","分割地址
                imgsurlb:[],
                //酒店修改表单
                hotelform:{name:'如家'},
                // 酒店服务相关
                checkAll: false,
                checkedFuncs: ['WiFi', '停车位'],
                funcs: funcOptions,
                isIndeterminate: true,
                //图片文件
                imgfiles:"",
                // 视频文件相关
                showVideoPath:"",//视频路径url
                videoFlag:false , //是否显示进度条
                videoUploadPercent:"", //进度条的进度，
                isShowUploadVideo:false, //显示上传按钮



                //房间面板
                roomData: [
                    {img:'',number:'',type:'',size:'',capacity:'',func:'',price:'',state:''}
                    // {name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', tag: '家',functags:['WIFI']},
                    // {name: '王小虎', address: '上海市普陀区金沙江路 1517 弄', tag: '公司',functags:['WIFI','可停车','行李寄存']}
                ],
                //房间表单
                roomAddDialogVisible:false,
                roomEditDialogVisible:false,
                //添加房间表单
                roomform:{},
                //编辑房间表单
                roomformEdit:{
                    room_id:'',
                    room_number:'',
                    room_type:'',
                    room_func:'',
                    room_price:'',
                    room_size:'',
                    room_capacity:'',
                    room_state:'',
                    room_img:'',
                    img:'',//图片回显
                    hotel_id:2,
                },
                //房间功能
                roomFuncTags: ['WIFI', '可停车'],
                inputVisible: false,
                inputValue: ''
            }
        },
        created() {
        },
        methods: {
            // 控制面板的转换，进入哪个菜单面板项
            handleClick(tab, event) {
                console.log(tab, event);
                if(tab.index === "1"){
                    //进入房间列表面板，可以展示房间列表
                    const _this = this;
                    axios.get('/room/roomlist').then(resp => {
                        _this.roomData = resp.data;
                        _this.roomData.hname = _this.hotelData.name;
                        console.log(_this.roomData)
                    })
                }
            },
            // 自动定位
            getAddress(){

            },
            // 设置酒店服务的全选功能
            handleCheckAllChange(val) {
                this.checkedFuncs = val ? funcOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedFuncChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.funcs.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.funcs.length;
            },
            // 酒店多张图片发送一次请求
            uploadImgReq(file){
                this.imgfiles.append('file',file.file);
            },
            // 上传所有图片
            updateImg(){
                const _this = this;
                this.imgfiles = new FormData();
                this.$refs.hotelImgFile.submit();
                this.imgfiles.append('WS_CODE',"12133");
                let config = {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }
                axios.post("/hotel/uploadImgs",this.imgfiles,config).then(res => {
                    // _this.hotelform.imgs ="data:image/jpeg;base64," + res.data.data.src;
                    // console.log(_this.hotelform.imgs);
                    _this.imgsurl = res.data.data.src;
                    for(let i=0;i<res.data.data.src.length;i++){
                        _this.imgsurlb[i] = res.data.data.src[i] + ',';
                    }
                    // console.log()
                    console.log(res)
                }).catch(res => {
                    console.log(res)
                })
            },
            // 视频上传
            //上传前回调
            beforeUploadVideo (file) {
                const isLt20M = file.size / 1024 / 1024 < 20;
                if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
                    this.$message.error('请上传正确的视频格式');
                    return false;
                }
                if (!isLt20M) {
                    this.$message.error('上传视频大小不能超过20MB哦!');
                    return false;
                }
                this.isShowUploadVideo = false;
            },
            //进度条
            uploadVideoProcess (event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
            //上传成功回调
            handleVideoSuccess (res, file) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                let formData = new FormData();
                formData.append("file",file);
                if(file.response.data!=null){
                    this.showVideoPath = 'data:video/mp4;base64,'+ file.response.data;//将返回的文件储存路径赋值给img,方便后面提交表单时将此处获取的信息作为表单数据提交到数据库
                    // this.showVideoPath = "http://static.smartisanos.cn/common/video/t1-ui.mp4"//将返回的文件储存路径赋值给img,方便后面提交表单时将此处获取的信息作为表单数据提交到数据库
                    this.hotelform.video = file.response.data;//将返回的文件储存路径赋值给img,方便后面提交表单时将此处获取的信息作为表单数据提交到数据库
                    alert(this.hotelform.video);
                }
                else {
                    this.$message.error('视频上传失败，请重新上传！');
                }
            },
            // 修改酒店信息
            updateHotel(){
                this.hotelData.push(this.hotelform);
                this.hotelDialogVisible = false;
                let formData = new FormData();
                //formData.append可以直接添加之前未声明的字段，这里的name与数据库中的字段名对应
                formData.append("hotel_name",this.hotelform.name);
                formData.append("hotel_type",this.hotelform.type);
                formData.append("hotel_address",this.hotelform.address);
                formData.append("hotel_func",this.checkedFuncs);
                formData.append("hotel_info",this.hotelform.info);
                formData.append("hotel_img",this.imgsurlb);//存多张图片时，通过添加,作为分隔符，取图片时通过split方法
                formData.append("hotel_video",this.showVideoPath);
                this.$http.post('/hotel/save',formData).then(result => {
                    console.log(formData.getAll("hotel_name"));
                    console.log(result);
                })
            },

            //房间面板
            roomformatter(row, column) {
                return row.address;
            },
            roomfilterTag(value, row) {
                return row.tag === value;
            },
            //房间添加功能标签
            handleClose(tag) {
                this.roomFuncTags.splice(this.roomFuncTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    // this.roomformEdit.room_func.push(inputValue);
                    this.roomFuncTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //图片移除
            handleImgRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleImgPreview(file) {
                console.log(file);
            },
            //房间图片上传
            handleRoomImgSuccess(res,file){
                let formData = new FormData();
                formData.append("file",file);//这里的name应该与后台获取的MultipartFile参数名一致
                //注意，当直接使用<input type="file">进行文件选择时，才需要这些操作，而我用的el-upload组件有直接封装的一些参数及方法，因此可以不用这些操作
                if(file.response.data!=null){
                    this.roomform.img = file.response.data;//将返回的文件储存路径赋值给img,方便后面提交表单时将此处获取的信息作为表单数据提交到数据库
                    this.roomformEdit.room_img = file.response.data;//将返回的文件储存路径赋值给img,方便后面提交表单时将此处获取的信息作为表单数据提交到数据库
                    // alert(this.roomform.img);
                }
                else {
                    alert("发生错误")
                }
            },
            //房间添加
            addRoom(){
                this.roomDialogVisible = false;
                let formData = new FormData();
                //formData.append可以直接添加之前未声明的字段，这里的name与数据库中的字段名对应
                formData.append("room_number",this.roomform.number);
                formData.append("room_type",this.roomform.type);
                formData.append("room_func",this.roomFuncTags);
                formData.append("room_price",this.roomform.price);
                formData.append("room_size",this.roomform.size);
                formData.append("room_capacity",this.roomform.capacity);
                formData.append("room_img",this.roomform.img);
                formData.append("room_state",this.roomform.state);
                formData.append("hotel_name",this.hotelform.name);
                this.$http.post('/room/roomsave',formData).then(result => {
                    console.log(formData.getAll("room_number"));
                    console.log(result);
                })
            },
            //房间编辑
            roomhandleEdit(index, row) {
                console.log(index, row);
                this.roomformEdit.id = index;
                // this.roomformEdit.number = row.room_number;
                // this.roomformEdit.type = row.room_type;
                // this.roomFuncTags = row.room_func;
                // this.roomformEdit.price = row.room_price;
                // this.roomformEdit.size = row.room_size;
                // this.roomformEdit.capacity = row.room_capacity;
                // this.roomformEdit.img =row.room_img;
                // this.roomformEdit.state = row.room_state;

                this.roomformEdit = row;
                this.roomformEdit.img ='data:image/png;base64,'+ row.room_img;
                this.roomformEdit.room_func = '';
                for(var i in this.roomFuncTags){
                    this.roomformEdit.room_func =this.roomformEdit.room_func + ','+ this.roomFuncTags[i] ;
                }
                this.roomformEdit.hotel_id = 2;
                console.log(this.roomformEdit)
                this.roomEditDialogVisible = true;
            },
            updateRoom(){
                axios.put('/room/update',this.roomformEdit).then(resp =>{
                    console.log(resp)
                });
                this.roomEditDialogVisible = false;
            },
            //房间删除
            roomhandleDelete(index, row) {
                console.log(index, row.room_id);
                axios.delete('/room/deleteById/'+row.room_id).then(resp => {
                    console.log(resp);
                    window.location.reload();//动态刷新
                })
            },
        },
    }
</script>

<style scoped>
    .box-card{
        width: 40%;
    }
    .img{
        width: 100%;
        height: 150px;
    }
    .el-table{
        color: burlywood;
    }
    video{
        width: 90%;
    }
</style>
