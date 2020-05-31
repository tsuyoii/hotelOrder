<!--<template>-->
<!--  <div id="baidumap">-->
<!--&lt;!&ndash;    <el-button @click="getAddress">自动定位</el-button>&ndash;&gt;-->
<!--    <el-input type="text" id="suggestId" name="address_detail" placeholder="地址" v-model="address_detail"/>-->
<!--    <div id="allmap"></div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'-->
<!--    import BmScale from 'vue-baidu-map/components/controls/Scale'-->
<!--    import BmNavigation from 'vue-baidu-map/components/controls/Navigation'-->
<!--    import BmMarkerClusterer from  'vue-baidu-map/components/extra/MarkerClusterer'-->
<!--    import BmMarker from 'vue-baidu-map/components/overlays/Marker'-->
<!--    import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'-->
<!--  export default {-->
<!--      components: {-->
<!--          BaiduMap,-->
<!--          BmScale,-->
<!--          BmNavigation,-->
<!--          BmMarkerClusterer,-->
<!--          BmMarker,-->
<!--          BmInfoWindow-->
<!--      },-->
<!--    data(){-->
<!--      return {-->
<!--        address_detail: null, //详细地址-->
<!--        userlocation: {lng: "", lat: ""},-->
<!--      }-->
<!--    },-->
<!--    mounted(){-->
<!--      this.$nextTick(function () {-->

<!--        var th = this-->
<!--        // 创建Map实例-->
<!--        var map = new BMap.Map("allmap");-->
<!--        // 初始化地图,设置中心点坐标，-->
<!--        var point = new BMap.Point(121.160724,31.173277); // 创建点坐标，汉得公司的经纬度坐标-->
<!--        map.centerAndZoom(point, 15);-->
<!--        map.enableScrollWheelZoom();-->
<!--        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象-->
<!--                {-->
<!--                  "input": "suggestId"-->
<!--                  , "location": map-->
<!--                })-->
<!--        var myValue-->
<!--        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件-->
<!--          var _value = e.item.value;-->
<!--          myValue = _value.province + _value.city + _value.district + _value.street + _value.business;-->
<!--          this.address_detail = myValue-->
<!--          setPlace();-->
<!--        });-->

<!--        function setPlace() {-->
<!--          map.clearOverlays();    //清除地图上所有覆盖物-->
<!--          function myFun() {-->
<!--            th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果-->
<!--            map.centerAndZoom(th.userlocation, 18);-->
<!--            map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注-->
<!--          }-->

<!--          var local = new BMap.LocalSearch(map, { //智能搜索-->
<!--            onSearchComplete: myFun-->
<!--          });-->
<!--          local.search(myValue);-->

<!--          //测试输出坐标（指的是输入框最后确定地点的经纬度）-->
<!--          map.addEventListener("click",function(e){-->
<!--            //经度-->
<!--            console.log(th.userlocation.lng);-->
<!--            //维度-->
<!--            console.log(th.userlocation.lat);-->

<!--          })-->
<!--        }-->

<!--      })-->
<!--    },-->
<!--    methods:{-->
<!--      getAddress(){-->
<!--        var map = new BMap.Map("allmap");-->
<!--        var point = new BMap.Point(116.331398,39.897445);-->
<!--        map.centerAndZoom(point,12);-->

<!--        function myFun(result){-->
<!--          var cityName = result.name;-->
<!--          map.setCenter(cityName);-->
<!--          alert("当前定位城市:"+cityName);-->
<!--        }-->
<!--        var myCity = new BMap.LocalCity();-->
<!--        myCity.get(myFun);-->





<!--        // // 百度地图API功能-->
<!--        // var map = new BMap.Map("allmap");-->
<!--        // var point = new BMap.Point(116.331398,39.897445);-->
<!--        // map.centerAndZoom(point,12);-->
<!--        //-->
<!--        // var geolocation = new BMap.Geolocation();-->
<!--        // geolocation.getCurrentPosition(function(r){-->
<!--        //   if(this.getStatus() == BMAP_STATUS_SUCCESS){-->
<!--        //     var mk = new BMap.Marker(r.point);-->
<!--        //     map.addOverlay(mk);-->
<!--        //     map.panTo(r.point);-->
<!--        //     alert('您的位置：'+r.point.lng+','+r.point.lat);-->
<!--        //   }-->
<!--        //   else {-->
<!--        //     alert('failed'+this.getStatus());-->
<!--        //   }-->
<!--        // },{enableHighAccuracy: true})-->
<!--        // //关于状态码-->
<!--        // //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。-->
<!--        // //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。-->
<!--        // //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。-->
<!--        // //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。-->
<!--        // //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。-->
<!--        // //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。-->
<!--        // //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)-->
<!--        // //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)-->
<!--        // //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)-->

<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->
<!--<style scoped>-->
<!--  #allmap{-->
<!--    width: 100%;-->
<!--    height: 400px;-->
<!--    font-family: "微软雅黑";-->
<!--    border:1px solid green;-->
<!--  }-->
<!--  #suggestId{-->
<!--    width: 100%;-->
<!--  }-->
<!--</style>-->









<!--<template>-->
<!--    <div id="allmap">-->
<!--&lt;!&ndash;        <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"></baidu-map>&ndash;&gt;-->
<!--&lt;!&ndash;    地图右下角添加定位空控件&ndash;&gt;-->
<!--        <baidu-map class="map"  :center="center" :zoom="zoom" @ready="handler">-->
<!--            <bm-panorama></bm-panorama>-->
<!--            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>-->
<!--        </baidu-map>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--    export default {-->
<!--        data () {-->
<!--            return {-->
<!--                center: {lng: 0, lat: 0},-->
<!--                zoom: 3-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            handler ({BMap, map}) {-->
<!--                console.log(BMap, map)-->
<!--                this.center.lng = 116.404-->
<!--                this.center.lat = 39.915-->
<!--                this.zoom = 15-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style>-->
<!--      #allmap{-->
<!--        width: 100%;-->
<!--        height: 400px;-->
<!--        font-family: "微软雅黑";-->
<!--        border:1px solid green;-->
<!--      }-->
<!--      .map {-->
<!--          width: 100%;-->
<!--          height: 400px;-->
<!--      }-->
<!--</style>-->


<template>
    <div id="allmap">
        <el-input type="text"  id="suggestId" name="keyword" placeholder="地址" v-model="keyword"/>
        <baidu-map :center="center" :zoom="zoom" :dragging="true" :scroll-wheel-zoom="true"
                   class="map" @ready="handler" @click="getClickInfo" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom"
                   @zoomend="syncCenterAndZoom"
        >
<!--            全景图-->
            <bm-panorama></bm-panorama>
<!--            地理位置的搜索功能-->
            <bm-local-search class="search" :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
<!--            定位-->
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
<!--            添加一个小红点的，并将当前的经纬度写入数据中-->
            <bm-marker :position="{lng:center.lng, lat: center.lat}"></bm-marker>
        </baidu-map>
    </div>

</template>
<script>
    export default {
        model:{
            prop:'addr',//当父组件设置v-model时，将变量值传给子组件的dplayer属性
            event:'addresschange'//表示父组件监听playerchange事件,好像不能用驼峰命名
        },
        props:{
            addr:String //此处必须定义与model的prop相同的props,因为v-model会传值给子组件
        },
        data(){
            return{
                //百度地图初始化数据
                baidumapSwitch:false,
                center: { lng: 114.220941, lat: 22.690015 },
                zoom: 16,
                location: "深圳市",
                keyword: this.addr,
            }
        },
        methods:{
            //百度地图初始化（这个一定要！否则地图回加载不出来）
            handler({ BMap, map }) {
                console.log(BMap, map)
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 15
            },
//点击获取到当前经纬度
            getClickInfo(e) {
                console.log(e.point.lng);
                console.log(e.point.lat);
                this.center.lng = e.point.lng;
                this.center.lat = e.point.lat;
            },
//双向绑定经纬度以及缩放尺寸
            syncCenterAndZoom(e) {
                const { lng, lat } = e.target.getCenter();
                this.center.lng = lng;
                this.center.lat = lat;
                // this.zoom = e.target.getZoom();
            },
//经纬度同步
            baidumap(){
                this.baiduDevicelocationx = this.center.lng
                this.baiduDevicelocationy = this.center.lat
            }

        }
    }
</script>
<style>
    #allmap{
        width: 100%;
        height: 400px;
        font-family: "微软雅黑";
        border:1px solid green;
        position: relative;
    }
    .map {
        width: 100%;
        height: 400px;
    }
    .search{
        position: absolute;
        width: 25%;
        top:40px;
        max-height: 400px;
        overflow-y: auto;
        border:0px;
    }
</style>
