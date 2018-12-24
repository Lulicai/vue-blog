<template>
  <div class="home">
    <el-button type="primary" @click.prevent="buttonClick('Form1')">主要按钮1</el-button>
    <el-button type="primary" @click.prevent="buttonClick('Form2')">主要按钮2</el-button>
    <el-button type="primary" @click.prevent="buttonClick('Form3')">主要按钮3</el-button>
    <el-button type="primary" @click.prevent="buttonClick('Form4')">主要按钮4</el-button>
    <keep-alive>
      <component v-bind:is="currentView"></component>
    </keep-alive>
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
  methods:{
    buttonClick:function(arg){
      this.currentView = arg;
    }
  },
  components:{Form1,Form2,Form3,Form4},
  beforeCreate(){
    console.log('create.....')
  },
  created(){

  },
  beforeMount(){

  },
  mounted(){

  },
  beforeUpdate(){

  },
  updated(){
    
  }
};
</script>
