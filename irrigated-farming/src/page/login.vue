<template>
  <div class="body">
    <!--<img src="../assets/area1.jpg" alt="">-->
    <Row type="flex" justify="center">
      <div class="title">
        智慧农业平台
      </div>
    </Row>
    <div class="mainContent">
      <Form :model="form" :label-width="90" ref="form" style="margin-top: 100px;margin-bottom: 121px">
        <Row type="flex" justify="center">
          <Col span="20">
          <FormItem label="">
            <Input type="text" v-model="form.userId" placeholder="请输入用户名" size="large" style="width: 403px;">
            <Icon type="md-person" slot="prepend"  size="20"></Icon>
            </Input>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="20" >
          <FormItem label="">
            <Input type="password" v-model="form.password" placeholder="请输入用户密码" @on-enter="submit" size="large" style="width: 403px;">
            <Icon type="ios-lock" slot="prepend" size="20"></Icon>
            </Input>
          </FormItem>
          </Col>
        </Row>
        <!--<Row type="flex" justify="start">-->
          <!--<Col span="16">-->
          <!--<Checkbox v-model="single" style="color: #BABABA;margin-left: 10px" @on-change="remember">记住密码</Checkbox>-->
          <!--</Col>-->
        <!--</Row>-->
        <Row type="flex" justify="start">
          <Col span="20">
          <FormItem>
            <Button @click="submit"  class="butoon" >登录</Button>
          </FormItem>
          </Col>
        </Row>
        <Alert type="warning" show-icon v-show="showNotice">
          请正确填写账号和密码！
        </Alert>
      </Form>
    </div>
  </div>
</template>


<script type="application/ecmascript">
  // import { Login } from '../api/api'
  // import * as types from '../store/types'
  // import store from '../store/store'
  export default {
    data () {
      return {
        showNotice: false,
        single: false,
        form: {
          userId: '',
          password: ''
        },
        token: ''
      }
    },
    created: function () {
      // if (JSON.parse(store.state.remember) !== null && JSON.parse(store.state.remember).userId !== '' && JSON.parse(store.state.remember).password !== '') {
      //   this.form.userId = JSON.parse(store.state.remember).userId
      //   this.form.password = JSON.parse(store.state.remember).password
      //   this.single = true
      // } else {
      //   this.single = false
      // }
    },
    methods: {
      remember (change) {
        if (change === true) {
          store.commit(types.Rem, JSON.stringify(this.form))
        } else {
          var s = {
            userId: '',
            password: ''
          }
          store.commit(types.Rem, JSON.stringify(s))
        }
      },
      pwd () {
        this.$router.push({path: '/password'})
      },
      submitMonitor () {
        if (this.single === true) {
          store.commit(types.Rem, JSON.stringify(this.form))
        } else {
          var s = {
            userId: '',
            password: ''
          }
          store.commit(types.Rem, JSON.stringify(s))
        }
        this.$Message.success('登录成功! 欢迎使用监控中心')
        this.$router.push({path: '/monitor'})
        // Login(this.form).then((res) => {
        //   if (res.data.R) {
        //     if (this.single === true) {
        //       store.commit(types.Rem, JSON.stringify(this.form))
        //     } else {
        //       var s = {
        //         userId: '',
        //         password: ''
        //       }
        //       store.commit(types.Rem, JSON.stringify(s))
        //     }
        //     store.commit(types.MENU, JSON.stringify(res.data.v))
        //     this.$Message.success('登录成功! 欢迎使用中兵高炮数据中心')
        //     this.$router.push({path: '/home'})
        // })
      },
      submit () {
        // if (this.single === true) {
        //   store.commit(types.Rem, JSON.stringify(this.form))
        // } else {
        //   var s = {
        //     userId: '',
        //     password: ''
        //   }
        //   store.commit(types.Rem, JSON.stringify(s))
        // }
        this.$Message.success('登录成功! 欢迎使用数据中心')
        this.$router.push({path: '/system'})
        // Login(this.form).then((res) => {
        //   if (res.data.R) {
        //     if (this.single === true) {
        //       store.commit(types.Rem, JSON.stringify(this.form))
        //     } else {
        //       var s = {
        //         userId: '',
        //         password: ''
        //       }
        //       store.commit(types.Rem, JSON.stringify(s))
        //     }
        //     store.commit(types.MENU, JSON.stringify(res.data.v))
        //     this.$Message.success('登录成功! 欢迎使用中兵高炮数据中心')
        //     this.$router.push({path: '/home'})
        // })
      }
    }
  }
</script>

<style scoped>
  .body{
    width:100vw;
    height:100vh;
    background-color: #dcdcdc;
    position: relative;
    background: url("../assets/loginBackgroup.png") no-repeat center center;
    background-size:cover;
  }
  .body>img{
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin: auto;
  }
  .mainContent {
    text-align:center;
    width: 700px;
    height: 360px;
    position: relative;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: auto;
    border-radius: 10px;
    background-color: #fff;
    z-index: 1;
    border: 10px solid #5ba7c9;
  }
  .mainContent>img{
    width:150px;
    height: 130px;
    margin-top: 20px;
    margin-bottom: -40px;
  }
  .title {
    position: relative;
    color: #fff;
    font-size: 40px;
    font-weight: 900;
    font-family: BDZYJT--GB1-0;
    margin-top: 100px;
    margin-bottom: 30px;
  }
  .butoon {
    width:150px;
    letter-spacing: 2px;
    background: #3392F0 ;
    color: #F7F7F7;
    font-size: 20px;
    margin-top: 20px;
  }
  .butoon:hover {
    background: #3392F0;
    color: #F7F7F7;
  }
</style>
