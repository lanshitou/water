<template>
  <div class="body">
    <div class="body-breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem>设备管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="body-content">
      <div class="search">
        <Row type="flex" justify="start">
          <Col span="24">
          <div class="head-title">选择农业系统</div>
          <Select v-model="systemId" style="width:200px;float:left"  placeholder="选择农业系统" :label-in-value="true" clearable @on-change="changeSystem" filterable>
            <Option v-for='(items, index) in systemList' :value='items.id' :key="index" >{{items.name}}</Option>
          </Select>
          </Col>
        </Row>
      </div>
      <div v-show="showTree" class="tree-content">
        <Alert show-icon type="success">
          <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
          <template slot="desc">
            <Row type="flex" justify="center">
              右击节点管理设备
            </Row>
          </template>
        </Alert>
        <!--<div style="color: red;font-size: 18px;">右击节点管理设备</div>-->
        <Row type="flex" justify="start">
          <Col span="24">
            <div id="tree" class="sidemenu22"></div>
          </Col>
        </Row>
        <!--<Alert type="success" show-icon>A success prompt</Alert>-->
      </div>
      <Modal
        v-model="modal1"
        title="设备管理"
        ok-text="关闭"
        cancel-text=""
        :mask-closable="false"
        @on-ok="ok"
        @on-cancel="cancel"
      >
        <Form :model="updateFormModel" ref="updateFormModel" :label-width="80">
          <Row type="flex" justify="center">
            <FormItem label="可执行操作">
              <Button @click="add" style="background-color: #48B089;color:#fff;width: 100px" v-show="showaddbtn">新增</Button>
              <Button @click="edit" style="background-color: #48B089;color:#fff;width: 100px" v-show="showedit">编辑</Button>
              <Button @click="del" style="background-color: #48B089;color:#fff;width: 100px" v-show="showdels">删除</Button>
            </FormItem>
          </Row>
          <!--新增设备                                                                           -->
          <div v-show="showAdd">
            <Row type="flex" justify="center" v-show="showtype">
              <Col span="24" push="3">
              <FormItem label="新增类型">
                <RadioGroup v-model="type" style="float: left" @on-change="typeRadioChange">
                  <Radio label="0"> 田间控制器</Radio>
                  <Radio label="1"> 设备</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <FormItem label="设备名称">
                <Input  v-model="updateFormModel.name" style="width: 300px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center" v-show="!showMasterControl">
              <FormItem label="控制器Sn">
                <Input  v-model="updateFormModel.sysId" style="width: 300px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center" v-show="showMasterControl&&type === '0'">
              <FormItem label="控制器ID">
                <Input  v-model="updateFormModel.ctlerId" style="width: 300px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center" v-show="showMasterControl&&type === '1'">
              <FormItem label="设备类型">
                <Select v-model="updateFormModel.devType" style="width:300px;float:left"  placeholder="选择设备类型" :label-in-value="true" clearable @on-change="changeDevice">
                  <Option v-for='(items, index) in deviceList' :value='items.id' :key="index" :disabled="items.id === 0">{{items.name}}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row type="flex" justify="center" v-show="showMasterControl&&type === '1'">
              <FormItem label="设备编号">
                <Input  v-model="updateFormModel.devSeq" style="width: 300px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center">
              <FormItem label="配置参数">
                <Input  v-model="updateFormModel.config" style="width: 300px;" placeholder="选填"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center" v-show="!showMasterControl">
              <FormItem label="阈值时间" >
                <Input  v-model="updateFormModel.keepAlive" style="width: 300px;"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center" v-show="!showMasterControl">
              <Col span="24" push="3">
              <FormItem label="是否休眠">
                <RadioGroup v-model="updateFormModel.lowConsume" style="float: left" @on-change="radioChange">
                  <Radio label="0"> 禁止休眠模式</Radio>
                  <Radio label="1"> 采用休眠模式</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Button @click="addOk" style="background-color: #48B089;color:#fff;width: 100px">立即新增</Button>
            </Row>

          </div>
          <!--编辑                                                                            -->
          <div v-show="showEdit">
            <Form :model="editformModel" ref="editformModel" label-position="left" :label-width="80">
              <Row type="flex" justify="center">
                <FormItem label="设备名称">
                  <Input  v-model="editformModel.name" style="width: 300px;"></Input>
                </FormItem>
              </Row>
              <Row type="flex" justify="center">
                <Button @click="editOk" style="background-color: #48B089;color:#fff;width: 100px">立即编辑</Button>
              </Row>
            </Form>
          </div>
          <div v-show="showDel">
            <Row type="flex" justify="center">
              <div class="content-tip">
                确定删除了吗？
              </div>
            </Row>
            <Row type="flex" justify="center">
                <Button @click="delOk" style="background-color: #48B089;color:#fff;width: 100px">立即删除</Button>
            </Row>
          </div>
        </Form>
      </Modal>
      <div class="main-content" v-show="!showTree">
        <Form :model="formModel" ref="formModel" label-position="left" :label-width="100">
          <Row type="flex" justify="center">
            <FormItem label="">
              <div class="content-tip">
                 {{textTip}}
              </div>
            </FormItem>
          </Row>
          <Row type="flex" justify="center" v-show="showbtn">
            <FormItem label="">
              <Button @click="addSystem" style="background-color: #48B089;color:#fff;width: 100px">立即新增</Button>
            </FormItem>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getSystemListSelect, getDeviceTree, getDeviceTYpe, editDevice, addDevice, delDevice} from '../../api/api'
export default {
  data () {
    return {
      showaddbtn: true,
      showtype: false,
      type: '0',
      id: '',
      showdels: true,
      showedit: true,
      showMasterControl: true,
      showAdd: false,
      showEdit: false,
      showDel: false,
      deviceList: [],
      showbtn: '',
      modal1: false,
      showTree: false,
      systemId: '',
      textTip: '',
      systemList: [],
      formModel: {},
      editformModel: {
        iasId: '',
        name: '',
        id: ''
      },
      updateFormModel: {
        iasId: '',
        name: '',
        sysId: '',
        ctlerId: 0,
        devType: 0,
        devSeq: 0,
        config: ''
      }
    }
  },
  methods: {
    getDeviceTreeDate () {
      let edata = []
      let para = {
        id: this.id
      }
      getDeviceTree(para).then((res) => {
        if (res.data.code === 0) {
          // res.data.data.iaSystem.symbol = ''
          edata.push(res.data.data.iaSystem)
          if (res.data.data.masterControllers.length > 0) {
            edata[0].children = []
            for (var s of res.data.data.masterControllers) {
              var ss = s.masterCo
              ss.index = 'masterCo'
              ss.name = s.masterCo.deviceRecord.name
              edata[0].children.push(ss)
              ss.children = []
              if (s.farmControllers.length > 0) {
                for (var sss of s.farmControllers) {
                  var ssss = sss.farmCo
                  ssss.index = 'farmCo'
                  ssss.name = sss.farmCo.deviceRecord.name
                  if (sss.devices.length > 0) {
                    ssss.children = []
                    for (let d of sss.devices) {
                      d.name = d.deviceRecord.name
                      ssss.children.push(d)
                    }
                  }
                  ss.children.push(ssss)
                }
              }
              if (s.devices.length > 0) {
                for (var sss1 of s.devices) {
                  sss1.name = sss1.deviceRecord.name
                  ss.children.push(sss1)
                }
              }
            }
          }
          this.drawTree('tree', edata)
          // console.log(edata)
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    typeRadioChange () {
    },
    radioChange () {},
    changeDevice () {},
    changeSystem (change) {
      if (change.value !== '') {
        this.showTree = true
        this.id = change.value
        this.$nextTick(function () {
          this.getDeviceTreeDate()
        })
      } else {
        this.showTree = false
        this.textTip = '请选择需要管理的农业系统！'
        this.showbtn = false
      }
    },
    addSystem () {
      this.$router.push({name: 'system_creat'})
    },
    drawTree (id, edata) {
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        tooltip: {
          trigger: 'item',
          enterable: true,
          triggerOn: 'mousemove',
          formatter: function (params) {
            // console.log(params)
            let datas
            if (params.data.type !== undefined) {
              var type = params.data.type === 1 || params.data.type === "1" ? "智慧农业系统" : params.data.type === 2 || params.data.type === "2" ? "气象站" : "-"
              var mode = params.data.mode === 1 || params.data.mode === "1" ? "自动模式" : params.data.mode === 2 || params.data.mode === "2" ? "手动模式" : "-"
              datas = '名称:&nbsp;&nbsp;' + params.name + '<br>类型:&nbsp;&nbsp;' + type + '<br>负载:&nbsp;&nbsp;' + params.data.maxIrrNum + '<br>模式:&nbsp;&nbsp;' + mode
            } else if (params.data.index === 'masterCo') {
              var keepAlive = params.data.deviceRecord.keepAlive !== null ? params.data.deviceRecord.keepAlive : "-"
              var types = params.data.deviceRecord.lowConsume === false || params.data.deviceRecord.lowConsume === 'false' ? "禁止休眠" : params.data.deviceRecord.lowConsume === true || params.data.deviceRecord.lowConsume === 'true' ? "可休眠" : "-"
              datas = '名称:&nbsp;&nbsp;' + params.name + '<br>阈值时间:&nbsp;&nbsp;' + keepAlive + '<br>是否采用休眠模式:&nbsp;&nbsp;' + types
            } else {
              datas = '名称:&nbsp;&nbsp;' + params.name
            }
            return datas
          }
        },
        legend: {
          top: '2%',
          left: '3%',
          orient: 'vertical',
          data: [],
          borderColor: '#c23531'
        },
        series:[
          {
            type: 'tree',
            data: edata,
            top: '1%',
            left: '10%',
            bottom: '20%',
            right: '25%',
            // 设置节点图片
            // symbol: 'image://http://zzwl0zsxn.oss-cn-hangzhou.aliyuncs.com/headimg/ic_default_head_portrait_man.png',
            // symbol: 'path://M515.413333 1002.837333c-113.322667 0-222.890667-59.392-286.72-155.306666-60.757333-91.136-70.997333-202.752-27.989333-305.834667 44.373333-80.896 93.184-154.965333 140.629333-226.304 36.864-55.296 74.752-112.64 109.909334-173.056 12.970667-21.845333 25.258667-46.08 36.864-69.632 8.192-16.384 16.725333-33.109333 25.258666-48.810667l58.709334 116.394667 0.341333 0.341333c34.816 59.050667 74.410667 115.712 112.64 170.325334 54.954667 78.506667 106.837333 152.917333 142.677333 230.4 44.032 95.573333 35.157333 208.554667-23.552 302.08-61.44 97.621333-167.253333 157.013333-283.306666 159.061333-1.706667 0.341333-3.413333 0.341333-5.461334 0.341333z m43.008-787.114666c-22.869333-31.744-69.973333-32.426667-93.525333-1.024-70.656 94.208-160.085333 229.376-198.997333 303.104-42.666667 84.650667-43.008 191.829333 9.898666 279.893333 51.882667 86.698667 146.090667 146.432 246.101334 148.821333h1.024c95.232-3.754667 194.56-70.997333 241.322666-157.696 50.176-92.501333 36.522667-200.021333-25.258666-303.104l-0.682667-0.682666c-20.138667-29.696-48.128-73.728-77.824-120.490667-26.282667-42.325333-69.290667-103.424-102.058667-148.821333z m0 0',
            symbolSize: 13,
            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
              }
            },
            leaves: {
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              }
            },
            expandAndCollapse: true
          }
        ]
      })
      vm['chart'][id].on ('contextmenu', function (handler) {
        // console.log(handler)
        if (handler.data.type === undefined) {
          // 田间控制器/ 设备-----showtype----------------------------------------------------------------------
          vm.showdels = true
          vm.showedit = true
          vm.editformModel.iasId = vm.id
          vm.editformModel.id = handler.data.deviceRecord.id
          vm.editformModel.name = handler.data.name
          vm.updateFormModel = {
            iasId: vm.id,
            name: '',
            sysId: handler.data.sysId,
            ctlerId: handler.data.ctlerId,
            devType: 0,
            devSeq: 0,
            config: ''
          }
          // 在首部控制器上添加田间控制器/ 设备
          if (handler.data.index === 'masterCo') {
            vm.showtype = true
          } else {
            vm.showtype = false
          }
          if (handler.data.index === 'farmCo' || handler.data.index === 'masterCo') {
            vm.showaddbtn = true
            vm.type = '1'
          } else {
            vm.showaddbtn = false
          }
          vm.showMasterControl = true
        } else {
          // 首部控制器************************************************************************
          vm.showMasterControl = false
          vm.showtype = false
          vm.showaddbtn = true
          vm.showdels = false
          vm.showedit = false
          vm.updateFormModel = {
            iasId: vm.id,
            name: '',
            sysId: '',
            ctlerId: 0,
            devType: 0,
            devSeq: 0,
            config: '',
            keepAlive: 70,
            lowConsume: '0'
          }
        }
        vm.modalShow()
      })
    },
    modalShow () {
      this.showEdit = false
      this.showAdd = false
      this.showDel = false
      this.modal1 = true
    },
    add () {
      this.showAdd = true
      this.showEdit = false
      this.showDel = false
    },
    addOk () {
      // console.log(this.updateFormModel)
      addDevice(this.updateFormModel).then((res) => {
        if (res.data.code === 0) {
          this.$Message.info('设备新增成功！')
          this.getDeviceTreeDate()
          this.modal1 = false
          this.updateFormModel = {}
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    edit () {
      this.showEdit = true
      this.showAdd = false
      this.showDel = false
    },
    editOk () {
      // console.log(this.editformModel)
      this.editformModel.iasId = this.id
      editDevice(this.editformModel).then((res) => {
        if (res.data.code === 0) {
          // res.data.data.iaSystem.symbol = ''
          this.$Message.info('设备修改成功！')
          this.getDeviceTreeDate()
          this.modal1 = false
        } else {
          this.$Message.error(res.data.message)
        }
      })
      this.modal1 = false
    },
    del () {
      this.showDel = true
      this.showAdd = false
      this.showEdit = false
    },
    delOk () {
      let paras = {
        iasId: this.id,
        devId: this.editformModel.id
      }
      // console.log(paras)
      delDevice(paras).then((res) => {
        if (res.data.code === 0) {
          this.$Message.info('设备删除成功！')
          this.getDeviceTreeDate()
          this.modal1 = false
          this.updateFormModel = {}
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    cancel () {},
    ok () {
      this.showEdit = false
      this.showAdd = false
      this.showDel = false
      this.updateFormModel = {
        name: '',
        sysId: '',
        ctlerId: 0,
        devType: 0,
        devSeq: 0,
        config: '',
        iasId: this.id
      }
      this.editformModel = {
        iasId: this.id,
        name: '',
        id: ''
      }
    }
  },
  created () {
    document.oncontextmenu = function(){
      return false
    }
    getSystemListSelect().then((res) => {
      if (res.data.code === 0) {
        this.systemList = res.data.data
        if (this.systemList.length === 0) {
          this.showTree = false
          this.textTip = '暂无农业系统'
          this.showbtn = true
        } else {
          this.textTip = '请选择需要管理的农业系统！'
          this.showbtn = false
        }
      }
    })
    getDeviceTYpe().then((res) => {
      if (res.data.code === 0) {
        var s = {
          id: 0,
          name: '请选择设备类型'
        }
        this.deviceList.push(s)
        for (let s of res.data.data) {
          if (s.id !== 0) {
            this.deviceList.push(s)
          }
          // this.deviceList.push(s)
        }
      } else {
        this.$Message.error(res.data.message)
      }
    })
  }
}
</script>

<style scoped>
  .body {
    text-align: left;
  }
  .body-breadcrumb {
    text-align:left;
    padding: 10px 10px 10px 30px;
    border-bottom: 1px solid #dcdcdc;
  }
  .body-content {
    text-align:left;
    background: #fff;
    padding: 20px;
    margin: 20px;
    border: 1px solid #dcdcdc;
    border-top: 3px solid #2d8cf0;
    border-radius: 7px;
  }
  .main-content {
    padding: 200px;
  }
  .tree-content {
    padding: 0px;
  }
  .search {
    border: 1px solid #dcdcdc;
    padding: 10px;
    margin-bottom: 20px;
  }
  .head-title {
    float:left;
    padding: 10px 12px 10px 0px;
  }
  .content-tip {
    font-size: 26px;
    padding: 50px;
  }
  .sidemenu22 {
    /*background-color: #1c2438;*/
    height:800px;
    width: calc(100vw - 350px);
  }
</style>
