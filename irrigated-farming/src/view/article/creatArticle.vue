<template>
    <div class="body">
      <div style="
    height: 60px;
    background: rgba(250,251,253,1);
    border-bottom:1px solid rgba(229, 229, 229, 1);">
        <Row>
          <div style="font-size:22px;color:rgba(102,102,102,1);margin-top: 13px;margin-left: 30px;float: left ">
            添加文章
          </div>
          <Button @click="backLastPage" style="margin-right: 40px;background: #249AF2; color: #fff;border-radius:8px;margin-top: 13px; width: 100px;float: right" >返回</Button>
        </Row>
      </div>
      <div class="body-content">
        <Form :model="articleForm" :label-width="150" ref="articleForm" :rules="ruleValidate" style="margin-top: 30px">
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="标题" prop="title">
              <Input  v-model="articleForm.title"  style="width: 400px; float: left"  @on-change="nameVal(articleForm.title)" placeholder="文章标题"></Input>
              <!--<span class="notice" v-if="nameNotice">分类名称不能超过20位</span>-->
              <!--<span class="notice" v-if="wordNotice">分类名称不能为空</span>-->
              <br>
            </FormItem>
            <FormItem label="来源" prop="origin">
              <Input  v-model="articleForm.origin"  style="width: 400px; float: left" placeholder="来源"></Input>
              <br>
            </FormItem>
            <FormItem
              v-for="(item, index) in articleForm.tagList"
              v-if="item.status"
              :key="index"
              :label="'标签 ' + item.index"
              :prop="'tagList.' + index + '.value'"
              :rules="{required: true, message: '标签 ' + item.index +' 不能为空', trigger: 'blur'}">
              <Row>
                <Input type="text" v-model="item.value" placeholder="标签" style="width: 400px;float: left"></Input>
                <Button @click="handleRemove(index)" style="background: #249AF2; color: #fff;border-radius:4px;width: 80px;float: left;margin-left: 20px">删除</Button>
              </Row>
            </FormItem>
            <FormItem>
                <Button long @click="handleAdd" icon="md-add" style="background: #249AF2; color: #fff;border-radius:4px;width: 200px;float: left;">新增标签</Button>
            </FormItem>
            <FormItem label="主图" prop="originImg">
              <div class="file">
                <input type="file" @change="handleUpload"  style="height: 30px;float: left">上传主图
              </div><br>
            </FormItem>
            <FormItem v-if="articleForm.originImg !== ''">
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
            <FormItem label="内容" prop="htmlContent">
              <vue-editor style="margin-right: 50px" v-model="articleForm.htmlContent" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
              <br>
            </FormItem>
            <FormItem>
              <Button  class="btn-list" @click="okAdd">保存</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
</template>

<script>
  import { uploadImage, uploadImages, creatArticle } from '../../api/api'
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      VueEditor
    },
    data () {
      return {
        index: 1,
        showList: [],
        articleForm: {
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
          ],
        },
        ruleValidate: {
          title: [
            {required: true, message: '文章标题不能为空', trigger: 'blur'},
            { type: 'string', max: 28, message: '文章标题不能超过50个字', trigger: 'blur' }
          ],
          originImg: [
            {required: true, message: '文章主图不能为空', trigger: 'blur'}
          ],
          htmlContent: [
            {required: true, message: '文章内容不能为空', trigger: 'blur'}
          ],
          origin: [
            {required: true, message: '文章来源不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created: function () {
      this.articleForm.catId = this.$route.params.articleId
    },
    methods: {
      backLastPage () {
        this.$router.push({name: 'article', params: this.$route.params})
      },
      formValidate (formDate) {
        if (formDate.title !== '' && formDate.title.length > 0) {
          if (formDate.title.trim().length < 28) {
            if (formDate.origin.trim().length > 0) {
              if (formDate.htmlContent.length > 0) {
                if (formDate.tag !== '') {
                  return true
                } else {
                  this.$Message.error('文章标签不能为空')
                  return false
                }
              } else {
                this.$Message.error('文章内容不能为空')
                return false
              }
            } else {
              this.$Message.error('文章来源不能为空')
              return false
            }
          } else {
            this.$Message.error('文章标题不能超过28个字')
            return false
          }
        } else {
          this.$Message.error('文章标题不能为空')
          return false
        }
      },
      ok () {},
      okAdd () {
        let tags = []
        for (let i of this.articleForm.tagList) {
          if (i.status = 1) {
            tags.push(i.value)
          }
        }
        this.articleForm.tag = tags.join(',')
        this.$refs['articleForm'].validate((valid) => {
          if (valid) {
            if (this.formValidate(this.articleForm)) {
              creatArticle(this.articleForm).then((res) => {
                if (res.data.code === 0) {
                  this.$Message.success('文章新增成功！')
                  this.$router.push({name: 'article', params: this.$route.params})
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }
          } else {
            this.$Message.error('文章信息验证失败！')
          }
        })
      },
      nameVal () {},
      handleUpload (file) {
        var fileSize = 0
        var fileMaxSize = 1024 * 2  //2M
        fileSize = file.target.files[0].size
        var size = fileSize / 1024
        if (size > fileMaxSize) {
          this.$Message.error('文件大小不能超过2M！')
        } else {
          var formData = new FormData()
          for (var image of file.target.files) {
            formData.append('upload_file', image)
          }
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          uploadImages(formData, config).then((res) => {
            if (res.data.code === 0) {
              // console.log(res)
              this.articleForm.originImg = res.data.data.image.url
              this.articleForm.img = res.data.data.imageTag.url
            }
          })
        }
      },
      handleAdd () {
        this.index++;
        this.articleForm.tagList.push({
          value: '',
          index: this.index,
          status: 1
        });
      },
      handleRemove (index) {
        this.articleForm.tagList[index].status = 0;
      },
      handleImageAdded (file, Editor, cursorLocation) {
        var fileSize = 0
        var fileMaxSize = 1024 * 2  //2M
        fileSize = file.size
        var size = fileSize / 1024
        if (size > fileMaxSize) {
          this.$Message.error('文件大小不能超过2M！')
        } else {
          var formData = new FormData()
          formData.append('upload_file', file)
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          uploadImage(formData, config).then((res) => {
            let url = res.data.data.image.url
            Editor.insertEmbed(cursorLocation, 'image', url)
          })
        }
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
