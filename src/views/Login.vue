<template>
<div class="login-container">
  <h1 class="login-title">LILY’S BLOG</h1>
  <div class="login-panel">
    <el-form :label-position="labelPosition" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="70px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="telphone">
        <el-input v-model.number="ruleForm2.telphone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" maxlength="6"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" size="small" class="login-button">登录</el-button>
      </el-form-item>
    </el-form>
    <router-link to="/register" class="to-register"><a>注册--></a></router-link>
  </div>
</div>
</template>
<script>
// var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
import { mapState, mapActions } from "vuex";
import { myreg } from "../common/util.js"
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      } else if (!myreg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      ruleForm2: {
        pass: "",
        checkPass: "",
        telphone: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        telphone: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  computed:{
    ...mapState({
      resData: state=> state.login.resData
    })
  },
  methods: {
    ...mapActions(["LoginPost"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            password: this.ruleForm2.pass,
            telephone: this.ruleForm2.telphone
          };
          //网络请求
          this.LoginPost(data).then(()=>{
            if(this.resData.code == '0000'){
              this.$message({
                message: this.resData.message,
                type: "success"
              });
              localStorage.setItem('token',this.resData.token);
              //跳转
              this.$router.push({path: 'admin'})
            }else{
              this.$message({
                message: this.resData.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>
<style lang="less" scoped>
.login-panel {
  width: 300px;
  margin-top: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 150px;
  right: 100px;
}
.login-container {
  width: 100%;
  height: 100%;
  // background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
  background-image:url(../assets/bg.png);
  background-size: 100%;
  overflow: hidden;
}
.login-title {
  position: absolute;
  top: 10px;
  right: 180px;
  text-align: center;
  margin-top: 100px;
  // transform-origin:20% 20%;
  animation: myfirst 2s cubic-bezier(0.680, 0, 0.265, 1) 1;
  -moz-animation: myfirst 2s cubic-bezier(0.680, -0.550, 0.265, 1.550) 1;	/* Firefox */
  -webkit-animation: myfirst 2s cubic-bezier(0.680, -0.550, 0.265, 1.550) 1;	/* Safari 和 Chrome */
  -o-animation: myfirst 2s cubic-bezier(0.680, -0.550, 0.265, 1.550) 1;	/* Opera */
  }
@keyframes myfirst {
  10% {
    transform: translate(400px,0px) rotate(0deg);
  }
  100% {
    transform: translate(0px,0px) rotate(360deg);
  }
}
.el-button {
  padding: 12px 100px;
}
.to-register {
  float: right;
  text-decoration: none;
  font-size: 14px
}
.login-button{
  font-size: 14px;
  letter-spacing: 5px
}
</style>
