<template>
<div class="body">
  <div class="body-head">
    <Row type="flex" justify="start">
      <div class="head-title">筛选</div>
      <div style="width: 620px">
        <regions @region="regionAllChange" :regionIdAllData="regionIdAllData" ></regions>
      </div>
      <div style="width: 400px;">
        <div class="head-title">关键字</div>
        <Input placeholder="姓名/手机号码/身份证号" style="width: 200px;float: left;margin-right: 20px" v-model="paramnter.like" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"></Input>
      </div>
      <Button @click="add" style="background: #249AF2; color: #fff;border-radius:8px;width: 100px;position: fixed; right: 40px; z-index: 99" >+ 新增用户</Button>
    </Row>
  </div>
  <div class="body-content">
    <div class="body-table">
      <Table stripe  :columns="columns" :data="dataTable" ></Table>
      <div class="pages-block">
        <div class="pages-right">
          <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                ref="tablePage" show-elevator :transfer="true"></Page>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-model="addUser"
    title="添加用户"
    ok-text="关闭"
    cancel-text=""
    :mask-closable="false"
    @on-ok="ok"
    @on-cancel="ok" width="500">
    <Form :model="updateModal" :label-width="100" ref="updateModal" :rules="ruleValidate" style="margin-top: 30px">
      <Row type="flex" justify="center">
        <Col span="24">
        <FormItem label="用户姓名" prop="name">
          <Input  v-model="updateModal.name"  style="width: 200px; float: left"  @on-change="nameVal(updateModal.name)" placeholder="用户姓名"></Input>
          <span class="notice" v-if="nameNotice">用户姓名不能超过20位</span>
          <span class="notice" v-if="wordNotice">用户姓名不能含有字母、数字</span>
          <br>
        </FormItem>
        <FormItem label="手机号码" prop="mobile">
          <Input  v-model="updateModal.mobile"  style="width: 200px; float: left"  @on-change="phoneVal(updateModal.mobile)" placeholder="手机号码"></Input>
          <span class="notice" v-if="phoneNotice">请输入合法的手机号码</span><br>
        </FormItem>
        <FormItem label="身份证号" prop="idCard">
          <Input  v-model="updateModal.idCard"  style="width: 200px; float: left"  @on-change="idCardVal(updateModal.idCard)" placeholder="身份证号"></Input>
          <span class="notice" v-if="idCardNotice">请输入合法身份证号</span><br>
        </FormItem>
        <FormItem label="所属区域" prop="districtId">
          <region @regionChange="regionChange" :regionArea="regionArea"></region>
        </FormItem>
        <FormItem label="镇/社区" prop="townId">
          <Select  style="width:300px;text-align: center" placeholder="镇/社区" @on-change="changeTown" clearable :label-in-value="true" v-model="tid">
            <Option v-for='(items, index) in townList' :value='items.id' :key="index">{{items.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="tid === -1">
          <Input  v-model="addressNameT"  style="width: 240px;" placeholder="请输入需要添加的镇/社区"></Input>
          <Button  @click="addAddress" type="primary" >保存</Button>
        </FormItem>
        <FormItem label="村/街道" prop="villageId">
          <Select  style="width:300px;text-align: center" placeholder="村/街道" @on-change="changeVilliage" clearable :label-in-value="true" v-model="vid">
            <Option v-for='(items, index) in villiageList' :value='items.id' :key="index">{{items.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="vid === -1">
          <Input  v-model="addressNameV"  style="width: 240px;" placeholder="请输入需要添加的村/街道"></Input>
          <Button  @click="addAddressV" type="primary" >保存</Button>
        </FormItem>
        <FormItem label="地址" prop="">
          <Input  v-model="updateModal.address"  style="width: 300px; float: left" placeholder="具体地址"></Input>
        </FormItem>
        <FormItem>
          <Col span="12" push="5">
          <Button  class="btn-list" @click="okAdd">保存</Button>
          </Col>
        </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
  <Modal
    v-model="editUser"
    title="编辑用户"
    ok-text="关闭"
    cancel-text=""
    :mask-closable="false"
    @on-ok="ok"
    @on-cancel="ok" width="500">
    <Form :model="editModal" ref="editModal" :label-width="100" :rules="ruleValidate">
      <Row type="flex" justify="center">
        <Col span="24">
        <FormItem label="用户姓名" prop="name">
          <Input  v-model="editModal.name"  style="width: 200px; float: left"  @on-change="nameVal(editModal.name)" placeholder="用户姓名"></Input>
          <span class="notice" v-if="nameNotice">用户姓名不能超过20位</span>
          <span class="notice" v-if="wordNotice">用户姓名不能含有字母、数字</span>
          <br>
        </FormItem>
        <FormItem label="手机号码" prop="mobile">
          <Input  v-model="editModal.mobile"  style="width: 200px; float: left"  @on-change="phoneVal(editModal.mobile)" placeholder="手机号码"></Input>
          <span class="notice" v-if="phoneNotice">请输入合法的手机号码</span><br>
        </FormItem>
        <FormItem label="身份证号" prop="idCard">
          <Input  v-model="editModal.idCard"  style="width: 200px; float: left"  @on-change="idCardVal(editModal.idCard)" placeholder="身份证号"></Input>
          <span class="notice" v-if="idCardNotice">请输入合法身份证号</span><br>
        </FormItem>
        <FormItem label="所属区域" prop="districtId">
          <region @regionChange="regionChangeEdit" :regionArea="regionArea"></region>
        </FormItem>
        <FormItem label="镇/社区" prop="townId">
          <Select  style="width:300px;text-align: center" placeholder="镇/社区" @on-change="changeTownEdit" clearable :label-in-value="true" v-model="tid">
            <Option v-for='(items, index) in townList' :value='items.id' :key="index">{{items.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="tid === -1">
          <Input  v-model="addressNameT"  style="width: 240px;" placeholder="请输入需要添加的镇/社区"></Input>
          <Button  @click="addAddressEdit" type="primary" >保存</Button>
        </FormItem>
        <FormItem label="村/街道" prop="villageId">
          <Select  style="width:300px;text-align: center" placeholder="村/街道" @on-change="changeVilliageEdit" clearable :label-in-value="true" v-model="vid">
            <Option v-for='(items, index) in villiageList' :value='items.id' :key="index">{{items.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="vid === -1">
          <Input  v-model="addressNameV"  style="width: 240px;" placeholder="请输入需要添加的村/街道"></Input>
          <Button  @click="addAddressVEdit" type="primary" >保存</Button>
        </FormItem>
        <FormItem label="地址" prop="">
          <Input  v-model="editModal.address"  style="width: 300px; float: left" placeholder="具体地址"></Input>
        </FormItem>
        <FormItem>
          <Col span="12" push="5">
          <Button  class="btn-list" @click="okEdit">保存</Button>
          </Col>
        </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</div>
</template>

<script>
  import { getUserList, getRegions, addRegions, addUser, deleteUser, getUserEditDetail, editUser } from '../../api/api'
  import regions from '../../components/regionAll'
  import region from '../../components/region'
  export default {
    components: {
      regions,
      region
    },
    data () {
      return {
        tId: '',
        vId: '',
        regionArea: [],
        addPid: '',
        addPidV: '',
        address: {
          id: -1,
          name: '新增地址'
        },
        addressNameV: '',
        addressNameT: '',
        villiageList: [],
        townList: [],
        tid: '',
        vid: '',
        creatRegion: [],
        regionIdAllData: [],
        idCardNotice: false,
        phoneNotice: false,
        wordNotice: false,
        nameNotice: false,
        editUser: false,
        addUser: false,
        ruleValidate: {
          name: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '手机号码不能为空', trigger: 'blur'}
          ],
          districtId: [
            {required: true, message: '用户地址不能为空', trigger: 'blur'}
          ],
          townId: [
            {required: true, message: '用户地址镇/社区不能为空', trigger: 'blur'}
          ],
          villageId: [
            {required: true, message: '用户地址村/街道不能为空', trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'}
          ]
        },
        editModal: {
          idCard: '',
          mobile: '',
          name: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          townId: '',
          villageId: '',
          address: ''
        },
        updateModal: {
          idCard: '',
          mobile: '',
          name: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          townId: '',
          villageId: '',
          address: ''
        },
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        paramnter: {
          like: '',
          pageNum: 1,
          pageSize: 10,
          regionId: ''
        },
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        columns: [
          {
            title: '序号',
            key: 'id',
            width: 100,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'username',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'mobile',
            width: 120,
            align: 'center'
          },
          {
            title: '身份证号',
            key: 'idCard',
            align: 'center'
          },
          {
            title: '地址',
            key: 'address',
            align: 'center'
          },
          {
            title: '注册时间',
            key: 'createTime',
            width: 160,
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'ios-paper-outline'
                  },
                  style: {
                    color: '#1166E5',
                    fontSize: '24px'
                  },
                  on: {
                    click: () => {
                      this.check(params.row.id)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'ios-create-outline'
                  },
                  style: {
                    color: '#FFB431',
                    fontSize: '24px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.id)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    color: '#F47D7D',
                    fontSize: '24px'
                  },
                  on: {
                    click: () => {
                      this.delete(params.row)
                    }
                  }
                })
              ])
            }
          }
        ],
        dataTable: [
          {
            id: 1
          }
        ],
      }
    },
    methods: {
      check (id) {
        this.$router.push({name: 'user_detail', params: {id: id, params: this.paramnter, region: this.creatRegion}})
      },
      regionChangeEdit (data) {
        this.tid = ''
        this.vid = ''
        this.townList = []
        this.villiageList = []
        if (data.length > 2) {
          this.editModal.provinceId = data[0].value
          this.editModal.cityId = data[1].value
          this.editModal.districtId = data[2].value
          this.getTown(data[2].value)
        }
      },
      getTown (param) {
        let par = {
          pid: param
        }
        getRegions(par).then((res) => {
          if (res.data.code === 0) {
            this.townList = []
            this.townList.push(this.address)
            for (let ll of res.data.data) {
              this.townList.push(ll)
              this.addPid = param
              this.tid = this.tId
            }
          }
        })
      },
      addAddress () {
        let par = {
          pid: this.addPid,
          name: this.addressNameT
        }
        addRegions(par).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success('地址新增成功！')
            this.tid = res.data.data
            this.tId = res.data.data
            this.getTown(this.addPid)
            this.getVilliage(this.tid)
            this.addressNameT = ''
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      addAddressV () {
        let par = {
          pid: this.tid,
          name: this.addressNameV
        }
        addRegions(par).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success('地址新增成功！')
            this.getVilliage(this.tid)
            this.vid = res.data.data
            this.vId = res.data.data
            this.addressNameV = ''
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      addAddressEdit () {
        let par = {
          pid: this.addPid,
          name: this.addressNameT
        }
        addRegions(par).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success('地址新增成功！')
            this.tid = res.data.data
            this.tId = res.data.data
            this.getTown(this.addPid)
            this.getVilliage(this.tid)
            this.addressNameT = ''
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      addAddressVEdit () {
        let par = {
          pid: this.tid,
          name: this.addressNameV
        }
        addRegions(par).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success('地址新增成功！')
            this.getVilliage(this.tid)
            this.vid = res.data.data
            this.vId = res.data.data
            this.addressNameV = ''
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      getVilliage (param) {
        let par = {
          pid: param
        }
        getRegions(par).then((res) => {
          if (res.data.code === 0) {
            this.villiageList = []
            this.villiageList.push(this.address)
            for (let ll of res.data.data) {
              this.villiageList.push(ll)
              this.addPidV = param
              this.vid = this.vId
            }
          }
        })
      },
      changeTown (change) {
        this.vid = ''
        this.villiageList = []
        if (change !== '' && change !== undefined && this.tid !== -1) {
          this.getVilliage(change.value)
          this.updateModal.townId = change.value
        } else {
          this.updateModal.townId = ''
        }
      },
      changeVilliage (change) {
        if (change !== '' && change !== undefined) {
          this.updateModal.villageId = change.value
        } else {
          this.updateModal.villageId = ''
        }
      },
      changeTownEdit (change) {
        this.vid = ''
        this.villiageList = []
        if (change !== '' && change !== undefined && this.tid !== -1) {
          this.getVilliage(change.value)
          this.editModal.townId = change.value
        } else {
          // this.editModal.townId = ''
        }
      },
      changeVilliageEdit (change) {
        if (change !== '' && change !== undefined) {
          this.editModal.villageId = change.value
        } else {
          // this.editModal.villageId = ''
        }
      },
      regionChange (data) {
        this.tid = ''
        this.vid = ''
        this.townList = []
        this.villiageList = []
        if (data.length > 2) {
          this.updateModal.provinceId = data[0].value
          this.updateModal.cityId = data[1].value
          this.updateModal.districtId = data[2].value
          this.getTown(data[2].value)
          this.addPid = data[2].value
        }
      },
      getDetail (params) {
        let para = {
          id: params
        }
        getUserEditDetail(para).then((res) => {
          if (res.data.code === 0) {
            this.regionArea = [res.data.data[0].provinceId, res.data.data[0].cityId, res.data.data[0].districtId]
            this.getTown(res.data.data[0].districtId)
            this.tId = res.data.data[0].townId
            this.tid = res.data.data[0].townId
            this.getVilliage(res.data.data[0].townId)
            this.vId = res.data.data[0].villageId
            this.vid = res.data.data[0].villageId
            this.editModal = {
              id: res.data.data[0].id,
              idCard: res.data.data[0].idCard,
              mobile: res.data.data[0].mobile,
              name: res.data.data[0].name,
              provinceId: res.data.data[0].provinceId,
              cityId: res.data.data[0].cityId,
              districtId: res.data.data[0].districtId,
              townId: res.data.data[0].townId,
              villageId: res.data.data[0].villageId,
              address: res.data.data[0].address
            }
            this.editUser = true
          }
        })
      },
      edit (id) {
        this.tId = ''
        this.vId = ''
        this.regionArea = []
        this.getDetail(id)
        // this.editUser = true
      },
      add () {
        this.tId = ''
        this.vId = ''
        this.regionArea = []
        this.tid = ''
        this.vid = ''
        this.addressNameT = ''
        this.addressNameV = ''
        this.updateModal = {
          idCard: '',
          mobile: '',
          name: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          townId: '',
          villageId: '',
          address: ''
        }
        this.addUser = true
      },
      formdataValidate (formdate) {
        if (formdate.name === '') {
          this.$Message.error('用户姓名不能为空！')
          return false
        } else if (formdate.mobile === '') {
          this.$Message.error('用户手机号码不能为空！')
          return false
        } else if (formdate.idCard === '') {
          this.$Message.error('用户身份证号不能为空！')
          return false
        } else if (formdate.districtId === '') {
          this.$Message.error('用户所属区域不能为空！')
          return false
        } else if (formdate.townId === '') {
          this.$Message.error('用户镇/社区不能为空！')
          return false
        } else if (formdate.villageId === '') {
          this.$Message.error('用户村/街道不能为空！')
          return false
        } else {
          return true
        }
      },
      okAdd () {
        this.updateModal.townId = this.tid
        this.updateModal.villageId = this.vid
        if (this.formdataValidate(this.updateModal)) {
          addUser(this.updateModal).then((res) => {
            if (res.data.code === 0) {
              this.addUser = false
              this.getTableDatas(this.paramnter)
              this.$Message.success('用户新增成功！')
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      okEdit () {
        this.editModal.townId = this.tid
        this.editModal.villageId = this.vid
        if (this.formdataValidate(this.editModal)) {
          editUser(this.editModal).then((res) => {
            if (res.data.code === 0) {
              this.editUser = false
              this.getTableDatas(this.paramnter)
              this.$Message.success('用户编辑成功！')
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      idCardVal (string) {
        // this.verificationForm.idcard = string.trim()
        if (string !== '' && string !== undefined) {
          var validataPrice = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
          if (!validataPrice.test(string.trim())) {
            this.idCardNotice = true
          } else {
            this.idCardNotice = false
          }
        } else {
          this.idCardNotice = true
        }
      },
      // 手机号码验证
      phoneVal (string) {
        if (string !== '' && string !== undefined) {
          var validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
          if (!validataPrice.test(string.trim())) {
            this.phoneNotice = true
          } else {
            this.phoneNotice = false
          }
        } else {
          this.phoneNotice = true
        }
      },
      // 用户名验证
      // 用户名字母、数字，，不能为汉字
      nameVal (string) {
        let validate = /[a-zA-Z0-9]$/
        if (string !== '' && string !== undefined) {
          if (!validate.test(string.trim())) {
            this.wordNotice = false
            if (string.trim().length > 20 || string.trim().length < 1) {
              this.nameNotice = true
            } else {
              this.nameNotice = false
            }
          } else {
            this.wordNotice = true
            this.nameNotice = false
          }
        } else {
          this.nameNotice = true
          this.wordNotice = false
        }
      },
      ok () {},
      backKeyword () {
        this.paramnter.like = ''
        this.page = 1
        this.rows = 10
        this.paramnter.pageNum = this.page
        this.paramnter.pageSize = this.rows
        this.getTableDatas(this.paramnter)
      },
      keywordChange () {
        this.paramnter.like = this.paramnter.like.trim()
        this.page = 1
        this.rows = 10
        this.paramnter.pageNum = this.page
        this.paramnter.pageSize = this.rows
        this.getTableDatas(this.paramnter)
      },
      delete (row) {
        var th = this
        th.$Modal.confirm({
          title: `<div style="font-size: 18px">删除用户信息</div>`,
          content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: center">确定删除` + row.username + `的信息？</div>`,
          onOk: function () {
            let par = {
              id: row.id
            }
            deleteUser(par).then((res) => {
              if (res.data.code === 0) {
                if (th.paramnter.pageNum > 1 && th.dataTable.length === 1) {
                  th.paramnter.pageNum = th.paramnter.pageNum - 1
                }
                th.$Message.success('用户删除成功！')
                th.getTableDatas(th.paramnter)
              } else {
                th.$Message.error(res.data.message)
              }
            })
          },
          onCancel: function () {
            th.$Message.info('取消删除操作！')
          }
        })
      },
      regionAllChange (data) {
        let count = 0
        if (data.length > 0) {
          if (data[data.length - 1].value === undefined) {
            this.paramnter.regionId = data[data.length -1]
          } else {
            this.paramnter.regionId = data[data.length -1].value
          }
          this.creatRegion = []
          for (let s of data) {
            if (s.value === undefined) {
              count++
              this.creatRegion.push(s)
            } else {
              this.creatRegion.push(s.value)
            }
          }
          if (count !== data.length) {
            this.page = 1
            this.rows = 10
            this.paramnter.pageNum = this.page
            this.paramnter.pageSize = this.rows
          }
          this.getTableDatas(this.paramnter)
        } else {
          this.paramnter.regionId = ''
          this.page = 1
          this.rows = 10
          this.paramnter.pageNum = this.page
          this.paramnter.pageSize = this.rows
          this.getTableDatas(this.paramnter)
        }
      },
      getTableDatas (param) {
        getUserList(param).then((res) => {
          if (res.data.code === 0) {
            this.dataTable = res.data.data.list
            this.total = res.data.data.total
            this.row = res.data.data.pageSize
            this.page = res.data.data.pageNum
            this.$refs.tablePage.currentPage = this.page
          } else {
            this.dataTable = []
          }
        })
      },
      // 点击分页页码
      change (page) {
        this.page = page
        this.paramnter.pageNum = this.page
        this.getTableDatas(this.paramnter)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.paramnter.pageSize = this.rows
        this.getTableDatas(this.paramnter)
      }
    },
    mounted () {
      if (this.$route.params.region !== undefined) {
        this.regionIdAllData = this.$route.params.region
      }
      if (this.$route.params.params !== undefined) {
        this.paramnter = this.$route.params.params
      }
      this.getTableDatas(this.paramnter)
    },
    created () {
      this.regionIdAllData = []
    }
  }
</script>

<style scoped>
  .body {
    /*min-width: 1230px;*/
  }
  .body-head {
    /*height: 60px;*/
    padding: 13px 0px 10px 20px;
    background: rgba(250,251,253,1);
    border-bottom:1px solid rgba(229, 229, 229, 1);
  }
  .head-title {
    float:left;
    padding: 5px 12px 10px 0px;
    color: rgba(233,111,92,1);
    font-size:16px;
  }
  .body-content {
    padding: 30px 40px 30px 40px;
  }
  .body-table {
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
  .pages-block {
    margin: 0px;
    overflow: hidden;
    /*margin-top: 10px;*/
    margin-bottom: 10px;
    text-align: left;
    padding: 5px;
    background:rgba(240,240,240,1);
  }
  .pages-right {
    vertical-align: middle;
  }
  .btn-list {
    width: 100px;
    background: #E96F5C;
    color: #fff;
    border-radius:6px 8px 8px 8px;
  }
  .btn-list:hover {
    background: #E96F5C;
    color: #fff;
  }
  .ivu-btn:hover {
    border-color: transparent !important;
  }
  .notice {
    color: red;
  }
</style>
