<template>
    <div class="body">
<!--        登录-->
        <div class="login_container" v-if="logincard">
<!--            登录头部区域-->
            <h1>login</h1>
<!--            登录表单区域-->
            <el-form :model="loginform" :rules="loginformRules" ref="loginformRef" label-width="0px" class="form">
<!--                用户名-->
                <el-form-item prop="username">
<!--                    使用阿里图标库之前需要添加iconfont前缀，不然会无法正常显示-->
                    <el-input class="tbx" v-model="loginform.username" prefix-icon="iconfont icons-yonghu" placeholder="请输入用户名"></el-input>
                </el-form-item>
<!--                密码-->
                <el-form-item prop="password">
                    <el-input class="tbx" v-model="loginform.password" prefix-icon="iconfont el-icon-view"  placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-radio v-model="radio" label="1" text-color="#3498bd" class="role">客户</el-radio>
                    <el-radio v-model="radio" label="2" text-color="#3498bd" class="role">商家</el-radio>
                </el-form-item>
                <el-button class="sub" @click="login">登录</el-button>
                <el-button class="subreg" @click="logincard=false">注册</el-button>
<!--                <el-button @click="resetLoginForm">重置</el-button>-->
            </el-form>
        </div>
<!--        注册-->
        <div class="login_container" v-else>
            <!--            注册头部区域-->
            <h1>register</h1>
            <!--            注册表单区域-->
            <el-form :model="registerform" ref="regformRef" label-width="0px" class="form">
                <!--                用户名-->
                <el-form-item prop="username">
                    <!--                    使用阿里图标库之前需要添加iconfont前缀，不然会无法正常显示-->
                    <el-input class="tbx" v-model="registerform.username" prefix-icon="iconfont icons-yonghu" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!--                密码-->
                <el-form-item prop="password">
                    <el-input class="tbx" v-model="registerform.password" prefix-icon="iconfont el-icon-view"  placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
<!--                <el-form-item>-->
<!--                    <el-input class="tbx" v-model="registerform.realname" prefix-icon="iconfont el-icon-view"  placeholder="请输入真实姓名" type="password"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-input class="tbx" v-model="registerform.email" prefix-icon="iconfont el-icon-view"  placeholder="请输入邮箱" type="password"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-input class="tbx" v-model="registerform.card" prefix-icon="iconfont el-icon-view"  placeholder="请输入身份证" type="password"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-input class="tbx" v-model="registerform.tel" prefix-icon="iconfont el-icon-view"  placeholder="请输入联系电话" type="password"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-input class="tbx" v-model="registerform.payaccount" prefix-icon="iconfont el-icon-view"  placeholder="付款/收款账户" type="password"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-input class="tbx" v-model="registerform.paypsd" prefix-icon="iconfont el-icon-view"  placeholder="请输入账户密码" type="password"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item>
                    <el-radio v-model="radio" label="1" text-color="#3498bd" class="role">我是客户</el-radio>
                    <el-radio v-model="radio" label="2" text-color="#3498bd" class="role">我是商家</el-radio>
                </el-form-item>
                <el-button class="sub" @click="logincard=true">登录</el-button>
                <el-button class="subreg" @click="register">注册</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    // import '../../../assets/js/login.js';
    export default {
        name: "Login",
        data(){
            return{
                logincard:true,//控制登录还是注册界面
                radio:'1',
                loginform:{
                    username:'',
                    password:''
                },
                registerform: {
                    username:'',
                    password:''
                },
                //登录表单的验证规则,通过:rules指定规则，通过prop绑定具体规则
                loginformRules:{
                    username:[
                        {required:true,message:'请输入您的用户名',trigger:'blur'},//必须填写该项，若未填写，则提示请输入您的用户名，当失去焦点时触发
                    ],
                    password:[
                        {required:true,message:'请输入密码',trigger:'blur'},//改变时触发
                        {min:3,max:8,message:'长度应在3到8个字符',trigger: 'blur'}
                    ]
                },
            }
        },
        methods:{
            resetLoginForm(){
                //使用重置按钮重置表单，通过ref可以绑定整个表单对象，当获取之后，可以直接进行重置
                //console.log(this);//打印this可以看到this中含有一个$refs，里面绑定了loginformRef,这样就可以拿到整个表单对象了
                this.$refs.loginformRef.resetFields();
            },
            login(){
                const _this = this;
                // console.log(typeof _this.radio)
                //表单在提交之前应该进行预校验，使其满足loginformRules规则
                this.$refs.loginformRef.validate(async valid => {
                    // console.log(valid);
                    if(!valid) return;//如果valid为false，直接不发起请求
                    //由于在axios.js中配置过根路径http://127.0.0.1:8099,所以这里直接使用/about/userList直接挂载到后面即可，另外，即使配置过根路径，这里使用全路径http://127.0.0.1:8099/about/userList也是可行的
                    //这里没有await时，接收到的是一个promise异步，因此可以使用await进行简化，这时紧挨着await的方法应该修饰成一个异步的方法，
                    // 所以前面需要添加async,接收到的直接为promise中的data
                    // const result =await this.$http.post('/user/login',this.loginForm);
                    // console.log(result)
                    // const {data:res} = await this.$http.get('/about/userList',this.loginForm);
                    // console.log(res);
                    // if(res.meta.state!==200){return console.log('登录失败')}
                    // console.log('登录成功')

                   // 另一种写法,注意，这里不能随便更改about
                   //  const {data:res} = await this.$http.post('/admin/login',this.loginForm);
                   //  console.log(res);

                    // var data1 = {
                    //     username:this.loginform.username,
                    //     password:this.loginform.password
                    // }
                    // this.$http({
                    //     method: 'post',
                    //     url: '/user/login' ,
                    //     // data:this.qs.stringify(this.loginform)
                    //     data:this.qs.stringify(data1)
                    // }).then((res) => {
                    //     // console.log(res.data.code);
                    //     if(res.data.code == 200) {
                    //         this.userToken = 'Bearer ' + res.data.token;
                    //         // 将用户token保存到vuex中
                    //         this.changeLogin({ Authorization:this.userToken });
                    //         this.$message.success("登录成功！");
                    //         this.$router.push({path:'/home'});
                    //     }
                    //     else
                    //         this.$message.error("登录失败"+res.data.message);
                    // }).catch((err) => {
                    //     this.$message.error(err);
                    // });

                    let v = _this;
                    let data1 = {
                        'username':v.loginform.username,
                        'password':v.loginform.password
                    }
                    if(parseInt(v.radio) === 1) {
                        this.$http({
                            method: 'post',
                            url: '/user/userlogin',
                            data: data1
                        }).then(function (res) {
                            console.log(res);
                            if (res.data.token != null) {
                                v.userToken = 'Bearer ' + res.data.token;
                                v.userId = res.data.userId;
                                v.userName = res.data.userName;
                                // // 将用户token保存到vuex中
                                // // 与vuex的联调，不记得是不是这样写，有待考证
                                // v.$store.commit('changeLogin',{ Authorization:v.userToken })
                                // // v.changeLogin({ Authorization:v.userToken });
                                // v.$router.push('/home');
                                // v.$message('登录成功');

                                //    1.将登陆成功之后的token保存到客户端的sessionStorage中
                                //       1.1项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
                                //       1.2token只应当在当前网站打开期间，即会话期间生效，所以选择将token保存在sessionStorage而不是localStorage中
                                //       1.3由于采用前后端分离模式，所以采用token方式存储，不分离时，推荐使用cookie和session
                                //     window.sessionStorage.setItem("token",res.data.data);
                                window.sessionStorage.setItem("token", v.userToken);
                                window.sessionStorage.setItem("userId", v.userId);
                                window.sessionStorage.setItem("userName", v.userName);
                                window.sessionStorage.setItem("role", 'user');
                                //    2.通过编程式导航跳转到主页
                                v.$router.push('/home')
                                v.$message('登录成功');
                            } else {
                                v.$message('密码或用户名错误');
                            }
                        }).catch(function (err) {
                            console.log("err", err);
                            v.$message('用户名或密码错误');
                        })
                    }else{
                        this.$http({
                            method: 'post',
                            url: '/user/adminlogin',
                            data: data1
                        }).then(function (res) {
                            console.log(res);
                            if (res.data.token != null) {
                                v.userToken = 'Bearer ' + res.data.token;
                                v.userId = res.data.userId;
                                v.userName = res.data.userName;
                                // // 将用户token保存到vuex中
                                // // 与vuex的联调，不记得是不是这样写，有待考证
                                // v.$store.commit('changeLogin',{ Authorization:v.userToken })
                                // // v.changeLogin({ Authorization:v.userToken });
                                // v.$router.push('/home');
                                // v.$message('登录成功');

                                //    1.将登陆成功之后的token保存到客户端的sessionStorage中
                                //       1.1项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
                                //       1.2token只应当在当前网站打开期间，即会话期间生效，所以选择将token保存在sessionStorage而不是localStorage中
                                //       1.3由于采用前后端分离模式，所以采用token方式存储，不分离时，推荐使用cookie和session
                                //     window.sessionStorage.setItem("token",res.data.data);
                                window.sessionStorage.setItem("token", v.userToken);
                                window.sessionStorage.setItem("userId", v.userId);
                                window.sessionStorage.setItem("userName", v.userName);
                                window.sessionStorage.setItem("role", 'admin');
                                //    2.通过编程式导航跳转到主页
                                v.$router.push('/home')
                                v.$message('登录成功');
                            } else {
                                v.$message('密码或用户名错误');
                            }
                        }).catch(function (err) {
                            console.log("err", err);
                            v.$message('您的角色不对，操作失败！');
                        })
                    }
                })
            },
            register(){

            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .body{
        height: 100vh;
        /* 设置窗口高度 */
        display: flex;
        /* 伸缩盒子模型 */
        justify-content: center;
        align-items:center;
        /* 这两个属性让body里面的子类居中 */
        /*background-color: #2c3e50;*/
        background-color: #EFEFE0;
    }
    .login_container{
        display: flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        width: 300px;
        height: 450px;
        border-radius: 20px;
        background-color: #34495e;
        box-shadow:15px 15px 10px rgba(33,45,58,.3);
        overflow: hidden;
        position: relative;
    }
    .login_container .form{
        width: 300px;
        height: 223px;
        margin-top: 44px;
        display:flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        z-index: 1;
    }
    .el-form-item__content {
        line-height: 0px;
        position: relative;
        font-size: 14px;
    }
    .login_container .form .tbx>>>.el-input__inner{
        width: 200px;
        height: 40px;
        outline: none;
        border:none;
        border-bottom: 1px solid #fff;
        background: none;
        color: #fff;
    }
    .login_container .form .tbx>>>.el-input__inner::placeholder{
        color: #fff;
        font-size: 15px;
    }
    .login_container .form .role>>>.el-radio__label{
        display: inline;
        line-height: 100%;
        color: white;
    }
    .login_container .form .sub{
        width: 200px;
        height: 40px;
        outline: none;
        border:1px solid #fff;
        border-radius: 20px;
        letter-spacing: 5px;
        color: #fff;
        background: none;
        cursor: pointer;
    }
    .login_container .form .subreg{
        width: 200px;
        height: 40px;
        outline: none;
        border:1px solid #fff;
        border-radius: 20px;
        letter-spacing: 5px;
        color: #2c3e50;
        margin: 5px auto;
        background: #fff;
        cursor: pointer;
    }
    .login_container h1{
        z-index: 1;
        color: #ecf0f1;
        letter-spacing: 5px;
        padding-left: 5px;
        font-size: 50px;
        font-weight: 100;
        /* 改变字体粗细 */
        text-shadow: 5px 5px 5px rgba(33,45,58,.3);
    }
    /* 设置鼠标进去的样式 */
    .login_container .in{
        position: absolute;
        top:0;
        left:0;
        display: block;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: #3498bd;
        transform: translate(-50%,-50%);
        /* 使用in动画，持续0.5s,缓出的时间函数，停留在最后一帧 */
        animation:in 0.5s ease-out forwards;
    }
    /* 设置鼠标离开的样式 */
    .login_container .out{
        position: absolute;
        top:0;
        left:0;
        display: block;
        width: 1200px;
        height: 1200px;
        border-radius: 50%;
        background: #3498bd;
        transform: translate(-50%,-50%);
        animation:out 0.5s ease-out forwards;
    }
    /* 设置鼠标进入时，元素的动画 */
    @keyframes in{
        0%{
            width: 0;
            height: 0;
        }
        100%{
            width: 1200px;
            height: 1200px;
        }
    }
    /* 设置鼠标离开时，元素的动画 */
    @keyframes out{
        0%{
            width: 1200px;
            height: 1200px;
        }
        100%{
            width: 0;
            height: 0;
        }
    }
/*.login_container{*/
/*    margin: 0;*/
/*    padding: 0;*/
/*}*/
/*.login_container .login{*/
/*    width: 30%;*/
/*    height: 30%;*/
/*    margin: 20% auto;*/
/*    border: 1px solid #B3C0D1;*/
/*    padding:10px;*/
/*    background-color: white;*/
/*    position: relative;*/
/*}*/
/*.login_container .login .login_header{*/
/*    width: 95px;*/
/*    position: absolute;*/
/*    top:-25%;*/
/*    left:36%;*/
/*    border: 1px solid #B3C0D1;*/
/*    border-radius: 95px;*/
/*    background-color: white;*/
/* }*/
/*.login_container .login .login_header>img{*/
/*    width: 100%;*/
/*    padding: 3px;*/
/*}*/
/*.login_container .login .login_form{*/
/*    width: 100%;*/
/*    padding: 30px;*/
/*}*/
</style>
