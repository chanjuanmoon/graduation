<template>
  <el-container>
    <div class="bg">
      <div class="content_main">
        <el-card class="box-card">
          <p>注册</p>
          <div class="root">
            <el-form :model="Register" ref="RegisterForm" label-width="280px" class="RegisterForm">
              <el-form-item label="账号">
                <el-input v-model="Register.username" autocomplete="off" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input placeholder="请输入密码" v-model="Register.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-radio v-model="Register.role" label="1">用户</el-radio>
                <el-radio v-model="Register.role" label="2">管理员</el-radio>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="register()" id="register_btn" round>注册</el-button>
            </span>
          </div>
        </el-card>
      </div>
    </div>
  </el-container>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      Register: {
        username: "",
        password: "",
        role: "1"
      }
    };
  },
  methods: {
    // 注册
    register() {
      let role_data = "";
      console.log(this.$data.Register.role);
      if (this.$data.Register.role === "1") {
        role_data = "user";
      } else {
        role_data = "admin";
      }
      let postData = {
        username: this.$data.Register.username,
        password: this.$data.Register.password,
        role: role_data
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
            message: "注册成功",
            type: "success",
            center: true
          });
          this.$router.push({ path: "/" });
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
.bg {
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/2.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.content_main .box-card {
  width: 30%;
  margin-left: 500px;
  margin-top: 500px;
}
.content_main .box-card p {
  font-size: 60px;
}
.root .el-form {
  width: 80%;
  margin: auto;
}
.root .el-form-item {
  margin-top: 80px;
}
.root .el-form-item__label {
  font-size: 50px;
  line-height: 100px;
}
.root .el-input {
  border: 1px solid rgba(0, 0, 0, 0.8);
  width: 90%;
  height: 100px;
  line-height: 100px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.root .el-radio {
  margin-left: 100px;
}
.root .el-radio__inner {
  width: 30px;
  height: 30px;
}
.root .el-radio__label {
  font-size: 50px;
}
.root .el-button {
  margin-left: 230px;
  height: 100px;
  width: 650px;
  font-size: 50px;
  margin-bottom: 100px;
  margin-top: 50px;
}
</style>

