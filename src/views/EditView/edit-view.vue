<template>
  <div class="view">
    <div class="nav">
      <div class="close" @click="cancle">x</div>
      <div class="title">
        标题：<input type="text" v-model="articleData.title" />
      </div>
    </div>
    <span style="padding-left: 10px; font-weight: 700">正文:</span>
    <v-md-editor
      v-model="articleData.text"
      height="500px"
      @save="saveModify"
      @change="modifyText"
    />
    <ul class="edit-status">
      <li>状态：{{ isSave ? "已保存" : "未保存" }}</li>
      <li>时间: {{ articleData.time }}</li>
      <li>类型：{{ articleData.type }}</li>
    </ul>
    <div class="modify">
      <el-button type="success" @click="uploadModify">更新</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      isSave: false,
      articleData: {
        id: this.id,
        title: "",
        text: "服务器出错！！！",
        type: null,
        time: null,
        html: null,
      },
    };
  },
  methods: {
    getOriginText(id) {
      axios
        .get(`http://127.0.0.1:5000/manageView/getOriginText?id=${id}`)
        .then((res) => {
          this.articleData.title = res.data.title;
          this.articleData.text = res.data.Origin_text;
          this.articleData.type = res.data.type;
          this.articleData.time = res.data.time;
        });
    },
    modifyText(text) {
      console.log("asdasd");
      this.isSave = false;
      this.articleData.text = text;
    },
    cancle() {
      this.$emit("editboxShow");
    },
    saveModify(text, html) {
      this.isSave = true;
      console.log("this.isSave", this.isSave);
      this.$nextTick(() => {
        this.isSave = true;
      });

      const divHead = `<div class="vuepress-markdown-body">`;
      const divTail = `</div>`;
      const saveHtml = divHead + html + divTail;

      this.articleData.html = saveHtml;
      this.articleData.text = text;
      this.$message({
        message: "保存成功",
        type: "success",
      });
    },
    uploadModify() {
      if (this.isSave) {
        axios
          .post(
            "http://127.0.0.1:5000/manageView/updateModify",
            this.articleData
          )
          .then((res) => {
            console.log(res);
            this.$emit("updateView");
            this.$message({
              message: "更新成功",
              type: "success",
            });
          });
      } else {
        this.$message({
          message: "未保存",
          type: "warning",
        });
      }
    },
  },
  watch: {
    articleData: {
      handler() {
        this.isSave = false;
      },
      deep: true,
    },
  },
  mounted() {
    this.getOriginText(this.id);
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.view {
  position: absolute;
  width: 80%;
  top: 50%;
  right: 50%;
  transform: translate(55%, -50%);
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  border-radius: 5px;
  z-index: 999;
  padding: 0 10px;
  .nav {
    padding: 5px 10px;
    .title {
      font-size: 25px;
      font-weight: 700;
      margin: 10px 0;
      input {
        outline: none;
        border: none;
        font-size: 25px;
        font-weight: 700;
        border-bottom: 1px solid #ccc;
        text-align: center;
        padding: 5px;
      }
    }
    .close {
      float: right;
      font-weight: 700;
      font-size: 23px;
      cursor: pointer;
      &:hover {
        color: rgb(255, 41, 41);
      }
    }
  }
  .v-md-editor {
    margin: 10px 0px;
    box-shadow: none;
    border: 1px solid #eeeeee;
    border-radius: 0;
  }
  .edit-status {
    li {
      font-size: 17px;
      font-weight: 700;
      margin: 15px 0;
    }
  }
  .modify {
    float: right;
    margin: 10px;
  }
}
</style>