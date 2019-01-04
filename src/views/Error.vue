<template>
    <div class="rank-main">
    <el-row :gutter="20" justify="center">
        <el-col :span="12">
            <img src="../assets/404.png" alt="" class="error-img-style">
            <img src="../assets/cloud.png" alt="" class="error-cloud1">
            <img src="../assets/cloud.png" alt="" class="error-cloud2">
            <img src="../assets/cloud.png" alt="" class="error-cloud3">
        </el-col>
        <el-col :span="12" class="rank-style">
            <h2 class="rank-font">Ooops!!!</h2>
            <h3>这个页面你不能进......</h3>
            <div style="font-size:14px;margin-bottom:30px">请检查您输入的网址是否正确，<br>请点击以下按钮返回主页或者发送错误报告</div>
            <router-link to="/admin/user">
                <el-button type="primary" round>返回首页</el-button>
            </router-link>
        </el-col>
    </el-row>
</div>
</template>
<style scoped>
.rank-style {
    text-align: center;
    margin-top: 50px;
}
.rank-font {
    font-size: 40px
}
.rank-main{
    /* background: white; */
    padding: 100px;
    /* animation: myanimation 500ms ease-in-out 1;
    -moz-animation: myanimation 500ms ease-in-out 1;
    -webkit-animation: myanimation 500ms ease-in-out 1;
    -o-animation: myanimation 500ms ease-in-out 1; */
    /* box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2); */
}
@keyframes myanimation {
    0% {
        transform: translate(200px,0px);
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2)
    }
    100% {
        transform: translate(0px,0px);
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2)
    }
}
.error-img-style {
    width: 600px;
    margin-top: 50px;
    margin-left: 100px;
}
.error-cloud1 {
    position: absolute;
    top: 0;
    width: 80px;
    left: 50px;
    animation: cloudanimation 1s linear 1;
    opacity: 0;
}
.error-cloud2 {
    position: absolute;
    top: -50px;
    width: 80px;
    left: 160px;
    animation: cloudanimation 1s linear 500ms 1;
    opacity: 0;
}
.error-cloud3 {
    position: absolute;
    top: 0;
    width: 80px;
    left: 200px;
    animation: cloudanimation 1s linear 1;
    opacity: 0;
}
@keyframes cloudanimation {
    0% {
        transform: translate(300px,-100px);
        opacity: 1;
    }
    100% {
        transform: translate(0px,0px);
         opacity: 0;
    }
}
</style>

