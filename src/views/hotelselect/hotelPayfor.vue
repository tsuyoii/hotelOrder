<template>
    <div class="payfor">
        <div class="timeline">
            <el-steps :active="activeStep" finish-status="success" simple style="margin-top: 20px">
                <el-step title="填写订单信息" icon="el-icon-edit"></el-step>
                <el-step title="核对信息" icon="el-icon-info"></el-step>
                <el-step title="提交账单" icon="el-icon-s-promotion"></el-step>
                <el-step title="支付完成" icon="el-icon-picture"></el-step>
            </el-steps>
        </div>

        <div>
            <el-card  class="orderCheck">
                <!--第一步填写信息-->
                <el-form ref="form" v-show="activeStep==0" :model="payForm" label-width="80px" size="medium"  class="check-card">
                    <el-form-item label="订单号">
                        <span>{{payForm.id}}</span>
                    </el-form-item>
                    <el-form-item label="酒店名称">
                        <el-input v-model="payForm.hname"></el-input>
                    </el-form-item>
                    <el-form-item label="预订房型">
                        <el-select v-model="payForm.roomtype">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入住人">
                        <el-input v-model="payForm.uname"></el-input>
                    </el-form-item>
                    <el-form-item label="联系手机">
                        <el-input v-model="payForm.utel"></el-input>
                    </el-form-item>
                    <el-form-item label="入住时间">
                        <el-col :span="11">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="payForm.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="离店时间" v-model="payForm.date2" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" @click="nextStep">下一步</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                <!--第二步核对信息-->
                <el-form ref="form" v-show="activeStep==1" :model="payForm" label-width="80px" size="medium"  class="check-card">
                    <el-form-item label="订单号">
                        <span>{{payForm.id}}</span>
                    </el-form-item>
                    <el-form-item label="酒店名称">
                        <span>{{payForm.hname}}</span>
                    </el-form-item>
                    <el-form-item label="预订房型">
                        <span>{{payForm.roomtype}}</span>
                    </el-form-item>
                    <el-form-item label="入住人">
                        <span>{{payForm.uname}}</span>
                    </el-form-item>
                    <el-form-item label="联系手机">
                        <span>{{payForm.utel}}</span>
                    </el-form-item>
                    <el-form-item label="入住时间">
                        <el-col :span="11">
                            <span>{{payForm.date1}}</span>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <span>{{payForm.date2}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" @click="nextStep2">下一步</el-button>
                        <el-button @click="onCancel">上一步</el-button>
                    </el-form-item>
                </el-form>
                <!--第三步确定金额并提交订单-->
                <el-form ref="form" v-show="activeStep==2" :model="payForm" label-width="80px" size="medium"  class="check-card">
                    <el-alert
                            title="注意，你正在进行转账操作，确认转账后，资金将直接打入对方账户，无法退回，请谨慎操作"
                            type="info"
                            center
                            show-icon
                            style="margin-bottom: 20px;">
                    </el-alert>
                    <el-form-item label="订单号">
                        <span>{{payForm.id}}</span>
                    </el-form-item>
                    <el-form-item label="付款账户">
                        <el-input v-model="payForm.fuaccount"></el-input>
                    </el-form-item>
                    <el-form-item label="收款账户">
                        <el-input v-model="payForm.shouaccount"></el-input>
                    </el-form-item>
                    <el-form-item label="支付金额">
                        <span style="font-size: large">{{payForm.price}}</span>
                    </el-form-item>
                    <el-form-item label="支付密码">
                        <el-input type="password" v-model="payForm.psd"></el-input>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                <!--第四步支付完成-->
                <el-form ref="form" v-show="activeStep==3" :model="payForm" label-width="80px" size="medium"  class="check-card">
                    <div style="text-align: center;margin-bottom: 20px">
                        <img src="../../assets/img/success.png"/>
                        <p style="font-size: x-large">操作成功</p><br>
                        <span>预计两小时内到账</span>
                    </div>
                    <el-form-item label="订单号">
                        <span>{{payForm.id}}</span>
                    </el-form-item>
                    <el-form-item label="付款账户">
                        <span>{{payForm.fuaccount}}</span>
                    </el-form-item>
                    <el-form-item label="收款账户">
                        <span>{{payForm.shouaccount}}</span>
                    </el-form-item>
                    <el-form-item label="支付金额">
                        <span style="font-size: large">{{payForm.price}}</span>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" @click="wancheng">完成</el-button>
                        <el-button @click="exportWord">查看账单/打印凭条</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    //引入组件，便于导出word
    import docxtemplater from 'docxtemplater'
    import PizZip from 'pizzip'
    import JSZipUtils from 'jszip-utils'
    import {saveAs} from 'file-saver'
    export default {
        name: "hotelPayfor",
        data() {
            return {
                //要预定的房间编号
                roomId:1,
                //要预定的酒店编号
                hotelId:1,
                activeStep:0,
                //付款人编号
                uid:11,
                //收款人编号
                aid:1,
                payForm: {
                    id:'235456321435W',
                    hname: '如家酒店',
                    roomtype: '标准型',
                    uname:'tiger',
                    utel:'15927341137',
                    date1: '2020-05-20',
                    date2: '2020-05-21',
                    fuaccount:'tiger@example.com',
                    shouaccount:'test@example.com',
                    price:'500',
                    psd:''
                }
            }
        },
        created() {
            this.roomId = this.$route.query.roomId;
            this.hotelId = this.$route.query.hotelId;
            this.uid = window.sessionStorage.getItem('userId');
            // alert(this.roomId)
            const _this = this;
            axios.get('/hotel/hotelIdInfo/'+this.hotelId).then(resp => {
                console.log(resp);
                _this.payForm.hname = resp.data.data.hotel_name;
                _this.aid = resp.data.data.admin_id;
            })
            axios.get('/room/roomIdInfo/'+this.roomId).then(resp => {
                console.log(resp);
                _this.payForm.roomtype = resp.data.data.room_type;
                _this.payForm.uname = window.sessionStorage.getItem('userName');
                _this.payForm.price = '￥'+ resp.data.data.room_price + '.00';
            })
            axios.get('/user/userIdInfo/'+this.uid).then(resp => {
                console.log(resp);
                _this.payForm.utel = resp.data.data.user_tel;
                _this.payForm.fuaccount = resp.data.data.user_payaccount;
            })
            axios.get('/user/adminIdInfo/'+this.aid).then(resp => {
                console.log(resp);
                _this.payForm.shouaccount = resp.data.data.admin_payaccount;
            })
        },
        methods:{
            // 点击导出word
            exportWord: function() {
                let _this = this;
                // 读取并获得模板文件的二进制内容
                JSZipUtils.getBinaryContent("/book.docx", function(error, content) {
                    // book.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
                    // 抛出异常
                    if (error) {
                        throw error;
                    }

                    // 创建一个JSZip实例，内容为模板的内容
                    let zip = new PizZip(content);
                    // 创建并加载docxtemplater实例对象
                    let doc = new docxtemplater().loadZip(zip);
                    // 设置模板变量的值
                    doc.setData({
                        ..._this.payForm
                    });

                    try {
                        // 用模板变量的值替换所有模板变量
                        doc.render();
                    } catch (error) {
                        // 抛出异常
                        let e = {
                            message: error.message,
                            name: error.name,
                            stack: error.stack,
                            properties: error.properties
                        };
                        console.log(JSON.stringify({ error: e }));
                        throw error;
                    }

                    // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
                    let out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // 将目标文件对象保存为目标类型的文件，并命名
                    saveAs(out, "订单收据.docx");
                });
            },
            onSubmit() {
                let paramok = new FormData();
                //formData.append可以直接添加之前未声明的字段，这里的name与数据库中的字段名对应
                // let duration =parseInt(this.payForm.date2 )- parseInt(this.payForm.date1)

                let duration = '1';
                let state = '已支付';
                paramok.append("book_day",duration);
                paramok.append("book_start",this.payForm.date1);
                paramok.append("book_end",this.payForm.date2);
                paramok.append("book_state",state);
                paramok.append("book_price",this.payForm.price);
                paramok.append("user_id",this.uid);
                paramok.append("room_id",this.roomId);
                paramok.append("admin_id",this.aid);

                let stateno = '待支付'
                let paramno = new FormData();
                paramno.append("book_day",duration);
                paramno.append("book_start",this.payForm.date1);
                paramno.append("book_end",this.payForm.date2);
                paramno.append("book_state",stateno);
                paramno.append("book_price",this.payForm.price);
                paramno.append("user_id",this.uid);
                paramno.append("room_id",this.roomId);
                paramno.append("admin_id",this.aid);

                let param = {
                    user_id:this.uid,
                    user_payaccount:this.payForm.fuaccount,
                    user_paypsd:this.payForm.psd,
                    room_id:parseInt(this.roomId),
                }
                // alert(typeof param.room_id)
                //验证账号密码是否正确
                axios.post('/book/checkpay',param).then(resp => {
                    console.log(resp)
                    if(resp.data.data === 111){
                        alert("房间已入住！")
                    }
                    else if(resp.data.data.code === 500){
                        alert("账号密码错误")
                    }
                    else if(this.payForm.roomtype == "定价房"){
                        //但是仍然添加进入订单，状态为未支付
                        axios.post('/book/addbook', paramno).then(resp => {
                            console.log(resp)
                            alert("下单成功")
                            this.$router.push({
                                path:'/bookList'
                            })
                        })
                    }
                    else {
                        //否则，才进入提交订单页
                        this.$confirm('确认转账后，资金将直接打入对方账户，无法退回，是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '提交成功!'
                            });
                            //添加进入订单,状态为已支付
                            axios.post('/book/addbook', paramok).then(resp => {
                                console.log(resp)
                            })
                            this.activeStep += 1;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            });
                            //但是仍然添加进入订单，状态为未支付
                            axios.post('/book/addbook', paramno).then(resp => {
                                console.log(resp)
                                this.$router.push({
                                    path:'/bookList'
                                })
                            })
                        });
                    }
                })
            },
            nextStep() {
                console.log('submit!');
                this.activeStep+=1;
            },
            nextStep2() {
                console.log('submit!');
                if(this.payForm.roomtype == "定价房"){
                    this.payForm.price = ''
                }
                this.activeStep+=1;
            },
            onCancel() {
                this.activeStep-=1;
            },
            tiaozhuan(){
                this.$router.push({
                    path:'/bookList'
                })
            },
            wancheng(){
                this.$message({
                    showClose: true,
                    message: '将在3秒后跳转至我的订单页面',
                });
                setTimeout(this.tiaozhuan,3000);
            }
        },
        mounted(){
        }
    }
</script>


<style scoped>
.timeline{

}
.orderCheck{
    width:60%;
    margin:0 auto;
}
    .check-card{
        width:70%;
        margin:10px auto;
    }
    img{
        width: 80px;
        height: auto;
        margin: 10px auto;
    }
</style>
