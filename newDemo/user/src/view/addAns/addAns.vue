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
            <el-breadcrumb-item>添加回答</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row id="main2">
        <el-col :span="16" :offset="4">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>
                <i class="el-icon-upload"></i> 添加回答
              </span>
            </div>
            <div id="content">
              <el-row>
                <el-col :span="6">
                  <span>回复内容：</span>
                </el-col>
                <el-col :span="12" id="content_in">
                  <el-input type="textarea" :rows="18" placeholder="请输入内容" v-model="content"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-button type="primary" id="publish_btn" @click="publish">发布</el-button>
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
    return {
      user_name: login_name,
      content: ""
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
    //发布回复
    publish() {
      let theme_id_data = this.$route.params.theme_id;
      let content_data = this.$data.content;
      let name = this.$data.user_name;
      let postData_user = {
        username: name
      };
      let postData_del_user = Qs.stringify(postData_user);
      this.$axios
        .post("http://localhost:3000/index/findIdByName", postData_del_user, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("查询");
          //处理数据
          let result = res.data.data;
          let id_data = result.id;
          let postData_ans = {
            content: content_data,
            user_id: id_data,
            theme_id: theme_id_data
          };
          let postData_del_ans = Qs.stringify(postData_ans);
          this.$axios
            .post(
              "http://localhost:3000/index/addThemeReply",
              postData_del_ans,
              {
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8"
                }
              }
            )
            .then(res => {
              console.log("添加成功");
              //处理数据
              let result1 = res.data.data;
              this.$router.push({ path: "/Community" });
            })
            .catch(err => {
              console.log("失败");
              console.log(err);
            });
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //获得user_id
    getUser_id() {
      let name = this.$data.user_name;
      let postData_user = {
        username: name
      };
      let postData_del_user = Qs.stringify(postData_user);
      this.$axios
        .post("http://localhost:3000/index/findIdByName", postData_del_user, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("查询");
          //处理数据
          let result = res.data.data;
          let id = result.id;
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
  margin-bottom: 200px;
  margin-top: 100px;
}
#content .el-row {
  margin-top: 80px;
}
#title_in .el-input {
  font-size: 50px;
}
#title_in .el-input__inner {
  width: 200%;
  height: 70px;
  border: 3px solid #bec4cc;
}
#content_in .el-textarea {
  font-size: 50px;
}
#content_in .el-textarea__inner {
  width: 100%;
  /* height: 1500px; */
  border: 3px solid #bec4cc;
}
#theme_in .el-input {
  font-size: 50px;
}
#theme_in .el-input__inner {
  height: 70px;
  border: 3px solid #bec4cc;
}
.el-select-dropdown__item {
  height: 100px;
  font-size: 50px;
  line-height: 100px;
}
#publish_btn {
  margin-top: 100px;
  width: 250px;
  height: 100px;
  font-size: 50px;
}
</style>


