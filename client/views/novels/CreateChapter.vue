<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
      <article class="tile is-child box">
        <h1 class="title">Create Chapter</h1>
        <div class="block">
            <label class="label">Section Name</label>
            <p class="control">
                <input 
                    class="input"
                    v-bind:class="{ 'is-danger': isError.sectionName }"
                    type="text" 
                    v-model="formData.sectionName">
            </p>
            <span class="help is-danger" v-show="isError.sectionName">Section Name cannot be empty</span>
            
            <label class="label">Title</label>
            <p class="control">
                <input 
                    class="input"
                    v-bind:class="{ 'is-danger': isError.title }"
                    type="text" 
                    v-model="formData.title">
            </p>
            <span class="help is-danger" v-show="isError.title">Title cannot be empty</span>

            <label class="label">Paragraph</label>
            <p class="control">
                <textarea 
                    class="textarea"
                    v-bind:class="{ 'is-danger': isError.contentToParagraph }"
                    v-model="formData.contentToParagraph" />
            </p>
            <span class="help is-danger" v-show="isError.contentToParagraph">Paragraph cannot be empty</span>

            <a class="button is-success" v-on:click="createChapter">
                <span class="icon">
                    <i class="fa fa-check"></i>
                </span>
                <span>Save</span>
            </a>
        </div>
      </article>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ChapterService from '../../axios/ChapterService'
import Message from 'vue-bulma-message'
import { mapGetters, mapActions, mapState } from 'vuex'

const MessageComponent = Vue.extend(Message)

const openMessage = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 1500,
  container: '.messages'
}) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
      Message
  },

  data () {
    return {
        formData: {
            sectionName: null,
            title: null,
            contentToParagraph: null,
            volumeId: null,
            index: null
        },
        isError: {
            sectionName: null,
            title: null,
            contentToParagraph: null,
            volumeId: null
        }
    }
  },

  computed: {
    ...mapGetters({
      novel: 'novel'
    })
  },

  created () {
      _.set(this.formData, 'volumeId', this.novel.currentVolumeId)
      _.set(this.formData, 'index', this.novel.createChapterIndex)
  },

  methods: {
      createChapter() {
          var isValid = true
          _.forEach(this.formData, (val, key) => {
              if (_.size(_.toString(val)) === 0) {
                  _.set(this.isError, key, true)
                  isValid = false
                  this.openMessageWithType('danger', 'Create Chapter', 'Create Chapter not successful')
              } else {
                  _.set(this.isError, key, false)
              }
          })

          if (!isValid) {
              return
          }

          ChapterService.createChapter(this.formData)
            .then(response => {
                this.openMessageWithType('success', 'Create Chapter', 'Create Chapter successful')
                this.$router.replace('/novels/volume')
            })
            .catch(e => {
                this.openMessageWithType('danger', 'Create Chapter', 'Create Chapter not successful')
            })
      },
      openMessageWithType(type, title, msg) {
        openMessage({
            title: title,
            message: msg,
            type: type
        })
      }
  }
}
</script>

<style scoped>
.button.is-success {
    margin-top: 50px;
}
</style>
