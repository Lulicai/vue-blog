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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="updateAt" label="日期" width></el-table-column>
      <el-table-column prop="classType" label="分类名称" width></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row,false)">编辑</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row,false)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分类编辑" :visible.sync="dialogClassTableVisible" width="40%">
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
        classify: ""
      },
      rules: {
        classify: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, message: "长度不得少于3个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      resData: state => state.classify.resData,
      classRes: state => state.classify.classRes,
      newClassRes: state => state.classify.newClassRes
    })
  },
  methods: {
    ...mapActions(["getClassList", "editClass", "createClass"]),
    createNewClass() {
      this.dialogClassTableVisible = true;
    },
    handleClick(row) {
      console.log(68,row.id)
      let data = {
        
      }
    },
    editClassMessage(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            classType: this.form.classify
          };
          this.createClass(data).then(res => {
            if (this.newClassRes.code == "0000") {
              this.$message({
                message: this.newClassRes.message,
                type: "success"
              });
              this.dialogClassTableVisible = false;
            } else if (this.newClassRes.code == "1002") {
              this.$message({
                message: this.newClassRes.message,
                type: "warning"
              });
              this.dialogClassTableVisible = false;
            }
          });
        }
      });
    }
  },
  created() {
    this.getClassList().then(() => {
      console.log(this.resData);
      this.tableData = this.resData.data;
    });
  }
};
</script>
<style scoped>
.create_new_user {
  margin: 10px;
  margin-left: 0px;
}
</style>
