<template>
  <div class="main-content">
    <transition mode="out-in" enter-active-class="bounceInleft" leave-active-class="bounceOutRight">
      <router-view class="tab-content animated"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style lang='scss' scoped>
  .main-content {
    width: 100% -275px;
    position: fixed;
    top:60px;
    right: 0;
    bottom: 0;
    left: 275px;
    overflow: auto;
    z-index: 1;
    background-color: #eff3f6;
    border-top: 1px solid rgba(229, 229, 229, 1);
    transition: left .45s cubic-bezier(.23, 1, .32, 1);
    .tabs-content {
      height: 100%;
    }
  }
</style>
