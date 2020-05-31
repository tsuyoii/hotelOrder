<!--  -->
<template>
  <div class="myOrder">
    <!--我的订单-->
    <OderList></OderList>

  </div>
</template>

<script>
import OderList from "./BookList";
export default {
  name: 'Shopcar',
  components:{
    OderList
  },
  data() {
    return {

    }
  }
 }
</script>

<style scoped>
el-pagination{
  margin: 0 auto;
}
</style>
