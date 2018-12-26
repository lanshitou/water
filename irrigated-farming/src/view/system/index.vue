<template>
  <div class="body">
    <div class="body-breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem>农业系统管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="body-content">
      <div class="search">
        <Row type="flex" justify="start">
          <Col span="24">
          <div class="head-title">关键字</div>
          <Input placeholder="系统名称" style="width: 180px;float: left;margin-right: 20px" v-model="paramnter.keyword" @on-change="keywordChange" ></Input>
          <Button @click="add" style="background-color: #48B089;color:#fff;float: left">+ 新增农业系统</Button>
          </Col>
        </Row>
      </div>
      <div>
        <Table border size="small" :columns="columns" :data="dataTable" ></Table>
        <!--<div class="pages-block">-->
          <!--<div class="pages-right">-->
            <!--<Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"-->
                  <!--ref="tablePage" show-elevator ></Page>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { getSystemList, deleteSystem } from '../../api/api'
export default {
  data () {
    return {
      paramnter: {
        keyword: '',
      },
      size: [10, 50, 100, 200],
      total: 0,
      rows: 10,
      page: 1,
      columns: [
        {
          title: '系统ID',
          key: 'id',
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
          title: '系统类型',
          key: 'type',
          align: 'center',
          render: (h, params) => {
            let s = params.row.type === 1 || params.row.type === '1' ? '智慧农业系统' : '气象站'
            // console.log(s)
            return h('div', s)
          }
        },
        {
          title: '最大负载量',
          key: 'maxIrrNum',
          align: 'center'
        },
        {
          title: '工作模式',
          key: 'mode',
          align: 'center',
          render: (h, params) => {
            let s1 = params.row.mode === 1 || params.row.mode === '1' ? '手动模式' : '自动模式'
            return h('div', s1)
          }
        },
        {
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'ghost',
                  shape: 'circle',
                  icon: 'compose'
                },
                style: {
                  color: '#48B089',
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.row.id)
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'ghost',
                  shape: 'circle',
                  icon: 'trash-a'
                },
                style: {
                  color: 'red',
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    this.delete(params.row.id)
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
    keywordChange () {
      this.getTableDatas(this.paramnter)
    },
    delete (id) {
      let th = this
      let par = {
        id: id
      }
      deleteSystem(par).then((res) => {
        if (res.data.code === 0) {
          th.getTableDatas(th.paramnter)
          th.$Message.info('系统删除成功！')
        } else {
          th.$Message.info(res.data.message)
        }
      })
    },
    add () {
      this.$router.push({name: 'system_creat'})
    },
    edit (id) {
      this.$router.push({name: 'system_edit', params: {param: this.paramnter, id: id}})
    },
    getTableDatas (param) {
      getSystemList(param).then((res) => {
        // console.log(res)
        if (res.data.code === 0) {
          this.dataTable = res.data.data
        } else {
          this.dataTable = []
          this.$Message.error(res.data.message)
        }
      })
    }
    // // 点击分页页码
    // change (page) {
    //   this.page = page
    //   this.param.pageNum = this.page
    //   this.getTableDatas(this.param)
    // },
    // // 改变当前显示的行数
    // doPageSizeChange: function (size) {
    //   this.rows = size
    //   this.param.pageSize = this.rows
    //   this.getTableDatas(this.param)
    // }
  },
  created () {
    if (this.$route.params.param !== '' && this.$route.params.param !== undefined) {}
    this.getTableDatas(this.paramnter)
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
  .search {
    border: 1px solid #dcdcdc;
    padding: 10px;
    margin-bottom: 20px;
  }
  .head-title {
    float:left;
    padding: 10px 12px 10px 0px;
  }
  .pages-block {
    margin: 0px;
    overflow: hidden;
    margin-top: 10px;
    margin-left: 1px;
    margin-bottom: 10px;
    text-align: center;
  }
  .pages-right {
    vertical-align: middle;
  }
</style>
