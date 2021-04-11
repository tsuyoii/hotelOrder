<!--  -->
<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">查找</el-breadcrumb-item>
      <el-breadcrumb-item>智能筛选</el-breadcrumb-item>
      <el-breadcrumb-item>酒店列表</el-breadcrumb-item>
      <el-breadcrumb-item>酒店详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  酒店城市及关键词查询  -->
    <div class="city-search">
      <table style="position: relative">
        <tr>
          <td>
            <!--    城市选择-->
            <city v-model="destarea" v-on:areachange="getCity($event)"></city>
          </td>
          <!--    日期-->
          <td>
            <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </td>
        <!-- 关键词选填-->
          <td>
            <el-input
                    placeholder="(关键词选填)酒店名"
                    prefix-icon="el-icon-search"
                    v-model="imply">
            </el-input>
          </td>
          <td>
            <el-button icon="el-icon-search" circle @click="search"></el-button>
            <el-button type="primary" round @click="smartSelect">智能筛选</el-button>
          </td>
        </tr>
      </table>

      <!-- 条件搜索-->
      <el-collapse-transition>
        <el-drawer
                :visible.sync="isSmartSelect"
                direction="rtl"
                custom-class="demo-drawer"
                :with-header="true"
                size="50%"
                ref="drawer"
        >
          <div class="demo-drawer__content">
            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" v-show="isSmartSelect" style="width: 80%">
              <el-form-item label="位置区域">距离我<span class="price">&nbsp;{{sizeForm.juli}}&nbsp;</span>km
                <el-slider v-model="sizeForm.juli" :max="10" style="width: 60%"></el-slider>
                <el-checkbox v-model="isAll">全城</el-checkbox>
              </el-form-item>
              <el-form-item label="价格星级">
                <el-slider v-model="sizeForm.price" range :max="500" style="width: 60%"></el-slider>
                价格:<span class="price">￥{{sizeForm.price[0]}}~{{sizeForm.price[1]}}</span>
              </el-form-item>
              <el-form-item label="智能排序">
                <el-radio-group v-model="sizeForm.resource" style="width: 40%">
                  <el-radio label="rate">好评优先</el-radio>
                  <el-radio label="lowprice">低价优先</el-radio>
                  <el-radio label="highprice">高价优先</el-radio>
                  <el-radio label="rate1">人气优先</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="其他筛选">
                <span>酒店类型</span>
                <el-checkbox-group v-model="sizeForm.hoteltype" size="small" class="type">
                  <el-checkbox label="经济型"></el-checkbox>
                  <el-checkbox label="标准型"></el-checkbox>
                  <el-checkbox label="商务型"></el-checkbox>
                  <el-checkbox label="高档型"></el-checkbox>
                  <el-checkbox label="度假型"></el-checkbox>
                  <el-checkbox label="豪华型"></el-checkbox>
                </el-checkbox-group>
                <span>房型设置</span>
                <el-checkbox-group v-model="sizeForm.roomtype" size="small" class="type">
                  <el-checkbox label="单人间"></el-checkbox>
                  <el-checkbox label="标准间"></el-checkbox>
                  <el-checkbox label="双人间"></el-checkbox>
                  <el-checkbox label="钟点房"></el-checkbox>
                  <el-checkbox label="大床房"></el-checkbox>
                  <el-checkbox label="家庭房"></el-checkbox>
                  <el-checkbox label="商务房"></el-checkbox>
                  <el-checkbox label="定价房"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button type="primary" @click="onSubmit">智能搜索</el-button>
              <el-button @click="isSmartSelect=false">取消</el-button>
            </div>
          </div>
        </el-drawer>


        <div class="transition-box"  v-show="isSmartSelect">

        </div>
      </el-collapse-transition>
    </div>
<!--    <hotel-list :searchHotel="formhotel"></hotel-list>-->
    <div class="hotelList">
    <!--侧边热门城市徘行-->
      <el-card style="float: right;margin-top:25px;width: 28%">
        <div class="paimin">
          热门酒店排行
          <el-divider></el-divider>
          <ul>
            <li v-for="(item,index) in hotelPaimin"><span style="margin-right: 5px">{{index+1}}</span>{{item.name}}
              <img src="../../assets/img/fire.png" v-show="index<3" style="width: 15px;margin-left: 50px"/>
            </li>
          </ul>
        </div>
      </el-card>

      <span>智能排序</span>
      <table class="box-table">
        <tr v-for="(item,index) in hotelTable" :key="item.id" class="text item" @click="IntoRoom(item)">
          <td style="width:26%;padding: 8px;height:140px;">
<!--            <img src="../../assets/img/hotel/hotel7.png" class="image">-->
            <img :src="item.img" class="image">
          </td>
          <td style="padding-right: 15px">
            <div class="info">
              <!--                    <span style="border-radius:100px;width:2px;height:2px;border:1px solid #87c38f;font-size: x-large">{{ item.id }} </span>-->
              <el-avatar size="small" style="color:white;background-color: #3b4f62"> {{ index+1 }} </el-avatar>
              <span style="font: large bold;margin-left:30px;display:block;margin-top: -33px">{{ item.name }}</span>
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
  </div>
</template>

<script>
  import city from '../../components/common/citySelect/city'
  import hotelList from "../hotelselect/hotelList";
export default {
  name: 'Category',
  data() {
    return {
      isAll:true,
      sizeForm: {
        juli: 1,
        price: [30, 200],
        resource: '',
        hoteltype: [],
        roomtype:[],
      },
      hotelTable:[
        // {id:1,name:'速8酒店',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7},
        // {id:2,name:'全季酒店（北门广潮）',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7},
        // {id:3,name:'如家酒店',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7},
        // {id:4,name:'汉庭酒店',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7},
        // {id:5,name:'IU酒店',type:'经济型',area:'北京',address:'丰台区黄陈路与精良路交汇处东北角',grade:3.7,img:''},
        {id:null,name:'',type:'',area:'',address:'',grade:null,img:''}
      ],
      style: [
        { type: '', label: '钟点房' },
        { type: 'success', label: '大床房' },
        { type: 'info', label: '高级大床房' },
        { type: 'danger', label: '四人间' },
        { type: 'warning', label: '定价房' }
      ],
      hotelPaimin:[
        // {id:1,name:'如家酒店'},
        // {id:2,name:'如家酒店'},
        // {id:3,name:'如家酒店'},
        // {id:4,name:'如家酒店'},
        // {id:5,name:'如家酒店'},
        // {id:6,name:'如家酒店'},
        // {id:7,name:'如家酒店'},
        // {id:8,name:'如家酒店'},
        // {id:9,name:'如家酒店'}
      ],
      destarea:'',
      // date:['2020-1-4','2020-1-5'],
      date:'',
      imply: '',
      tabPosition: 'left',
      isSmartSelect:false
    }
  },
  created() {
    //获取从HotelFind页面中传入的值
    this.destarea = this.$route.params.destarea;
    this.date = this.$route.params.date;
    this.imply = this.$route.params.imply;
    // alert(this.imply)

    //获取酒店列表信息
    const _this = this;
    axios.get('http://localhost:8099/hotel/hotelList').then((resp) =>{
      console.log(resp.data[0].hotel_name);
      console.log(resp.data.length);
      _this.hotelTable = resp.data;
      for(var i in resp.data){
        _this.hotelTable[i].id = resp.data[i].hotel_id;
        _this.hotelTable[i].name = resp.data[i].hotel_name;
        _this.hotelTable[i].type = resp.data[i].hotel_type;
        _this.hotelTable[i].area = resp.data[i].hotel_area;
        _this.hotelTable[i].address = resp.data[i].hotel_address;
        _this.hotelTable[i].grade = resp.data[i].hotel_grade;
        //有多张图片时，取第一张作为封面，存入时添加,分隔，取出时通过split方法取
        let imgsa = resp.data[i].hotel_img
        var imgsb = (imgsa || "").split(',');//传过来可能有空值
        // console.log(imgsb[0])
        // _this.hotelTable[i].img = "data:image/jpeg;base64," + resp.data[i].hotel_img;//后端返回的是一个base64编码格式的图片文件时，想把它渲染到前端页面上，需要在前面增加，详见https://blog.csdn.net/kukudehui/article/details/80409522
        _this.hotelTable[i].img = "data:image/jpeg;base64," + imgsb[0];//后端返回的是一个base64编码格式的图片文件时，想把它渲染到前端页面上，需要在前面增加，详见https://blog.csdn.net/kukudehui/article/details/80409522

      //  获取酒店排名
        let objjj = {};
        axios.post('/hotel/smartSearch',objjj).then(res => {
          console.log(res);
          _this.hotelPaimin = [];
          console.log(res.data.data.length)
          for(var i=0;i<res.data.data.length||i<8;i++) {
            let obj12 = {};
            console.log(i);
            obj12.id = res.data.data[i].hotel_id;
            obj12.name = res.data.data[i].hotel_name;

            _this.hotelPaimin.push(obj12);
          }
        })
      }
    })
  },
  components:{
    city,
    hotelList
  },
  methods:{
    //智能搜索表单提交
    onSubmit() {
      // alert('submit!');
      // alert(this.sizeForm.price)
      // alert(this.sizeForm.resource);//好评优先
      // alert(this.sizeForm.hoteltype);
      // alert(this.sizeForm.roomtype);
      this.isSmartSelect = false;
      const _this = this;
      let obj = {};
      obj.lowprice = this.sizeForm.price[0];
      // alert(typeof obj.lowprice)
      obj.highprice = this.sizeForm.price[1];
      obj.paixu = this.sizeForm.resource;
      obj.hoteltype = this.sizeForm.hoteltype;
      obj.roomtype = this.sizeForm.roomtype;
      axios.post('/hotel/smartSearch',obj).then(res => {
        console.log(res);
        _this.hotelTable = [];


        console.log(res.data.data.length)
        for(var i=0;i<res.data.data.length;i++) {
          let obj12 = {};
          console.log(i);
          obj12.id = res.data.data[i].hotel_id;
          obj12.name = res.data.data[i].hotel_name;
          obj12.type = res.data.data[i].hotel_type;
          obj12.area = res.data.data[i].hotel_area;
          obj12.address = res.data.data[i].hotel_address;
          obj12.grade = res.data.data[i].hotel_grade;
          //有多张图片时，取第一张作为封面，存入时添加,分隔，取出时通过split方法取
          let imgsa = res.data.data[i].hotel_img
          var imgsb = (imgsa || "").split(',');//传过来可能有空值
          // console.log(imgsb[0])
          // _this.hotelTable[i].img = "data:image/jpeg;base64," + resp.data[i].hotel_img;//后端返回的是一个base64编码格式的图片文件时，想把它渲染到前端页面上，需要在前面增加，详见https://blog.csdn.net/kukudehui/article/details/80409522
          obj12.img = "data:image/jpeg;base64," + imgsb[0];//后端返回的是一个base64编码格式的图片文件时，想把它渲染到前端页面上，需要在前面增加，详见https://blog.csdn.net/kukudehui/article/details/80409522
          console.log(i);

          _this.hotelTable.push(obj12);
        }

        })
    },
    smartSelect(){
      this.isSmartSelect = !this.isSmartSelect;
    },
    search(){
      const _this = this;
      // alert(this.destarea)
      // alert(this.date)
      // alert(this.imply)
      let obj = {};
      obj.area = this.destarea;
      obj.name = this.imply;
      axios.post('/hotel/implySearch',obj).then(res => {
        _this.hotelTable = [];

        console.log(res.data.data.length)
        for(var i=0;i<res.data.data.length;i++){
          let obj12 = {};
          console.log(i);
          obj12.id = res.data.data[i].hotel_id;
          obj12.name = res.data.data[i].hotel_name;
          obj12.type = res.data.data[i].hotel_type;
          obj12.area = res.data.data[i].hotel_area;
          obj12.address = res.data.data[i].hotel_address;
          obj12.grade = res.data.data[i].hotel_grade;
          //有多张图片时，取第一张作为封面，存入时添加,分隔，取出时通过split方法取
          let imgsa = res.data.data[i].hotel_img
          var imgsb = (imgsa || "").split(',');//传过来可能有空值
          // console.log(imgsb[0])
          // _this.hotelTable[i].img = "data:image/jpeg;base64," + resp.data[i].hotel_img;//后端返回的是一个base64编码格式的图片文件时，想把它渲染到前端页面上，需要在前面增加，详见https://blog.csdn.net/kukudehui/article/details/80409522
          obj12.img = "data:image/jpeg;base64," + imgsb[0];//后端返回的是一个base64编码格式的图片文件时，想把它渲染到前端页面上，需要在前面增加，详见https://blog.csdn.net/kukudehui/article/details/80409522
          console.log(i);

          _this.hotelTable.push(obj12);
        }
        console.log(_this.hotelTable);
      })
    },
    getCity(event){
      this.destarea = event;
      console.log(event)
      // alert(this.destarea)
    },
    //点击酒店进入该酒店房间
    IntoRoom(item){
      this.$router.push({
        path:"/hotelInfo",
        query:{hotelId:item.id}
      })
    },
  }
 }
</script>

<style scoped>
  ul,li{
    list-style: none;
  }
  .paimin li{
    margin-top: 20px;
    padding-left: 0px;
    color: rgb(89,89,89);
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
    width: 270px;
    /*margin-top: -25px;*/
    margin-left: 20px;
    /*background-color: #8FBC8F;*/
    font-size: 16px;
  }
  .transition-box {
    margin-bottom: 10px;
    width: 80%;
    height: auto;
    border-radius: 4px;
    background-color: white;
    color: #000;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .type>.el-checkbox{
    /*background-color: #e6e6ee;*/
    margin: 0px 3px;
    color: #3d3e3e;
  }
  span.price{
    color: orangered;
  }
  .hotelList{
    width: 100%;
    margin-left: 50px;
  }
  .image{
    width:100%;
    height: 100%;
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
    margin: 10px auto;
    padding-right: 10px;
  }











.el-input{
  width:200px;
  margin: 5px;
}
.el-date-picker{

}
  .city-search{
    position: relative;
    left:30px;
      /*z-index: 100;*/
  }
    hotel-list{
        margin-left:830px;
    }
</style>
