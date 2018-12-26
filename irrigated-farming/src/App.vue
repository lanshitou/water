<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background-color: #283142 !important;
  }
  .classname.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    color: #8796B3 !important;
    background-color: #283142 !important;
  }
  .ivu-btn, .ivn-btn:active, .ivn-btn:focus {
    border-color: transparent !important;
    outline: none !important;
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
  }
  .ivu-btn:hover {
    border-color: transparent !important;
  }
}
.ivu-btn:hover {
  border-color: transparent !important;
}
.ivu-tree-title {
  font-size: 16px;
}
.file {
  float: left;
  position: relative;
  display: inline-block;
  background: #249AF2;
  border: 1px solid #249AF2;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #fff;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #249AF2;
  border-color: #249AF2;
  color: #fff;
  text-decoration: none;
}
</style>
