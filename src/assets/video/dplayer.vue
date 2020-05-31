<template>
    <div class="dplayer-video-wrap">
        <div class="player_av">
            <div id="dplayer" ref="dplayer"></div>
        </div>
    </div>
</template>

<script>
    import DPlayer from '../../../node_modules/dplayer/dist/DPlayer.min.js' //引入的js文件
    import "../../../node_modules/dplayer/dist/DPlayer.min.css" //css文件
    export default {
        name: "dplayer",
        model:{
            prop:'path',//当父组件设置v-model时，将变量值传给子组件的dplayer属性
            // event:'playerchange'//表示父组件监听playerchange事件,好像不能用驼峰命名
        },
        props:{
            'path':String //此处必须定义与model的prop相同的props,因为v-model会传值给子组件
        },
        data(){
            return{
                myPath:this.path,
            }
        },
        mounted(){
            this.initDplayer();
        },
        methods:{
            initDplayer(){
                // alert(this.myPath);
                // this.$emit('playerchange',this.myPath);//将这个值通过emit触发areachange,将city传递给父组件中v-model绑定的变量
                const dp = new DPlayer({
                    container:document.getElementById('dplayer'),
                    autoplay:false,//不会自动播放
                    theme:'#FADFA3',//主题色
                    loop:true,//视频循环播放
                    lang:'zh-cn',//语言
                    screenshot:true,//是否开启截图，如果开启，视频和视频封面需要允许跨域
                    hotkey:true,//开启热键，支持快进、快退、音量控制、播放暂停
                    preload:'auto',//视频预加载
                    // logo:'../../assets/img/logo.png',//左上角展示的水印logo,可通过css调整位置和大小
                    volumn:0.7,//默认音量，播放器会记忆用户设置
                    mutex:true,//互斥，阻止多个播放器同时播放
                    video:{
                        // url:'http://static.smartisanos.cn/common/video/t1-ui.mp4',//视频链接
                        url:this.myPath,//视频链接
                        thumbnails:'thumbnails.jpg',//视频缩略图，可以使用DPlayer-thumbnails生成
                        type:'auto',//自定义类型
                    },
                    subtitle:{},//字幕
                    danmaku:{
                        id:'http://static.smartisanos.cn/common/video/t1-ui.mp4',//弹幕池id必须唯一{{hotel.id}}
                        api:'https://api.prprpr.me/dplayer/',//弹幕接口
                        token:'tokendemo',//弹幕后端验证token
                        maximum:1000,//弹幕最大数量
                        addition:['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'],//额外外挂弹幕
                        user:'tsuyoii',//弹幕用户名
                        bottom:'15%',
                        unlimited:true//海量弹幕模式，即使重叠也展示全部弹幕
                    },
                    contextmenu:[
                        //自定义右键菜单
                        {
                            text:'custom1',
                            link:'http://www.baidu.com',
                        },
                        {
                            text:'custom2',
                            click:(player) => {
                                console.log(player);
                            }
                        }
                    ],
                    highlight:[
                        //自定义进度条提示点
                    ]
                })
            }
        }
    }
</script>

<style scoped>
    .dplayer-video-wrap{width:100%;height:100%;margin-top: 3%}
    #dplayer{background-size:100% 100%;height: 100%;}
    .player_av{width:100%;height:100%;float:left;background:#000}
</style>
