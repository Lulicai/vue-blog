<template>
  <div class="about">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/admin/class">分类管理</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="create_new_user">
      <el-button type="primary" @click="createNewClass">创建新分类</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%" class="el-table">
      <el-table-column prop="updateAt" :formatter="dateForm" label="日期" width></el-table-column>
      <el-table-column prop="classType" label="分类名称" width></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteClassType(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分类编辑" :visible.sync="dialogClassTableVisible" width="">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="classify">
          <el-input v-model="form.classify" autocomplete="off" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClassTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClassMessage('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      :page-size="10"
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="this.count"
    ></el-pagination>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      dialogClassTableVisible: false,
      formLabelWidth: "80px",
      form: {
        classify: "",
        id: ""
      },
      count: null,
      rules: {
        classify: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, message: "长度不得少于3个字符", trigger: "blur" }
        ]
      },
      editDilog: false,
      pageNo: 1
    };
  },
  computed: {
    ...mapState({
      resData: state => state.classify.resData,
      classRes: state => state.classify.classRes,
      newClassRes: state => state.classify.newClassRes,
      deleteClassRes: state => state.classify.deleteClassRes
    })
  },
  methods: {
    ...mapActions(["getClassList", "editClass", "createClass", "deleteClass"]),
    createNewClass() {
      this.dialogClassTableVisible = true;
      //清空括号表单的内容
      this.form.classify = "";
      this.editDilog = false;
    },
    handleCurrentChange(val) {
      this.getList(val);
    },
    dateForm(params) {
      return this.$moment(params).format('YYYY-MM-DD');
    },
    deleteClassType(deleteData) {
      this.deleteClass(deleteData);
      this.getList(this.pageNo);
    },
    handleClick(row) {
      this.dialogClassTableVisible = true;
      this.form.classify = row.classType;
      this.form.id = row.id;
      this.editDilog = true;
    },
    editClassMessage(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.editDilog) {
            let data = {
              classType: this.form.classify
            };
            this.createClass(data).then(res => {
              if (this.newClassRes.code == "0000") {
                this.$message({
                  message: this.newClassRes.message,
                  type: "success"
                });
                this.getList(this.pageNo);
                this.dialogClassTableVisible = false;
              } else if (this.newClassRes.code == "1002") {
                this.$message({
                  message: this.newClassRes.message,
                  type: "warning"
                });
                this.dialogClassTableVisible = false;
              }
            });
          } else {
            let data = {
              id: this.form.id,
              classType: this.form.classify
            };
            this.editClass(data).then(() => {
              console.log(75, this.classRes);
              this.dialogClassTableVisible = false;
              this.getList(this.pageNo);
            });
          }
        }
      });
    },
    getList(page) {
      this.pageNo = page;
      let params = {
        pageNo: page
      };
      this.getClassList(params).then(() => {
        // console.log(this.resData)
        if (this.resData.code == "0000") {
          this.tableData = this.resData.data.rows;
          this.count = this.resData.data.count;
        } else {
          this.$message({
            message: this.resData.message,
            type: "warning"
          });
        }
      });
    }
  },
  created() {
    this.getList(this.pageNo);
    // this.getClassList().then(() => {
    //   this.tableData = this.resData.data;
    // });
  }
};
</script>
<style scoped>
.create_new_user {
  margin: 10px;
  margin-left: 0px;
}
</style>
