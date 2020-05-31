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
                        action="http://127.0.0.1:8099/hotel/uploadImgs"
                        list-type="picture-card"
                        multiple
                        :auto-upload="false"
                        :http-request="uploadImgReq">
                    <i class="el-icon-plus"></i>
                </el-upload>
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
                hotelform:{},
                imgfiles:""
            }
        },
        methods: {
            uploadImgReq(file){
                this.imgfiles.append('file',file.file);
            },
            hotelAddSubmit(){
                this.imgfiles = new FormData();
                this.$refs.hotelImgFile.submit();
                this.imgfiles.append('WS_CODE',"12133");
                let config = {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }
                axios.post("/hotel/uploadImgs",this.imgfiles,config).then(res => {
                    console.log(res)
                }).catch(res => {
                    console.log(res)
                })
            }
        }
    }
</script>
<style scoped>

</style>
