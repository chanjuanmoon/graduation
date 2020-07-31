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
            <el-breadcrumb-item>上传</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row id="main2">
        <el-col :span="16" :offset="4">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>
                <i class="el-icon-upload"></i> 上传资源
              </span>
            </div>
            <div id="content">
              <el-row>
                <el-col :span="6">
                  <span>文件：</span>
                </el-col>
                <el-col :span="16" :offset="2">
                  <input type="file" id="uploader">
                </el-col>
              </el-row>
              <el-row id="select_con">
                <el-col :span="6">
                  <span>文件类型：</span>
                </el-col>
                <el-col :span="16" :offset="2">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row id="source_name">
                <el-col :span="6">
                  <span>文件名称：</span>
                </el-col>
                <el-col :span="16" :offset="2">
                  <el-input v-model="file_name" placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>
              <el-row id="up">
                <el-col :span="16">
                  <el-button type="primary" @click="uploader($event)">上传</el-button>
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
import COS from "cos-js-sdk-v5";
import Qs from "qs";
var Bucket = "final-demo-1258366613";
var Region = "ap-guangzhou";
var cos = new COS({
  SecretId: "AKIDnfME28MPSJBxhH7E7Vq0LZqNiwNs8FiL",
  SecretKey: "pma7ERm15eAJnlkdM4zkLI5QndvMfnr4"
});
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
      options: [
        {
          value: "计算机",
          label: "计算机"
        },
        {
          value: "经济学",
          label: "经济学"
        },
        {
          value: "管理",
          label: "管理"
        },
        {
          value: "考研",
          label: "考研"
        },
        {
          value: "外语",
          label: "外语"
        },
        {
          value: "四六级",
          label: "四六级"
        },
        {
          value: "教育教学",
          label: "教育教学"
        }
      ],
      value: "",
      file_name: ""
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
    //上传
    uploader(e) {
      let that = this;
      let url = "";
      var file = document.getElementById("uploader").files[0];
      if (!file) return;
      //分片上传
      cos.putObject(
        {
          Bucket: Bucket,
          Region: Region,
          Key: file.name,
          Body: file,
          onProgress: function(ProgressData, callback) {
            console.log("上传中", JSON.stringify(ProgressData));
            console.log(ProgressData.percent);
            if (
              ProgressData.loaded === ProgressData.total &&
              ProgressData.speed === 0
            ) {
              console.log("进来了");
              let postData = {
                name: that.$data.file_name,
                author: that.$data.user_name,
                url: url,
                menu_name: that.$data.value,
                state: "审核中"
              };
              console.log(postData);
              let postData_del = Qs.stringify(postData);
              that.$axios
                .post("http://localhost:3000/index/addSource", postData_del, {
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded; charset=UTF-8"
                  }
                })
                .then(res => {
                  console.log("上传");
                  console.log(res);
                  that.$message({
                    message: "上传成功",
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
        },
        function(err, data) {
          console.log(err, data);
        }
      );

      //获取上传的文件地址
      cos.getObjectUrl(
        {
          Key: file.name,
          Bucket: Bucket,
          Sign: false,
          Region: Region
        },
        function(err, data) {
          console.log("url");
          console.log(data.Url);
          url = data.Url;
        }
      );
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
  float: left;
  margin-left: 100px;
  margin-bottom: 200px;
  margin-top: 100px;
}
#content input {
  font-size: 50px;
}
#select_con {
  margin-top: 100px;
}
#select_con .el-input__inner {
  height: 100px;
}
.el-select-dropdown__item {
  font-size: 50px;
  height: 100px;
  line-height: 100px;
}
#select_con .el-select {
  margin-left: -130px;
}
#source_name {
  margin-top: 100px;
}
#source_name .el-input {
  margin-left: -40px;
}
#source_name .el-input__inner {
  height: 100px;
  line-height: 100px;
}
#up {
  margin-top: 100px;
}
#up .el-button {
  display: block;
  height: 100px;
  width: 200px;
  text-align: center;
}
</style>


