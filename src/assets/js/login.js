//定义一个con帮定.container
const con = document.querySelector('.login_container');
// 定义两个函数开关（门）
let isIn = true;//进去的门，默认打开
let isOut = false;
// 给未出生的元素起个名字
var span;
// 监听鼠标进去的事件+进去的方法
con.addEventListener('mouseenter',(e)=>{
    if(isIn){
        //如果进去的门默认是打开的，就执行该函数

        // 获取进入的鼠标位置
        // 生成元素的位置=进入点到窗口的距离-父盒子到窗口的距离
        let inx = e.clientX-e.target.offsetLeft;
        let iny = e.clientY-e.target.offsetTop;

        // 创建一个span元素，并且给它对应的出生坐标
        let el = document.createElement('span')
        el.style.left=inx+'px';
        el.style.top=iny+'px';
        con.appendChild(el);//添加到con对应的父元素

        $('.login_container span').removeClass('out');//移除出去的动画
        $('.login_container span').addClass('in');//添加进入的动画
        span = document.querySelector('.login_container span');
        isIn=false;
        isOut=true;
    }
})


// 监听鼠标出的事件+出去的方法
con.addEventListener('mouseleave',(e)=>{
    if(isOut){
        // 获取进入的鼠标位置
        // 生成元素的位置=进入点到窗口的距离-父盒子到窗口的距离
        let inx = e.clientX-e.target.offsetLeft;
        let iny = e.clientY-e.target.offsetTop;

        $('.login_container span').removeClass('in');
        $('.login_container span').addClass('out');
        $('.out').css('left',inx+'px');//添加出去的坐标
        $('.out').css('top',iny+'px');

        isOut=false;

        // 当动画结束后再删除元素
        setTimeout(()=>{
            con.removeChild(span);//删除元素
            isIn = true;
        },500)
    }
})
