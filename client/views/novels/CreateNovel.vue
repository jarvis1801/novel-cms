<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
      <article class="tile is-child box">
        <h1 class="title">Create Novel</h1>
        <div class="block">
            <label class="label">Name</label>
            <p class="control">
                <input 
                    class="input"
                    v-bind:class="{ 'is-danger': isError.name }"
                    type="text" 
                    v-model="formData.name">
            </p>
            <span class="help is-danger" v-show="isError.name">Name cannot be empty</span>


            <label class="label">Author</label>
            <p class="control">
                <input 
                    class="input"
                    v-bind:class="{ 'is-danger': isError.author }"
                    type="text" 
                    v-model="formData.author">
            </p>
            <span class="help is-danger" v-show="isError.author">Author cannot be empty</span>

            <label class="label">Thumbnail Main</label>
            <p class="control">
                <input type="file" ref="myFiles" @change="updateFile('main')" multiple>
            </p>
            <span class="help is-danger" v-show="isError.thumbnailMain">Thumbnail Main cannot be empty</span>

            <label class="label">Thumbnail Section</label>
            <p class="control">
                <input type="file" ref="myFiles2" @change="updateFile('section')" multiple>
            </p>
            <span class="help is-danger" v-show="isError.thumbnailSection">Thumbnail Section cannot be empty</span>

            <label class="label">IsEnd</label>
            <p class="control">
                <select name="cars" class="input" v-model="formData.isEnd" >
                    <option v-for="option in isEndOption" :value="option.value">{{ option.text }}</option>
                </select>
            </p>

            <a class="button is-success" v-on:click="createNovel">
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
import NovelService from '../../axios/NovelService'
import Message from 'vue-bulma-message'

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
            name: null,
            author: null,
            thumbnailMain: [],
            thumbnailSection: [],
            isEnd: true
        },
        isError: {
            name: false,
            author: false,
            thumbnailMain: false,
            thumbnailSection: false
        },
        isEndOption: [
            { text: 'Yes', value: true },
            { text: 'No', value: false }
        ]
    }
  },

  computed: {
  },

  created () {
  },

  methods: {
      updateFile(type) {
          if (type === 'main') {
              this.formData.thumbnailMain = this.$refs.myFiles.files
          } else if (type === 'section') {
              this.formData.thumbnailSection = this.$refs.myFiles2.files
          }
      },
      createNovel() {
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

          const formDataObj = new window.FormData()
          _.forEach(this.formData, (val, key) => {
            if (key === 'thumbnailMain' || key === 'thumbnailSection') {
                formDataObj.append(key, _.head(val))
            } else {
                formDataObj.append(key, val)
            }
          })

          NovelService.createNovel(formDataObj)
            .then(response => {
                this.openMessageWithType('success', 'Create Novel', 'Create Novel successful')
                this.$router.replace('/novels')
            })
            .catch(e => {
                this.openMessageWithType('danger', 'Create Novel', 'Create Novel not successful')
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
