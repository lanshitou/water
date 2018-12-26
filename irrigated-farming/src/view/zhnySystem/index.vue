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
          <Input placeholder="系统名称/系统别名" style="width: 200px;float: left;margin-right: 20px" v-model="paramnter.like" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"></Input>
        </div>
        <Button @click="add" style="background: #249AF2; color: #fff;border-radius:8px;width: 100px;position: fixed; right: 40px; z-index: 99" >+ 创建系统</Button>
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
      v-model="addModal"
      title="创建系统"
      ok-text="关闭"
      cancel-text=""
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="ok" width="500">
      <Form :model="systemForm" :label-width="100" ref="systemForm" :rules="ruleValidate" style="margin-top: 30px">
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="系统名称" prop="name">
            <Input  v-model="systemForm.name"  style="width: 200px; float: left"  @on-change="nameVal(systemForm.name)" placeholder="系统名称"></Input>
            <span class="notice" v-if="nameNotice">系统名称不能超过20位</span>
            <br>
          </FormItem>
          <FormItem label="系统别名" prop="alias">
            <Input  v-model="systemForm.alias"  style="width: 200px; float: left"  @on-change="nameVal(systemForm.alias)" placeholder="系统别名"></Input>
            <span class="notice" v-if="aliasNotice">系统别名不能超过20位</span>
            <br>
          </FormItem>
          <FormItem label="系统类型" prop="type">
            <RadioGroup v-model="systemForm.type" style="float: left">
              <Radio label="1">普通智慧农业系统</Radio>
              <Radio label="2">气象站</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="工作模式" prop="mode">
            <RadioGroup v-model="systemForm.mode" style="float: left">
              <Radio label="1">手动模式</Radio>
              <Radio label="2">自动模式</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="最大并行" prop="maxIrrNum">
            <InputNumber  v-model="systemForm.maxIrrNum" style="width: 300px;" placeholder="必填" :formatter="value => `${value}`.replace('.', '')"
                          :parser="value => value.replace('-', '')" :min="0" :max="99999999"></InputNumber>
          </FormItem>
          <FormItem label="显示排序" prop="sortOrder">
            <InputNumber  v-model="systemForm.sortOrder" style="width: 300px;" placeholder="必填" :formatter="value => `${value}`.replace('.', '')"
                          :parser="value => value.replace('-', '')" :min="1" :max="99999999"></InputNumber>
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
            <Input  v-model="systemForm.address"  style="width: 300px; float: left" placeholder="具体地址"></Input>
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
      v-model="editModal"
      title="编辑系统"
      ok-text="关闭"
      cancel-text=""
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="ok" width="500">
      <Form :model="editForm" :label-width="100" ref="editForm" :rules="ruleValidate" style="margin-top: 30px">
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="系统名称" prop="name">
            <Input  v-model="editForm.name"  style="width: 200px; float: left"  @on-change="nameVal(editForm.name)" placeholder="系统名称"></Input>
            <span class="notice" v-if="nameNotice">系统名称不能超过20位</span>
            <br>
          </FormItem>
          <FormItem label="系统别名" prop="alias">
            <Input  v-model="editForm.alias"  style="width: 200px; float: left"  @on-change="nameVal(editForm.alias)" placeholder="系统别名"></Input>
            <span class="notice" v-if="aliasNotice">系统别名不能超过20位</span>
            <br>
          </FormItem>
          <FormItem label="系统类型" prop="type">
            <RadioGroup v-model="editForm.type" style="float: left">
              <Radio label="1">普通智慧农业系统</Radio>
              <Radio label="2">气象站</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="工作模式" prop="mode">
            <RadioGroup v-model="editForm.mode" style="float: left">
              <Radio label="1">手动模式</Radio>
              <Radio label="2">自动模式</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="最大并行" prop="maxIrrNum">
            <InputNumber  v-model="editForm.maxIrrNum" style="width: 300px;" placeholder="必填" :formatter="value => `${value}`.replace('.', '')"
                          :parser="value => value.replace('-', '')" :min="0" :max="99999999"></InputNumber>
          </FormItem>
          <FormItem label="显示排序" prop="sortOrder">
            <InputNumber  v-model="editForm.sortOrder" style="width: 300px;" placeholder="必填" :formatter="value => `${value}`.replace('.', '')"
                          :parser="value => value.replace('-', '')" :min="1" :max="99999999"></InputNumber>
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
            <Input  v-model="editForm.address"  style="width: 300px; float: left" placeholder="具体地址"></Input>
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
  import { getSystems, getRegions, addRegions, addIasSystem, deleteSystems, getSystemDetail, editSystems } from '../../api/api'
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
        aliasNotice: false,
        nameNotice: false,
        editModal: false,
        addModal: false,
        ruleValidate: {
          name: [
            {required: true, message: '系统名称不能为空', trigger: 'blur'}
          ],
          alias: [
            {required: true, message: '系统别名不能为空', trigger: 'blur'}
          ],
          sortOrder: [
            {required: true, message: '手机号码不能为空'}
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
          maxIrrNum: [
            {required: true, message: '身份证号不能为空'}
          ],
          mode: [
            {required: true, message: '身份证号不能为空'}
          ],
          type: [
            {required: true, message: '身份证号不能为空'}
          ]
        },
        editForm: {
          type: '1',
          mode: '1',
          maxIrrNum: 1,
          sortOrder: 1,
          name: '',
          alias: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          townId: '',
          villageId: '',
          address: ''
        },
        systemForm: {
          type: '1',
          mode: '1',
          maxIrrNum: 1,
          sortOrder: 1,
          name: '',
          alias: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          townId: '',
          villageId: '',
          address: ''
        },
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
            title: '系统名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '系统别名',
            key: 'alias',
            align: 'center'
          },
          {
            title: '地址',
            key: 'address',
            align: 'center'
          },
          {
            title: '工作模式',
            key: 'mode',
            align: 'center',
            render: (h, params) => {
              let type = params.row.mode === 1 || params.row.mode === '1' ? '手动模式' : '自动模式'
              return h('div', type)
            }
          },
          {
            title: '最大并行',
            key: 'maxIrrNum',
            align: 'center'
          },
          {
            title: '类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              let type = params.row.type === 1 || params.row.type === '1' ? '普通智慧农业系统' : '气象站'
              return h('div', type)
            }
          },
          {
            title: '创建时间',
            key: 'time',
            width: 160,
            align: 'center'
          },
          {
            title: '操作',
            width: 140,
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
                      this.removeSystem(params.row)
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
        this.$router.push({name: 'system_detail', params: {id: id, params: this.paramnter, region: this.creatRegion}})
      },
      regionChangeEdit (data) {
        this.tid = ''
        this.vid = ''
        this.townList = []
        this.villiageList = []
        if (data.length > 2) {
          this.editForm.provinceId = data[0].value
          this.editForm.cityId = data[1].value
          this.editForm.districtId = data[2].value
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
          this.systemForm.townId = change.value
        } else {
          this.systemForm.townId = ''
        }
      },
      changeVilliage (change) {
        if (change !== '' && change !== undefined) {
          this.systemForm.villageId = change.value
        } else {
          this.systemForm.villageId = ''
        }
      },
      changeTownEdit (change) {
        this.vid = ''
        this.villiageList = []
        if (change !== '' && change !== undefined && this.tid !== -1) {
          this.getVilliage(change.value)
          this.editForm.townId = change.value
        } else {
          // this.editModal.townId = ''
        }
      },
      changeVilliageEdit (change) {
        if (change !== '' && change !== undefined) {
          this.editForm.villageId = change.value
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
          this.systemForm.provinceId = data[0].value
          this.systemForm.cityId = data[1].value
          this.systemForm.districtId = data[2].value
          this.getTown(data[2].value)
          this.addPid = data[2].value
        }
      },
      getDetail (params) {
        let para = {
          id: params
        }
        getSystemDetail(para).then((res) => {
          if (res.data.code === 0) {
            this.regionArea = [res.data.data.provinceId, res.data.data.cityId, res.data.data.districtId]
            this.getTown(res.data.data.districtId)
            this.tId = res.data.data.townId
            this.tid = res.data.data.townId
            this.getVilliage(res.data.data.townId)
            this.vId = res.data.data.villageId
            this.vid = res.data.data.villageId
            this.editForm = {
              id: res.data.data.id,
              name: res.data.data.name,
              alias: res.data.data.alias,
              maxIrrNum: res.data.data.maxIrrNum,
              mode: res.data.data.mode + '',
              type: res.data.data.type + '',
              sortOrder: res.data.data.sortOrder,
              provinceId: res.data.data.provinceId,
              cityId: res.data.data.cityId,
              districtId: res.data.data.districtId,
              townId: res.data.data.townId,
              villageId: res.data.data.villageId,
              address: res.data.data.address
            }
            this.editModal = true
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
        this.systemForm = {
          type: '1',
          mode: '1',
          maxIrrNum: 1,
          sortOrder: 1,
          name: '',
          alias: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          townId: '',
          villageId: '',
          address: ''
        }
        this.addModal = true
      },
      formdataValidate (formdate) {
        if (formdate.name === '') {
          this.$Message.error('系统名称不能为空！')
          return false
        } else if (formdate.alias === '') {
          this.$Message.error('系统别名不能为空！')
          return false
        } else if (formdate.maxIrrNum === '' || formdate.maxIrrNum < 1) {
          this.$Message.error('系统最大并行不能小于0！')
          return false
        } else if (formdate.sortOrder === '' || formdate.sortOrder < 1) {
          this.$Message.error('系统排序不能小于1！')
          return false
        } else if (formdate.districtId === '') {
          this.$Message.error('系统所属区域不能为空！')
          return false
        } else if (formdate.townId === '') {
          this.$Message.error('系统镇/社区不能为空！')
          return false
        } else if (formdate.villageId === '') {
          this.$Message.error('系统村/街道不能为空！')
          return false
        } else {
          return true
        }
      },
      okAdd () {
        this.systemForm.townId = this.tid
        this.systemForm.villageId = this.vid
        if (this.formdataValidate(this.systemForm)) {
          addIasSystem(this.systemForm).then((res) => {
            if (res.data.code === 0) {
              this.addModal = false
              this.getTableDatas(this.paramnter)
              this.$Message.success('系统创建成功！')
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      okEdit () {
        this.editForm.townId = this.tid
        this.editForm.villageId = this.vid
        if (this.formdataValidate(this.editForm)) {
          editSystems(this.editForm).then((res) => {
            if (res.data.code === 0) {
              this.editModal = false
              this.getTableDatas(this.paramnter)
              this.$Message.success('系统编辑成功！')
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      nameVal (string) {
        // let validate = /[a-zA-Z0-9]$/
        if (string.trim().length > 20 || string.trim().length < 1) {
          this.nameNotice = true
        } else {
          this.nameNotice = false
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
      removeSystem (row) {
        var th = this
        th.$Modal.confirm({
          title: `<div style="font-size: 18px">删除系统信息</div>`,
          content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: left">确定删除` + row.name + `的信息？</div>`,
          onOk: function () {
            let par = {
              id: row.id
            }
            deleteSystems(par).then((res) => {
              if (res.data.code === 0) {
                if (th.paramnter.pageNum > 1 && th.dataTable.length === 1) {
                  th.paramnter.pageNum = th.paramnter.pageNum - 1
                }
                th.$Message.success('系统删除成功！')
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
        getSystems(param).then((res) => {
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
