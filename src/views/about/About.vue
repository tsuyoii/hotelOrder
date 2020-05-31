<template>
  <div class="about">
<!--    <h1>This is an about page</h1>-->
<!--    <table>-->
<!--      <tr>-->
<!--        <td>编号</td>-->
<!--        <td>名称</td>-->
<!--      </tr>-->
<!--      <tr v-for="item in users">-->
<!--        <td>{{item.id}}</td>-->
<!--        <td>{{item.name}}</td>-->
<!--      </tr>-->
<!--    </table>-->

    <hotelInfo></hotelInfo>

<!--      <chat></chat>-->


  </div>
</template>
<script>
    import chat from "../../components/common/chat/Chat"
  import hotelInfo from "../hotelselect/hotelInfo";
  import hotelPayfor from "../hotelselect/hotelPayfor";
  // import baidumap from "../../components/common/baidumap/baidumap";
  export default {
    name:"About",
    components:{
      hotelInfo,
      hotelPayfor,
        // baidumap
        chat
    },
    data(){
      return{
        users:[
          {
            id: 1,
            name:"konan"
          },
          {
            id:2,
            name:"lan"
          },
          {
            id:3,
            name:"naruto"
          },
          {
            id:4,
            name:"itachi"
          },
        ]
      }
    },
    created() {
      // alert(123)
      // const _this = this
      // axios.get('http://localhost:8099/user/userList').then(function (resp) {
      //   console.log(resp)
      //   _this.users  = resp.data
      // })
    }
  }
</script>
<style scoped>

</style>
