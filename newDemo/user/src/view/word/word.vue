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
            <el-breadcrumb-item>计算机</el-breadcrumb-item>
            <el-breadcrumb-item>c4-运算符和表达式</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row id="main2">
        <el-col :span="16" :offset="2">
          <el-card class="box-card">
              sfksjdfsdlfk
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
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
      form: {
        name: ""
      },
      activeName: "first",
      tableData: [
        {
          name: "c4-运算符和表达式",
          uploader: "胡王明",
          upTime: "2015-06-17"
        },
        {
          name: "4G基础知识",
          uploader: "li",
          upTime: "2016-07-17"
        },
        {
          name: "供应商考察评估报告",
          uploader: "dhsd",
          upTime: "2018-04-17"
        }
      ]
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
      console.log(tab, event);
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
#main3 .el-table {
  width: 90%;
  margin: 0 auto;
  font-size: 50px;
}
#main3 .cell {
  line-height: 100px;
}
#main3_img {
  width: 100px;
  height: 100px;
}
#main3 .el-link {
  font-size: 50px;
  margin-bottom: 10px;
}
#main4 {
  margin-top: 100px;
  margin-bottom: 100px;
}
#main4 .el-pagination {
  float: right;
  margin-right: 200px;
}
#main4 .el-pager li {
  font-size: 50px;
  height: 50px;
  line-height: 50px;
}
#main4 .el-icon {
  font-size: 50px;
}
</style>


