<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
      <article class="tile is-child box">
        <p class="control">

          <draggable v-model="volumeList" :animation="150">
            <transition-group>
              <volume-item
                v-for="item in volumeList"
                :key="item._id"
                :volume="item"
                />
            </transition-group>
          </draggable>

          <router-link to="/novels/createVolume">
            <img class="img_add" src="../../assets/logo.png" />
          </router-link>
        </p>
      </article>
      </div>
    </div>
  </div>
</template>

<script>
import VolumeItem from './components/VolumeItem'
import VolumeService from '../../axios/VolumeService'
import { mapGetters, mapActions, mapState } from 'vuex'
import draggable from 'vuedraggable'

export default {
  components: {
    VolumeItem,
    draggable
  },

  data () {
    return {
      volumeList: []
    }
  },

  computed: {
    ...mapGetters({
      novel: 'novel'
    })
  },

  created () {
    this.getVolumeList(this.novel.novel._id)
  },

  methods: {
      getVolumeList(novelId) {
          VolumeService.getVolumeById(novelId)
            .then(response => {
              var sortingObj = response.data
              sortingObj = _.orderBy(sortingObj, 'index', 'asc')
              this.volumeList = sortingObj
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
