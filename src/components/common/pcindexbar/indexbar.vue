<template>
  <div id="home">
    <el-container style="height: auto; border: 0px solid #fff;">
      <el-aside width="auto" style="margin-bottom: 0px;background-color: #34495e;overflow: hidden">
        <el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <!--头像-->
          <el-menu-item  v-model="isCollapse" class="asideimg">
            <img src="../../../assets/img/my_head.png" style="border-radius:50px;margin:-5px"/>
<!--            <span style="margin-left:20px;color: #87c38f"><b>{{nickname}}</b></span>-->
          </el-menu-item>


          <!--带下拉选项（子菜单的）导航el-submenu-->
<!--          <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''">-->
<!--            <span slot="title"><i class="el-icon-setting"></i>{{item.name}} </span>-->
<!--            <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" :class="$route.path==item2.path?'is-active':''">-->
<!--            {{item2.name}}-->
<!--            </el-menu-item>-->
<!--          </el-submenu>-->

          <!--不带下拉的导航-->
            <el-menu-item v-for="(item2,index2) in $router.options.routes" v-show="!$router.options.routes[index2].meta.hideInMenu" :index="item2.path" :class="$route.path==item2.path?'is-active':''">
                <i :class="$router.options.routes[index2].meta.icon" style="width: 50px;margin-left:-10px"></i>
<!--                {{$router.options.routes[index2].meta.icon}}-->
                {{item2.name}}
<!--                {{item2.meta.keepAlive}}-->
            </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
            <el-radio-group style="float:left;margin-bottom: 0px;height: 60px">
                <img circle src="../../../assets/img/logo.png" @click="showMenu" style="width:50px;margin-left: 2px;margin-top: 10%">
                <h2 style="display: inline">Hotel</h2>
            </el-radio-group>
          <el-dropdown trigger="click">
<!--              <el-badge  value="new" class="item" style="position: relative;left:-45px;top:10px;">-->
                <i class="el-icon-bell" style="font-size:x-large;position:relative;top:12px;right:50px;width:0px;height:5px;cursor: pointer"></i>
<!--              </el-badge>-->
          </el-dropdown>
          <!--头像展示-->
          <span style="float: right;z-index:1;margin-right:30px;height: 50px;margin-top:0.7%">
            <el-dropdown>
              <span class="el-dropdown-link">
               <img src="../../../assets/img/my_head.png" width="40px" style="border-radius:50px;margin:-10px"/>
               <span style="margin-left:20px;">{{nickname}}</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid">
                  <span>{{nickname}}</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-home">
                  <router-link to="/home">我的主页</router-link></el-dropdown-item>
                <el-dropdown-item icon="el-icon-remove">
                  <span @click="exitLogin">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName:'second',
        isCollapse: true,
        nickname: "",
          reviewData: [{
              date: '',
              img: 'nana',
              info: '有人刚刚联系了你，快点我查看吧',
          }, {
              date: '',
              img: 'tsyoii',
              info: '有人刚刚联系了你，快点我查看吧',
          }, {
              date: '',
              img: 'tiger',
              info: '有人刚刚联系了你，快点我查看吧',
          }],

      }
    },
      created() {
        // getNickname(){
            this.nickname = window.sessionStorage.getItem('userName');
            let role = window.sessionStorage.getItem('role');
            console.log(this.$router.options.routes[3].meta.icon)
          if(role == "admin"){
              //如果登录的角色变了，则其相应的权限也需要修改
              for(let i=0;i<this.$router.options.routes.length;i++){
                  this.$router.options.routes[i].meta.hideInMenu = !this.$router.options.routes[i].meta.hideInMenu
                  console.log(this.$router.options.routes[i].meta.hideInMenu)
              }
          }
          // }
      },
      methods: {
        // nickname(){
        //     window.sessionStorage.getItem('userName');
        // },
        //退出登录
        exitLogin(){
            //退出登录，清空token即可
            window.sessionStorage.clear();
            // localStorage.removeItem('Authorization');
            this.$router.push('/login');
        },
      handleClick(tab, event) {
          console.log(tab, event);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }},
      showMenu(){
        this.isCollapse = !this.isCollapse
      }
    }
  };
</script>
<style scoped>
    #home{
        position: relative;
        background-color: #EFEFE0;
        /*background-color: #efeff6;*/
        /*background-color: rgba(174,222,252,.3);*/
        /*background-color: #2c3e50;*/
    }
    .el-menu-item{
        color: white;
    }
    /*选中菜单项时*/
    .el-menu-item.is-active{
        color: #34495e;
        background-color:wheat;
    }
    /*鼠标移入菜单时*/
    .el-menu-item:focus, .el-menu-item:hover {
        outline: 0;
        color: #34495e;
        background-color:wheat;
    }
/*chat部分的样式*/
h3{
    font-weight: normal;
    line-height: 50px;
}
.chat{
}
.header{
    border: 1px solid #B3C0D1;
    border-radius: 5px;
    text-align: center;
    /*width: 90%;*/
    height: 50px;
    margin: 0 auto;
}
.main{
    height: 300px;
    overflow-y: auto;
}
.atalk{
    float: right;
    text-align: center;
    margin: 10px;
    padding: 5px;
    border: 1px solid #505458;
    border-radius: 10px;
}
.talkbob:after{
    content: "";
    display: block;
    clear: both;
}
.btalk{
    float: left;
    text-align: center;
    margin: 10px;
    padding: 5px;
    border: 1px solid #505458;
    border-radius: 10px;
}



    .messtr{
        border-bottom: 1px solid #B3C0D1;
        height: 80px;
        /*padding: 10px;*/
        /*margin: 20px;*/
    }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    overflow-x: hidden;
    /*border: 0px;*/
      color: white;
      background-color: #34495e;
      box-shadow:15px 15px 10px rgba(33,45,58,.3);
      margin:30px 20px;
      border-radius: 50px;
      border: none;
  }
  /*菜单展开时*/
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 600px;
    border: 0px;
      color: white;
    /*background-color: #2a3854;*/
      background-color: #34495e;
      box-shadow:15px 15px 10px rgba(33,45,58,.3);
      border: none;
  }
    .el-menu-vertical-demo:not(.el-menu--collapse) .asideimg>img{
        width: 60%;
        position: relative;
        left: 36px;
        top: 18px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) .asideimg{
        width: 100%;
        height: 120px;
        background-color: #34495e;
    }
        /*菜单收拢时*/
  .el-menu{
    margin-bottom: 0px;
    height: auto;
    border: 0px;
      color: white;
      /*background-color: #2a3854;*/
      background-color: #34495e;
      box-shadow:15px 15px 10px rgba(33,45,58,.3);
      border: none;
  }
    .el-menu .asideimg>img{
        width: 152%;
        /*z-index: 100;*/
    }
    .el-menu .asideimg{
        width: 100%;
        height: 60px;
        background-color: #34495e;
    }
.hh{
    font-weight: normal;
    line-height: 50px;
}
.chat{
}
.header{
    border: 1px solid #B3C0D1;
    border-radius: 5px;
    text-align: center;
    /*width: 90%;*/
    height: 50px;
    margin: 0 auto;
}
.main{
    height: 300px;
    overflow-y: auto;
}
.atalk{
    float: right;
    text-align: center;
    margin: 10px;
    padding: 5px;
    border: 1px solid #505458;
    border-radius: 10px;
}
.talkbob:after{
    content: "";
    display: block;
    clear: both;
}
.btalk{
    float: left;
    text-align: center;
    margin: 10px;
    padding: 5px;
    border: 1px solid #505458;
    border-radius: 10px;
}
    .el-container{
        width: 98%;
        margin: 0 auto;
        height: 100vh;
        overflow: hidden;
    }
    .el-container.is-vertical{
        background-color: ghostwhite;
        box-shadow:15px 15px 10px rgba(33,45,58,.3);
        border: none;
        margin:30px 0;
        padding: 0;
        border-radius:10px;
        height: 120vh;
    }
    .el-header {
        background-color: #eaeaf1;
        /*background-color: beige;*/
        color: #333;
        line-height: 60px;
    }
    ::-webkit-scrollbar { width: 5px;}
    ::-webkit-scrollbar-track-piece { background-color: #ffffff;}
    ::-webkit-scrollbar-thumb { height: 30px; background-color: rgb(192, 192, 192); border-radius: 3px;}
</style>
