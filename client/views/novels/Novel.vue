<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
      <article class="tile is-child box">
        <p class="control">
          <novel-item 
            v-for="item in novelList"
            :key="item._id"
            :novel="item"
            />

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
import NovelItem from './components/NovelItem'
import NovelService from '../../axios/NovelService'

export default {
  components: {
    NovelItem
  },

  data () {
    return {
      novelList: []
    }
  },

  computed: {
  },

  created () {
    this.getNovelList()
  },

  methods: {
      getNovelList() {
          NovelService.getNovelList()
            .then(response => {
                this.novelList = response.data
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
      }
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
