<template>
    <div>
        <el-form :model="hotelform" ref="hotelformRef">
            <el-form-item label="酒店名称" :label-width="formLabelWidth">
                <el-input v-model="hotelform.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="酒店类型" :label-width="formLabelWidth">
                <el-select v-model="hotelform.type" placeholder="请选择酒店类型">
                    <el-option label="经济型" value="经济型"></el-option>
                    <el-option label="标准型" value="标准型"></el-option>
                    <el-option label="豪华型" value="豪华型"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店位置" :label-width="formLabelWidth">
                <el-input id="myInput" aria-placeholder="请输入位置或自动定位" v-model="hotelform.address"></el-input>
            </el-form-item>
            <el-form-item label="详情概览" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="hotelform.info"></el-input>
            </el-form-item>
            <el-form-item label="住店须知" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="hotelform.warning"></el-input>
            </el-form-item>
            <el-form-item label="酒店图片" :label-width="formLabelWidth">
                <el-upload
                        ref="hotelImgFile"
                        action="http://localhost:8099/hotel/upload"
                        list-type="picture-card"
                        multiple
                        :on-preview="handleImgPreview"
                        :on-remove="handleImgRemove"
                        :on-success="handleImgSuccess" >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="视频介绍" :label-width="formLabelWidth">
                <el-upload class="avatar-uploader el-upload--text"
                           action="http://localhost:8099/hotel/upload"
                           :show-file-list="false"
                           accept=".mp4"
                           :on-success="handleVideoSuccess"
                           :before-upload="beforeUploadVideo"
                           :on-progress="uploadVideoProcess">
                    <video v-if="showVideoPath !='' && !videoFlag"
                           :src="showVideoPath"
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
                <P v-if="isShowUploadVideo"
                   class="text">请保证视频格式正确，且不超过20M</P>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="warning">取 消</el-button>
            <el-button type="primary" @click="hotelAddSubmit()">确 定</el-button>
        </div>
    </div>
</template>

<script>
    const funcOptions = ['WiFi','停车位','行李寄存','淋浴室'];
    export default {
        data() {
            return {
                formLabelWidth: '120px',//表单Label宽度
                //视频参数
                showVideoPath:"http://static.smartisanos.cn/common/video/t1-ui.mp4",//视频路径
                videoFlag:false , //是否显示进度条
                videoUploadPercent:"", //进度条的进度，
                isShowUploadVideo:false, //显示上传按钮

                hotelform:{
                    //酒店功能与全选相关
                    func:funcOptions,
                    checkAll: true,
                    checkedFuncs: ['WiFi', '停车位'],
                    isIndeterminate: true,
                },
            }
        },
        methods: {
            //全选
            handleCheckAllChange(val) {
                if(this.hotelform.checkAll){
                    this.hotelform.checkedFuncs = funcOptions;
                }
                else{
                    this.hotelform.checkedFuncs =[];
                }
                this.hotelform.checkedFuncs = val ? funcOptions : [];
                this.hotelform.isIndeterminate = false;
            },
            handleCheckedFuncChange(val) {
                let checkedCount = value.length;
                this.hotelform.checkAll = checkedCount === this.hotelform.func.length;
                this.hotelform.isIndeterminate = checkedCount > 0 && checkedCount < this.hotelform.func.length;
                this.hotelform.checkedFuncs = val;
            },
            //图片移除
            handleImgRemove(file, fileList) {
                console.log(file, fileList);
            },
            //图片上传成功时的钩子函数
            handleImgSuccess(res,file){
                // console.log(file);
                // console.log(this.hotelform);
                //     //取到图片文件，通过ref关联
                let myFile = this.$refs.hotelImgFile;
                //     // console.log(myFile);
                //     // console.log(myFile.file-list)
                //     // let file = document.getElementById("hotelimgs").files;
                //     // console.log(file);
                //     var file = myFile.files[0];
                //     //let file = myFile.files.item(0);
                //     //let file = myFile.uploadFiles;
                let formData = new FormData();
                //
                formData.append("file",file);//这里的name应该与后台获取的MultipartFile参数名一致
                // formData.append("hotel_name",this.hotelform.name);
                // formData.append("hotel_type",this.hotelform.type);
                // formData.append("hotel_address",this.hotelform.address);
                // // formData.append("hotel_func",this.hotelform.checkedFuncs);
                // formData.append("hotel_info",this.hotelform.info);
                // console.log(formData)
                // axios({
                //     method:'post',
                //     url:'/hotel/upload',
                //     data:formData,
                //     headers:{
                //         'Content-Type':'multipart/form-data'
                //     }
                // }).then((res)=>{
                //     console.log("then");
                //     console.log(res.data);
                //     console.log(res);
                // })
                //   this.$message({
                //       type:'info',
                //       message:'图片上传成功',
                //       duration:6000
                //   });
                //注意，当直接使用<input type="file">进行文件选择时，才需要这些操作，而我用的el-upload组件有直接封装的一些参数及方法，因此可以不用这些操作
                if(file.response.data!=null){
                    this.hotelform.img = file.response.data;//将返回的文件储存路径赋值给img,方便后面提交表单时将此处获取的信息作为表单数据提交到数据库
                    alert(this.hotelform.img);
                }
                else {
                    alert("发生错误")
                }
            },
            handleImgPreview(file) {
                console.log(file);
            },
            //视频处理
            //视频上传前回调
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
            //视频进度条
            uploadVideoProcess (event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
            //视频上传成功回调
            handleVideoSuccess (res, file) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                if (res.errorCode == "00") {
                    this.showVideoPath = res.sprbody.urlAddress;
                    // this.videoForm.showVideoPath = res.data.uploadUrl;
                } else {
                    this.$message.error('视频上传失败，请重新上传！');
                }
            },
            //提交酒店添加表单
            hotelAddSubmit(){
                let formData = new FormData();
                //formData.append可以直接添加之前未声明的字段，这里的name与数据库中的字段名对应
                formData.append("hotel_name",this.hotelform.name);
                formData.append("hotel_type",this.hotelform.type);
                formData.append("hotel_address",this.hotelform.address);
                // formData.append("hotel_func",this.hotelform.checkedFuncs);
                formData.append("hotel_info",this.hotelform.info);
                formData.append("hotel_img",this.hotelform.img);
                this.$http.post('/hotel/save',formData).then(result => {
                    console.log(formData.getAll("hotel_name"));
                    console.log(result);
                    // if(result.body.success){
                    //     //保存成功
                    //     this.$message({
                    //         type:'success',
                    //         message:result.body.message,
                    //         duration:6000
                    //     })
                    // }
                })
            }
        }
    }
</script>
<style scoped>

</style>
