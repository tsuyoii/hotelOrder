//同级组件不能直接传值，需要一个中间桥梁，可以先将数据传递给公共的父组件，然后父组件再将数据传递给需要的子组件
//在需要的同级组件中分别引入eventBus.js文件
import Vue from 'vue'
export default new Vue()
