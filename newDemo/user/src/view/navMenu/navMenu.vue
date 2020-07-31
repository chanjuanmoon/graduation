<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8" :offset="16">
          <div class="grid-content bg-purple-dark" id="link_p">
            <span>{{user_name}}</span>
            <span>|</span>
            <el-button type="text" @click="toHome">首页</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row id="main1">
        <el-col :span="6">
          <h1 class="logo_name">在线学习交流平台</h1>
        </el-col>
        <el-col :span="14" :offset="4">
          <div id="search">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item>
                <el-row>
                  <el-col :span="16">
                    <el-input v-model="form.name"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="primary" icon="el-icon-search" @click="search" id="search_btn">搜索</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-row id="main2">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" id="table1" v-if="showDetail">
          <el-tab-pane label="计算机" name="first">
            <el-row class="main3">
              <el-table :data="tableData_first" stripe>
                <el-table-column label="名称" prop="name">
                  <template slot-scope="scope">
                    <!-- <img src="../../assets/word.png" id="main3_img"> -->
                    <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="上传者">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="上传时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdAt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="url" label="操作">
                  <template slot-scope="scope">
                    <a :href="scope.row.url">下载</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="main4">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="经济学" name="second">
            <el-row class="main3">
              <el-table :data="tableData_second" stripe>
                <el-table-column label="名称" prop="name">
                  <template slot-scope="scope">
                    <!-- <img src="../../assets/word.png" id="main3_img"> -->
                    <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="上传者">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="上传时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdAt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="url" label="操作">
                  <template slot-scope="scope">
                    <a :href="scope.row.url">下载</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="main4">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="管理" name="third">
            <el-row class="main3">
              <el-table :data="tableData_third" stripe>
                <el-table-column label="名称" prop="name">
                  <template slot-scope="scope">
                    <!-- <img src="../../assets/word.png" id="main3_img"> -->
                    <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="上传者">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="上传时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdAt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="url" label="操作">
                  <template slot-scope="scope">
                    <a :href="scope.row.url">下载</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="main4">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="考研" name="fourth">
            <el-row class="main3">
              <el-table :data="tableData_fourth" stripe>
                <el-table-column label="名称" prop="name">
                  <template slot-scope="scope">
                    <!-- <img src="../../assets/word.png" id="main3_img"> -->
                    <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="上传者">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="上传时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdAt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="url" label="操作">
                  <template slot-scope="scope">
                    <a :href="scope.row.url">下载</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="main4">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="外语" name="fifth">
            <el-row class="main3">
              <el-table :data="tableData_fifth" stripe>
                <el-table-column label="名称" prop="name">
                  <template slot-scope="scope">
                    <!-- <img src="../../assets/word.png" id="main3_img"> -->
                    <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="上传者">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="上传时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdAt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="url" label="操作">
                  <template slot-scope="scope">
                    <a :href="scope.row.url">下载</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="main4">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="四六级" name="sixth">
            <el-row class="main3">
              <el-table :data="tableData_sixth" stripe>
                <el-table-column label="名称" prop="name">
                  <template slot-scope="scope">
                    <!-- <img src="../../assets/word.png" id="main3_img"> -->
                    <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="上传者">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="上传时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdAt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="url" label="操作">
                  <template slot-scope="scope">
                    <a :href="scope.row.url">下载</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="main4">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="教育教学" name="seventh">
            <el-row class="main3">
              <el-table :data="tableData_seventh" stripe>
                <el-table-column label="名称" prop="name">
                  <template slot-scope="scope">
                    <!-- <img src="../../assets/word.png" id="main3_img"> -->
                    <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="上传者">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="上传时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdAt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="url" label="操作">
                  <template slot-scope="scope">
                    <a :href="scope.row.url">下载</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="main4">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-card class="box-card" id="table2" v-else>
          <div slot="header" class="clearfix">
            <span>查找结果</span>
          </div>
          <div>
            <el-row class="main3">
              <el-table :data="tableData_search" stripe>
                <el-table-column label="名称" prop="name">
                  <template slot-scope="scope">
                    <!-- <img src="../../assets/word.png" id="main3_img"> -->
                    <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="上传者">
                  <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="上传时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdAt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="url" label="操作">
                  <template slot-scope="scope">
                    <a :href="scope.row.url">下载</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="main4">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </el-row>
          </div>
        </el-card>
      </el-row>
    </el-main>
    <el-footer>
      <iframe name="myIframe" style="display:none"></iframe>
    </el-footer>
  </el-container>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    //获取本地登录用户用户名
    let data_info = this.getLocalStroage();
    let login_name = "";
    let login_seen = true;
    if (data_info) {
      console.log("登录成功");
      login_name = data_info;
    }
    this.findRecorder("first");
    return {
      user_name: login_name,
      form: {
        name: ""
      },
      activeName: "first",
      tableData_first: [],
      tableData_second: [],
      tableData_third: [],
      tableData_fourth: [],
      tableData_fifth: [],
      tableData_sixth: [],
      tableData_seventh: [],
      tableData_search:[],
      showDetail:true
    };
  },
  methods: {
    //获取本地存储 localStroage
    getLocalStroage() {
      let data = localStorage.getItem("user");
      return data;
    },
    //返回首页
    toHome() {
      this.$router.push({ path: "/" });
    },
    handleClick(tab, event) {
      console.log(tab.name); //first
      this.findRecorder(tab.name);
    },
    //to Word
    ToWord() {
      this.$router.push({ path: "/Word" });
    },
    //下载文件
    downFile(url) {
      window.open(url, "myIframe");
    },
    //搜索文件
    search() {
      let postData = {
        name: this.$data.form.name
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/SourceVague", postData_del, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("搜索");
          console.log(res);
          console.log(res.data.data);
          //处理数据
          let result = res.data.data;
          let list_data = [];
          for (let i = 0; i < result.length; i++) {
            let obj = {};
            obj.id = result[i].id;
            obj.name = result[i].name;
            obj.author = result[i].author;
            obj.url = result[i].url;
            obj.menu_name = result[i].menu_name;
            obj.state = result[i].state;
            obj.createdAt = result[i].createdAt;
            obj.updatedAt = result[i].updatedAt;
            list_data[i] = obj;
          }
          this.assignment_tableData("search", list_data);
          this.$data.showDetail = false;
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //find 记录
    findRecorder(data) {
      let menu_name_data = this.getMenu_name(data);
      let postData = {
        menu_name: menu_name_data
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/searchSource", postData_del, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("查询");
          //处理数据
          let result = res.data.data;
          let list_data = [];
          for (let i = 0; i < result.length; i++) {
            let obj = {};
            obj.id = result[i].id;
            obj.name = result[i].name;
            obj.author = result[i].author;
            obj.url = result[i].url;
            obj.menu_name = result[i].menu_name;
            obj.state = result[i].state;
            obj.createdAt = result[i].createdAt;
            obj.updatedAt = result[i].updatedAt;
            list_data[i] = obj;
          }
          this.assignment_tableData(data, list_data);
          // this.$data.tableData_first = list_data;
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //得到menu_name
    getMenu_name(data) {
      let menu_name_data = "";
      switch (data) {
        case "first":
          menu_name_data = "计算机";
          break;
        case "second":
          menu_name_data = "经济学";
          break;
        case "third":
          menu_name_data = "管理";
          break;
        case "fourth":
          menu_name_data = "考研";
          break;
        case "fifth":
          menu_name_data = "外语";
          break;
        case "sixth":
          menu_name_data = "四六级";
          break;
        case "seventh":
          menu_name_data = "教育教学";
          break;
        default:
          break;
      }
      return menu_name_data;
    },
    //赋值表格数据
    assignment_tableData(data, table_data) {
      switch (data) {
        case "first":
          this.$data.tableData_first = table_data;
          break;
        case "second":
          this.$data.tableData_second = table_data;
          break;
        case "third":
          this.$data.tableData_third = table_data;
          break;
        case "fourth":
          this.$data.tableData_fourth = table_data;
          break;
        case "fifth":
          this.$data.tableData_fifth = table_data;
          break;
        case "sixth":
          this.$data.tableData_sixth = table_data;
          break;
        case "seventh":
          this.$data.tableData_seventh = table_data;
          break;
        case "search":
          this.$data.tableData_search = table_data;
        default:
          break;
      }
    }
  }
};
</script>
<style>
.el-header .el-row {
  background-color: #f9f9f9;
}
#link_p span {
  font-size: 50px;
}
#link_p .el-button {
  font-size: 50px;
}
.logo_name {
  font-size: 80px !important;
}
#search {
  width: 1500px;
  margin-top: 60px;
}
#search .el-input {
  border: 1px solid rgba(0, 0, 0, 0.8);
  height: 100px;
  line-height: 100px;
  font-size: 50px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#search .el-button {
  height: 100px;
  width: 200px;
}
#search .el-input__inner{
  height: 100px;
}
#main2 .el-tabs {
  width: 90%;
  margin: 0 auto;
}
#main2 .el-tabs__item {
  height: 100px;
  line-height: 100px;
  font-size: 50px;
  padding: 0 130px;
  text-align: center;
}
#main2 .el-card{
  width: 90%;
  margin: 0 auto;
}
#main2 .el-card span{
  font-size: 50px;
}
.main3 .el-table {
  width: 90%;
  margin: 0 auto;
  font-size: 50px;
}
.main3 .cell {
  line-height: 100px;
}
.main3_img {
  width: 100px;
  height: 100px;
}
.main3 .el-link {
  display: inline;
  font-size: 50px;
  /* margin-bottom: 10px; */
}
.main4 {
  margin-top: 100px;
  margin-bottom: 100px;
}
.main4 .el-pagination {
  float: right;
  margin-right: 200px;
}
.main4 .el-pager li {
  font-size: 50px;
  height: 50px;
  line-height: 50px;
}
.main4 .el-icon {
  font-size: 50px;
}
</style>


