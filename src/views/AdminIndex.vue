<template>
  <div class="about">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/user">用户管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="create_new_user">
      <el-button type="primary" @click="createNewUser">创建新用户</el-button>
    </el-row>
    <el-table
      :data="tableData"
      border
      size="medium"
      >
        <el-table-column
          prop="createAt"
          :formatter="dateForm"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话"
          >
        </el-table-column>
        <el-table-column
          prop="rank"
          label="权限"
          :formatter="rankForm"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row,true)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row,false)">编辑</el-button>
          <el-button @click="editUserStatusClick(scope.row)" type="text" size="small">{{parseInt(scope.row.status)?"启用":"禁用"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="disabled?'用户查看':'用户编辑'" :visible.sync="dialogUserTableVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="telephone">
          <el-input v-model="form.telephone" autocomplete="off" :disabled="disabled" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="rank">
          <el-select v-model="form.rank" placeholder="请选择管理员权限" :disabled="disabled">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="二级管理员" value="2"></el-option>
            <el-option label="三级管理员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input :disabled="disabled" v-model="form.remark" autocomplete="off" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserMessage('form')">确 定</el-button>
      </div>
    </el-dialog>
    <NewUserDialog @testchange="toshow" :isShow="isShow" ></NewUserDialog>
    <el-pagination
    :page-size="10"
    background
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :total="this.count">
    </el-pagination>
  </div>
</template>

<script>
import { myreg } from "../common/util.js"
import { mapState, mapActions } from "vuex";
import NewUserDialog from "../components/backend/NewUserDialog.vue"
export default {
  name:'adminIndex',
  data() {
    return {
      isShow:false,
      tableData: [],
      pageNo: 1,
      count: null,
      dialogUserTableVisible:false,
      form: {
          telephone: "",
          rank: "",
          id: "",
          remark:""
      },
      disabled: false,
      formLabelWidth: "80px",
      rules: {
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur'},
          { min: 11, max: 11, message: '长度必须11个字符', trigger: 'blur' }
        ],
        rank: [
          { required: true, message: '请选择管理权限', trigger: 'change' }
        ]
    }
    }
  },
  components:{NewUserDialog},
  computed: {
    ...mapState({
      resData: state => state.user.resData,
      userRes: state => state.user.userRes
    })
  },
  methods: {
    ...mapActions(["GetUserList", "editUserStatus", "editUser"]),
    handleClick(row,state) {
      this.dialogUserTableVisible = !this.dialogUserTableVisible;
      //数据回显
      this.form.id = row.id;
      this.form.telephone = row.telephone;
      this.form.rank = row.rank;
      this.form.remark = row.remark;
      if(state){
        this.disabled = true;
      }else {
        this.disabled = false;
      }
    },
    createNewUser(){
      // console.log(3333)
      this.isShow = true;
    },
    toshow() {
      this.isShow = false;
      this.getList(1);
    },
    handleCurrentChange(val){
      this.getList(val);
    },
    dateForm(params) {
      return this.$moment(params).format('YYYY-MM-DD');
    },
    rankForm(params) {
      return params.rank == "1" ? "超级管理员" : params.rank == "2" ? "二级管理员" : "三级管理员"
    },
    editUserStatusClick(data) {
      let params = {
        id:data.id,
        status:!parseInt(data.status)
      };
      this.editUserStatus(params).then(()=>{
        if(this.userRes.code === "0000"){
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.getList(this.pageNo);
        }
      })
    },
    editUserMessage(form) {
      if(this.disabled){
        this.dialogUserTableVisible = false;
        return;
      }
      this.$refs[form].validate((valid) => {
         if (valid) {
          //  console.log(33333)
           if(!myreg.test(this.form.telephone)) {
              this.$message({
                type: "warning",
                message:  "请填写正确的手机号"
              })
           }else {
              this.dialogUserTableVisible = false;
              let params = {
                  id:this.form.id,
                  telephone:this.form.telephone,
                  rank:this.form.rank,
                  remark:this.form.remark
              }
              console.log(155,params)
              this.editUser(params).then(()=>{
                if(this.userRes.code == "0000"){
                  this.$message({
                    message: "操作成功",
                    type: "success"
                  });
                  this.getList(this.pageNo);
                }else{
                  this.$message({
                    message: this.userRes.message,
                    type: "warning"
                  });
                }
              })
           }
         }else {
            console.log('error submit!!');
            return false;
          }
      })
    },
    getList(page) {
      this.pageNo = page;
      let params = {
        pageNo: page
      };
      this.GetUserList(params).then(()=>{
        // console.log(this.resData)
        if(this.resData.code == "0000"){
          this.tableData = this.resData.data.rows;
          this.count = this.resData.data.count;
        }else{
          this.$message({
            message: this.resData.message,
            type: "warning"
          })
        }
      })
    }
  },
  mounted() {
    if(!localStorage.getItem("token")){
      window.location.href = "http://localhost:8000/login"
    }
  },
  created() {
    this.getList(this.pageNo);
  }
};
</script>
<style>
.about {
  height: 100%;
}
.el-table {
  margin: 20px 0px;
}
.el-pagination {
  float: right;
}
.create_new_user {
  margin-top: 20px;
}
</style>
