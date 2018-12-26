<template>
  <div class="body">
    <div class="body-head">
      <Row type="flex" justify="start">
        <div class="head-title">筛选</div>
        <div style="width: 400px">
          <Select v-model="paramnter.type" style="width:200px;float: left" @on-change="selectChange" clearable >
            <Option value="0">每日推荐</Option>
            <Option value="1">农业资讯</Option>
          </Select>
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
  </div>
</template>

<script>
  import { getNews, deleteNews } from '../../api/api'
  export default {
    data () {
      return {
        paramnter: {
          type: '',
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
            key: 'rid',
            width: 100,
            align: 'center'
          },
          {
            title: '推送标题',
            key: 'title',
            align: 'center'
          },
          {
            title: '推送方式',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              let ress = params.row
              let type
              if (ress.type === '1' || ress.type === 1) {
                type = '农业资讯'
              } else if (ress.type === '0' || ress.type === 0) {
                type = '每日推荐'
              } else if (ress.type === '2' || ress.type === 2){
                type = `每日推荐 农业资讯`
              } else if (ress.type === '') {
                type = ''
              }
              // return h('div', type)
              return h('div', [
                h('span', type)
              ])
            }
          },
          {
            title: '推送时间',
            key: 'createTime',
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
        dataTable: [],
      }
    },
    methods: {
      selectChange () {
        this.getTableDatas(this.paramnter)
      },
      check (id) {
        this.$router.push({name: 'news_article', params: {id: id, params: this.paramnter}})
      },
      removeSystem (row) {
        var th = this
        th.$Modal.confirm({
          title: `<div style="font-size: 18px">删除资讯推荐</div>`,
          content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: left">确定删除` + row.title + `的信息？</div>`,
          onOk: function () {
            let par = {
              id: row.rid
            }
            deleteNews(par).then((res) => {
              if (res.data.code === 0) {
                if (th.paramnter.pageNum > 1 && th.dataTable.length === 1) {
                  th.paramnter.pageNum = th.paramnter.pageNum - 1
                }
                th.$Message.success('资讯推荐删除成功！')
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
      getTableDatas (param) {
        getNews(param).then((res) => {
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
