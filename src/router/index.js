import Vue from 'vue'
import VueRouter from 'vue-router'
import hotelList from "../views/hotelselect/hotelList";

//懒加载
const Login =() => import('../components/common/login/Login')
const Homepush =() => import('../views/homepush/Homepush')
const Profile = () => import('../views/profile/Profile.vue')
const Category = () => import('../views/category/Category.vue')
const BookList = () => import('../views/shopcar/BookList.vue')
const hotelPayfor =() => import('../views/hotelselect/hotelPayfor')
const HotelFind = () => import('../views/hotelFind/HotelFind')
const OrderManage = () => import('../views/back/OrderManage')
const hotelManage = () => import('../views/back/hotelManage')
const numAnalyse = () => import('../views/back/numAnalyse')
const CustomAppraise = () => import('../views/hotelselect/CustomAppraise')
const Comment = () => import('../components/common/Comment')
const Chat = () => import('../components/common/chat/Chat')
const ChatManage = () => import('../components/common/chat/ChatManage')
const CommentManage = () => import('../views/back/CommentManage')
const index = () =>import('../components/common/pcindexbar/indexbar')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login',
    meta: {
      keepAlive: false,//用于表示是否通过router-view来展示
      title: '登录',//标题
      hideInMenu: true,//是否在左侧导航菜单隐藏
      icon: ''//图标
    }
  },
  {
    path:'/login',
    name:'登录',
    component:Login,
    meta: {
      keepAlive: false,//用于表示是否通过router-view来展示
      title: '登录',//标题
      hideInMenu: true,//是否在左侧导航菜单隐藏
      icon: 'el-icon-user'//图标
    }
  },
  // {
  //   path:'/index',
  //   name:'导航',
  //   component:index,
  //   meta: {
  //     keepAlive: true
  //   }
  // },
  {
    path: '/home',
    name: '首页推荐',
    component: Homepush,
    label: '管理员列表',
    meta: {
      icon: 'el-icon-menu',//图标
      keepAlive: true,
      title: '首页推荐',//标题
      hideInMenu: false,//是否在左侧导航菜单隐藏

    }
    // children:[
    //   {
    //     path:'/hotelFind',
    //     name:'酒店查询',
    //     component:HotelFind
    //   },
    //   {
    //     path: '/about',
    //     name: '关于',
    //     component: () => import('../views/about/About.vue')
    //   },
    //   {
    //     path:'/category',
    //     name:'查找酒店',
    //     component:Category
    //   }
    // ]
  },
  {
    path:'/hotelFind',
    name:'酒店预订',
    component:HotelFind,
    meta: {
      keepAlive: true,
      title: '酒店预订',//标题
      hideInMenu: false,//是否在左侧导航菜单隐藏
      icon: 'el-icon-date'//图标
    }
  },
  {
    path:'/category',
    // name:'酒店查找',
    name:'酒店查找',
    component:Category,
    meta: {
      keepAlive: true,
      hideInMenu: false,//是否在左侧导航菜单隐藏
      icon: 'el-icon-search'//图标
    }
  },
  {
    path: '/hotelInfo',
    name: '酒店详情',
    component: () => import('../views/hotelselect/hotelInfo'),
    meta: {
      keepAlive: true,
      hideInMenu: false,//是否在左侧导航菜单隐藏
      icon: 'el-icon-document-checked'//图标
    }
  },
  {
    path:'/hotelPayfor',
    name:'订单支付',
    component:hotelPayfor,
    meta: {
      keepAlive: true,
      hideInMenu: false,//是否在左侧导航菜单隐藏
      icon: 'el-icon-shopping-cart-full'//图标
    }
  },
  {
    path:'/bookList',
    name:'我的订单',
    component:BookList,
    meta: {
      keepAlive: true,
      hideInMenu: false,//是否在左侧导航菜单隐藏
      icon: 'el-icon-mobile'//图标
    }
  },
  {
    path:'/customRoom',
    name:'定价房',
    component:CustomAppraise,
    meta: {
      keepAlive: true,
      hideInMenu: false,//是否在左侧导航菜单隐藏
      icon: 'el-icon-news'//图标
    }
  },
  {
    path:'/chat',
    name:'我的消息',
    component:Chat,
    meta: {
      keepAlive: true,
      hideInMenu: false,//是否在左侧导航菜单隐藏
      icon: 'el-icon-chat-square'//图标
    }
  },
  {
    path:'/profile',
    name:'个人中心',
    component:Profile,
    meta: {
      keepAlive: true,
      hideInMenu: false,//是否在左侧导航菜单隐藏
      icon: 'el-icon-user'//图标
    }
  },
  // {
  //   path:'/comment',
  //   name:'评论',
  //   component:Comment,
  //   meta: {
  //     keepAlive: true,
  //     icon: 'el-icon-edit-outline'//图标
  //   }
  // },



    //后台菜单
  {
    path:'/orderManage',
    name:'订单管理',
    component:OrderManage,
    meta: {
      keepAlive: true,
      hideInMenu: true,//是否在左侧导航菜单隐藏
      icon: 'el-icon-connection'//图标
    }
  },
  {
    path:'/hotelManage',
    name:'酒店管理',
    component:hotelManage,
    meta: {
      keepAlive: true,
      hideInMenu: true,//是否在左侧导航菜单隐藏
      icon: 'el-icon-office-building'//图标
    }
  },
  {
    path:'/chatManage',
    name:'消息管理',
    component:ChatManage,
    meta: {
      keepAlive: true,
      hideInMenu: true,//是否在左侧导航菜单隐藏
      icon: 'el-icon-bell'//图标
    }
  },
  {
    path:'/CommentManage',
    name:'评价管理',
    component:CommentManage,
    meta: {
      keepAlive: true,
      hideInMenu: true,//是否在左侧导航菜单隐藏
      icon: 'el-icon-edit-outline'//图标
    }
  },
  {
    path:'/numAnalyse',
    name:'数据统计',
    component:numAnalyse,
    meta: {
      keepAlive: true,
      hideInMenu: true,//是否在左侧导航菜单隐藏
      icon: 'el-icon-data-analysis'//图标
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆,即是否带有token，有就放行，没有则跳转至登录页
router.beforeEach((to, from, next) => {
  //to表示将要访问的路径
  //from表示从哪个路径跳转而来
  //next（）放行    next('/xxx')强制跳转
  if (to.path === '/login') {
    next();
  } else {
    //获取token
    let token = window.sessionStorage.getItem('token');//获取sessionStorage中键'token'对应的值；查看方式f12->Application->sessionStorage->http://xxxx
    // let token = localStorage.getItem('Authorization');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  }
});

export default router
