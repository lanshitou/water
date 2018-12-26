<template>
  <div class="body">
    <div class="body-content">
      <!--<div class="search">-->
        <!--<Row type="flex" justify="start">-->
          <!--<Col span="24">-->
            <!--<div class="head-title">关键字</div>-->
            <!--<Input placeholder="设备类型名称" style="width: 180px;float: left;margin-right: 20px"></Input>-->
            <!--<Button @click="add" style="background-color: #48B089;color:#fff;float: left">+ 新增设备类型</Button>-->
          <!--</Col>-->
        <!--</Row>-->
      <!--</div>-->
      <div style="border-top: 1px solid #dcdcdc;">
        <!--<Table :columns="columns" :data="dataTable"></Table>-->
        <Table  size="small" :columns="columns" :data="dataTable" border></Table>
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
import { getDeviceTYpe } from '../../api/api'
export default {
  data () {
    return {
      paramnter: {},
      size: [10, 50, 100, 200],
      total: 0,
      rows: 10,
      page: 1,
      columns: [
        {
          title: '编号',
          key: 'id',
          align: 'center'
        },
        {
          title: '设备类型名称',
          key: 'name',
          align: 'center'
        }
        // {
        //   title: '操作',
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'ghost',
        //           shape: 'circle',
        //           icon: 'compose'
        //         },
        //         style: {
        //           color: '#48B089',
        //           marginLeft: '5px'
        //         },
        //         on: {
        //           click: () => {
        //             this.edit(params.row.userId)
        //           }
        //         }
        //       }),
        //       h('Button', {
        //         props: {
        //           type: 'ghost',
        //           shape: 'circle',
        //           icon: 'trash-a'
        //         },
        //         style: {
        //           color: 'red',
        //           marginLeft: '5px'
        //         },
        //         on: {
        //           click: () => {
        //             this.delete(params.row.userId)
        //           }
        //         }
        //       })
        //     ])
        //   }
        // }
      ],
      dataTable: [],
    }
  },
  methods: {
    delete (id) {
      var th = this
      th.$Modal.confirm({
        title: '',
        content: `确定删除此条记录信息？`,
        onOk: function () {
          // let par = {
          //   user_id: id
          // }
          // delUser(par).then((res) => {
          //   if (res.data.code === 1000) {
          //     th.getTableDatas(th.param)
          //     th.$Message.info('用户删除成功！')
          //   } else {
          //     th.$Message.info(res.data.message)
          //   }
          // })
        },
        onCancel: function () {
          th.$Message.info('取消删除操作！')
        }
      })
    },
    add () {
      this.$router.push({name: 'device_creat'})
    },
    edit () {
      this.$router.push({name: 'device_edit', params: {param: this.paramnter}})
    },
    // 点击分页页码
    change (page) {
      this.page = page
      this.param.pageNum = this.page
      this.getTableDatas(this.param)
    },
    // 改变当前显示的行数
    doPageSizeChange: function (size) {
      this.rows = size
      this.param.pageSize = this.rows
      this.getTableDatas(this.param)
    }
  },
  created () {
    // let par = {
    //   id: 123
    // }
    getDeviceTYpe().then((res) => {
      // console.log(res)
      if (res.data.code === 0) {
        this.dataTable = res.data.data
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
    /*height: 92%;*/
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
