<template>
  <div class="body">
    <div class="body-head">
      <Row type="flex" justify="start">
        <div style="width: 400px;">
          <div class="head-title">关键字</div>
          <Input placeholder="推送标题" style="width: 200px;float: left;margin-right: 20px" v-model="paramnter.like" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"></Input>
        </div>
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
      v-model="editModal"
      title="编辑系统"
      ok-text="关闭"
      cancel-text=""
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="ok" width="500">
      <Form :model="editForm" :label-width="100" ref="editForm"  style="margin-top: 30px" :rules="ruleValidate">
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="推送标题" prop="title">
            <Input  v-model="editForm.title"  style="width: 300px; float: left" placeholder="推送标题"></Input>
            <br>
          </FormItem>
          <FormItem label="推送内容" prop="summary">
            <Input  v-model="editForm.summary"  style="width: 300px; float: left"  placeholder="推送内容"></Input>
            <br>
          </FormItem>
          <FormItem label="失效时间" prop="endTime">
            <DatePicker type="date" placeholder="失效时间" v-model="endTime" style="width: 300px; float: left" :options="options3" :editable="false" @on-change="TimeChangeNew" :transfer="true"></DatePicker>
            <br>
          </FormItem>
          <FormItem>
            <Col span="12" push="5">
            <Button  class="btn-list" @click="submit">保存</Button>
            </Col>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>

  </div>
</template>

<script>
  import { getNotices, editNotification } from '../../api/api'
  export default {
    data () {
      return {
        ruleValidate: {
          title: [
            {required: true, message: '通知标题不能为空', trigger: 'blur'}
          ],
          summary: [
            {required: true, message: '通知内容不能为空', trigger: 'blur'}
          ]
        },
        endTime: '',
        options3: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        editForm: {
          id: '',
          title: '',
          summary: '',
          endTime: '',
        },
        editModal: false,
        paramnter: {
          like: '',
          pageNum: 1,
          pageSize: 10
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
            title: '推送标题',
            key: 'title',
            align: 'center'
          },
          {
            title: '推送内容',
            key: 'summary',
            align: 'center'
          },
          {
            title: '推送时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '失效时间',
            key: 'endTime',
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
                      this.check(params.row)
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
                      this.edit(params.row)
                    }
                  }
                }),
                // h('Button', {
                //   props: {
                //     type: 'text',
                //     shape: 'circle',
                //     icon: 'ios-trash-outline'
                //   },
                //   style: {
                //     color: '#F47D7D',
                //     fontSize: '24px'
                //   },
                //   on: {
                //     click: () => {
                //       this.removeSystem(params.row)
                //     }
                //   }
                // })
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
      formValidate (formDate) {
        if (formDate.title !== '' && formDate.title.trim().length > 0) {
          if (formDate.title.trim().length < 28) {
            if (formDate.summary.trim().length > 0) {
              if (formDate.endTime !== '') {
                return true
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
      submit () {
        if (this.formValidate(this.editForm)) {
          editNotification(this.editForm).then((res) => {
            if (res.data.code === 0) {
              this.$Message.success('通知修改成功！')
              this.editModal = false
              this.getTableDatas(this.paramnter)
            } else {
              this.$Message.error(res.data.message)
            }
          })
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
          this.editForm.endTime = this.formatDate(dd)
        } else {
          this.editForm.endTime = ''
        }
      },
      ok () {},
      check (row) {
        this.$router.push({name: 'notification_detail', params: {id: row.id, articleId: row.articleId,params: this.paramnter}})
      },
      edit (row) {
        this.editForm.id = row.id
        this.editForm.title = row.title
        this.editForm.summary = row.summary
        this.editForm.endTime = row.endTime
        this.endTime = row.endTime
        this.editModal = true
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
      getTableDatas (param) {
        getNotices(param).then((res) => {
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
      if (this.$route.params.params !== undefined) {
        this.paramnter = this.$route.params.params
      }
      this.getTableDatas(this.paramnter)
    },
    created () {
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
