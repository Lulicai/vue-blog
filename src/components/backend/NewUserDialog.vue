<template>
<el-dialog title="创建新用户" :visible.sync="isShow" :before-close="closePop" width="40%">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="手机号" prop="telephone">
        <el-input v-model="ruleForm2.telephone" autocomplete="off" maxlength="11"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm2.password" autocomplete="off" maxlength="6"></el-input>
    </el-form-item>
    <el-form-item label="管理权限">
        <el-select v-model="ruleForm2.rank" placeholder="请选择管理权限">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="二级管理员" value="2"></el-option>
            <el-option label="三级管理员" value="3"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
        <el-input v-model="ruleForm2.remark" autocomplete="off" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
    </el-form>
</el-dialog>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { myreg } from "../../common/util.js"
export default {
    props: ['isShow'],
    data() {
        var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
      };
      var validateTel = (rule, value, callback) => {
        if (!value) {
            return callback(new Error("手机号码不能为空"));
        } else if (!myreg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
        } else {
            callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          telephone: "",
          password: "",
          rank: '3',
          remark:""
        },
        rules2: {
          telephone: [
            { validator: validateTel, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          rank: [
              {required: true, trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
        ...mapState({
        resData: state => state.register.resData
        })
    },
    methods:{
        ...mapActions(["RegisterPost"]),
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = {
                        password: this.ruleForm2.password,
                        telephone: this.ruleForm2.telephone,
                        rank: this.ruleForm2.rank,
                        status: "0",
                        remark: this.ruleForm2.remark
                    };
                    //网络请求
                    this.RegisterPost(data).then(()=>{
                        if(this.resData.code == '0000'){
                            this.$message({
                                message: this.resData.message,
                                type: "success"
                            });
                        }else{
                            this.$message({
                                message: this.resData.message,
                                type: "warning"
                            });
                        }
                        this.$emit('testchange');
                    })
                }
            })
        },
        closePop() {
            this.$emit('testchange');
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    created() {
        // console.log(43,this.isShow)
    }
}
</script>