<template>
  <div class="post-con">
    <div class="title">
      <span style="font-weight: 700">标题：</span
      ><el-input v-model="postData.title" placeholder="请输入标题"></el-input>
    </div>
    <div class="cover">
      <span style="font-weight: 700">封面：</span>
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:5000/postView/img"
        :on-success="uploadPic"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture"
        limit:1
      >
        <el-button size="small" type="success">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
    <div class="con">
      <span style="font-weight: 700">正文：</span>
      <md-tranfer @changeText="saveChange" />
    </div>
    <ul class="send-info">
      <li class="time">
        <span>状态：</span>{{ isSave ? "已保存" : "未保存" }}
      </li>
      <li class="time"><span>时间：</span>{{ getNowTime }}</li>
      <li class="author"><span>发布者：</span>{{ this.$store.state.User }}</li>
      <li class="type">
        <span>分类：</span>
        <el-dropdown>
          <el-button type="primary">
            {{ Blogtype.isSelect }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="type in Blogtype.types"
              :key="type"
              @click.native="selectType(type)"
              >{{ type }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <el-button type="success" @click="postArticle()">发布</el-button>
  </div>
</template>

<script>
import axios from "axios";
import mdTranfer from "../../components/Tools/mdTranfer.vue";
import editViewVue from "../EditView/edit-view.vue";
// import picgo from "../../api/uploadPic";
export default {
  data() {
    return {
      isSave: false,
      fileList: [],
      Blogtype: {
        types: ["前端", "后端", "MySQL", "面试", "生活"],
        isSelect: "博文类型",
      },
      postData: {
        title: "",
        cover: "",
        blogtype: "",
        is_choice: 0,
        admin: this.$store.state.User,
        originText: "",
        article: "",
      },
    };
  },
  components: { mdTranfer, editViewVue },
  methods: {
    saveChange(status, text, html) {
      if (status) {
        this.isSave = true;
        console.log("!!!!", text);
        this.postData.originText = text;
        this.postData.article = html;
      } else {
        this.isSave = false;
      }
    },
    uploadPic(res) {
      console.log(res);
      this.postData.cover = res.url;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    selectType(type) {
      this.Blogtype.isSelect = type;
      this.postData.blogtype = type;
    },
    postArticle() {
      if (this.isSave) {
        const postData = { ...this.postData };
        console.log(postData);
        axios
          .post("http://127.0.0.1:5000/postView/postArticle", postData)
          .then((response) => {
            console.log(response);
            this.$store.commit("clearArticleCon"); //发送成功后，要将vuex中的缓存清除
            this.$message({
              message: "发布成功！",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$message({
          message: "请先保存再上传！",
          type: "warning",
        });
      }
    },
  },
  computed: {
    getNowTime() {
      return new Date();
    },
  },
};
</script>
<style lang="less" scoped>
.post-con {
  .title {
    span {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
  .cover {
    margin: 20px 0;
    .upload-demo {
      padding-top: 10px;
      .el-upload__tip {
        color: #b6b6b6;
      }
    }
    .el-button--success {
      border: 2px solid #000;
      background-color: #fff;
      font-weight: 700;
      color: #000;
      transition: 0.5s all;
      &:hover {
        background-color: #000;
        color: #fff;
        border: 2px solid #000;
      }
    }
  }
  .con {
    span {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
  .send-info {
    padding-left: 0;
    li {
      list-style: none;
      margin: 10px 0;
      span {
        font-weight: 700;
      }
    }
    .type {
      display: flex;
      align-items: center;
    }
  }

  .el-button {
    float: right;
    padding: 10px 50px;
  }

  .el-button--primary {
    border: 2px solid #000;
    background-color: #fff;
    font-weight: 700;
    color: #000;
    transition: 0.5s all;
    &:hover {
      color: #fff;
      background-color: #000;
      border: 2px solid #000;
    }
  }
}
</style>