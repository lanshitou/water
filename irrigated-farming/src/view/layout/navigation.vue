<template>
  <div class="headTop">
    <Row>
      <Menu mode="horizontal" >
        <Col span="12">
        <div class="headTextTop">众智新农管理系统
        </div>
        </Col>
        <Col span="12">
        <div class="person">
          <Row >
            <div style="height: 45px;width: 45px; border-radius: 50%;background: #3BBAAB;margin-top: 6px;float: left;margin-right: 20px">
              <Icon type="md-person" size="28" style="color: #fff;margin-top: -18px"></Icon>
            </div>
            <div style="color:rgba(25,170,246,1);margin-top: 0px;float: left">
              {{person}}
              <Icon type="ios-arrow-down" size="20" style="color: #797D80"></Icon>
            </div>
            <div class="slider">
              <div class="slideItem" style="display: none">
                <Row type="flex" justify="center" @click.native="setting" style="height: 40px;line-height: 40px;" class="item">
                  <div style="font-size: 14px;" >管理员</div>
                </Row>
                <Row type="flex" justify="center" @click.native="setting1" style="height: 40px;line-height: 40px;margin-top: -8px" class="item1">
                  <div style="font-size: 14px" >普通用户</div>
                </Row>
              </div>
            </div>

          </Row>
        </div>
        </Col>
      </Menu>
    </Row>
  </div>
</template>
<script type="application/ecmascript">
export default {
  data () {
    return {
      person: '管理员',
    }
  },
  created: function () {},
  methods: {
    setting () {
      this.person = '管理员'
    },
    setting1 () {
      this.person = '普通用户'
    }
  }
}
</script>
<style  scoped>
  .headTop{
    width: 100%;
    height:60px;
  }
  .headTextTop{
    color: #fff;
    text-align: center;
    line-height:60px;
    padding-right:40px;
    font-size: 20px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    background: rgba(29,148,238,1);
    width: 275px;
  }
  .ivu-menu-horizontal.ivu-menu-light:after{
    height: 0px;
  }
  .person{
    width: 150px;
    height: 60px;
    float: right;
    /*background: #53C79F;*/
    margin-right: 30px;
    line-height:60px;
    text-align: center;
    position: relative;
  }
  .slider{
    width: 70px;
    height: 0;
    position:absolute;
    top:40px;
    left:65px;
    background: #eff3f6;
    z-index:2;
    transition: all 0.3s;
    text-align: center;
    /*color: #fff;*/
  }
  .person:hover{
    cursor: pointer;
  }
  .person:hover .slider{
    display: block;
    height: 70px;
    cursor: pointer;
  }
  .person:hover .slideItem{
    display: block !important;
  }
  .item:hover{
    color: rgba(25,170,246,1);
  }
  .item1:hover{
    color: rgba(25,170,246,1);
  }
</style>
