<!--  -->
<template>
  <div class="perfectImformation" style="background:transparent;width:90%;height: 90%;position: absolute;top: 0%;left: 10%;border-radius: 6px;">
    <div id="myImage" style="position: absolute;background:transparent;left: 560px;top: 80px;height:448px">
<!--      <div style="background: beige;width: 300px;border-radius: 5px;float: right;height: 400px;margin-top: 15%;box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;">-->
<!--        <div class="tips" style="float: right;margin-right: 75px;">-->
          <el-tooltip class="item" effect="dark" content="点击上传头像" placement="right">
            <el-button style="border:none;position:absolute;left:81px;top:116px;z-index: 100">
              <el-upload
                      class="avatar-uploader"
                      action="/api/perfectInformation"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      style="border:0px;cursor: pointer;position: relative;overflow: hidden;width: 150px;z-index: 100">
                <img :src="personalInfor.imageUrl?personalInfor.imageUrl:require('../../assets/img/my_head.png')"
                     v-if="false" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
<!--               预览的图片-->
              <div class="file-image">
                <img src="../../assets/img/my_head.png" alt="" id='image' style="width: 150px;height: 150px;border-radius: 75px;position: absolute;left: 11%;top: 14%;" name="getImage">
              </div>

<!--              &lt;!&ndash; 添加图片 &ndash;&gt;-->
<!--              <div class="file-btn" >-->
<!--                <input type="file" @change="addImage" id="file" name="img" style="border:none;width:150px;height:150px;position:absolute;top:40px;left:800px">-->
<!--              </div>-->
            </el-button>
          </el-tooltip>
<!--        </div>-->
    </div>

    <div style="width: 60px;height: 60px;background: #ffc77a;border-radius: 4px;position: relative;top: 17%;z-index: 100;left: 26%;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
    </div>
    <el-card style="position: relative;width: 50%;margin:7% auto">
      <el-form :model="personalInfor" status-icon  ref="personalInfor" label-width="100px" v-show="myInfor">
        <el-form-item label="账号">
          <span>{{personalInfor.user_name}}</span>
        </el-form-item>
        <el-form-item label="真实名称" prop="nickname">
          <el-input v-model.number="personalInfor.user_realname" size="small" style="width:200px"></el-input>
        </el-form-item>
          <el-form-item label="邮箱" prop="nickname">
              <el-input v-model.number="personalInfor.user_email" size="small" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="nickname">
              <el-input v-model.number="personalInfor.user_card" size="small" style="width:200px"></el-input>
          </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model.number="personalInfor.user_tel" size="small" style="width:200px"></el-input>
        </el-form-item>
          <el-form-item label="支付账号" prop="phone">
              <el-input v-model.number="personalInfor.user_payaccount" size="small" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="支付密码" prop="phone">
              <el-input v-model.number="personalInfor.user_paypsd" size="small" style="width:200px"></el-input>
          </el-form-item>
        <el-form-item label="角色" prop="sex">
          <el-radio-group v-model="personalInfor.sex">
            <el-radio label="客户" class="pi_font"></el-radio>
            <el-radio label="商家" class="pi_font"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm(personalInfor)" size="small" style="background:#183F76;border-color:#183F76;color:white">提交</el-button>
          <el-button @click="resetForm('personalInfor')" size="small" >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  var file;
  export default {
    name:'Profile',
    data() {
      return {
        calendarInvisible:'false',
        settingName:'',
        settingMessage:'',
        settingUser:'',
        linkChange:false,
        myInfor:true,
        personalInfor: {
          email:'',
          nickname: '',
          sex: '',
          address: '',
          phone:'',
          desc:''

        },
        avatar:null
      };
    },
    methods: {
      setImage () {
        let that = this;
        event.preventDefault();
        var canvas2 = document.createElement("canvas");
        let _canvas = document.getElementById('myImage');
        var w = parseInt(window.getComputedStyle(_canvas).width);
        var h = parseInt(window.getComputedStyle(_canvas).height);
        //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
        canvas2.width = w * 3;
        canvas2.height = h * 3;
        canvas2.style.width = w + "px";
        canvas2.style.height = h + "px";
        var context = canvas2.getContext("2d");
        context.scale(2,2);
        // html2canvas(document.getElementById('myImage'), {
        //   canvas: canvas2
        // }).then(function (canvas) {
        //   var blob = that.getBlob(canvas);
        //     FileSaver.saveAs(
        //       new Blob([blob], { type: "image/png" }),
        //       "我的名片.png"
        //     );
        /*
      var oMyForm = new FormData();
      var fileName = "mobile" + '.jpg'
      oMyForm.append("file", blob, fileName);
      oMyForm.append("fileName", fileName);　　　　
      oMyForm.append("fileType", 'image');
      oMyForm.append("user_id", that.$cookie.get('email'));
      that.uploadFile(that.global.ossservice + "/oss/uploadorgFile", oMyForm).then(res => {
        if (res.data.errorCode != '00') {
          that.$message.error(res.data.errorMsg);
          return;
        }
        return res.data.sprbody.urlAddress;
      });*/

        // });
      },
      getBlob (canvas) { //获取blob对象
        var data = canvas.toDataURL("image/jpeg", 1);
        data = data.split(',')[1];
        data = window.atob(data);
        var ia = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i);
        }
        return new Blob([ia], {
          type: "image/jpeg"
        });
      },
      submitForm(formName) {
        var formData = new FormData();
        formData.append("email",formName.email);
        formData.append("nickname",formName.nickname);
        formData.append("sex",formName.sex);
        formData.append("address",formName.address);
        formData.append("phone",formName.phone);
        formData.append("desc",formName.desc);
        formData.append("avatar",this.avatar);
        //利用ajax上传
        $.ajax({
          type: "post",
          // url:"http://111.231.200.75/api/perfectInformation",
          data: formData,
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function (data) {
            alert("提交成功")
          },
          error: function (jqXHR) {
            alert("提交失败")

          }
        })
        /*$.ajax({
                type: "post",
                url:"http://result.eolinker.com/vPQivUyd0a158a0cbce9ce58d576de014bc9334cc568b6f?uri=/api/postImage",
                data: image,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                 alert("提交成功");
                },
                error: function (jqXHR) {
                  alert("提交失败")

                }
            })*/
      },
      changeForm(){
        var icon=$('#btn');
        console.log(icon);
        if(this.myInfor==true)
        {this.myInfor=false;
          icon[0].setAttribute("class","el-button el-icon-arrow-left el-button--default is-circle");
          this.$notify.info({
            title: 'Help',
            message: '设置个人相关信息，管理账号'
          });}
        else
        {this.myInfor=true;
          icon[0].setAttribute("class","el-button el-icon-arrow-right el-button--default is-circle")}

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.personalInfor.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      addImage:function(){
        var file = document.getElementsByName("img")[0].files[0];
        this.avatar = file;
        //console.log(file);
        //添加图片路径到img src中进行预览
        //var src = getObjectURL(file);
        //$('#').hide().attr('src', contextPath+'/user/captcha-image.do?'+new Date().getTime()).fadeIn();
        //$('#image').attr('src',src);
        console.log(document.getElementsByName("getImage").src);
        console.log(document.getElementsByName("getImage").src);
        document.getElementsByName("getImage").src=src;
        console.log(document.getElementsByName("getImage").src);
        //不同浏览器下的路径不同
        function getObjectURL(file){
          var url = null;
          if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
          } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          }
          return url;
        }
      },
      switchChange(){
        if(!this.calendarInvisible)
          var formData=new FormData();
        formData.append('state',this.calendarInvisible);
        formData.append('email',this.$cookie.get('email'));
        $.ajax({
          type: "post",
          // url:"/api/postCalendarSetting",
          data:formData,
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function (data) {
            self.$message({
              type: 'success',
              message: '保存成功!'
            });
          },
          error: function (jqXHR) {
            self.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        })
      },
      saveCalendarSetting(){
        this.$confirm('点击确认后链接将无法更改', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var self=this;
          var formData = new FormData();
          formData.append("email",this.$cookie.get('email'));
          formData.append("settingName",this.settingName);
          formData.append("settingMessage",this.settingMessage);
          formData.append("settingLink",this.settingUser);
          //利用ajax上传
          $.ajax({
            type: "post",
            // url:"http://111.231.200.75/api/postCalendarSetting",
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
              self.$message({
                type: 'success',
                message: '保存成功!'
              });
            },
            error: function (jqXHR) {
              self.$message({
                type: 'error',
                message: '保存失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
        });
      }
    },
    mounted(){
      this.$notify.info({
        title: 'Help',
        message: '设置个人相关信息，管理账号'
      });
      //这里是一个坑...
      var self=this;
      var email=this.$cookie.get('email');
      //http://mock.eolinker.com/vPQivUyd0a158a0cbce9ce58d576de014bc9334cc568b6f?uri=/api/getInformation
      // axios.get(`http://111.231.200.75/api/getInformation`,
      // {params:{email:email}}).then(response => {
      //    self.personalInfor=response.data;
      //     $('#image').attr('src',src);
      // });
      //  axios.get(`http://111.231.200.75/api/getCalendarSetting`,
      // {params:{email:this.$cookie.get('email')}}).then(response => {
      //   console.log(response)
      //   this.settingName=response.data.settingName;
      //   this.settingMessage=response.data.settingMessage;
      //   this.settingUser=response.data.settingLink;
      //   this.calendarInvisible=response.data.state;
      //   if(this.settingUser!='')
      //     this.linkChange=true;

      // });
      /*$.ajax({
              type: "get",
              url:"/api/getImage",
              dataType:'json',
              data:{email:email},
              responseType: "blob",
              success: function (data) {
                //console.log(data.avatar)
                if(data.avatar!=null)
                {var imageUrl= window.URL.createObjectURL(new Blob([data.avatar]));
                  $('#image').attr('src',imageUrl)
      }
                else
                { var imageUrl= 'img/default.3a9279f1.jpg';
                $('#image').attr('src',imageUrl)}
              },
              error: function (jqXHR) {
                alert("头像请求失败")

              }
          })*/
      var xhr = new XMLHttpRequest();
      xhr.open("get","/api/getImage",true);
      xhr.responseType = "blob";
      xhr.onload = function() {
        if (this.status == 200) {
          if(this.response){
            var blob = this.response;
            var img = document.getElementsByName('getImage');
            img.onload = function(e) {
              window.URL.revokeObjectURL(img.src);
            };
            var imageUrl = window.URL.createObjectURL(blob);
            document.getElementsByName('getImage').src=imageUrl;}
          else
          { var imageUrl= 'img/default.3a9279f1.jpg';
            document.getElementsByName('getImage').src=imageUrl}}
        else
          alert('头像上传失败');
      }
      xhr.send();
    }
  }
</script>
<style scoped>
  .myInfor{
    color:darkgray;
    display: block;
    margin-top: 10px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color:white;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .tips /deep/ .el-button {
    /*background: beige;*/
    background: white;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    /* background: #fff; */
    border: 1px solid #dcdfe6;
    color: transparent;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 10px;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 5px 5px;
    /* font-size: 14px; */
    border-radius: 4px;
     width: 104px;
    height: 134px;
  }

  .file-image img
  {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .file-btn input
  {
    position: absolute;
    top: -80px;
    left: 60px;
    width: 100%;
    height: 100%;
  }
  .icon {
    width: 30px;
    height: 30px;
    vertical-align: -1.6em;
    fill: blue;
    overflow: hidden;
    margin-left: 15px;
  }
  .file-btn input,#file-image img
  {cursor: pointer;}
  .file-btn input{opacity: 0;z-index: 100;}
  .file-image img{background-color: #ececec;}
  .demo-ruleForm
  {
    position: absolute;
    top:60px;
    left:410px;
  }
  .demo-ruleForm /deep/ .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 18px;
    color: #183F76;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .demo-ruleForm /deep/ .el-radio {
    color: #183F76;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    outline: 0;
  }
</style>
