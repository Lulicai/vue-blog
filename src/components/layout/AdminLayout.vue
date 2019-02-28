<template>
    <el-container class="panel">
        <el-menu 
            :default-active="defaultActive" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            @select="handleSelect"
            :collapse="isCollapse"
            background-color="#001529"
            text-color="#ffffff"
            active-text-color="#3eaf7c"
            router
        >
            <template v-for="(menu,index) in menus">
                <el-menu-item :index="menu.path" :key="index">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.name}}</span>
                </el-menu-item>
            </template>
        </el-menu>
        <el-container>
            <el-header>
                <el-row type="flex" class="row-bg">
                    <el-col :span="4">
                        <div @click="showMenu" class="toggle-icon">
                            <i class="el-icon-menu"></i>
                        </div>   
                    </el-col>
                    <el-col :span="18"><div class="header-second"></div></el-col>
                    <el-col :span="2">
                        <div class="header-third">
                            <el-badge :value="12" class="item">
                                <i class="el-icon-bell"></i>
                            </el-badge>         
                            <span class="quit-user" @click="quit">退出</span>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>    
    </el-container>
</template>
<script>
import menuData from "../../common/menu.js";
export default {
    data() {
      return {
        isCollapse: false,
        menus: menuData,
        defaultActive:"/admin/user"
      };
    },
    methods: {
        showMenu(show){
            this.isCollapse = !this.isCollapse
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(data){
            // console.log(data)
            localStorage.setItem('activeOption',data)
        },
        quit(){
            localStorage.clear();
            this.$router.push({path: '/login'})
        }
    },
    created(){
        this.defaultActive = localStorage.getItem('activeOption')
    }
}
</script>

<style scoped>
  .el-header { 
    color: #333;
    box-shadow:0 1px 4px rgba(0,21,41,.08);
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 10px;
  }
  .el-menu{
      border-right: none;
  }
  .panel{
    height: 100%;
  }
  .sub-menu{
      height: 100%;
      border: none;
  }
  .logo-wenzi{
      color: #42b983;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #002140;
      margin-top: 20px;
      border-radius: 5px;
  }
  .logo-wenzi img{
      width: 25px;
      margin-right: 5px;
  }
  .header-third{
      display: flex;
      justify-content:space-around;
      align-items: center;
      height: 60px;
  }
  .quit-user{
      color: cadetblue;
      cursor: pointer;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 300px;
  }
  .toggle-icon{
      height: 56px;
      line-height: 56px;
      cursor: pointer;
  }
</style>
