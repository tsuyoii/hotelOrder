<template>
    <div class="homePush">
        <!--轮播图-->
        <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="url in urls" :key="url">
                <el-image :src="require('../../assets/img/hotelpush/'+url+'.png')"
                          :preview-src-list="[require('../../assets/img/hotelpush/'+url+'.png')]"
                          fit="contain"></el-image>
            </el-carousel-item>
        </el-carousel>


        <BaiDuMap></BaiDuMap>
    </div>
</template>

<script>
    import BaiDuMap from "../../components/common/baidumap/BaiDuMap";
    import Message from "../../components/common/message/Message";
    export default {
        name: "Homepush",
        components:{Message, BaiDuMap},
        data(){
            return{
                urls: [
                    'push1',
                    'push3',
                    'push4',
                    'push5',
                    'push6',
                    'push7',
                    'push8',
                    'push9',
                ],
            }
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>

