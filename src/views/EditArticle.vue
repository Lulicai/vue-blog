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
      <el-form-item label="文章名称" prop="name" class="el-item">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="classType" class="el-item">
        <el-select v-model="ruleForm.classType" placeholder="请选择文章分类">
          <el-option
            v-for="(ele, index) in resData.data"
            :key="index"
            :value="ele.classType"
            :label="ele.classType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章简介" prop="brief" class="el-item">
        <el-input v-model="ruleForm.brief"></el-input>
      </el-form-item>
      <el-form-item label="文章头图" class="el-item">
        <el-upload
          class="upload-demo"
          ref="upload"
          :limit="1"
          action
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="true"
          :http-request="uploadSectionFile"
          accept=".jpeg, .png, .jpg"
          :on-exceed="handleExceed"
          list-type="picture"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章正文" prop="content" class="el-item">
        <quill-editor
          v-model="ruleForm.content"
          ref="myQuillEditor"
          :options="editorOption"
          class="edit-style"
        ></quill-editor>
      </el-form-item>
      <el-form-item class="submit_style el-item">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      editorOption: {
        // some quill options
      },
      fileList: [],
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
        ],
        content: [{ required: true }]
      }
    };
  },
  components: {
    quillEditor
  },
  computed: {
    ...mapState({
      resData: state => state.classify.resData,
      articleContent: state => state.article.articleContent,
      editRes: state => state.article.editRes,
      deleteImgRes: state => state.article.deleteImgRes,
      uploadRes: state => state.article.uploadRes
    }),
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    ...mapActions([
      "getArticleById",
      "getClassList",
      "editArticleById",
      "deleteFile",
      "uploadfile",
    ]),
    handleRemove(file, fileList) {
      let params = {
        imgUrl: file.name
      };
      this.deleteFile(params).then(() => {
        if (this.deleteImgRes.code == "0000") {
          this.$message.success("文件删除成功");
          this.fileList = [];
        } else {
          this.$message.error("稍后再试");
        }
      });
    },
    handlePreview(file) {
      console.log(112, file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    uploadSectionFile(param) {
      const isJPG =
        param.file.type === "image/jpeg" || param.file.type === "image/png";
      const isLt2M = param.file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      if (this.fileList.length <= 0) {
        var fileObj = param.file;
        //调用上传图片的接口
        var form = new FormData();
        // 文件对象
        form.append("file", fileObj);
        this.uploadfile(form).then(() => {
          if (this.uploadRes.code == "0000") {
            this.$message.success("上传图片成功");
            let data = {
              name: this.uploadRes.data.name,
              url: this.uploadRes.data.imgUrl
            };
            this.fileList.push(data);
          }
        });
      } else {
        this.$message.warning("只能上传一个文章头图片");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert("submit!");
          let params = {
            title: this.ruleForm.name,
            classType: this.ruleForm.classType,
            brief: this.ruleForm.brief,
            content: "asdasd",
            contentToMark: this.ruleForm.content,
            token: localStorage.getItem("token"),
            id: this.$route.query.articleId,
            imgUrl: this.fileList[0].url
          };
          this.editArticleById(params).then(() => {
            if (this.editRes.code == "0000") {
              this.$notify({
                title: "成功",
                message: "文章修改成功",
                type: "success"
              });
              this.$router.push("/admin/article");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getArticleDetail() {
      let params = {
        id: this.$route.query.articleId
      };
      this.getArticleById(params).then(() => {
        this.ruleForm.name = this.articleContent.data.title;
        this.ruleForm.classType = this.articleContent.data.classType;
        this.ruleForm.brief = this.articleContent.data.brief;
        this.ruleForm.content = this.articleContent.data.contentToMark;
        // this.fileList[0].url = this.articleContent.data.imgUrl;
        // this.fileList[0].name = "lll";
        if(this.articleContent.data.imgUrl){
          let data = {
            name:'',
            url:this.articleContent.data.imgUrl
          }
          this.fileList.push(data)
          // console.log(223,this.fileList)
        }
      });
    },
    getAllClassType() {
      this.getClassList();
    }
  },
  created() {
    //获取所有的classType
    this.getAllClassType();
    this.getArticleDetail();
  }
};
</script>

<style scoped>
.article-ruleForm {
  background: white;
  padding: 20px 20px;
  margin: 10px;
  overflow-x: scroll;
}
.el-item{
  width: 400px;
}
.edit-style {
  height: 600px;
}
.submit_style {
  margin-top: 150px;
}
</style>