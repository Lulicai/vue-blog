<template>
<div class="rank-main">
    <el-row :gutter="20" justify="center">
        <el-col :span="12" class="rank-style">
            <h2 class="rank-font">Ooops!!!</h2>
            <h3>你没有权限去该页面</h3>
            <h4>如有不满请联系你领导</h4>
            <span style="font-size:14px">或者去其他页面看看呢</span>
        </el-col>
        <el-col :span="12">
            <img src="../assets/401.gif" alt="">
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
    background: white;
    padding: 100px;
    animation: myanimation 500ms ease-in-out 1;
    -moz-animation: myanimation 500ms ease-in-out 1;	/* Firefox */
    -webkit-animation: myanimation 500ms ease-in-out 1;	/* Safari 和 Chrome */
    -o-animation: myanimation 500ms ease-in-out 1;	/* Opera */
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
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
</style>