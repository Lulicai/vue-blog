<template>
  <div class="about">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/user">用户管理</a></el-breadcrumb-item>
    </el-breadcrumb>
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
          <el-button @click="editUserRankClick(scope.row)" type="text" size="small">{{parseInt(scope.row.status)?"启用":"禁用"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="disabled?'用户查看':'用户编辑'" :visible.sync="dialogUserTableVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-input v-model="form.rank" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogUserTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
import { mapState, mapActions } from "vuex";
export default {
  name:'adminIndex',
  data() {
    return {
      tableData: [],
      pageNo: 1,
      count: null,
      dialogUserTableVisible:false,
      form: {
          telephone: "",
          rank: ""
      },
      disabled: false,
      formLabelWidth: '80px'
    }
  },
  computed: {
    ...mapState({
      resData: state => state.user.resData,
      userRes: state => state.user.userRes
    })
  },
  filters:{
    
  },
  methods: {
    ...mapActions(["GetUserList", "editUserRank"]),
    handleClick(row,state) {
      this.dialogUserTableVisible = !this.dialogUserTableVisible;
      //数据回显
      this.form.telephone = row.telephone;
      this.form.rank = row.rank;
      if(state){
        this.disabled = true;
      }else {
        this.disabled = false;
      }
    },
    handleCurrentChange(val){
      this.getList(val);
    },
    dateForm(params) {
      return this.$moment(params).format('YYYY-MM-DD');
    },
    rankForm(params) {
      return params === "1" ? "超级管理员" : params === "2" ? "二级管理员" : "三级管理员"
    },
    editUserRankClick(data) {
      let params = {
        id:data.id,
        status:!parseInt(data.status)
      };
      this.editUserRank(params).then(()=>{
        if(this.userRes.code === "0000"){
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.getList(this.pageNo);
        }
      })
    },
    getList(page) {
      this.pageNo = page;
      let params = {
        pageNo: page
      };
      this.GetUserList(params).then(()=>{
        console.log(this.resData)
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
  mounted(){
    if(!localStorage.getItem("token")){
        window.location.href = "http://localhost:8000/login"
    }
  },
  created(){
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
</style>
