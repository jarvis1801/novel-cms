<template>
  <nav class="level app-levelbar">
    <div class="level-left">
      <div class="level-item">
        <h3 class="subtitle is-5">
          <strong>{{ name }}</strong>
        </h3>
      </div>
    </div>

    <div class="level-right is-hidden-mobile"
      v-show="isLoginPage()">
      <breadcrumb :list="list"></breadcrumb>
    </div>
  </nav>
</template>

<script>
import Breadcrumb from 'vue-bulma-breadcrumb'
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    Breadcrumb,
    Tooltip
  },

  data () {
    return {
      list: null
    }
  },

  created () {
    this.getList()
  },

  computed: {
    name () {
      const name = this.$route.name
      if (name === 'Home') {
        return 'Login'
      }
      return name
    }
  },

  methods: {
    getList () {
      let matched = this.$route.matched.filter(item => item.name)
      let first = matched[0]
      if (first && (first.name !== 'Home' || first.path !== '')) {
        matched = [{ name: 'Home', path: '/' }].concat(matched)
      }
      this.list = matched
    },
    isLoginPage() {
      const name = this.$route.name
      if (name === 'Home') {
        return false
      }
      return true
    }
  },

  watch: {
    $route () {
      this.getList()
    }
  }
}
</script>
