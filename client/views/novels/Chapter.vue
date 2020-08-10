<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
      <article class="tile is-child box">
        <p class="control">

          <router-link to="/novels/createNovel">
            <img class="img_add" src="../../assets/logo.png" />
          </router-link>
        </p>
      </article>
      </div>
    </div>
  </div>
</template>

<script>
import ChapterItem from './components/ChapterItem'
import ChapterService from '../../axios/ChapterService'

export default {
  props: {
      chapterList: null
  },

  components: {
    ChapterItem
  },

  data () {
    return {
      chapterList: []
    }
  },

  computed: {
  },

  created () {
  },

  methods: {
  }
}
</script>

<style scoped>
.img_add {
  height: 100px;
  margin: 20px;
}
.img_add:hover {
  cursor: pointer;
}
</style>
