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
        <el-col :span="16" :offset="2">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>问答社区</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row id="main2">
        <el-col :span="24">
          <el-card class="box-card" id="search_card">
            <el-row>
              <el-col :span="12" :offset="12">
                <div id="search">
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item>
                      <el-row>
                        <el-col :span="16">
                          <el-input v-model="form.name" placeholder="搜索你要的内容"></el-input>
                        </el-col>
                        <el-col :span="4">
                          <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="search"
                            id="search_btn"
                          >搜索</el-button>
                        </el-col>
                        <el-col :span="4">
                          <el-button
                            type="primary"
                            icon="el-icon-upload"
                            id="publish_theme"
                            @click="publish"
                          >发布主题</el-button>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row id="main3">
        <el-col :span="24">
          <el-card class="box-card" id="question_card">
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="问题解答" name="first">
                <ul>
                  <li v-for="item in question_list" :key="item.id">
                    <el-card class="box-card" id="question_item" style="border:3px solid #409EFF;">
                      <div slot="header" class="clearfix">
                        <span>{{item.title}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="showAnswer('first',item.id)">查看回答</el-button>
                      </div>
                      <div id="content">{{item.content}}</div>
                    </el-card>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="经验分享" name="second">
                <ul>
                  <li v-for="(item, i) in experience_list" :key="item.id">
                    <el-card class="box-card" id="question_item" style="border:3px solid #409EFF;">
                      <div slot="header" class="clearfix">
                        <span>{{i}} {{item.title}}</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">添加回答</el-button> -->
                      </div>
                      <div id="content">{{item.content}}</div>
                    </el-card>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="Personal" name="third">
                <ul>
                  <li v-for="(item, i) in personal_list" :key="item.id">
                    <el-card class="box-card" id="question_item" style="border:3px solid #409EFF;">
                      <div slot="header" class="clearfix">
                        <span>{{i}} {{item.title}}</span>
                        <el-button style="float: right; padding: 3px 0;" type="text" @click="showAnswer('third',item.id)">
                          查看回答
                          </el-button>
                      </div>
                      <div id="content">{{item.content}}</div>
                    </el-card>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
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
    let login_name = "";
    let login_seen = true;
    if (data_info) {
      console.log("登录成功");
      login_name = data_info;
    }
    this.findAllTheme("first");
    return {
      user_name: login_name,
      form: {
        name: ""
      },
      activeName: "first",
      question_list: [],
      experience_list: [],
      personal_list: []
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
      this.findAllTheme(tab.name);
    },
    //查找 单个资源
    search() {},
    //发布主题 跳转publish
    publish() {
      this.$router.push({ path: "/Publish" });
    },
    //查找所有主题
    findAllTheme(data_name) {
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
          let list_data = [];
          switch (data_name) {
            case "first":
              for (let i = 0; i < result.length; i++) {
                let obj = {};
                if (result[i].theme_menu_id === 1) {
                  obj.id = result[i].id;
                  obj.title = result[i].title;
                  obj.user_id = result[i].user_id;
                  obj.content = result[i].content;
                  obj.reply_id = result[i].reply_id;
                  obj.theme_menu_id = result[i].theme_menu_id;
                  obj.createdAt = result[i].createdAt;
                  obj.updatedAt = result[i].updatedAt;
                }
                if (obj.id) {
                  list_data.push(obj);
                }
              }
              console.log(list_data);
              break;
            case "second":
              for (let i = 0; i < result.length; i++) {
                let obj = {};
                if (result[i].theme_menu_id === 2) {
                  obj.id = result[i].id;
                  obj.title = result[i].title;
                  obj.user_id = result[i].user_id;
                  obj.content = result[i].content;
                  obj.reply_id = result[i].reply_id;
                  obj.theme_menu_id = result[i].theme_menu_id;
                  obj.createdAt = result[i].createdAt;
                  obj.updatedAt = result[i].updatedAt;
                }
                if (obj.id) {
                  list_data.push(obj);
                }
              }
              console.log(list_data);
              break;
            case "third":
              let name = this.$data.user_name;
              let postData_user = {
                username: name
              };
              let postData_del_user = Qs.stringify(postData_user);
              this.$axios
                .post(
                  "http://localhost:3000/index/findIdByName",
                  postData_del_user,
                  {
                    headers: {
                      "Content-Type":
                        "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                  }
                )
                .then(res => {
                  //处理数据
                  let result1 = res.data.data;
                  let id_user = result1.id;
                  for (let i = 0; i < result.length; i++) {
                    let obj = {};
                    if (result[i].user_id === id_user) {
                      obj.id = result[i].id;
                      obj.title = result[i].title;
                      obj.user_id = result[i].user_id;
                      obj.content = result[i].content;
                      obj.reply_id = result[i].reply_id;
                      obj.theme_menu_id = result[i].theme_menu_id;
                      obj.createdAt = result[i].createdAt;
                      obj.updatedAt = result[i].updatedAt;
                    }
                    if (obj.id) {
                      list_data.push(obj);
                    }
                  }
                  console.log(list_data);
                })
                .catch(err => {
                  console.log("失败");
                  console.log(err);
                });
              break;
            default:
              break;
          }
          this.assignment_tableData(data_name, list_data);
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //赋值表格数据
    assignment_tableData(data, table_data) {
      switch (data) {
        case "first":
          this.$data.question_list = table_data;
          break;
        case "second":
          this.$data.experience_list = table_data;
          break;
        case "third":
          this.$data.personal_list = table_data;
          break;
        default:
          break;
      }
    },
    //查看答案
    showAnswer(tab_name,id_data){
      this.$router.push({
        name: "Answer",
        params: { 
          tab_data:tab_name,
          id: id_data
         }
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
  margin-top: 50px;
  margin-bottom: 50px;
}
#main2 #search_card {
  width: 80%;
  margin: 0 auto;
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
#search #search_btn {
  height: 100px;
  width: 200px;
}
#search #publish_theme {
  height: 100px;
  width: 240px;
}
#search .el-input__inner {
  height: 100px;
}
#main3 {
  margin-top: 100px;
}
#main3 #question_card {
  width: 79%;
  margin: 0 auto;
}
#main3 .el-tabs {
  width: 90%;
  margin: 0 auto;
}
#main3 .el-tabs__item {
  height: 100px;
  line-height: 100px;
  font-size: 50px;
  padding: 0 130px;
  text-align: center;
}
#main3 .el-tab-pane .el-card {
  margin-top: 50px;
}
#main3 .el-card__header{
  background-color:#409EFF;
}
#main3 .el-tab-pane .el-card span {
  font-size: 50px;
  color: white;
}
#main3 ul li {
  list-style: none;
}
#main3 #content {
  font-size: 45px;
  text-align: left;
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
}
</style>


