<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <navbar :show="true"></navbar>
    <sidebar :show="isLoginPage()"></sidebar>
    <app-main></app-main>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, Sidebar, AppMain } from 'components/layout/'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
    NprogressContainer
  },

  computed: mapGetters({
    sidebar: 'sidebar'
  }),

  methods: {
    isLoginPage() {
      const path = this.$route.path
      if (path === '/') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
@import '~animate.css';
.animated {
  animation-duration: .377s;
}

@import '~bulma';

@import '~wysiwyg.css/wysiwyg.sass';

$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

html {
  background-color: whitesmoke;
  min-width: 778px !important;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;

  #nprogress {
    $color: #48e79a;

    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }

    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}
</style>
