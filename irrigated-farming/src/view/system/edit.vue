<template>
  <div class="body">
    <div class="body-breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="system_index">系统管理</BreadcrumbItem>
        <BreadcrumbItem>农业系统修改</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="body-content">
      <div class="main-content">
        <Form :model="formModel" ref="formModel" :label-width="100" :rules="ruleValidate">
          <Row type="flex" justify="center">
            <FormItem label="系统名称" prop="name">
              <Input  v-model="formModel.name" style="width: 200px;"></Input>
            </FormItem>
          </Row>
          <Row type="flex" justify="center">
            <FormItem label="系统别名">
              <Input  v-model="formModel.alias" style="width: 200px;"></Input>
            </FormItem>
          </Row>
          <Row type="flex" justify="center">
            <FormItem label="系统类型">
              <!--<Input  v-model="formModel.mode" style="width: 200px;"></Input>-->
              <RadioGroup v-model="formModel.type" style="float: left" @on-change="radioChange">
                <Radio label="1"> 普通智慧农业系统</Radio>
                <Radio label="2"> 气象站</Radio>
              </RadioGroup>
            </FormItem>
          </Row>
          <Row type="flex" justify="center">
            <FormItem label="工作模式">
              <!--<Input  v-model="formModel.mode" style="width: 200px;"></Input>-->
              <RadioGroup v-model="formModel.mode" style="float: left" @on-change="radioChange">
                <Radio label="2"> &nbsp;&nbsp;自动模式&nbsp;&nbsp;&nbsp;</Radio>
                <Radio label="1"> &nbsp;&nbsp;手动模式&nbsp;&nbsp;&nbsp;</Radio>
              </RadioGroup>
            </FormItem>
          </Row>
          <Row type="flex" justify="center">
            <FormItem label="最大负载" prop="maxIrrNum">
              <Input  v-model="formModel.maxIrrNum" style="width: 200px;"></Input>
            </FormItem>
          </Row>
          <Row type="flex" justify="center">
            <FormItem label="系统排序" prop="sortOrder">
              <Input  v-model="formModel.sortOrder" style="width: 200px;"></Input>
            </FormItem>
          </Row>
          <Row type="flex" justify="center">
            <FormItem label="">
              <Button @click="submit" style="background-color: #48B089;color:#fff;width: 100px;margin-right: 20px">提交</Button>
              <Button @click="back" type="primary" style="width: 100px">返回</Button>
            </FormItem>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSystemById, editSystem } from '../../api/api'
  export default {
    data () {
      return {
        formModel: {
          id: '',
          name: '',
          alias: '',
          mode: '1',
          type: '1',
          maxIrrNum: '',
          sortOrder: '',
          isDelete: 0
        },
        ruleValidate: {
          name: [
            {required: true, message: '系统名称不能为空', trigger: 'blur'}
          ],
          maxIrrNum: [
            {required: true, message: '系统最大负载不能为空', trigger: 'blur'}
          ],
          sortOrder: [
            {required: true, message: '系统排序不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      radioChange () {},
      submit () {
        if (this.formModel.maxIrrNum !== '') {
          if (this.formModel.sortOrder !== '') {
            // let config = {
            //   headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            //   }
            // }
            // let ret = ''
            // for (let it in this.formModel) {
            //   ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.formModel[it]) + '&'
            // }
            editSystem(this.formModel).then((resp) => {
              if (resp.data.code === 0) {
                this.$Message.info('系统修改成功！')
                this.$router.push({name: 'system_index', params:{param: this.$route.params.param}})
              } else {
                this.$Message.info(resp.data.message)
              }
            })
          } else {
            this.$Message.error('系统排序不能为空！')
          }
        } else {
          this.$Message.error('系统最大负载不能为空！')
        }
      },
      back () {
        this.$router.push({name: 'system_index'})
      }
    },
    created () {
      this.formModel.id = this.$route.params.id
      let para = {
        id: this.formModel.id
      }
      getSystemById(para).then((res) => {
        this.formModel.alias = res.data.data.alias
        this.formModel.type = res.data.data.type + ''
        this.formModel.sortOrder = res.data.data.sortOrder
        this.formModel.mode = res.data.data.mode + ''
        this.formModel.maxIrrNum = res.data.data.maxIrrNum
        this.formModel.name = res.data.data.name
      })
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
  .main-content {
    padding: 150px;
    margin-bottom: 70px;
  }
</style>
