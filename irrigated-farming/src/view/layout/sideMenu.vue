<template>
  <nav class="side-menu" >
    <Menu style="width:275px;text-align:left" @on-select="clickMenuItems" ref="sideMenu" unique-opened  :active-name="getCurrentMenu()" :open-names="[getCurrentMenu()]">
      <div>
        <MenuItem name="system">
          <Icon type="md-settings"></Icon>
          系统管理
        </MenuItem>
        <MenuItem name="user">
          <Icon type="md-person"></Icon>
          用户管理
        </MenuItem>
        <MenuItem name="article">
          <Icon type="ios-paper"></Icon>
          文章管理
        </MenuItem>
        <MenuItem name="notification">
          <Icon type="md-notifications" />
          通知管理
        </MenuItem>
        <MenuItem name="news">
          <Icon type="md-volume-down" />
          资讯推荐
        </MenuItem>
        <!--<Submenu name="article">-->
          <!--<template slot="title">-->
            <!--<Icon type="ios-paper"></Icon>-->
            <!--文章管理-->
          <!--</template>-->
          <!--<MenuItem name="category" >-->
            <!--分类管理-->
          <!--</MenuItem>-->
          <!--<MenuItem name="article" >-->
            <!--文章管理-->
          <!--</MenuItem>-->
        <!--</Submenu>-->
      </div>
    </Menu>
    <br>
  </nav>
</template>
<script scoped>
  export default {
    data () {
      return {
        menuData: [
          {
            title: '用户管理',
            only: true,
            children: [
              {
                title: '设备管理',
                router: 'study'
              }
            ]
          },
          {
            title: '系统管理',
            only: true,
            children: [
              {
                title: '设备管理',
                router: 'study'
              }
            ]
          },
          {
            title: '系统管理',
            only: true,
            children: [
              {
                title: '设备管理',
                router: 'study'
              }
            ]
          }
        ]
      }
    },
    created () {
    },
    methods: {
      clickMenuItems (key) {
        this.$router.push({ path: key })
      },
      getCurrentMenu () {
        let path = this.$route.path
        // path = (path === '/') ? 'user_manage' : path
        path = path.indexOf('/') === 0 ? path.substr(1) : path
        return path
      }
    }
  }
</script>
<style lang='scss'>
  .side-menu {
    font-family: MicrosoftYaHei-Bold;
    font-weight:400;
    position: relative;
    width: 100%;
    left: 0;
    top: 0;
    .ivu-menu-item.is-active,
    .ivu-menu-item.is-active {
      color: #289AF2;
      background-color: #1D2530 !important;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
      color: #289AF2;
      background-color: #1D2530 !important;
      border-right: 1px solid #283142;
    }
    .ivu-menu-vertical .ivu-menu-item,
    .ivu-menu-vertical .ivu-menu-submenu-title {
      padding-top: 10px;
      font-size: 17px;
      height: 60px;
    }
    /*菜单选中激活*/
    .ivu-menu-vertical {
      .ivu-menu-item.sm-active,
      .ivu-menu-item.sm-active {
        color: #289AF2;
      }
    }
    .ivu-menu-item {
      .ivu-menu-item.sm-active,
      .ivu-menu-item.sm-active {
        color: #289AF2;
      }
    }
    .ivu-menu {
      background-color: transparent !important;
      .fa {
        margin-right: 10px;
        speak: none;
        font-family: MicrosoftYaHei-Bold;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
    .ivu-menu-submenu .ivu-menu-item {
      background-color: transparent !important;
      border-top: 0;
      padding-left: 34px;
      height: 60px;
    }
    .ivu-menu-item,
    .ivu-menu-submenu .ivu-menu-submenu-title {
      color: #8796B3;
      line-height: 35px;
      height: 60px;
    }
    .side-menu .ivu-menu-item, .side-menu .ivu-menu-submenu .ivu-menu-submenu-title {
      height: 60px;
    }
    /*鼠标滑过css*/
    .ivu-menu-item:hover,
    .ivu-menu-submenu .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      background-color: #fff;
      color: #8796B3;
      height: 60px;
    }
    .ivu-menu-submenu .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      background-color: #fff !important;
      color: #8796B3;
      height: 60px;
    }
    .ivu-menu-vertical .ivu-menu-submenu-title-icon {
      top: 12px;
    }
  }

  .side-menu {
    color: #8796B3;
    padding: 0 !important;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    width: 274px;
    padding-top: 10px;
    z-index: 1;
    overflow-x: hidden;
    background-color: #283142;
    border-right: 0px;
    transition: all .45s cubic-bezier(.23, 1, .32, 1);
    .ivu-menu-submenu .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      background-color: #1D2530;
    }
  }
  .side-menu.show {
    left: -275px;
  }
</style>
