<template>
  <div class="manage">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="admin" label="发布者" width="180">
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="post_time" label="发布时间"> </el-table-column>
      <el-table-column prop="is_choice" label="精选文章" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_choice"
            active-color="deeppink"
            inactive-color="#ccc"
            active-value="1"
            inactive-value="0"
            @change="uptoDB(scope.$index, scope.row)"
            :disabled="$store.state.User == `root` ? !isAuth : isAuth"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="标签"
        width="100"
        :filters="[
          { text: '前端', value: '前端' },
          { text: '后端', value: '后端' },
          { text: 'MySQL', value: 'MySQL' },
          { text: '面试', value: '面试' },
          { text: '生活', value: '生活' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type === '生活' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.type }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            :disabled="
              scope.row.admin == $store.state.User ||
              $store.state.User == `root`
                ? !isUser
                : isUser
            "
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            :disabled="$store.state.User == `root` ? !isAuth : isAuth"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="view-box" v-if="eidtShow">
      <edit-view @editboxShow="close" :id="eidtID" @updateView="getData" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditView from "../EditView/edit-view.vue";
export default {
  components: { EditView },
  data() {
    return {
      tableData: [],
      eidtShow: false,
      eidtID: null,
      isUser: true,
      isAuth: true,
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    close(text) {
      this.eidtShow = false;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.eidtID = row.id;
      this.eidtShow = true;
    },
    handleDelete(index, row) {
      console.log(index, row.id);
      axios
        .get(`http://127.0.0.1:5000/manageView/delArticle?id=${row.id}`)
        .then((res) => {
          console.log(res.data);
          this.tableData = this.tableData.filter((item) => item.id !== row.id);
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        });
    },
    getData() {
      axios.get("http://127.0.0.1:5000/manageView/getArticles").then((res) => {
        console.log(res.data.manage_articles);
        this.tableData = res.data.manage_articles;
      });
    },
    uptoDB(index, row) {
      axios
        .get(`http://127.0.0.1:5000/manageView/setChoice?id=${row.id}`)
        .then((res) => {
          console.log(res.data);
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="less">
.view-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background-color: #00000027;
  z-index: 999;
}
</style>