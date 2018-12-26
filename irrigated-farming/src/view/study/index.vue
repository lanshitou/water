
<template>
  <div class="body">
    <Row type="flex" justify="end">
      <div class="body-head">
        <Col span="4">
        <div class="top-tree">
          <Button @click="" style="margin-right: 20px;background: #249AF2; color: #fff;border-radius:8px;margin-top: 13px" >+ 添加分类</Button>
        </div>
        </Col>
        <Col span="20">
        <Button @click="" style="margin-right: 40px;background: #249AF2; color: #fff;border-radius:8px;float: right;margin-top: 13px" >+ 添加文章</Button>
        </Col>
      </div>
    </Row>
    <div class="layout-content-main">
      <Row style="height: 100%">
        <Col span="4" style="height: 100%">
        <div class="menu-tree">
          <Tree :data="baseData" :render="renderContent"></Tree>
        </div>
        </Col>
        <Col span="20">
        <div class="article-content">
          <!--<Table :total="total" :data="listData" :columns="tableColumns"  border></Table>-->
          <Table stripe  :columns="tableColumns" :data="listData" ></Table>
          <div class="pages-block">
            <div class="pages-right">
              <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                    ref="tablePage" show-elevator ></Page>
            </div>
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
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
        listData: [
          {
            servicename: '测试文章'
          }
        ],
        baseData: [
          {
            title: '文章分类',
            expand: true,
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-paper-outline',
                      size: '20'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', {
                    props: {
                      type: 'text',
                      icon: 'ios-paper-outline'
                    },
                    style: {
                      fontSize: '14px'
                    },
                    class: 'csss',
                    on: {
                      click: () => {
                        if (this.fontCss.length > 0) {
                          this.fontCss[this.fontCss.length - 1].style.backgroundColor = ''
                        }
                        this.btnClick(data)
                        document.querySelectorAll('.csss')[data.nodeKey].style.background = 'red'
                        this.fontCss.push(document.querySelectorAll('.csss')[data.nodeKey])
                      }
                    }
                  }, data.title)
                ]),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'text',
                      icon: 'ios-add'
                    },
                    style: {
                      color: '#1166E5',
                      fontSize: '24px',
                      marginTop: '-15px'
                    },
                    on: {
                      click: () => { this.append(data) }
                    }
                  }),
                  // h('Button', {
                  //   props: Object.assign({}, this.buttonProps, {
                  //     icon: 'ios-add'
                  //     // type: 'primary'
                  //   }),
                  //   style: {
                  //     width: '64px'
                  //   },
                  //   on: {
                  //     click: () => { this.append(data) }
                  //   }
                  // })
                ])
              ]);
            },
            children: [
              {
                title: '测试 1-1',
                expand: true,
                children: [
                  {
                    title: '测试 1-1-1',
                    expand: true
                  },
                  {
                    title: 'leaf 1-1-2',
                    expand: true
                  }
                ]
              },
              {
                title: 'child 1-2',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-2-1',
                    expand: true
                  },
                  {
                    title: 'leaf 1-2-1',
                    expand: true
                  }
                ]
              }
            ]
          }
        ],
        buttonProps: {
          // type: 'primary',
          size: 'small'
        },
        tableColumns: [
          {
            title: '序号',
            align: 'center',
            key: 'servicename'
          },
          {
            title: '是否推送',
            align: 'center',
            key: 'servicename'
          },
          {
            title: '文章标题',
            align: 'center',
            key: 'servicename'
          },
          {
            title: '创建时间',
            align: 'center',
            key: 'servicename'
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
                    icon: 'ios-paper-plane-outline'
                  },
                  style: {
                    color: '#1166E5',
                    fontSize: '24px'
                  },
                  on: {
                    click: () => {
                      // this.check(params.row.id)
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
                      // this.edit(params.row.id)
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
                      // this.removeSystem(params.row)
                    }
                  }
                })
              ])
            }
          }
        ],
        fontCss: [],
      }
    },
    created: function () {
    },
    methods: {
      btnClick (item) {
        console.log(item)
      },
      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline',
                size: '18'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', {
              props: {
                type: 'text',
                icon: 'ios-paper-outline'
              },
              style: {
                display: 'inline-block',
                fontSize: '14px',
                marginTop: '-10px'
              },
              class: 'csss',
              on: {
                click: () => {
                  if (this.fontCss.length > 0) {
                    this.fontCss[this.fontCss.length - 1].style.backgroundColor = ''
                  }
                  this.btnClick(data)
                  document.querySelectorAll('.csss')[data.nodeKey].style.background = 'red'
                  this.fontCss.push(document.querySelectorAll('.csss')[data.nodeKey])
                }
              }
            }, data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('Button', {
              props: {
                type: 'text',
                icon: 'ios-add'
              },
              style: {
                padding: 0,
                color: '#1166E5',
                fontSize: '22px',
                marginTop: '-10px'
              },
              on: {
                click: () => { this.append(data) }
              }
            }),
            // h('Button', {
            //   props: Object.assign({}, this.buttonProps,
            //     {
            //       icon: 'ios-add'
            //     }
            //   ),
            //   style: {
            //     marginRight: '8px'
            //   },
            //   on: {
            //     click: () => { this.append(data) }
            //   }
            // }),
            h('Button', {
              props: {
                type: 'text',
                icon: 'ios-remove'
              },
              style: {
                padding: 0,
                color: '#F47D7D',
                fontSize: '22px',
                marginTop: '-8px'
              },
              on: {
                click: () => { this.remove(root, node, data) }
              }
            }),
            // h('Button', {
            //   props: Object.assign({}, this.buttonProps, {
            //     icon: 'ios-remove'
            //   }),
            //   on: {
            //     click: () => { this.remove(root, node, data) }
            //   }
            // })
          ])
        ])
      },
      append (data) {
        const children = data.children || [];
        children.push({
          title: 'appended node',
          expand: true
        });
        this.$set(data, 'children', children);
      },
      remove (root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
      },
      // 选择table
      select (select) {
      },
      // 点击分页页码
      change (page) {
        this.page = page
        this.paramnter.pageNum = this.page
        // this.getTableDatas(this.paramnter)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.paramnter.pageSize = this.rows
        // this.getTableDatas(this.paramnter)
      }
    }
  }
</script>
<style lang='scss' scoped>
  .body {
    min-width: 1300px;
    height: 100%;
  }
  .body-head {
    height: 60px;
    background: rgba(250,251,253,1);
    border-bottom:1px solid rgba(229, 229, 229, 1);
    width: 100%;
  }
  .article-content {
    margin: 30px 40px 30px 40px;
    box-shadow:0px 1px 8px 0px rgba(102,102,102,0.3);
    border-radius: 4px;
  }
  .menu-tree {
    height: 100%;
    text-align: left;
    background-color: #fff;
    padding: 20px;
    min-width: 250px;
    box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.3);
    border-radius:0px 4px 4px 0px;
  }
  .layout-content-main {
    height: calc(100% - 60px);
  }
  .pages-block {
    margin: 0px;
    overflow: hidden;
    margin-left: 1px;
    margin-bottom: 10px;
    text-align: left;
    padding: 5px;
    background:rgba(240,240,240,1);
  }
  .pages-right {
    vertical-align: middle;
  }
  .top-tree {
    height: 60px;
    background:rgba(250,251,253,1);
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.4);
    border-radius:0px 4px 4px 0px;
  }
</style>

