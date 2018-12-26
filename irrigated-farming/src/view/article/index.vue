
<template>
  <div class="body">
    <Row type="flex" justify="start">
      <div class="body-head">
        <!--<Col span="4">-->
        <!--<div class="top-tree">-->
          <!--<div style="font-size:22px;color:rgba(102,102,102,1);margin-top: 13px;float: left;margin-left: 30px ">-->
            <!--分类管理-->
          <!--</div>-->
          <!--&lt;!&ndash;<Button @click="" style="margin-right: 20px;background: #249AF2; color: #fff;border-radius:8px;margin-top: 13px" >+ 添加分类</Button>&ndash;&gt;-->
          <!--&lt;!&ndash;<Button @click="" style="margin-right: 20px;background: #249AF2; color: #fff;border-radius:8px;margin-top: 13px" >+ 添加分类</Button>&ndash;&gt;-->
        <!--</div>-->
        <!--</Col>-->
        <Col span="24">
        <Button @click="addArticle" style="margin-right: 40px;background: #249AF2; color: #fff;border-radius:8px;float: right;margin-top: 13px" >+ 添加文章</Button>
        </Col>
      </div>
    </Row>
    <Row>
      <div class="layout-content-main">
        <div class="menu-tree">
          <div class="menu-tree-content">
            <Tree :data="baseData" :render="renderContent" ></Tree>
            <!--<Tree :data="baseData1" @on-select-change="selectItem"></Tree>-->
          </div>
        </div>
        <div class="article-content">
          <Table stripe  :columns="tableColumns" :data="listData" ></Table>
          <div class="pages-block">
            <div class="pages-right">
              <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                    ref="tablePage" show-elevator :transfer="true"></Page>
            </div>
          </div>
        </div>
      </div>
    </Row>

    <Modal
      v-model="addCategory"
      title="添加分类"
      ok-text="关闭"
      cancel-text=""
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="ok" width="500">
      <Form :model="categoryForm" :label-width="150" ref="categoryForm" :rules="ruleValidate" style="margin-top: 30px">
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="分类名称" prop="name">
            <Input  v-model="categoryForm.name"  style="width: 200px; float: left"  @on-change="nameVal(categoryForm.name)" placeholder="分类名称"></Input>
            <span class="notice" v-if="nameNotice">分类名称不能超过20位</span>
            <span class="notice" v-if="wordNotice">分类名称不能为空</span>
            <br>
          </FormItem>
          <FormItem>
            <Button  class="btn-list" @click="okAdd">保存</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import {addArticleCategory, getArticleCategoryTree, deleteArticleCategoryTree, getArticles, deleteArticle, creatInformationRecommendation} from '../../api/api'
  export default {
    data () {
      return {
        baseData1: [{
          title: '文章分类',
          id: '',
          expand: true,
          children: []
        }],
        wordNotice: false,
        nameNotice: false,
        categoryForm: {
          dates: {},
          name: '',
          pid: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '分类名称不能为空', trigger: 'blur'}
          ]
        },
        addCategory: false,
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
        listData: [],
        baseData: [
          {
            title: '文章分类',
            id: 0,
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
                      fontSize: '14px',
                    },
                    class: 'cssClick',
                    on: {
                      click: event => {
                        // console.log(event)
                        if (this.fontCss.length > 0) {
                          // console.log(this.fontCss)
                          this.fontCss[this.fontCss.length - 1].target.style.color = ''
                          this.fontCss[this.fontCss.length - 1].target.style.backgroundColor = ''
                        }
                        this.btnClick(data)
                        event.target.style.backgroundColor = '#289AF2'
                        event.target.style.color = '#fff'
                        this.fontCss.push(event)
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
                      click: () => {
                        this.append(data)
                      }
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
            children: []
          }
        ],
        buttonProps: {
          // type: 'primary',
          size: 'small'
        },
        fontCss: [],
        tableColumns: [
          // {
          //   title: '序号',
          //   align: 'center',
          //   key: 'id'
          // },
          {
            title: '文章标题',
            align: 'center',
            key: 'title'
          },
          {
            title: '来源',
            align: 'center',
            key: 'origin'
          },
          {
            title: '标签',
            align: 'center',
            key: 'tag'
          },
          {
            title: '阅读数',
            align: 'center',
            key: 'watchCount'
          },
          {
            title: '推送方式',
            align: 'center',
            width: 160,
            key: 'type',
            render: (h, params) => {
              let ress = params.row
              let type
              let addI = ''
              let addR = ''
              if (ress.type === '1' || ress.type === 1) {
                type = '农业资讯'
                addI = 'none'
                addR = 'inline'
              } else if (ress.type === '0' || ress.type === 0) {
                type = '每日推荐'
                addR = 'none'
                addI = 'inline'
              } else if (ress.type === '2' || ress.type === 2){
                type = `每日推荐 农业资讯`
                addI = 'none'
                addR = 'none'
              } else if (ress.type === '') {
                type = ''
                addI = 'inline'
                addR = 'inline'
              }
              // return h('div', type)
              return h('div', [
                h('span', type),
                h('Button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    padding: '0px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    color: '#48B089',
                    display: addR
                  },
                  on: {
                    click: () => {
                      this.creatRecommendation(params.row.id)
                    }
                  }
                }, '添加推荐'),
                h('Button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px',
                    padding: '0px',
                    color: '#48B089',
                    display: addI
                  },
                  on: {
                    click: () => {
                      this.creatInformation(params.row.id)
                    }
                  }
                }, '添加资讯')
              ])
            }
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
                    icon: 'ios-paper-plane-outline'
                  },
                  style: {
                    color: '#1166E5',
                    fontSize: '24px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'check_article', params: {id: params.row.id, articleId: this.articleId, page: this.page, rows: this.rows, fontCss: this.fontCss}})
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
                      this.$router.push({name: 'edit_article', params: {id: params.row.id, articleId: this.articleId, page: this.page, rows: this.rows, fontCss: this.fontCss}})
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
                      this.removeArticle(params.row)
                    }
                  }
                })
              ])
            }
          }
        ],
        articleId: 0
      }
    },
    created: function () {
      getArticleCategoryTree().then((res) => {
        if (res.data.code === 0) {
          this.baseData[0].children = res.data.data
          this.getArticleList(this.articleId)
          document.getElementsByClassName('cssClick')[0].style.backgroundColor = '#289AF2'
          document.getElementsByClassName('cssClick')[0].style.color = '#fff'
          let event = {
            target: document.getElementsByClassName('cssClick')[0]
          }
          this.fontCss.push(event)
        }
      })
    },
    mounted () {
      // this.$nextTick(function () {
      // })
    },
    methods: {
      creatRecommendation (id) {
        let par = {
          articleId: id,
          type: 0
        }
        creatInformationRecommendation(par).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success('文章添加到每日推荐成功！')
            this.getArticleList(this.articleId)
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      creatInformation (id) {
        let par = {
          articleId: id,
          type: 1
        }
        creatInformationRecommendation(par).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success('文章添加到农业资讯成功！')
            this.getArticleList(this.articleId)
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      addArticle () {
        if (this.articleId !== 0) {
          this.$router.push({name: 'creat_article', params: {articleId: this.articleId, page: this.page, rows: this.rows, fontCss: this.fontCss}})
        } else {
          this.$Message.error('请选择文章具体的分类！')
        }
      },
      removeArticle (index) {
        var th = this
        th.$Modal.confirm({
          title: `<div style="font-size: 18px">删除文章信息</div>`,
          content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: left">确定删除` + index.title + `的信息？</div>`,
          onOk: function () {
            let par = {
              ids: index.id
            }
            deleteArticle(par).then((res) => {
              if (res.data.code === 0) {
                if (th.page > 1 && th.listData.length === 1) {
                  th.page = th.page - 1
                }
                th.$Message.success('文章删除成功！')
                th.getArticleList(th.articleId)
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
      getCategoryTree () {
        getArticleCategoryTree().then((res) => {
          if (res.data.code === 0) {
            this.baseData[0].children = res.data.data
            this.baseData1[0].children = res.data.data
          }
        })
      },
      okAdd () {
        if (this.formValidate(this.categoryForm)) {
          addArticleCategory(this.categoryForm).then((res) => {
            if (res.data.code === 0) {
              this.$Message.success('分类添加成功！')
              this.getCategoryTree()
              this.addCategory = false
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      formValidate (formDate) {
        if (formDate.name !== '' || formDate.name.length > 0) {
          if (formDate.name.length > 20) {
            this.nameNotice = true
            return false
          } else {
            this.nameNotice = false
            return true
          }
        } else {
          return false
        }
      },
      nameVal (string) {
        string = string.trim()
        if (string !== '' && string !== undefined) {
          if (string.trim().length > 20) {
            this.nameNotice = true
          } else {
            this.nameNotice = false
          }
          this.wordNotice = false
        } else {
          this.nameNotice = false
          this.wordNotice = true
        }
      },
      ok () {},
      btnClick (item) {
        // if (item.expand === true) {
        //   item.expand = false
        // } else {
        //   item.expand = true
        // }
        // item.expand = true
        // this.$set(item)
        // console.log(item)
        this.articleId = item.id
        this.getArticleList(item.id)
      },
      getArticleList (id) {
        this.listData = []
        this.total = 0
        let param = {
          id: id,
          pageNum: this.page,
          pageSize: this.rows
        }
        getArticles(param).then((res) => {
          if (res.data.code === 0) {
            this.listData = res.data.data.list
            this.total = res.data.data.total
            this.row = res.data.data.pageSize
            this.page = res.data.data.pageNum
            this.$refs.tablePage.currentPage = this.page
          }
        })
      },
      selectItem () {
        item[0].expand = true
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
              class: 'cssClick',
              on: {
                click: event => {
                  if (this.fontCss.length > 0) {
                    this.fontCss[this.fontCss.length - 1].target.style.color = ''
                    this.fontCss[this.fontCss.length - 1].target.style.backgroundColor = ''
                  }
                  this.btnClick(data)
                  event.target.style.backgroundColor = '#289AF2'
                  event.target.style.color = '#fff'
                  this.fontCss.push(event)
                }
              }
            }, data.name)
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
        this.categoryForm = {
          pid: data.id,
          name: ''
        }
        this.addCategory = true
      },
      remove (root, node, data) {
        var th = this
        th.$Modal.confirm({
          title: `<div style="font-size: 18px">删除分类</div>`,
          content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: center">确定删除` + data.name + `的信息？</div>`,
          onOk: function () {
            let par = {
              id: data.id
            }
            deleteArticleCategoryTree(par).then((res) => {
              if (res.data.code === 0) {
                th.$Message.success('分类删除成功！')
                th.getCategoryTree()
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
      // 选择table
      select (select) {
      },
      // 点击分页页码
      change (page) {
        this.page = page
        this.getArticleList(this.articleId)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.getArticleList(this.articleId)
      }
    }
  }
</script>
<style scoped>
  .body {
    height: 100%;
    /*overflow: hidden;*/
  }
  .body-head {
    height: 60px;
    background: rgba(250,251,253,1);
    border-bottom:1px solid rgba(229, 229, 229, 1);
    width: 100%;
  }
  .article-content {
    float: right;
    margin: 30px 30px 0px 30px;
    box-shadow:0px 1px 8px 0px rgba(102,102,102,0.3);
    width: calc(100% - 310px);
    /*height: 100%;*/
  }
  .menu-tree {
    float: left;
    /*height: 100%;*/
    text-align: left;
    background-color: #fff;
    padding: 20px 0px 0px 10px;
    width: 250px;
  }
  .menu-tree-content {
    margin-top: -10px;
    background-color: #fff;
  }
  .layout-content-main {
    height: 100%;
    display: flex;
    /*height: calc(100% - 60px);*/
  }
  .pages-block {
    margin: 0px;
    overflow: hidden;
    margin-left: 1px;
    text-align: left;
    padding: 5px;
    background:rgba(240,240,240,1);
  }
  .pages-right {
    vertical-align: middle;
  }
  .top-tree {
    width: 250px;
    height: 56px;
    background:rgba(250,251,253,1);
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.4);
    border-radius:0px 4px 4px 0px;
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
</style>

