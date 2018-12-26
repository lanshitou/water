<template>
  <div class="body">
    <div class="body-head">
      <Row>
        <div style="font-size:22px;color:rgba(102,102,102,1);margin-left: 20px;float: left ">
          推送通知
        </div>
        <Button @click="backLastPage" style="margin-right: 40px;background: #249AF2; color: #fff;border-radius:8px;width: 100px;float: right" >返回文章列表</Button>
      </Row>
    </div>
    <div class="body-content">
      <div class="body-table">
        <Form :model="noticeForm" :label-width="150" ref="noticeForm" :rules="ruleValidate" style="margin-top: 30px">
          <Row type="flex" justify="start">
            <Col span="24">
            <FormItem label="通知标题" prop="title">
              <Input  v-model="noticeForm.title"  style="width: 400px; float: left"  placeholder="通知标题"></Input>
              <br>
            </FormItem>
            <FormItem label="通知内容" prop="summary">
              <Input  v-model="noticeForm.summary"  style="width: 400px; float: left"  placeholder="通知内容"></Input>
              <br>
            </FormItem>
            <FormItem label="失效时间" prop="endTime">
              <DatePicker type="date" placeholder="失效时间" style="width: 200px; float: left" :options="options3" :editable="false" @on-change="TimeChangeNew" :transfer="true"></DatePicker>
            </FormItem>
            <FormItem label="通知方式" prop="type">
              <RadioGroup v-model="noticeForm.type" style="float: left">
                <Radio label="1">按照区域用户推送</Radio>
                <Radio label="0">按照指定条件用户推送</Radio>
              </RadioGroup>
            </FormItem>
            </Col>
          </Row>
          <div v-show="noticeForm.type === '1'">
            <FormItem>
              <regions @region="regionAllChangeSend"></regions>
            </FormItem>
          </div>
          <div v-show="noticeForm.type === '0'">
            <FormItem label="已选用户" >
              <Table stripe  :columns="columnsSend" :data="dataTableSend" height="300"></Table>
            </FormItem>
            <FormItem label="选择用户" >
              <Row type="flex" justify="start" style="margin-bottom: 15px">
                <div class="head-title">筛选</div>
                <div style="width: 620px">
                  <regions @region="regionAllChange" :regionIdAllData="regionIdAllData" ></regions>
                </div>
                <div style="width: 400px;margin-top: 15px">
                  <div class="head-title">关键字</div>
                  <Input placeholder="姓名/手机号码/身份证号" style="width: 200px;float: left;margin-right: 20px" v-model="paramnter.like" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"></Input>
                </div>
              </Row>
              <Table stripe  :columns="columns" :data="dataTable" @on-current-change="select" ref="currentRowTable" highlight-row></Table>
              <div class="pages-block">
                <div class="pages-right">
                  <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                        ref="tablePage" show-elevator :transfer="true"></Page>
                </div>
              </div>
            </FormItem>
          </div>
          <FormItem>
            <Button  class="btn-list" @click="submite">提交</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserList, creatNotification } from '../../api/api'
  import regions from '../../components/regionAll'
  export default {
    components: {
      regions
    },
    data () {
      return {
        columnsSend: [
          // {
          //   title: '序号',
          //   key: 'id',
          //   width: 100,
          //   align: 'center'
          // },
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
          // {
          //   title: '身份证号',
          //   key: 'idCard',
          //   align: 'center'
          // },
          {
            title: '地址',
            key: 'address',
            align: 'center'
          },
          // {
          //   title: '注册时间',
          //   key: 'createTime',
          //   width: 160,
          //   align: 'center'
          // },
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
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    color: '#F47D7D',
                    fontSize: '24px'
                  },
                  on: {
                    click: () => {
                      this.dataTableSend.splice(params.index, 1)
                    }
                  }
                })
              ])
            }
          }
        ],
        dataTableSend: [],
        options3: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        noticeForm: {
          articleId: '',
          title: '',
          summary: '',
          type: '1',
          userIds: '',
          addressId: '',
          endTime: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '通知标题不能为空', trigger: 'blur'}
          ],
          summary: [
            {required: true, message: '通知内容不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '通知类型不能为空', trigger: 'blur'}
          ]
        },
        regionIdAllData: [],
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
          }
        ],
        dataTable: [],
      }
    },
    methods: {
      submite () {
        let userIds = []
        for (var i = 0; i < this.dataTableSend.length; i++) {
          userIds[i] = this.dataTableSend[i].id
        }
        this.noticeForm.userIds = userIds.join(',')
          this.$refs['noticeForm'].validate((valid) => {
          if (valid) {
            if (this.formValidate(this.noticeForm)) {
              creatNotification(this.noticeForm).then((res) => {
                if (res.data.code === 0) {
                  this.$Message.success('通知新增成功！')
                  this.$router.push({name: 'notification'})
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }
          } else {
            this.$Message.error('通知信息验证失败！')
          }
        })
      },
      formValidate (formDate) {
        if (formDate.title !== '' && formDate.title.trim().length > 0) {
          if (formDate.title.trim().length < 28) {
            if (formDate.summary.trim().length > 0) {
              if (formDate.endTime !== '') {
                if (formDate.type === '0') {
                  if (formDate.userIds !== '') {
                    formDate.addressId = ''
                    return true
                  } else {
                    this.$Message.error('通知指定用户不能为空')
                    return false
                  }
                } else {
                  if (formDate.addressId !== '') {
                    formDate.userIds = ''
                    return true
                  } else {
                    this.$Message.error('通知区域不能为空')
                    return false
                  }
                }
              } else {
                this.$Message.error('通知失效时间不能为空')
                return false
              }
            } else {
              this.$Message.error('通知内容不能为空')
              return false
            }
          } else {
            this.$Message.error('通知标题不能超过28个字')
            return false
          }
        } else {
          this.$Message.error('通知标题不能为空')
          return false
        }
      },
      select (currentRow, oldCurrentRow) {
        var flag = true
        var tepm = currentRow
        for (var j = 0; j < this.dataTableSend.length; j++) {
          if (tepm.id === this.dataTableSend[j].id) {
            flag = false
            break
          }
        }
        if (flag) {
          this.dataTableSend.push(tepm)
        }
      },
      formatDate (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var newDate = y + '-' + m + '-' + d + ' 23:59:59'
        return newDate
      },
      TimeChangeNew (change) {
        if (change !== '' && change !== undefined) {
          var dd = new Date(change)
          this.noticeForm.endTime = this.formatDate(dd)
        } else {
          this.noticeForm.endTime = ''
        }
      },
      backLastPage () {
        this.$router.push({name: 'article'})
      },
      regionAllChangeSend (data) {
        if (data.length > 0) {
          if (data[data.length - 1].value === undefined) {
            this.noticeForm.addressId = data[data.length -1]
          } else {
            this.noticeForm.addressId = data[data.length -1].value
          }
        } else {
          this.noticeForm.addressId = ''
        }
      },
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
    created () {
      this.noticeForm.articleId = this.$route.params.id
      this.getTableDatas(this.paramnter)
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
    padding: 0px 13px 0px 0px;
    color: rgba(233,111,92,1);
    font-size:16px;
  }
  .body-content {
    padding: 30px;
    /*background:rgba(255,255,255,1);*/
  }
  .body-table {
    padding: 20px;
    background:rgba(255,255,255,1);
    /*box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.2);*/
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
