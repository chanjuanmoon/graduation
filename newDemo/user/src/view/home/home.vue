<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8" :offset="16">
          <div class="grid-content bg-purple-dark" id="link_p">
            <el-button type="text" @click="login_email=true" v-if="showLogin">登录</el-button>
            <span v-else>{{user_name}}</span>
            <!-- 登录 -->
            <el-dialog title="登录" :visible.sync="login_email" id="dialog_login" center>
              <el-form :model="login_form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                  <el-input v-model="login_form.username" autocomplete="off" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input placeholder="请输入密码" v-model="login_form.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                  <el-radio v-model="login_form.role" label="1">用户</el-radio>
                  <el-radio v-model="login_form.role" label="2">管理员</el-radio>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="login()" id="login_btn" round>登录</el-button>
              </span>
            </el-dialog>
            <span v-if="showLogin">|</span>
            <!-- <el-link>注册</el-link> -->
            <el-button type="text" @click="toRegister" v-if="showLogin">注册</el-button>
            <!-- <router-link to="/Register"></router-link> -->
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
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
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                  </el-col>
                  <el-col :span="4">
                    <!-- <a href="../uploader/uploader.html"  icon="el-icon-upload2">上传</a> -->
                    <el-button type="primary" icon="el-icon-upload2" @click="uploader">上传</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-row id="main2">
        <el-col :span="16" :offset="8">
          <el-menu :default-active="this.$router.path" router mode="horizontal">
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{item.navItem}}</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="block">
            <el-carousel :interval="4000" type="card" height="1000px">
              <el-carousel-item v-for="item in imgList" :key="item.id">
                <el-row>
                  <el-col :span="24">
                    <img :src="item.idView">
                  </el-col>
                </el-row>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" id="main3">
        <el-col :span="6">
          <div class="image-content">
            <span>
              <i class="el-icon-collection-tag"></i>教育专题
            </span>
            <el-row>
              <el-col :span="8">
                <el-link href target="_blank">公务员考试</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">研究生考试</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">小学教案</el-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-link href target="_blank">医师考试</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">外贸英语</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">毕业论文答辩</el-link>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="image-content">
            <span>
              <i class="el-icon-brush"></i>热门搜索
            </span>
            <el-row>
              <el-col :span="8">
                <el-link href target="_blank">英语四六级</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">糖尿病知识</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">空白简历</el-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-link href target="_blank">租房合同</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">买卖合同</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">商业计划书</el-link>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="image-content">
            <span>
              <i class="el-icon-document"></i>党团工作
            </span>
            <el-row>
              <el-col :span="8">
                <el-link href target="_blank">党员民主评议</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">入党申请书</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">党员谈话记录</el-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-link href target="_blank">廉政谈话记录</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">入团申请书</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">党课课件</el-link>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="image-content">
            <span>
              <i class="el-icon-star-on"></i>实用文档
            </span>
            <el-row>
              <el-col :span="8">
                <el-link href target="_blank">辞职报告</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">红头文件标准</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">工作总结</el-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-link href target="_blank">授权委托书</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">合作协议书</el-link>
              </el-col>
              <el-col :span="8">
                <el-link href target="_blank">离婚协议书</el-link>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="main4">
        <el-col :span="6">
          <div class="image-content">
            <img src="../../assets/data1.png">
            <a href="#">
              <div class="mask">
                <h3>求职简历精品大全</h3>
              </div>
            </a>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="image-content">
            <img src="../../assets/data2.jpg">
            <a href="#">
              <div class="mask">
                <h3>中国地方县志合集</h3>
              </div>
            </a>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="image-content">
            <img src="../../assets/data3.jpg">
            <a href="#">
              <div class="mask">
                <h3>精品初中课件模板</h3>
              </div>
            </a>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="image-content">
            <img src="../../assets/data4.jpg">
            <a href="#">
              <div class="mask">
                <h3>备战高考真题大放送</h3>
              </div>
            </a>
          </div>
        </el-col>
      </el-row>
      <el-row id="main5">
        <el-row>
          <el-col :span="4">
            <h1>推荐阅读</h1>
          </el-col>
          <el-col :span="20">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="专业资料" name="first">
                <el-row :gutter="20" class="content_first">
                  <el-col :span="8">
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">物理性质和化学性质中考题</el-link>
                    </span>
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">java加密算法</el-link>
                    </span>
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">Android手机指令大全</el-link>
                    </span>
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">虚拟机实战2019群集</el-link>
                    </span>
                  </el-col>
                  <el-col :span="8">
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">创意a次方-TBWA广告</el-link>
                    </span>
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">简单就是美 Photoshop光线制作教程</el-link>
                    </span>
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">2019毕业论文正文档案</el-link>
                    </span>
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">深度学习讲稿</el-link>
                    </span>
                  </el-col>
                  <el-col :span="8">
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">2012卧龙区第一次调研</el-link>
                    </span>
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">亚马逊创办人：追求梦想的勇气</el-link>
                    </span>
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">浅谈焦作地区地名的文化渊源</el-link>
                    </span>
                    <span>
                      <i class="el-icon-reading"></i>
                      <el-link type="info">好听的名字</el-link>
                    </span>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="经济管理" name="second">经济管理</el-tab-pane>
              <el-tab-pane label="办公频道" name="third">办公频道</el-tab-pane>
              <el-tab-pane label="教育资料" name="fourth">教育资料</el-tab-pane>
              <el-tab-pane label="生活休闲" name="fifth">生活休闲</el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-row>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="24">
          <h1>Copyright&copy;2015-2019 在线学习交流平台</h1>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    let data_info = this.getLocalStroage();
    console.log(data_info);
    let login_name = "";
    let login_seen = true;
    if (data_info) {
      console.log("登录成功");
      this.$message({
        message: "登录成功",
        type: "success",
        center: true
      });
      login_name = data_info;
      login_seen = false;
    }
    return {
      form: {
        name: ""
      },
      imgList: [
        {
          id: 0,
          idView: require("../../assets/banner1.jpeg")
        },
        {
          id: 1,
          idView: require("../../assets/banner2.jpg")
        },
        {
          id: 2,
          idView: require("../../assets/banner3.jpg")
        },
        {
          id: 3,
          idView: require("../../assets/banner4.jpeg")
        }
      ],
      activeName: "first",
      activeIndex: "1",
      login_email: false,
      login_form: {
        username: "",
        password: "",
        role: "1"
      },
      formLabelWidth: "120px",
      showLogin: login_seen,
      user_name: login_name,
      navList: [
        { name: "/navMenu", navItem: "计算机" },
        { name: "/navMenu", navItem: "经济学" },
        { name: "/navMenu", navItem: "管理" },
        { name: "/navMenu", navItem: "考研" },
        { name: "/navMenu", navItem: "外语" },
        { name: "/navMenu", navItem: "四六级" },
        { name: "/navMenu", navItem: "教育教学" }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toRegister() {
      this.$router.push({ path: "/Register" });
    },
    // 登录
    login() {
      let role_data = "";
      console.log(this.$data.login_form.role);
      if (this.$data.login_form.role === "1") {
        role_data = "user";
      } else {
        role_data = "admin";
      }
      let postData = {
        username: this.$data.login_form.username,
        password: this.$data.login_form.password,
        role: role_data
      };
      console.log(postData);
      let postData_del = Qs.stringify(postData);
      this.$axios
        .post("http://localhost:3000/index/Login", postData_del, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(res => {
          console.log("登录");
          console.log(res);
          //处理数据
          console.log(res.data.data);
          if (res.data.data.length !== 0) {
            for (let i of res.data.data) {
              console.log(i);
              if (i.username === postData.username) {
                if (i.password === postData.password) {
                  if (i.role === postData.role) {
                    console.log("登录成功");
                    this.$message({
                      message: "登录成功",
                      type: "success",
                      center: true
                    });
                    this.$data.login_email = false;
                    this.$data.showLogin = false;
                    this.$data.user_name = i.username;
                    //存入localStorage
                    //i为对象 存入对象（引用值类型需要转换成JSON）
                    //存入string username
                    localStorage.setItem("user", i.username);
                  } else {
                    console.log("登录失败");
                    this.$message.error("角色选择错误，请重新登录");
                  }
                } else {
                  console.log("登录失败");

                  this.$message.error("用户名或密码错误，请重新登录");
                }
              } else {
                console.log("无数据");
              }
            }
          }
        })
        .catch(err => {
          console.log("失败");
          console.log(err);
        });
    },
    //获取本地存储 localStroage
    getLocalStroage() {
      let data = localStorage.getItem("user");
      return data;
    },
    //上传
    uploader() {
      this.$router.push({ path: "/Uploader" });
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
#dialog_login .el-dialog {
  width: 30%;
}
#dialog_login .el-dialog__title {
  line-height: 100px;
  font-size: 70px;
}
#login_btn {
  width: 720px;
  height: 100px;
  margin-top: 120px;
  margin-bottom: 40px;
}
#dialog_login .el-form {
  margin: 0 auto;
  width: 800px;
  height: 300px;
}
#dialog_login .el-radio {
  margin-left: 150px;
}
#dialog_login .el-radio__inner {
  width: 30px;
  height: 30px;
}
#dialog_login .el-form-item {
  margin-top: 60px;
}
#dialog_login .el-form-item__label {
  font-size: 50px;
  line-height: 100px;
  margin-right: 20px;
}
#dialog_login .el-input {
  border: 1px solid rgba(0, 0, 0, 0.8);
  width: 90%;
  height: 100px;
  line-height: 100px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#dialog_login .el-input_suffix-inner {
  font-size: 52px;
  line-height: 100px;
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
.block {
  background-color: #3c3c3c;
}
#main2 .el-menu .el-menu-item {
  height: 100px;
  font-size: 50px;
  margin-left: 150px;
}
#main3 {
  margin-top: 50px;
}
#main3 .image-content {
  width: 800px;
  height: 250px;
  margin: 0 auto;
  position: relative;
}
#main3 .image-content .el-row {
  margin-top: 30px;
}
#main3 .el-link {
  font-size: 35px;
}
#main3 span {
  font-size: 40px;
}
.main4 {
  margin-top: 50px;
}
.main4 .image-content {
  width: 800px;
  height: 400px;
  margin: 0 auto;
  position: relative;
}
.image-content img {
  width: 800px;
  height: 400px;
}
.image-content .mask {
  position: absolute;
  display: block;
  width: 800px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
}
.mask h3 {
  text-align: center;
  font-size: 50px !important;
  color: white;
}
.image-content a:hover .mask {
  opacity: 0;
}
#main5 h1 {
  font-size: 60px;
}
#main5 .el-tabs {
  margin-top: 50px;
}
#main5 .el-tabs .el-tabs__item {
  height: 60px;
  font-size: 45px;
}
#main5 .content_first {
  margin-top: 30px;
}
#main5 span {
  display: block;
  font-size: 45px;
  margin-top: 20px;
}
#main5 .content_first .el-col {
  text-align: left;
}
.el-footer .el-row {
  margin-top: 100px;
  background-color: #363636;
}
.el-footer .el-row h1 {
  font-size: 40px;
  color: #989898;
  letter-spacing: 3px;
}
</style>



