<template>
    <div class="hotelmanage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="酒店详情" name="first">
                <el-button type="primary" icon="el-icon-plus" circle style="float: right" @click="hotelDialogVisible=true"></el-button>
<!--                <el-button type="primary" icon="el-icon-plus" circle style="float: right" @click="hotelAddDialogVisible=true"></el-button>-->
                <el-card class="box-card" v-for="(item1,index) in hotelData" style="float: left;margin-right: 30px">
                    <div slot="header" class="clearfix">
                        <span>酒店详情</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="deleteHotel(item1)">删除</el-button>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="editHotelItem(index,item1)">修改</el-button>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="seeHotel(item1)">查看酒店</el-button>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="seeRoom(item1)">查看房间</el-button>
                    </div>
                    <div class="img">
                        <el-carousel height="150px">
                        <el-carousel-item v-for="url in item1.imgs" :key="url" v-if="url">
                            <img :src="'data:image/jpeg;base64,'+url" fit="contain" style="height: 150px;width: 100%"/>
                        </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div style="padding-top: 14px;margin-top:10px;color: #2c3e50">
                        <span class="clearfix">{{item1.hotel_name}}</span>
                        <span class="clearfix" style="float: right">{{item1.hotel_grade}}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ item1.hotel_address }}</time>
                        </div>
                    </div>
                <!--酒店信息查看-->
                    <el-dialog title="酒店信息" :visible.sync="hotelLookDialogVisible">
                        <div class="message">
                          <el-table :data="hotelDataItem" style="width: 100%">
                              <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="酒店名称">
                                        <span>{{ props.row.hotel_name }}</span>
                                    </el-form-item>
                                    <el-form-item label="酒店类型">
                                        <span>{{ props.row.hotel_type }}</span>
                                    </el-form-item>
                                    <el-form-item label="所在城市">
                                        <span>{{ props.row.hotel_area }}</span>
                                    </el-form-item>
                                    <el-form-item label="详细地址">
                                        <span>{{ props.row.hotel_address }}</span>
                                    </el-form-item>
                                    <el-form-item label="提供服务">
                                        <span>{{ props.row.hotel_func }}</span>
                                    </el-form-item>
                                    <el-form-item label="酒店评分">
                                        <span>{{ props.row.hotel_address }}</span>
                                    </el-form-item>
                                    <el-form-item label="酒店描述">
                                        <span>{{ props.row.hotel_info }}</span>
                                    </el-form-item>
                                    <el-form-item label="酒店视频">
                                        <!-- <span>{{ props.row.video }}</span> -->
<!--                                        <span><video controls autoplay :src="showVideoPath"></video></span>-->
                                        <span><video controls autoplay :src="props.row.hotel_video"></video></span>
                                    </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column label="" prop="name"></el-table-column>
                            <el-table-column label="" prop="type"></el-table-column>
                            <el-table-column label="" prop="grade"></el-table-column>
                        </el-table>
                    </div>
                    </el-dialog>
                </el-card>
                <!-- 酒店信息修改/添加 -->
                <el-dialog title="酒店信息" :visible.sync="hotelDialogVisible">
                        <el-form :model="hotelform" ref="hotelData">
                           <el-form-item label="酒店名称" :label-width="formLabelWidth">
                               <el-input v-model="hotelform.hotel_name" autocomplete="off"></el-input>
                           </el-form-item>
                           <el-form-item label="酒店类型" :label-width="formLabelWidth">
                               <el-select v-model="hotelform.hotel_type" placeholder="请选择酒店类型">
                                   <el-option label="经济型" value="经济型"></el-option>
                                   <el-option label="标准型" value="标准型"></el-option>
                                   <el-option label="商务型" value="商务型"></el-option>
                                   <el-option label="度假型" value="度假型"></el-option>
                                   <el-option label="豪华型" value="豪华型"></el-option>
                               </el-select>
                           </el-form-item>
                           <el-form-item label="所在城市" :label-width="formLabelWidth">
                               <city v-model="hotelform.hotel_area" v-on:areachange="getCity($event)"></city>
<!--                               <el-input v-model="hotelform.hotel_area" autocomplete="off"></el-input>-->
                           </el-form-item>
                           <el-form-item label="详细地址" :label-width="formLabelWidth">
                               <el-input id="myInput" aria-placeholder="请输入位置或自动定位" v-model="hotelform.hotel_address"></el-input>
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
                               <el-input type="textarea" v-model="hotelform.hotel_info"></el-input>
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
                        <el-button type="primary" @click="addHotel">添加</el-button>
                        <el-button type="primary" @click="updateHotel">修改</el-button>
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
                            :filters="[{ text: '空闲', value: '空闲' }, { text: '已入住', value: '已入住' }, { text: '维修中', value: '维修中' }]"
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
                                <el-option label="维修中" value="维修中"></el-option>
                                <el-option label="空闲" value="空闲"></el-option>
                                <el-option label="待入住" value="待入住"></el-option>
                                <el-option label="已入住" value="已入住"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="roomAddDialogVisible = false">取 消</el-button>
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
                                <el-option label="维修中" value="维修中"></el-option>
                                <el-option label="空闲" value="空闲"></el-option>
                                <el-option label="待入住" value="待入住"></el-option>
                                <el-option label="已入住" value="已入住"></el-option>
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
    import city from "../../components/common/citySelect/city"
    import BaiDuMap from "../../components/common/baidumap/BaiDuMap";
    const funcOptions = ['WiFi','停车位','行李寄存','淋浴室'];
    export default {
        name: 'hotelManage',
        components:{
            BaiDuMap,
            city
        },
        data(){
            return{
                activeName:'first',//控制面板
                hotelDialogVisible :false,//酒店添加及修改表单
                hotelLookDialogVisible :false,//酒店查看表单
                formLabelWidth: '120px',//酒店修改表单标签宽度
                //酒店展示数据
                hotelData: [
                    {hotel_id:1,hotel_name: '如家酒店', hotel_type: '', hotel_area: '', hotel_address: '上海市普陀区真北路', hotel_func: 'WiFi|停车位|行李寄存|淋浴室', hotel_grade: 4.1, hotel_info:'', hotel_img:'', hotel_video:'',imgs:[]},
                    // {id:2,name: '你好酒店', type: '', area: '', address: '上海市普陀区真北路', func: 'WiFi|停车位|行李寄存|淋浴室', grade: 4.1, info:'', img:'', video:'',},
                    // {id:2,name: '你好酒店', type: '', area: '', address: '上海市普陀区真北路', func: 'WiFi|停车位|行李寄存|淋浴室', grade: 4.1, info:'', img:'', video:'',}
                ],
                //某酒店数据
                hotelDataItem:[],
                //多图片轮播展示
                imgsurl:[],
                //多图片用","分割地址
                imgsurlb:[],
                //酒店修改表单
                hotelform:{hotel_name:'如家'},
                hotelformid:null,
                hotelgrade:null,
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
                inputValue: '',
                //用于控制得到当点击哪个酒店时，对应进入的是哪个酒店的房间添加功能
                hotel_id:'',
            }
        },
        mounted:function(){
            this.getHotel();
        },
        methods: {
            getCity(event){
                this.hotelform.hotel_area = event;
                console.log(event)
                // alert(this.destarea)
            },
            //获取所有酒店信息
            getHotel(){
                const _that = this;
                const id = parseInt(window.sessionStorage.getItem('userId'));
                console.log(typeof id);
                axios.get('/hotel/adminhotellist/'+ id).then(resp =>{
                    _that.hotelData = resp.data.data;
                    //有多张图片时，取第一张作为封面，存入时添加,分隔，取出时通过split方法取
                    for(let i=0;i<_that.hotelData.length;i++) {
                        let imgsa = resp.data.data[i].hotel_img
                        _that.hotelData[i].imgs = (imgsa || "").split(',');//传过来可能有空值
                        // for(let j=0;j<imgsb.length;j++) {
                        //     _that.hotelData[i].hotel_img = "data:image/jpeg;base64," + imgsb[0];//后端返回的是一个base64编码格式的图片文件时，想把它渲染到前端页面上，需要在前面增加，详见https://blog.csdn.net/kukudehui/article/details/80409522
                        // }
                        // _that.hotelData[i].hotel_video ='data:video/mp4;base64,'+ resp.data.data.hotel_video
                        // _that.showVideoPath='data:video/mp4;base64,'+ resp.data.data.hotel_video
                    }
                    console.log(_that.hotelData[i].imgs.length);
                    console.log(_that.hotelData);
                })
            },
            // 控制面板的转换，进入哪个菜单面板项
            handleClick(tab, event) {
                console.log(tab, event);
                if(tab.index === "1"){
                    //进入房间列表面板，可以展示房间列表
                    // const _this = this;
                    // axios.get('/room/roomlist').then(resp => {
                    //     _this.roomData = resp.data;
                    //     _this.roomData.hname = _this.hotelData.name;
                    //     console.log(_this.roomData)
                    // })
                }
            },
            //点击具体查看某个酒店对应的房间
            seeRoom(item){
                this.activeName = 'second';
                this.hotel_id = item.hotel_id;
                const _this = this;
                axios.get('/room/roomlist/'+this.hotel_id).then(resp => {
                    _this.roomData = resp.data.data;
                    // _this.roomData.hname = _this.hotelData.name;
                    console.log(_this.roomData)
                })
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
            //编辑酒店时传值
            editHotelItem(index,item){
                // alert(item.hotel_id)
                this.hotelformid = item.hotel_id;
                this.hotelgrade = item.hotel_grade;
                this.hotelform = item;
                this.hotelDialogVisible = true;
            },
            // 修改酒店信息
            updateHotel(){
                this.hotelDialogVisible = false;
                let formData = new FormData();
                //formData.append可以直接添加之前未声明的字段，这里的name与数据库中的字段名对应
                // this.hotelform.id=34;
                console.log(this.hotelformid);
                formData.append("hotel_id",this.hotelformid);
                formData.append("hotel_name",this.hotelform.hotel_name);
                formData.append("hotel_type",this.hotelform.hotel_type);
                formData.append("hotel_address",this.hotelform.hotel_address);
                formData.append("hotel_area",this.hotelform.hotel_area);
                formData.append("hotel_func",this.checkedFuncs);
                formData.append("hotel_grade",this.hotelgrade);
                formData.append("hotel_info",this.hotelform.hotel_info);
                formData.append("hotel_img",this.imgsurlb);//存多张图片时，通过添加,作为分隔符，取图片时通过split方法
                formData.append("hotel_video",this.showVideoPath);
                formData.append("admin_id",window.sessionStorage.getItem('userId'));
                this.$http.put('/hotel/update',formData).then(result => {
                    console.log(formData.getAll("hotel_name"));
                    console.log(result);
                })
            },
            //查看某酒店
            seeHotel(item){
                this.hotelDataItem = [];
                this.hotelDataItem.push(item);
                this.hotelLookDialogVisible = true;
            },
            //添加酒店
            addHotel(){
                let hgrade = 5.0;
                this.hotelData.push(this.hotelform);
                this.hotelDialogVisible = false;
                let formData = new FormData();
                //formData.append可以直接添加之前未声明的字段，这里的name与数据库中的字段名对应
                formData.append("hotel_name",this.hotelform.hotel_name);
                formData.append("hotel_type",this.hotelform.hotel_type);
                formData.append("hotel_address",this.hotelform.hotel_address);
                formData.append("hotel_area",this.hotelform.hotel_area);
                formData.append("hotel_func",this.checkedFuncs);
                formData.append("hotel_info",this.hotelform.hotel_info);
                formData.append("hotel_grade",hgrade);
                formData.append("hotel_img",this.imgsurlb);//存多张图片时，通过添加,作为分隔符，取图片时通过split方法
                formData.append("hotel_video",this.showVideoPath);
                formData.append("admin_id",window.sessionStorage.getItem('userId'));
                this.$http.post('/hotel/save',formData).then(result => {
                    console.log(formData.getAll("hotel_name"));
                    console.log(result);
                })
            },
            //删除酒店
            deleteHotel(item){
                console.log(item.hotel_id);
                axios.delete('/hotel/deleteById/'+item.hotel_id).then(resp => {
                    alert("删除成功");
                    console.log(resp);
                    // window.location.reload();//动态刷新
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
                this.roomAddDialogVisible = false;
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
                formData.append("hotel_id",this.hotel_id);
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
                this.roomformEdit.hotel_id = this.hotel_id;
                console.log(this.roomformEdit)
                this.roomEditDialogVisible = true;
            },
            updateRoom(){
                axios.put('/room/update',this.roomformEdit).then(resp =>{
                    console.log(resp)
                    alert("更新成功！")
                });
                this.roomEditDialogVisible = false;
            },
            //房间删除
            roomhandleDelete(index, row) {
                console.log(index, row.room_id);
                axios.delete('/room/deleteById/'+row.room_id).then(resp => {
                    alert("删除成功");
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
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>














<!--<template>-->
<!--    <div class="hotelmanage">-->
<!--        <el-tabs v-model="activeName" @tab-click="handleClick">-->
<!--            <el-tab-pane label="酒店详情" name="first">-->
<!--                <el-card class="box-card"  v-for="(hotelform,index) in hotelforms" :key="index">-->
<!--                    <div slot="header" class="clearfix">-->
<!--                        <span>酒店详情</span>-->
<!--                        <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>-->
<!--                        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">修改</el-button>-->
<!--                    </div>-->
<!--                    <el-dialog title="酒店详情" :visible.sync="dialogFormVisible">-->
<!--                        <el-form :model="hotelform" ref="hotelform">-->
<!--                            <el-form-item label="酒店名称" :label-width="formLabelWidth">-->
<!--                                <el-input v-model="hotelform.name" autocomplete="off"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="酒店类型" :label-width="formLabelWidth">-->
<!--                                <el-select v-model="hotelform.type" placeholder="请选择酒店类型">-->
<!--                                    <el-option label="经济型" value="jingji"></el-option>-->
<!--                                    <el-option label="标准型" value="biaozhun"></el-option>-->
<!--                                    <el-option label="豪华型" value="haohua"></el-option>-->
<!--                                </el-select>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="酒店位置" :label-width="formLabelWidth">-->
<!--                                <el-input id="myInput" aria-placeholder="请输入位置或自动定位" v-model="hotelform.address"></el-input>-->
<!--                                <a href="javascript:;" id="myGprs">-->
<!--                                    <i class="el-icon-location-outline" @click="getGpsList"/>-->
<!--                                </a>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="详情概览" :label-width="formLabelWidth">-->
<!--                                <el-input type="textarea" v-model="hotelform.info"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="住店须知" :label-width="formLabelWidth">-->
<!--                                <el-input type="textarea" v-model="hotelform.warning"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="酒店图片" :label-width="formLabelWidth">-->
<!--                                <el-upload-->
<!--                                        class="upload-demo"-->
<!--                                        action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                                        :on-preview="handlePreview"-->
<!--                                        :on-remove="handleRemove"-->
<!--                                        :file-list="hotelform.imgs"-->
<!--                                        list-type="picture-card">-->
<!--                                    <el-button size="small" type="primary">点击上传</el-button>-->
<!--                                </el-upload>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="视频介绍" :label-width="formLabelWidth">-->
<!--                                <el-upload class="avatar-uploader el-upload&#45;&#45;text"-->
<!--                                           :action="uploadUrl"-->
<!--                                           :show-file-list="false"-->
<!--                                           accept=".mp4"-->
<!--                                           :on-success="handleVideoSuccess"-->
<!--                                           :before-upload="beforeUploadVideo"-->
<!--                                           :on-progress="uploadVideoProcess">-->
<!--                                    <video v-if="showVideoPath !='' && !videoFlag"-->
<!--                                           :src="showVideoPath"-->
<!--                                           class="avatar video-avatar"-->
<!--                                           controls="controls">您的浏览器不支持视频播放</video>-->
<!--                                    <i v-else-if="showVideoPath =='' && !videoFlag"-->
<!--                                       class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                                    <el-progress v-if="videoFlag == true"-->
<!--                                                 type="circle"-->
<!--                                                 :percentage="videoUploadPercent"-->
<!--                                                 style="margin-top:30px;"></el-progress>-->
<!--                                    <el-button class="video-btn"-->
<!--                                               slot="trigger"-->
<!--                                               size="small"-->
<!--                                               v-if="isShowUploadVideo"-->
<!--                                               type="primary">选取文件</el-button>-->
<!--                                </el-upload>-->
<!--                                <P v-if="isShowUploadVideo" class="text">请保证视频格式正确，且不超过20M</P>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="酒店功能" :label-width="formLabelWidth">-->
<!--                                <el-checkbox :indeterminate="hotelform.isIndeterminate" v-model="hotelform.checkAll" @change="handleCheckAllChange()">全选</el-checkbox>-->
<!--                                <div style="margin: 15px 0;"></div>-->
<!--                                <el-checkbox-group v-model="hotelform.checkedFuncs" @change="handleCheckedFuncChange()">-->
<!--                                    <el-checkbox v-for="item in hotelform.func" :label="item" :key="item">{{item}}</el-checkbox>-->
<!--                                </el-checkbox-group>-->
<!--                            </el-form-item>-->
<!--                        </el-form>-->
<!--                        <div slot="footer" class="dialog-footer">-->
<!--                            <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--                            <el-button type="primary" @click="hotelformAddSubmit(index)">确 定</el-button>-->
<!--                        </div>-->
<!--                    </el-dialog>-->

<!--                    <div class="text item">-->
<!--                        <el-collapse accordion>-->
<!--                            <el-collapse-item>-->
<!--                                <template slot="title">-->
<!--                                    酒店名称<i class="header-icon el-icon-info"></i>-->
<!--                                </template>-->
<!--                                <div>{{hotelform.name}}</div>-->
<!--                            </el-collapse-item>-->
<!--                            <el-collapse-item title="酒店类型">-->
<!--                                <div>{{hotelform.type}}</div>-->
<!--                            </el-collapse-item>-->
<!--                            <el-collapse-item title="酒店地址">-->
<!--                                <div>{{hotelform.address}}</div>-->
<!--                            </el-collapse-item>-->
<!--                            <el-collapse-item title="酒店服务">-->
<!--                                <div>{{hotelform.checkedFuncs}}</div>-->
<!--                            </el-collapse-item>-->
<!--                            <el-collapse-item title="酒店详情">-->
<!--                                <div>{{hotelform.info}}</div>-->
<!--                            </el-collapse-item>-->
<!--                            <el-collapse-item title="住店须知">-->
<!--                                <div>{{hotelform.warning}}</div>-->
<!--                            </el-collapse-item>-->
<!--                            <el-collapse-item title="酒店图片">-->
<!--                                <div><span v-for="imgg in hotelform.imgs" style="margin-right: 20px"><el-avatar shape="square" :size="100" fit="fill" :src="imgg.url"></el-avatar></span></div>-->
<!--                            </el-collapse-item>-->
<!--                            <el-collapse-item title="视频介绍">-->
<!--                                <div><video v-if="showVideoPath !='' && !videoFlag" :src="showVideoPath" class="avatar video-avatar" controls="controls">您的浏览器不支持视频播放</video></div>-->
<!--                            </el-collapse-item>-->
<!--                        </el-collapse>-->
<!--                    </div>-->
<!--                </el-card>-->
<!--                <el-button type="text" @click="dialogFormVisible = true">新增酒店</el-button>-->


<!--                &lt;!&ndash;点击定位按钮弹框定位&ndash;&gt;-->
<!--                <el-dialog title="地图定位" :visible.sync="mapDialog" width="930px">-->
<!--                    &lt;!&ndash;                    <div id="baidumap">&ndash;&gt;-->
<!--                    <BaiDuMap></BaiDuMap>-->
<!--                    &lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                    <span slot="footer" class="dialog-footer">-->
<!--                        <el-button @click="mapDialog = false">取消</el-button>-->
<!--                        <el-button type="primary" @click="getAddress">确定</el-button>-->
<!--                    </span>-->
<!--                </el-dialog>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="房间列表" name="second">-->
<!--                <el-button @click="clearFilter">清除所有过滤器</el-button>-->
<!--                <el-table-->
<!--                        ref="filterTable"-->
<!--                        :data="tableData"-->
<!--                        style="width: 100%">-->
<!--                    <el-table-column-->
<!--                            prop="date"-->
<!--                            label="日期"-->
<!--                            sortable-->
<!--                            width="180"-->
<!--                            column-key="date"-->
<!--                            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"-->
<!--                            :filter-method="filterHandler"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="name"-->
<!--                            label="姓名"-->
<!--                            width="180">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="address"-->
<!--                            label="地址"-->
<!--                            :formatter="formatter">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="tag"-->
<!--                            label="标签"-->
<!--                            width="100"-->
<!--                            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"-->
<!--                            :filter-method="filterTag"-->
<!--                            filter-placement="bottom-end">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-tag-->
<!--                                    :type="scope.row.tag === '家' ? 'primary' : 'success'"-->
<!--                                    disable-transitions>{{scope.row.tag}}</el-tag>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column label="操作">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button-->
<!--                                    size="mini"-->
<!--                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--                            <el-button-->
<!--                                    size="mini"-->
<!--                                    type="danger"-->
<!--                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                </el-table>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="时间视图" name="third">时间视图</el-tab-pane>-->
<!--            <el-tab-pane label="销量统计" name="fourth">销量统计</el-tab-pane>-->
<!--        </el-tabs>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import BaiDuMap from "../../components/common/baidumap/BaiDuMap";-->
<!--    const funcOptions = ['WiFi','停车位','行李寄存','淋浴室'];-->
<!--    export default {-->
<!--        name: 'hotelManage',-->
<!--        components:{-->
<!--            BaiDuMap-->
<!--        },-->
<!--        data(){-->
<!--            return{-->
<!--                fileoptions:{-->
<!--                    target:'http://localhost:8099/upload',-->
<!--                    testChunks:false,//上传前判断块是否已经存在-->
<!--                    simultaneousUploads:5,//并发数-->
<!--                    chunkSize:8*1024*1024//块大小-->
<!--                },-->



<!--                showVideoPath:"http://static.smartisanos.cn/common/video/t1-ui.mp4",-->
<!--                uploadUrl:"",//你要上传视频到你后台的地址-->
<!--                videoFlag:false , //是否显示进度条-->
<!--                videoUploadPercent:"", //进度条的进度，-->
<!--                isShowUploadVideo:false, //显示上传按钮-->
<!--                dialogFormVisible: false,-->
<!--                activeName: 'first',-->
<!--                tableData: [{-->
<!--                    date: '2016-05-02',-->
<!--                    name: '王小虎',-->
<!--                    address: '上海市普陀区金沙江路 1518 弄',-->
<!--                    tag: '家'-->
<!--                }, {-->
<!--                    date: '2016-05-04',-->
<!--                    name: '王小虎',-->
<!--                    address: '上海市普陀区金沙江路 1517 弄',-->
<!--                    tag: '公司'-->
<!--                }, {-->
<!--                    date: '2016-05-01',-->
<!--                    name: '王小虎',-->
<!--                    address: '上海市普陀区金沙江路 1519 弄',-->
<!--                    tag: '家'-->
<!--                }, {-->
<!--                    date: '2016-05-03',-->
<!--                    name: '王小虎',-->
<!--                    address: '上海市普陀区金沙江路 1516 弄',-->
<!--                    tag: '公司'-->
<!--                }],-->
<!--                hotelforms: [{-->
<!--                    name: '',-->
<!--                    type:'',-->
<!--                    area: '',-->
<!--                    info: '',-->
<!--                    warning: '',-->
<!--                    imgs: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},-->
<!--                        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],-->
<!--                    video:'',-->
<!--                    func:funcOptions,-->
<!--                    checkAll: true,-->
<!--                    checkedFuncs: ['WiFi', '停车位'],-->
<!--                    isIndeterminate: true,-->


<!--                    // 地图弹框的数据源-->
<!--                    address: null, //详细地址-->
<!--                    userlocation: {lng: "", lat: ""},-->
<!--                }],-->
<!--                // 地图弹框-->
<!--                mapDialog: false,-->
<!--                // t地图弹框的数据源-->
<!--                dizhiMap: '',-->
<!--                formLabelWidth: '120px'-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            //视频上传-->
<!--            complete(){-->
<!--                console.log('complete',arguments);-->
<!--            },-->
<!--            fileComplete(){-->
<!--                console.log('file complete',arguments)-->
<!--                const file = arguments[0].file-->
<!--                let url = 'http://localhost:8099/upload/merge?filename=' + file.name +'&guid=' + arguments[0].uniqueIdentifier-->
<!--                this.$axios.get(url).then(function(response){-->
<!--                    console.log(response)-->
<!--                }).catch(function(error){-->
<!--                    console.log(error)-->
<!--                })-->
<!--            },-->



<!--            //地图弹框定位-->
<!--            getGpsList () {-->
<!--                var th = this-->
<!--                this.mapDialog = true-->
<!--                this.$nextTick(function () {-->
<!--                    var th = this-->
<!--                    // 创建Map实例-->
<!--                    var map = new BMap.Map("allmap");-->
<!--                    // 初始化地图,设置中心点坐标，-->
<!--                    var point = new BMap.Point(121.160724,31.173277); // 创建点坐标，汉得公司的经纬度坐标-->
<!--                    map.centerAndZoom(point, 15);-->
<!--                    map.enableScrollWheelZoom();-->
<!--                    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象-->
<!--                        {-->
<!--                            "input": "suggestId"-->
<!--                            , "location": map-->
<!--                        })-->
<!--                    var myValue-->
<!--                    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件-->
<!--                        var _value = e.item.value;-->
<!--                        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;-->
<!--                        th.hotelform.address = myValue-->
<!--                        setPlace();-->
<!--                    });-->

<!--                    function setPlace() {-->
<!--                        map.clearOverlays();    //清除地图上所有覆盖物-->
<!--                        function myFun() {-->
<!--                            th.hotelform.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果-->
<!--                            map.centerAndZoom(th.hotelform.userlocation, 18);-->
<!--                            map.addOverlay(new BMap.Marker(th.hotelform.userlocation));    //添加标注-->
<!--                        }-->

<!--                        var local = new BMap.LocalSearch(map, { //智能搜索-->
<!--                            onSearchComplete: myFun-->
<!--                        });-->
<!--                        local.search(myValue);-->

<!--                        //测试输出坐标（指的是输入框最后确定地点的经纬度）-->
<!--                        map.addEventListener("click",function(e){-->
<!--                            //经度-->
<!--                            console.log(th.hotelform.userlocation.lng);-->
<!--                            //维度-->
<!--                            console.log(th.hotelform.userlocation.lat);-->

<!--                        })-->
<!--                    }-->

<!--                })-->
<!--            },-->
<!--            getAddress () {-->
<!--                this.mapDialog = false-->
<!--            },-->
<!--            async hotelformAddSubmit (index) {-->
<!--                // if (this.hotelforms[index].address === '') {-->
<!--                //     this.$message.error('请选择地址')-->
<!--                //     return-->
<!--                // }-->
<!--                this.dialogFormVisible = false-->
<!--                let res = await this.$http.post('/hotel/hotellist', {-->
<!--                    address: this.addobjequipment.address,-->
<!--                    latitude: this.addobjequipment.latitude,-->
<!--                    longitude: this.addobjequipment.longitude-->
<!--                })-->
<!--                console.log(res)-->
<!--                var data = res.data-->
<!--                if (res.status === 200) {-->
<!--                    if (data.success === true) {-->
<!--                        this.$message({-->
<!--                            message: data.results,-->
<!--                            type: 'success'-->
<!--                        })-->
<!--                        this.getStreetList()-->
<!--                        this.cancelAddobj()-->
<!--                    } else {-->
<!--                        this.$message.error(data.msg)-->
<!--                    }-->
<!--                } else {-->
<!--                    this.$message.error(data.results)-->
<!--                }-->
<!--            },-->
<!--            //全选-->
<!--            handleCheckAllChange(val) {-->
<!--                if(this.hotelforms[index].checkAll){-->
<!--                    this.hotelforms[index].checkedFuncs = funcOptions;-->
<!--                }-->
<!--                else{-->
<!--                    this.hotelforms[index].checkedFuncs =[];-->
<!--                }-->
<!--                this.hotelforms[index].checkedFuncs = val ? funcOptions : [];-->
<!--                this.hotelforms[index].isIndeterminate = false;-->
<!--            },-->
<!--            handleCheckedFuncChange(index) {-->
<!--                let checkedCount = value.length;-->
<!--                this.hotelforms[index].checkAll = checkedCount === this.hotelforms[index].func.length;-->
<!--                this.hotelforms[index].isIndeterminate = checkedCount > 0 && checkedCount < this.hotelforms[index].func.length;-->
<!--            },-->
<!--            //上传前回调-->
<!--            beforeUploadVideo (file) {-->
<!--                const isLt20M = file.size / 1024 / 1024 < 20;-->
<!--                if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'-->
<!--                    this.$message.error('请上传正确的视频格式');-->
<!--                    return false;-->
<!--                }-->
<!--                if (!isLt20M) {-->
<!--                    this.$message.error('上传视频大小不能超过20MB哦!');-->
<!--                    return false;-->
<!--                }-->
<!--                this.isShowUploadVideo = false;-->
<!--            },-->
<!--            //进度条-->
<!--            uploadVideoProcess (event, file, fileList) {-->
<!--                this.videoFlag = true;-->
<!--                this.videoUploadPercent = file.percentage.toFixed(0) * 1;-->
<!--            },-->
<!--            //上传成功回调-->
<!--            handleVideoSuccess (res, file) {-->
<!--                this.isShowUploadVideo = true;-->
<!--                this.videoFlag = false;-->
<!--                this.videoUploadPercent = 0;-->
<!--                if (res.errorCode == "00") {-->
<!--                    this.showVideoPath = res.sprbody.urlAddress;-->
<!--                    // this.videoForm.showVideoPath = res.data.uploadUrl;-->
<!--                } else {-->
<!--                    this.$message.error('视频上传失败，请重新上传！');-->
<!--                }-->
<!--            },-->

<!--            handleRemove(file, fileList) {-->
<!--                console.log(file, fileList);-->
<!--            },-->
<!--            handlePreview(file) {-->
<!--                console.log(file);-->
<!--            },-->
<!--            handleClick(tab, event) {-->
<!--                console.log(tab, event);-->
<!--            },-->
<!--            clearFilter() {-->
<!--                this.$refs.filterTable.clearFilter();-->
<!--            },-->
<!--            formatter(row, column) {-->
<!--                return row.address;-->
<!--            },-->
<!--            filterTag(value, row) {-->
<!--                return row.tag === value;-->
<!--            },-->
<!--            filterHandler(value, row, column) {-->
<!--                const property = column['property'];-->
<!--                return row[property] === value;-->
<!--            },-->
<!--            handleEdit(index, row) {-->
<!--                console.log(index, row);-->
<!--            },-->
<!--            handleDelete(index, row) {-->
<!--                console.log(index, row);-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    ul,li{list-style: none;}-->
<!--    #allmap{-->
<!--        width: 100%;-->
<!--        height: 400px;-->
<!--        font-family: "微软雅黑";-->
<!--        border:1px solid green;-->
<!--    }-->
<!--    #suggestId{-->
<!--        width: 100%;-->
<!--    }-->
<!--    .el-collapse-item{-->
<!--        margin-top: 10px;-->
<!--    }-->
<!--    .avatar-uploader .el-upload {-->
<!--        border: 1px dashed #d9d9d9;-->
<!--        border-radius: 6px;-->
<!--        cursor: pointer;-->
<!--        position: relative;-->
<!--        overflow: hidden;-->
<!--    }-->
<!--    .avatar-uploader .el-upload:hover {-->
<!--        border-color: #409eff;-->
<!--    }-->
<!--    .avatar-uploader-icon {-->
<!--        font-size: 28px;-->
<!--        color: #8c939d;-->
<!--        width: 178px;-->
<!--        height: 178px;-->
<!--        line-height: 178px;-->
<!--        text-align: center;-->
<!--    }-->
<!--    .avatar {-->
<!--        width: 178px;-->
<!--        height: 178px;-->
<!--        display: block;-->
<!--    }-->
<!--    .video-avatar {-->
<!--        width: 400px;-->
<!--        height: 200px;-->
<!--    }-->

<!--    .el-tabs{-->
<!--        /*background-color: white;*/-->
<!--    }-->
<!--    .text {-->
<!--        font-size: 14px;-->
<!--    }-->

<!--    .item {-->
<!--        margin-bottom: 18px;-->
<!--    }-->

<!--    .clearfix:before,-->
<!--    .clearfix:after {-->
<!--        display: table;-->
<!--        content: "";-->
<!--    }-->
<!--    .clearfix:after {-->
<!--        clear: both-->
<!--    }-->
<!--    .box-card {-->
<!--        /*margin: 0 auto;*/-->
<!--        /*width: 580px;*/-->
<!--        width: 380px;-->
<!--        /*height: 700px;*/-->
<!--        height: 600px;-->
<!--        overflow-y: auto;-->
<!--        float: left;-->
<!--    }-->
<!--</style>-->

