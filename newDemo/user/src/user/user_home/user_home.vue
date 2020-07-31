<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="6">
          <h1 class="logo_name">个人中心</h1>
        </el-col>
        <el-col :span="6" :offset="12" class="ad_name">
          <span>{{admin_name}}</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container id="con_main">
      <el-aside width="500px">
        <ul>
          <li @click="person">
            <div>
              <span>修改密码</span>
            </div>
          </li>
          <li @click="resource">
            <div>
              <span>资源中心</span>
            </div>
          </li>
          <li @click="message">
            <div>
              <span>消息中心</span>
            </div>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </el-aside>
      <el-main>
        <el-card class="box-card" id="personal" v-if="show_con === 'A'">
          <div slot="header" class="clearfix">
            <span>修改密码</span>
          </div>
          <div>
            <el-row>
              <el-col :span="6">
                <span>账号：</span>
              </el-col>
              <el-col :span="12">
                <el-input placeholder="请输入内容" :disabled="true" v-model="name"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <span>密码：</span>
              </el-col>
              <el-col :span="12">
                <el-input placeholder="请输入新密码" v-model="pass"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" id="sub">
                <el-button type="primary" @click="updatePersonal">提交</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" id="resource" v-else-if="show_con === 'B'">
          <div slot="header" class="clearfix">
            <span>资源中心</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div>
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" id="table1">
              <el-tab-pane label="审核中" name="first">
                <el-row class="main3">
                  <el-table :data="tableData_first" stripe>
                    <el-table-column label="名称" prop="name">
                      <template slot-scope="scope">
                        <!-- <img src="../../assets/word.png" id="main3_img"> -->
                        <!-- <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link> -->
                        <el-button type="text" @click="ToWord(scope.$index)">{{scope.row.name}}</el-button>
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
              <el-tab-pane label="不通过" name="second">
                <el-row class="main3">
                  <el-table :data="tableData_second" stripe>
                    <el-table-column label="名称" prop="name">
                      <template slot-scope="scope">
                        <!-- <img src="../../assets/word.png" id="main3_img"> -->
                        <!-- <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link> -->
                        <el-button type="text" @click="ToWord(scope.$index)">{{scope.row.name}}</el-button>
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
              <el-tab-pane label="待发布" name="third">
                <el-row class="main3">
                  <el-table :data="tableData_third" stripe>
                    <el-table-column label="名称" prop="name">
                      <template slot-scope="scope">
                        <!-- <img src="../../assets/word.png" id="main3_img"> -->
                        <!-- <el-link target="_blank" @click="ToWord">{{scope.row.name}}</el-link> -->
                        <el-button type="text" @click="ToWord(scope.$index)">{{scope.row.name}}</el-button>
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
                    <el-table-column label="发布">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-success"
                          @click="publish_re(scope.$index)"
                        >发布</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
                <el-row class="main4">
                  <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
        <el-card class="box-card" id="message" v-else-if="show_con === 'C'">
          <div slot="header" class="clearfix">
            <span>消息中心</span>
          </div>
          <div>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="管理员" name="1">
                <div>尊敬的chanjuan用户，您好！您上传的名为"vue"的资源通过审核</div>
                <div>可以前往个人中心发布资源啦！</div>
              </el-collapse-item>
              <el-collapse-item title="管理员" name="2">
                <div>尊敬的chanjuan用户，您好！您上传的名为"网络教育优势有哪些？"的资源不通过审核</div>
                <div>原因为：资源内容与上传资源类型不符，请修改后上传！</div>
              </el-collapse-item>
              <el-collapse-item title="系统消息" name="3">
                <div>在线学习交流平台上线啦！</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-main>
    </el-container>
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
    console.log(data_info);
    let login_name = "";
    if (data_info) {
      console.log("登录成功");
      login_name = data_info;
    }
    return {
      admin_name: login_name,
      show_con: "A",
      show_person: true,
      name: login_name,
      pass: "",
      addname: "",
      addpass: "",
      show_btn: true,
      tableData_first: [],
      tableData_second: [],
      tableData_third: [],
      activeName: "first",
      activeNames: ["1"]
    };
  },
  methods: {
    //获取本地存储 localStroage
    getLocalStroage() {
      let data = localStorage.getItem("user");
      return data;
    },
    person() {
      this.$data.show_con = "A";
    },
    resource() {
      this.$data.show_con = "B";
      this.findRecorder();
    },
    message() {
      this.$data.show_con = "C";
    },
    //修改密码
    updatePersonal() {
      let postData = {
        username: this.$data.admin_name,
        newPass: this.$data.pass
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/UpdatePass", postData_del, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("更新成功");
          //处理数据
          this.$message({
            message: "更新密码成功",
            type: "success",
            center: true
          });
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    handleClick(tab, event) {
      console.log(tab.name); //first
      switch (tab.name) {
        case "first":
          this.findRecorder();
          break;
        case "second":
          this.findNoSource();
          break;
        case "third":
          this.findPassSource();
          break;
        default:
          break;
      }
    },
    //find 审核中记录
    findRecorder() {
      let postData = {
        state: "审核中"
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/FindCheckSource", postData_del, {
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
            if (result[i].author === this.$data.admin_name) {
              obj.id = result[i].id;
              obj.name = result[i].name;
              obj.author = result[i].author;
              obj.url = result[i].url;
              obj.menu_name = result[i].menu_name;
              obj.state = result[i].state;
              obj.createdAt = result[i].createdAt;
              obj.updatedAt = result[i].updatedAt;
            }
            if (obj.id) {
              list_data.push(obj);
            }
          }
          console.log(list_data);
          this.$data.tableData_first = list_data;
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //to Word
    ToWord(index) {
      let id_data = this.get_index_id(index, this.$data.activeName);
      this.$router.push({
        name: "Word",
        params: { id: id_data }
      });
    },
    //通过index first second 找到点击时对应id
    get_index_id(index, order) {
      let id = 0;
      switch (order) {
        case "first":
          id = this.$data.tableData_first[index].id;
          break;
        case "second":
          id = this.$data.tableData_second[index].id;
          break;
        case "third":
          id = this.$data.tableData_third[index].id;
          break;
        default:
          break;
      }
      return id;
    },
    //查询全部不通过资源
    findNoSource() {
      let postData = {
        state: "不通过"
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/FindCheckSource", postData_del, {
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
            if (result[i].author === this.$data.admin_name) {
              obj.id = result[i].id;
              obj.name = result[i].name;
              obj.author = result[i].author;
              obj.url = result[i].url;
              obj.menu_name = result[i].menu_name;
              obj.state = result[i].state;
              obj.createdAt = result[i].createdAt;
              obj.updatedAt = result[i].updatedAt;
            }
            if (obj.id) {
              list_data.push(obj);
            }
          }
          console.log(list_data);
          this.$data.tableData_second = list_data;
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //查询所有通过资源
    findPassSource() {
      let postData = {
        state: "通过"
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/FindCheckSource", postData_del, {
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
            if (result[i].author === this.$data.admin_name) {
              obj.id = result[i].id;
              obj.name = result[i].name;
              obj.author = result[i].author;
              obj.url = result[i].url;
              obj.menu_name = result[i].menu_name;
              obj.state = result[i].state;
              obj.createdAt = result[i].createdAt;
              obj.updatedAt = result[i].updatedAt;
            }
            if (obj.id) {
              list_data.push(obj);
            }
          }
          console.log(list_data);
          this.$data.tableData_third = list_data;
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //审核通过 发布
    publish_re(index) {
      //资源id
      let id_data = this.get_index_id(index, this.$data.activeName);
      let postData = {
        id: id_data,
        state: "发布"
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/UpdateSourceState", postData_del, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("更新成功");
          //处理数据
          this.$message({
            message: "发布成功",
            type: "success",
            center: true
          });
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
<style>
.el-header .el-row {
  background-color: #1e1e1e;
}
.el-header h1 {
  font-size: 70px;
  color: white;
}
.el-header span {
  color: white;
  font-size: 60px;
}
.ad_name {
  margin-top: 70px;
}
#con_main {
  margin-top: 115px;
}
#con_main .el-aside {
  margin-left: -20px;
}
#con_main ul li {
  list-style: none;
}
#con_main span {
  font-size: 50px;
  /* color: #8fa7cd; */
}
#con_main .el-aside li {
  background-color: #1e1e1e;
  padding: 40px;
}
#con_main .el-aside li:hover {
  background-color: white;
  color: black;
}
.el-main .el-card {
  width: 90%;
  margin: 0 auto;
  margin-top: 70px;
}
.el-main .el-card .el-row {
  margin-top: 50px;
  margin-bottom: 50px;
}
.el-main .el-input {
  font-size: 50px;
}
.el-main .el-input__inner {
  height: 70px;
}
#sub .el-button {
  width: 350px;
  height: 100px;
  border-radius: 10px;
  margin-top: 150px;
  margin-bottom: 50px;
  margin-left: 200px;
}
#sub .el-button span {
  color: white !important;
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
.main3 .el-button {
  font-size: 50px;
  padding: 20px;
  border-radius: 10px;
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
.el-tabs__item {
  height: 100px;
  line-height: 100px;
  font-size: 50px;
  padding: 0 130px;
  text-align: center;
}
.el-collapse-item__header{
  font-size: 50px;
  height: 120px;
}
.el-collapse-item__content {
  font-size: 40px;
  padding-bottom: 100px;
}
</style>


