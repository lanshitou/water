<template>
  <div class="body">
    <div class="body-breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="device_index">设备类型管理</BreadcrumbItem>
        <BreadcrumbItem>设备类型编辑</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="body-content">
      <div class="main-content">
        <Form :model="formModel" ref="formModel" label-position="left" :label-width="100">
          <Row type="flex" justify="center">
            <FormItem label="设备类型名称" prop="name">
              <Input  v-model="formModel.name" style="width: 200px;"></Input>
            </FormItem>
          </Row>
          <Row type="flex" justify="center">
            <FormItem label="">
              <Button @click="submit" style="background-color: #48B089;color:#fff;width: 100px">提交</Button>
              <Button @click="back" type="primary" style="width: 100px">返回</Button>
            </FormItem>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
// import { getUserCart, getUsermap, getUserActitity, getUserPlant, getUserArea, getUserAll } from '../../api/api'
export default {
  data () {
    return {
      formModel: {}
    }
  },
  methods: {
    submit () {
      this.$Message.info('设备类型修改成功！')
      this.$router.push({name: 'device_index'})
    },
    back () {
      this.$router.push({name: 'device_index'})
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .body {
    text-align: left;
    height: 92%;
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
    padding: 100px;
  }
</style>
