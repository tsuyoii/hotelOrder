<!--  -->
<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() { 
    return {

    }
  }
 }
</script>

<style>
#tab-bar{
  display: flex;
  background-color:rgb(244,243,245);
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  box-shadow: 0 -1px 5px rgba(100,100,100,.15);
}
</style>