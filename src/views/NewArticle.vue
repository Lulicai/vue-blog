<template>
  <div class="about">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/admin/createarticle">新建文章</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="article-ruleForm"
    >
      <el-form-item label="文章名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="classType">
        <el-select v-model="ruleForm.classType" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章简介" prop="brief">
        <el-input v-model="ruleForm.brief"></el-input>
      </el-form-item>
      <el-form-item label="文章正文" prop="content">
        <quill-editor
          v-model="ruleForm.content"
          ref="myQuillEditor"
          :options="editorOption"
          class="edit-style"
        ></quill-editor>
      </el-form-item>
      <el-form-item class="submit_style">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      editorOption: {
        // some quill options
      },
      ruleForm: {
        name: "",
        classType: "",
        brief: "",
        content: "<h2>I am Example</h2>"
      },
      rules: {
        name: [
          { required: true, message: "请输入文章名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        classType: [
          { required: true, message: "请选择分类名称", trigger: "change" }
        ],
        brief: [
          { required: true, message: "请输入文章简介", trigger: "change" }
        ]
      }
    };
  },
  components: {
    quillEditor
  },
  computed: {
    ...mapState({
      createArticleRes: state => state.article.createArticleRes
    }),
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    ...mapActions(["createNewArticle"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert("submit!");
          console.log(89, this.ruleForm.content);
          let params = {
            title: this.ruleForm.name,
            classType: this.ruleForm.classType,
            brief: this.ruleForm.brief,
            content: "asdasd",
            contentToMark: this.ruleForm.content,
            token: localStorage.getItem('token')
          };
          this.createNewArticle(params).then(()=>{
              console.log(this.createArticleRes)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getClassType(){
        
    }
  }
};
</script>

<style scoped>
.article-ruleForm {
  background: white;
  padding: 20px 20px;
  margin: 10px;
}
.edit-style {
  height: 600px;
}
.submit_style {
  margin-top: 150px;
}
</style>