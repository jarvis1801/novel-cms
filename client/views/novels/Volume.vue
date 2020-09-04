<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
      <article class="tile is-child box">
        <p class="control">

          <router-link to="/novels/createVolume">
            <img class="img_add" src="../../assets/logo.png" />
          </router-link>

          <draggable v-model="volumeList" :animation="150" @end="dragEnd">
            <transition-group>
              <volume-item
                v-for="item in volumeList"
                :key="item._id"
                :volume="item"
                />
            </transition-group>
          </draggable>
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
    _.set(this.formData, 'index', null)
    this.setCreateVolumeIndex(null)
    this.getVolumeList(this.novel.novel._id)
  },

  methods: {
    ...mapActions([
      'setCreateVolumeIndex'
    ]),
    getVolumeList(novelId) {
        VolumeService.getVolumeById(novelId)
          .then(response => {
            var sortingObj = response.data
            sortingObj = _.orderBy(sortingObj, 'index', 'asc')
            sortingObj = _.filter(sortingObj, (item) => { return !item.isStickyHeader })
            this.setCreateVolumeIndex(_.size(sortingObj) ? _.size(sortingObj) : 0)
            this.volumeList = sortingObj
          })
          .catch(e => {
              console.log(e)
          })
    },
    dragEnd() {
      const list = _.reduce(this.volumeList, (result, val, key) => {
          const cloneObj = val
          cloneObj['index'] = key

          const obj = {}
          obj['id'] = cloneObj._id
          obj['index'] = cloneObj.index

          result.push(obj)
          return result
      }, [])
      console.log(list)
      VolumeService.updateIndex(list)
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
