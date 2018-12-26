<template>
  <div class="body-content">
    <div style="height: 60px;background: rgba(250,251,253,1);border-bottom:1px solid rgba(229, 229, 229, 1);">
      <Row>
        <div style="font-size:22px;color:rgba(102,102,102,1);margin-top: 13px;margin-left: 30px;float: left ">
          通知详情
        </div>
        <Button @click="backLastPage" style="margin-right: 40px;background: #249AF2; color: #fff;border-radius:8px;margin-top: 13px; width: 100px;float: right" >返回</Button>
      </Row>
    </div>
    <Row :gutter="32" style="padding: 30px;padding-bottom: 20px;">
      <Col span="12" >
      <div class="title">
        文章详情
      </div>
      </Col>
      <Col span="12">
      <div class="title">
        通知详情
      </div>
      </Col>
    </Row>
    <Row :gutter="32">
      <div class="body">
        <Col span="12" >
        <div class="content">
          <Form :model="articleForm" :label-width="150" ref="articleForm"  style="padding-top: 20px">
            <Row type="flex" justify="center">
              <Col span="24">
              <FormItem label="标题" prop="title">
                <div style="float: left">
                  {{articleForm.title}}
                </div>
              </FormItem>
              <FormItem label="来源" prop="origin">
                <div style="float: left">
                  {{articleForm.origin}}
                </div>
              </FormItem>
              <FormItem
                v-for="(item, index) in articleForm.tagList"
                v-if="item.status"
                :key="index"
                :label="'标签 ' + item.index"
                :prop="'tagList.' + index + '.value'">
                <Row>
                  <div style="float: left">
                    {{item.value}}
                  </div>
                  <!--<Input type="text" v-model="item.value" placeholder="标签" style="width: 400px;float: left"></Input>-->
                </Row>
              </FormItem>
              <FormItem label="主图" prop="originImg" v-if="articleForm.originImg !== ''">
                <Row>
                  <a :href=articleForm.originImg target="_blank">
                    <img :src=articleForm.originImg style="width: 100px;height: 100px;float: left" alt="上传照片">
                  </a>
                </Row>
              </FormItem>
              <FormItem label="缩略图" >
                <Row v-if="articleForm.img !== ''">
                  <a :href=articleForm.img target="_blank">
                    <img :src=articleForm.img style="width: 100px;height: 100px;float: left" alt="">
                  </a>
                </Row>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="24">
              <FormItem label="内容" prop="htmlContent">
                <vue-editor style="margin-right: 50px" v-model="articleForm.htmlContent" useCustomImageHandler></vue-editor>
                <br>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        </Col>
        <Col span="12">
        <div class="content">
          <Form :model="noticeForm" :label-width="150" ref="noticeForm"  style="padding-top: 20px">
            <Row type="flex" justify="center">
              <Col span="24">
              <FormItem label="标题" prop="title">
                <div style="float: left">
                  {{noticeForm.title}}
                </div>
              </FormItem>
              <FormItem label="内容" prop="summary">
                <div style="float: left">
                  {{noticeForm.summary}}
                </div>
              </FormItem>
              <FormItem label="推送时间" prop="startTime">
                <div style="float: left">
                  {{noticeForm.startTime}}
                </div>
              </FormItem>
              <FormItem label="失效时间" prop="endTime">
                <div style="float: left">
                  {{noticeForm.endTime}}
                </div>
              </FormItem>
              <FormItem label="推送方式" prop="summary">
                <div style="float: left">
                  {{noticeForm.type === 0 || noticeForm.type === '0' ? '指定用户': '区域用户'}}
                </div>
              </FormItem>

              <Table stripe  :columns="columns" :data="dataTable" ></Table>
              <div class="pages-block">
                <div class="pages-right">
                  <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                        ref="tablePage" show-elevator :transfer="true"></Page>
                </div>
              </div>
              </Col>
            </Row>
          </Form>
        </div>
        </Col>
      </div>
    </Row>
  </div>
</template>

<script>
  import { getArticleDetail, getNotificationDetail, getNotificationUsersDetail } from '../../api/api'
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      VueEditor
    },
    data () {
      return {
        paramnter: {
          id: '',
          pageNum: 1,
          pageSize: 10
        },
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        columns: [
          {
            title: '用户名',
            key: 'username',
            align: 'center'
          },
          {
            title: '身份证号码',
            key: 'idCard',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'mobile',
            align: 'center'
          },
          {
            title: '地址',
            key: 'address',
            align: 'center'
          }
        ],
        dataTable: [
          {
            id: 1
          }
        ],
        noticeForm: {
          title: '',
          summary: '',
          endTime: '',
          startTime: '',
          type: ''
        },
        articleForm: {
          id: '',
          title: '',
          img: '',
          originImg: '',
          htmlContent: '',
          origin: '',
          catId: '',
          tag: '',
          tagList: [
            {
              value: '',
              index: 1,
              status: 1
            }
          ]
        }
      }
    },
    created: function () {
      // this.id = this.$route.params.id
      let param = {
        id: this.$route.params.articleId
      }
      getArticleDetail(param).then((res) => {
        if (res.data.code === 0) {
          let ress = res.data.data
          this.articleForm = {
            id: ress.id,
            title: ress.title,
            img: ress.img,
            originImg: ress.originImg,
            htmlContent: '',
            origin: ress.origin,
            catId: ress.catId,
            tag: ress.tag,
            tagList: []
          }
          if (ress.tag !== null) {
            let tags = ress.tag.split(',')
            for (let i = 0; i < tags.length; i++) {
              let item = {
                value: tags[i],
                index: i + 1,
                status: 1
              }
              this.articleForm.tagList.push(item)
            }
          }
          this.articleForm.htmlContent = ress.htmlContent
          this.getNotices()
        }
      })
    },
    methods: {
      getNotices () {
        let params = {
          id: this.$route.params.id
        }
        getNotificationDetail(params).then((resp) => {
          if (resp.data.code === 0) {
            let response = resp.data.data
            this.noticeForm = {
              id: response.id,
              title: response.title,
              summary: response.summary,
              startTime: response.startTime,
              endTime: response.endTime,
              type: response.type
            }
            this.getUser()
          }
        })
      },
      getUser () {
        this.paramnter.id = this.$route.params.id
        // console.log(this.paramnter)
        getNotificationUsersDetail(this.paramnter).then((res) => {
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
        this.getUser(this.paramnter)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.paramnter.pageSize = this.rows
        this.getUser(this.paramnter)
      },
      backLastPage () {
        this.$router.push({name: 'notification'})
      }
    }
  }
</script>

<style scoped>
  .body-content {
    overflow-x: hidden;
  }
  .body {
    padding: 30px;
    height: 100%;
    display: flex;
    padding-top: 0px;
  }
  .title {
    font-size: 19px;
    font-weight:400;
    color:rgba(51,51,51,1);
    float: left;
    /*margin-bottom: 20px;*/
  }
  .content {
    height: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.3);
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
</style>
