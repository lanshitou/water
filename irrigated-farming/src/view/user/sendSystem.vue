<template>
<div class="body">
  <div class="body-head">
    <Row type="flex" justify="start">
      <div class="head-title">筛选</div>
      <div style="width: 620px">
        <regions @region="regionAllChange"></regions>
      </div>
      <div  style="width: 400px;">
        <div class="head-title" >关键字</div>
        <Input placeholder="系统名称" style="width: 200px;float: left;" v-model="paramnter.like" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"></Input>
      </div>
      <div style="width: 120px;">
        <Button @click="add" style="background: #249AF2; color: #fff;border-radius:8px;width: 100px;margin-right: 20px" >确认添加</Button>
      </div>
      <Button @click="back" style="background: #249AF2; color: #fff;border-radius:8px;width: 100px;position: fixed; right: 40px;margin-left: 20px; z-index: 99" >返回</Button>
    </Row>
  </div>
  <div class="body-content">
    <div class="body-table">
      <Row type="flex"  justify="space-around" class="code-row-bg" style="text-align: left">
        <Col span="11">
        <h2>可分配系统</h2>
        <!--<Input v-model="parameter.productSn" icon="close-circled" @on-click="backKeyword"  @on-change="searchKeyword()" placeholder="输入货号查询" style="margin-bottom: 10px;width: 300px"></Input>-->
        <!--<Button  @click="searchKeyword" style="background-color: #48B089;color:#fff;width: 100px;margin-bottom: 9px;">查询</Button>-->
        </Col>
        <Col span="2">
        </Col>
        <Col span="10">
        <h2>分配系统</h2>
        </Col>
      </Row>
      <Row type="flex"  justify="space-around" class="code-row-bg" style="margin-top: 10px;padding-left: 1px;padding-right: 1px">
        <Col span="11">
        <Table stripe  :columns="columns" :data="dataTable"  ref="selection" @on-select="select" @on-select-cancel="remove" @on-select-all="selectAll" @on-select-all-cancel="cancleAll" height="500"></Table>
        <div class="pages-block">
          <div class="pages-right">
            <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                  ref="tablePage" show-elevator :transfer="true"></Page>
          </div>
        </div>
        </Col>
        <Col span="2" style="text-align: center">
        <Icon type="md-arrow-round-forward" size="75" style="margin-top: 200px;" color="#D2D2D2"></Icon>
        </Col>
        <Col span="10">
        <Table stripe  :columns="columnsSend" :data="dataTableSendGroup"  height="540" style="padding-left: 1px;"></Table>
        </Col>
      </Row>
    </div>
  </div>
</div>
</template>

<script>
  import {getChooceSystem, getRoles, addUserSystem} from '../../api/api'
  import regions from '../../components/regionAll'
  export default {
    components: {
      regions
    },
    data () {
      return {
        selection: [],
        cityList: [
          {
            id: 2,
            name: '1547541'
          }
        ],
        paramnter: {
          id: '',
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
            type: 'selection',
            width: 60,
            align: 'center'
          },
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
            title: '别名',
            key: 'alias',
            align: 'center'
          },
          {
            title: '地址',
            key: 'address',
            align: 'center'
          }
        ],
        columnsSend: [
          {
            title: '序号',
            key: 'id',
            align: 'center'
          },
          {
            title: '系统名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '设置权限',
            // width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Select', {
                    props: {
                      value: params.row.role
                    },
                    style: {
                      width: '160px'
                    },
                    on: {
                      'on-change': (event) => {
                        this.selectChange(event, params.index)
                      }
                    }
                  },
                  this.cityList.map((val) => {
                      return h('Option', {
                        props: {
                          value: val.id,
                          key: val.id
                        }
                      }, val.name)
                    }
                  )
                )
              ])
            }
          }
        ],
        dataTableSendGroup: [],
        dataTable: [],
      }
    },
    methods: {
      selectChange (event, index) {
        this.dataTableSendGroup[index].role = event
      },
      selectAll (selection) {
        this.dataTableSendGroup = selection
      },
      cancleAll (selection) {
        this.dataTableSendGroup = []
      },
      remove (selection, row) {
        for (var j = 0; j < this.dataTableSendGroup.length; j++) {
          if (row.id === this.dataTableSendGroup[j].id) {
            this.dataTableSendGroup.splice(j, 1)
          }
        }
      },
      select (selection, row) {
        var flag = true
        var tepm = row
        for (var j = 0; j < this.dataTableSendGroup.length; j++) {
          if (tepm.id === this.dataTableSendGroup[j].id) {
            flag = false
            break
          }
        }
        if (flag) {
          this.dataTableSendGroup.push(tepm)
        }
      },
      regionAllChange (data) {
        if (data.length > 0) {
          this.paramnter.regionId = data[data.length -1].value
          this.page = 1
          this.rows = 10
          this.paramnter.pageNum = this.page
          this.paramnter.pageSize = this.rows
          this.getTableDatas(this.paramnter)
        } else {
          this.paramnter.regionId = ''
          this.page = 1
          this.rows = 10
          this.dataTable = []
          this.total = 0
        }
      },
      getRoleList () {
        getRoles().then((res) => {
          if (res.data.code === 0) {
            this.cityList = res.data.data
          }
        })
      },
      add () {
        let systems = []
        let roles = []
        if (this.dataTableSendGroup.length > 0) {
          for (let i of this.dataTableSendGroup) {
            systems.push(i.id)
            roles.push(i.role)
          }
          let para = {
            userId: this.$route.params.id,
            iaSystemIds: systems.join(','),
            roleIds: roles.join(',')
          }
          addUserSystem(para).then((res) => {
            if (res.data.code === 0) {
              this.$Message.success('系统分配成功！')
              this.$router.push({name: 'user_detail', params: {id: this.$route.params.id, params: this.$route.params.params, region: this.$route.params.region}})
            } else {
              this.$Message.error(res.data.message)
            }
          })
        } else {
          // this.$Message.success('取消系统分配操作！')
          this.$router.push({name: 'user_detail', params: {id: this.$route.params.id, params: this.$route.params.params, region: this.$route.params.region}})
        }
      },
      back () {
        this.$router.push({name: 'user_detail', params: {id: this.$route.params.id, params: this.$route.params.params, region: this.$route.params.region}})
      },
      backKeyword () {
        this.paramnter.like = ''
        this.getTableDatas(this.paramnter)
      },
      keywordChange () {
        this.paramnter.like = this.paramnter.like.trim()
        this.getTableDatas(this.paramnter)
      },
      getTableDatas (param) {
        getChooceSystem(param).then((res) => {
          // console.log(res)
          if (res.data.code === 0) {
            for (let i of res.data.data.list) {
              i.role = 2
            }
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
    created () {
      this.paramnter.id = this.$route.params.id
      this.getRoleList()
      // this.getTableDatas(this.paramnter)
    }
  }
</script>

<style scoped>
  .body {
    /*min-width: 1000px;*/
  }
  .body-head {
    /*height: 60px;*/
    padding: 13px 0px 10px 20px;
    background: rgba(250,251,253,1);
    border-bottom:1px solid rgba(229, 229, 229, 1);
  }
  .head-title {
    float:left;
    padding: 5px 15px 10px 0px;
    color: rgba(233,111,92,1);
    font-size:16px;
  }
  .body-content {
    padding: 30px 40px 30px 40px;
  }
  .body-table {
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    padding: 30px;
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
