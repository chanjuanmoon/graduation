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
        <el-col :span="16" :offset="4">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{tab_name}}</el-breadcrumb-item>
            <el-breadcrumb-item>查看回答</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-edit"
            style=" border-radius:10px;padding:20px;margin-top:50px;font-size:50px;"
            @click="addAns"
          >添加回答</el-button>
        </el-col>
      </el-row>
      <el-row id="main2">
        <el-col :span="16" :offset="4">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{title}}</span>
              <!-- <el-button
                style="float: right; padding: 3px 0;"
                type="primary" icon="el-icon-edit"
              >添加回答</el-button>-->
            </div>
            <div id="content">
              <el-row>
                <el-col :span="24">
                  <el-card class="box-card" id="question_item">
                    <el-row>
                      <el-col :span="4">
                        <span>提问者：{{user_id}}</span>
                      </el-col>
                      <el-col :span="18" :offset="2">
                        <el-card class="box-card">
                          <span>{{questionContent}}</span>
                        </el-card>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <ul>
                    <li v-for="item in ans_list" :key="item.id">
                      <el-card class="box-card" id="question_item">
                        <el-row>
                          <el-col :span="4">
                            <span>回答者：{{item.user_name}}</span>
                          </el-col>
                          <el-col :span="18" :offset="2">
                            <el-card class="box-card">
                              <span>{{item.content}}</span>
                            </el-card>
                          </el-col>
                        </el-row>
                      </el-card>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
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
    let login_seen = true;
    if (data_info) {
      console.log("登录成功");
      login_name = data_info;
    }
    let table_name = this.getThemeMenu();
    this.getThemeParams();
    this.findAns();
    return {
      user_name: login_name,
      tab_name: table_name,
      title: "",
      user_id: 0,
      questionContent: "",
      ans_list: []
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
    //获得主题分类名称
    getThemeMenu() {
      let tab_name = this.$route.params.tab_data;
      let data = "";
      switch (tab_name) {
        case "first":
          data = "问题解答";
          break;
        case "third":
          data = "Personal";
          break;
        default:
          break;
      }
      return data;
    },
    //获得主题参数
    getThemeParams() {
      let theme_id = this.$route.params.id;
      this.$axios
        .post(
          "http://localhost:3000/index/searchAllTheme",
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log("查询主題");
          //处理数据
          let result = res.data.data;
          let theme_data = {};
          for (let i = 0; i < result.length; i++) {
            if (result[i].id === theme_id) {
              let obj = {};
              obj.id = result[i].id;
              obj.title = result[i].title;
              obj.user_id = result[i].user_id;
              obj.content = result[i].content;
              obj.reply_id = result[i].reply_id;
              obj.theme_menu_id = result[i].theme_menu_id;
              obj.createdAt = result[i].createdAt;
              obj.updatedAt = result[i].updatedAt;
              theme_data = obj;
            }
          }
          console.log(theme_data);
          this.$data.title = theme_data.title;
          // this.$data.user_id = theme_data.user_id;
          this.$data.questionContent = theme_data.content;
          this.findUserNameByID(theme_data.user_id);
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //添加回答
    addAns() {
      let theme_id_data = this.$route.params.id;
      this.$router.push({
        name: "AddAns",
        params: {
          theme_id: theme_id_data
        }
      });
    },
    //找到相应回答
    findAns() {
      let theme_id_data = this.$route.params.id;
      this.$axios
        .post(
          "http://localhost:3000/index/searchAllReply",
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log("查询成功");
          //处理数据
          let result = res.data.data;
          console.log(result);
          let list_data = [];
          for (let i = 0; i < result.length; i++) {
            let obj = {};
            if (result[i].theme_id === theme_id_data) {
              obj.id = result[i].id;
              obj.content = result[i].content;
              obj.user_id = result[i].user_id;
              obj.user_name = result[i].user_id;
              obj.theme_id = result[i].theme_id;
              obj.createdAt = result[i].createdAt;
              obj.updatedAt = result[i].updatedAt;
            }
            if (obj.id) {
              list_data.push(obj);
            }
          }
          for (let j = 0; j < list_data.length; j++) {
            let postData = {
              id: list_data[j].user_id
            };
            let postData_del = Qs.stringify(postData);
            this.$axios
              .post("http://localhost:3000/index/findNameById", postData_del, {
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8"
                }
              })
              .then(res => {
                console.log("查询主題");
                //处理数据
                let result = res.data.data;
                let userName = result.username;
                list_data[j].user_name = userName;
              })
              .catch(err => {
                console.log("失败");
                console.log(err);
              });
          }
          this.$data.ans_list = list_data;
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //根据user id 找到name
    findUserNameByID(id_data) {
      let postData = {
        id: id_data
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/findNameById", postData_del, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("查询主題");
          //处理数据
          let result = res.data.data;
          let userName = result.username;
          this.$data.user_id = userName;
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //根据user id 找到name
    findUserNameByID_1(id_data, target_obj) {
      let postData = {
        id: id_data
      };
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/findNameById", postData_del, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("查询主題");
          //处理数据
          let result = res.data.data;
          let userName = result.username;
          target_obj = userName;
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
  background-color: #f9f9f9;
}
#link_p span {
  font-size: 50px;
}
#link_p .el-button {
  font-size: 50px;
}
#main1 .el-breadcrumb {
  font-size: 50px;
  margin-top: 80px;
  margin-bottom: 50px;
}
#main2 {
  margin-top: 50px;
}
#main2 .el-card span {
  font-size: 50px;
}
#content {
  /* float: left; */
  width: 100%;
  /* margin-left: 100px; */
  margin-bottom: 200px;
  margin-top: 100px;
}
#content span {
  font-size: 50px;
}
#content ul li {
  list-style: none;
}
</style>


