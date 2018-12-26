<template>
  <div class="body">
    <div class="body-head">
      <div class="body-head-title">
        用户信息
        <Button @click="back" style="float: right;background: #249AF2; color: #fff;border-radius:8px;" >返回列表</Button>
      </div>
      <Row type="flex" justify="start" style="padding: 10px 0px 10px 20px;background: rgba(239,239,239,1);">
        <Col span="6">用户姓名</Col>
        <Col span="6">手机号码</Col>
        <Col span="6">身份证号</Col>
        <Col span="6">地址</Col>
      </Row>
      <Row type="flex" justify="start" style="padding: 15px 0px 15px 20px;">
        <Col span="6">{{baseInfo.name}}</Col>
        <Col span="6">{{baseInfo.tel}}</Col>
        <Col span="6">{{baseInfo.idCard}}</Col>
        <Col span="6">{{baseInfo.address}}</Col>
      </Row>
    </div>
    <div class="body-title">
      用户农田管理
      <Button @click="sendSystem" style="float: right;margin-right: 20px;background: #249AF2; color: #fff;border-radius:8px;" >分配系统</Button>
    </div>
    <div class="body-content" v-show="systemList.length > 0">
      <Tabs type="card"  :animated="false" @on-click="tabChange" :value="tabName">
        <TabPane v-for="(item, index) in systemList" :key="index" :label="item.name">
          <Row type="flex" justify="start" style="padding: 15px">
            <Col span="4" v-for="(items, indexs) in farmList" :key="indexs">
            <img src="../../assets/farm.png" height="53" width="65" />
            <div style="margin-bottom: 20px">
              <Checkbox v-model="items.chooces" :disabled="item.roleId === 2">{{items.name !== null ? items.name : '未命名农田'}}</Checkbox>
            </div>
            </Col>
          </Row>
          <Button @click="add(item)" style="float: right;margin-right: 20px;background: #249AF2; color: #fff;border-radius:8px;" v-show="item.roleId !== 2">确认添加</Button>
          <!--<Select v-model="item.roleId" style="width:200px;float: right;margin-right: 30px" :transfer="true" @on-open-change="roleChange(item.roleId)">-->
            <!--<Option value="item.roleId" >{{ item.roleName }}</Option>-->
          <!--</Select>-->
          <span style="float: left; margin-right: 10px;margin-left: 20px;margin-top: 3px;font-size: 17px">系统权限： {{item.roleName}}</span>
          <Button @click="roleChange(item)" style="float: left;border-radius:8px;background: #249AF2; color: #fff;">修改权限</Button>
        </TabPane>
        <Button @click="handleTabRemove"  slot="extra" size="small" style="margin-right: 20px;background: #249AF2; color: #fff;border-radius:8px;width: 80px;">删除系统</Button>
      </Tabs>
    </div>
    <Modal
      v-model="editRoleModal"
      title="修改系统权限"
      ok-text="确定"
      cancel-text="取消"
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="cancle" width="500">

      <span style="margin-left: 50px;margin-right: 10px">系统权限</span>
      <Select  style="width:300px;text-align: center;margin-top: 100px;margin-bottom: 100px;" @on-change="changeRole" v-model="update.role">
        <Option v-for='(items, index) in cityList' :value='items.id' :key="index">{{items.name}}</Option>
      </Select>
    </Modal>
  </div>
</template>

<script>
  import {getUserDetails, getUserSystem, getRoles, getUserFarms, addUserSystemFarm, deleteUserSystem, editUserSystem} from '../../api/api'
  export default {
    data () {
      return {
        change: false,
        update: {
          role: '',
          iasId: ''
        },
        editRoleModal: false,
        tabName: 0,
        baseInfo: {
          id: '',
          name: '杨师傅',
          tel: '13536365656',
          idCard: '610424196601013232',
          address: '陕西省渭南市临渭区石河子镇南阳街道'
        },
        admin: '0',
        systemList: [],
        farmList: [],
        cityList: []
      }
    },
    methods: {
      cancle () {},
      ok () {
        let param = {
          userId: this.baseInfo.id,
          roleId: this.update.role,
          iasId: this.update.iasId
        }
        editUserSystem(param).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success('权限修改成功！')
            this.getSystem(this.baseInfo.id)
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      changeRole (change) {
      },
      roleChange (item) {
        this.update.role = item.roleId
        this.update.iasId = item.id
        this.editRoleModal = true
        // console.log(change)
      },
      getFarmList (userId, systemId) {
        let p = {
          id: userId,
          ids: systemId
        }
        let thi = this
        getUserFarms(p).then((res) => {
          if (res.data.code === 0) {
            thi.farmList = []
            for (let ff of res.data.data) {
              if (ff.iid === null) {
                ff.chooces = false
              } else {
                ff.chooces = true
              }
              thi.farmList.push(ff)
            }
          }
        })
      },
      tabChange (change) {
        this.tabName = change
        this.getFarmList(this.baseInfo.id, this.systemList[change].id)
      },
      getRoleList () {
        getRoles().then((res) => {
          if (res.data.code === 0) {
            this.cityList = res.data.data
          }
        })
      },
      getDetails (pa) {
        let para = {
          id: pa
        }
        getUserDetails(para).then((res) => {
          if (res.data.code === 0) {
            this.baseInfo = {
              id: res.data.data.id,
              name: res.data.data.username,
              tel: res.data.data.mobile,
              idCard: res.data.data.idCard,
              address: res.data.data.address
            }
            this.getRoleList()
            this.getSystem(pa)
          }
        })
      },
      getSystem (pam) {
        let param = {
          id: pam
        }
        getUserSystem(param).then((res) => {
          if (res.data.code === 0) {
            if (res.data.data.length > 0) {
              this.systemList = res.data.data
              this.tabName = 0
              this.getFarmList(this.baseInfo.id, this.systemList[0].id)
            } else {
              this.systemList = []
            }
          }
        })
      },
      add (item) {
        let list = []
        for (let i of this.farmList) {
          if (i.chooces) {
            list.push(i.id)
          }
        }
        let param = {
          userId: this.$route.params.id,
          iasId: item.id,
          roleId: item.roleId,
          fids: list.join(',')
        }
        addUserSystemFarm(param).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success('农田添加成功！')
            this.getSystem(this.baseInfo.id)
            // this.$router.push({name: 'user', params: {params: this.$route.params.params, region: this.$route.params.region}})
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      sendSystem () {
        // chooce_system
        this.$router.push({name: 'chooce_system', params: {id: this.$route.params.id, params: this.$route.params.params, region: this.$route.params.region}})
      },
      back () {
        // console.log(this.$route.params)
        this.$router.push({name: 'user', params: {params: this.$route.params.params, region: this.$route.params.region}})
      },
      handleTabRemove () {
        var th = this
        th.$Modal.confirm({
          title: `<div style="font-size: 18px">删除系统</div>`,
          content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: center">确定删除` + th.systemList[th.tabName].name + `？</div>`,
          onOk: function () {
            let par = {
              userId: th.baseInfo.id,
              iasId: th.systemList[th.tabName].id
            }
            deleteUserSystem(par).then((res) => {
              if (res.data.code === 0) {
                th.getSystem(th.baseInfo.id)
                th.$Message.success('系统删除成功！')
              } else {
                th.$Message.error(res.data.message)
              }
            })
          },
          onCancel: function () {
            th.$Message.info('取消删除操作！')
          }
        })
      }
    },
    created () {
      this.getDetails(this.$route.params.id)
    }
  }
</script>

<style scoped>
  .body {
    margin: 40px;
  }
  .body-head {
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 8px 0px rgba(102,102,102,0.3);
    border-radius:4px;
    text-align: left;
  }
  .body-content {
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 8px 0px rgba(102,102,102,0.3);
    border-radius:4px;
    padding: 5px;
  }
  .body-title {
    margin: 20px 0px;
    font-size: 20px;
    font-weight: 400;
    text-align: left;
  }
  .body-head-title {
    padding: 10px 20px;
    font-size: 20px;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
</style>
