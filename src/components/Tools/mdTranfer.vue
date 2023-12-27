<template>
  <v-md-editor
    v-model="text"
    height="400px"
    @save="saveText"
    @change="changeText"
    ref="editor"
  ></v-md-editor>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      time: null,
    };
  },
  methods: {
    saveText(text, html) {
      const divHead = `<div class="vuepress-markdown-body">`;
      const divTail = `</div>`;
      const saveHtml = divHead + html + divTail;
      console.log("text, html", text, saveHtml);
      this.$emit("changeText", true, text, saveHtml);

      this.$message({
        message: "保存成功！",
        type: "success",
      });
    },
    changeText() {
      this.$emit("changeText", false);
    },
  },
  computed: {},
  mounted() {},
};
</script>
<style lang="less">
</style>