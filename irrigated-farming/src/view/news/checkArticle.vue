<template>
    <div class="body">
      <div style="
    height: 60px;
    background: rgba(250,251,253,1);
    border-bottom:1px solid rgba(229, 229, 229, 1);">
        <Row>
          <div style="font-size:22px;color:rgba(102,102,102,1);margin-top: 13px;margin-left: 30px;float: left ">
            资讯推荐详情
          </div>
          <Button @click="backLastPage" style="margin-right: 40px;background: #249AF2; color: #fff;border-radius:8px;margin-top: 13px; width: 100px;float: right" >返回</Button>
        </Row>
      </div>
      <div class="body-content">
        <Form :model="articleForm" :label-width="150" ref="articleForm" style="margin-top: 30px">
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
              <vue-editor style="margin-right: 50px" v-model="articleForm.htmlContent" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
              <br>
            </FormItem>
            <FormItem >
              <Button @click="backLastPage" style="margin-right: 40px;background: #249AF2; color: #fff;border-radius:8px;margin-top: 13px; width: 100px;" >返回</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import { getArticleDetail, uploadImage } from '../../api/api'
  export default {
    components: {
      VueEditor
    },
    data () {
      return {
        information: false,
        recommend: false,
        index: 1,
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
        id: this.$route.params.id
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
          if (ress.type === '1' || ress.type === 1) {
            this.recommend = false
            this.information = true
          } else if (ress.type === '0' || ress.type === 0) {
            this.recommend = true
            this.information = false
          } else if (ress.type === '2' || ress.type === 2){
            this.recommend = true
            this.information = true
          } else if (ress.type === '') {
            this.recommend = false
            this.information = false
          }
          let tags = ress.tag.split(',')
          for (let i = 0; i < tags.length; i++) {
            let item = {
                value: tags[i],
                index: i + 1,
                status: 1
              }
            this.articleForm.tagList.push(item)
          }
          this.articleForm.htmlContent = ress.htmlContent
          // console.log(this.articleForm)
        }
      })
    },
    methods: {
      backLastPage () {
        this.$router.push({name: 'news', params: this.$route.params})
      },
      handleImageAdded (file, Editor, cursorLocation) {
        var formData = new FormData()
        formData.append('upload_file', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        uploadImage(formData, config).then((res) => {
          let url = res.data.data.image.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
        })
      }
    }
  }
</script>

<style scoped>
  .body {
    height: 100%;
    min-width: 750px;
  }
  .body-content {
    background:rgba(255,255,255,1);
    border-radius:4px;
    margin: 30px 30px 0px 30px;
    padding: 20px;
  }
  .btn-list {
    /*width: 100px;*/
    background: #E96F5C;
    color: #fff;
    border-radius:6px 8px 8px 8px;
    margin-right: 20px;
    letter-spacing: 2px;
    float: left;
  }
  .btn-list:hover {
    background: #E96F5C;
    color: #fff;
  }
</style>
