<template>
  <div>
    <router-view></router-view>
    <!--//* 通过meta属性控制FooterGuide的显示 -->
    <FooterGuide v-if="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
import { getFoodList } from "./api";
import { mapActions } from "vuex";
export default {
  mounted() {
    this.autoLogin();
  },
  methods: {
    ...mapActions(["autoLogin"])
  },
  components: {
    FooterGuide
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
}
</style>
