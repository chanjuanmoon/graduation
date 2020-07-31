<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="6">
          <h1 class="logo_name">在线学习交流平台后台管理</h1>
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
              <span>个人中心</span>
            </div>
          </li>
          <li @click="resource">
            <div>
              <span>资源中心</span>
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
        </ul>
      </el-aside>
      <el-main>
        <!-- 不通过 原因 -->
        <el-dialog title="原因" :visible.sync="login_email" id="dialog_login" center>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="reason_con"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="noPass_re_f" id="login_btn" round>提交</el-button>
          </span>
        </el-dialog>
        <el-card class="box-card" id="personal" v-if="show_con">
          <div slot="header" class="clearfix">
            <span>个人中心</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="add_admin_user"
              v-if="show_btn"
            >添加管理员</el-button>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="change_admin_user"
              v-else
            >修改个人信息</el-button>
          </div>
          <div v-if="show_person">
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
          <div v-else>
            <el-row>
              <el-col :span="6">
                <span>账号：</span>
              </el-col>
              <el-col :span="12">
                <el-input placeholder="请输入新的账号" v-model="addname"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <span>密码：</span>
              </el-col>
              <el-col :span="12">
                <el-input placeholder="请输入新密码" v-model="addpass"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" id="sub">
                <el-button type="primary" @click="addPersonal">提交</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" id="resource" v-else>
          <div slot="header" class="clearfix">
            <span>资源中心</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div>
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" id="table1">
              <el-tab-pane label="待审核" name="first">
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
                    <el-table-column label="审核">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-check"
                          @click="pass_re(scope.$index)"
                        >通过</el-button>
                        <el-button
                          type="primary"
                          icon="el-icon-close"
                          @click="noPass_re(scope.$index)"
                        >不通过</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
                <el-row class="main4">
                  <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="待删除" name="second">
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
                    <el-table-column label="审核">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-delete"
                          @click="delete_re(scope.$index)"
                        >删除</el-button>
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
      show_con: true,
      show_person: true,
      name: login_name,
      pass: "",
      addname: "",
      addpass: "",
      show_btn: true,
      tableData_first: [],
      tableData_second: [],
      activeName: "first",
      login_email: false,
      reason_con: "",
      id_data: 0
    };
  },
  methods: {
    //获取本地存储 localStroage
    getLocalStroage() {
      let data = localStorage.getItem("admin");
      return data;
    },
    person() {
      this.$data.show_con = true;
    },
    resource() {
      this.$data.show_con = false;
      this.findRecorder();
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
    //添加管理员
    add_admin_user() {
      this.$data.show_person = false;
      this.$data.show_btn = false;
    },
    change_admin_user() {
      this.$data.show_person = true;
      this.$data.show_btn = true;
    },
    addPersonal() {
      this.register();
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
          console.log(list_data);
          this.$data.tableData_second = list_data;
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    register() {
      let postData = {
        username: this.$data.addname,
        password: this.$data.addpass,
        role: "admin"
      };
      console.log(postData);
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/Register", postData_del, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("注册");
          console.log(res);
          //处理数据
          console.log(res.data.data);
          this.$message({
            message: "添加管理员成功",
            type: "success",
            center: true
          });
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //审核通过
    pass_re(index) {
      //资源id
      let id_data = this.get_index_id(index, this.$data.activeName);
      let postData = {
        id: id_data,
        state: "通过"
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
            message: "反馈用户通过",
            type: "success",
            center: true
          });
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //审核不通过
    noPass_re(index) {
      let id_data = this.get_index_id(index, this.$data.activeName);
      this.$data.id_data = id_data;
      this.$data.login_email = true;
    },
    //不通过 提交
    noPass_re_f() {
      //资源id
      let id_data = this.$data.id_data;
      let postData = {
        id: id_data,
        state: "不通过"
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
            message: "反馈用户不通过",
            type: "success",
            center: true
          });
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //删除
    delete_re(index) {
      //资源id
      let id_data = this.get_index_id(index, this.$data.activeName);
      let postData = {
        id: id_data
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/DeleteSource", postData_del, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("删除成功");
          //处理数据
          this.$message({
            message: "资源删除成功",
            type: "success",
            center: true
          });
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
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
#dialog_login .el-textarea {
  font-size: 50px;
}
.el-dialog__header {
  padding: 50px;
}
#login_btn {
  width: 60%;
  margin-top: 50px;
  margin-bottom: 80px;
}
</style>


