<template>
  <div class="home">
    <el-button type="primary">主要按钮1</el-button>
    <el-button type="primary">主要按钮2</el-button>
    <el-button type="primary">主要按钮3</el-button>
    <el-button type="primary">主要按钮4</el-button>
    <component v-bind:is="currentView"></component>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Form1 from "@/components/Form1.vue";
import Form2 from "@/components/Form2.vue";
import Form3 from "@/components/Form3.vue";
import Form4 from "@/components/Form4.vue";

export default {
  name: "home",
  data(){
    return{
      currentView:'Form1'
    }
  },
  components:{
    
  }
};
</script>
