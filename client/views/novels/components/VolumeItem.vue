<template>
    <div class="volume-container"
        @mouseover="isMouseOver = true"
        @mouseleave="isMouseOver = false">
        <div class="text-container">
            <div class="text-sub-container" @click="expandChapter">
                <span class="icon">
                    <i 
                        v-if="isExpand"
                        class="fa fa-angle-up" />

                    <i 
                        v-if="!isExpand"
                        class="fa fa-angle-down" />
                </span>
                <p
                    v-show="data.sectionName != null"
                    class="edit-input is-4"
                    style="display: inline-block">
                    <input class="input" type="text" v-model="data.sectionName">
                </p>
            </div>

            <draggable v-model="originData.chapterList" @end="dragEnd" :animation="150" v-if="isExpand || isMouseOver">
                <transition-group>
                    <chapter-item
                        v-for="chapter in originData.chapterList"
                        :key="chapter._id"
                        :chapter="chapter"
                        />
                </transition-group>
            </draggable>
                
            <div class="img-add-chapter" @click="goCreateChapterPage" v-if="isExpand || isMouseOver">
                <router-link to="/novels/createChapter">
                    <img class="img_add" src="../../../assets/logo.png" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import ChapterItem from './ChapterItem'
import VolumeService from '../../../axios/VolumeService'
import ChapterService from '../../../axios/ChapterService'
import { mapGetters, mapActions, mapState } from 'vuex'
import draggable from 'vuedraggable'

export default {
    props: ['volume'],

    components: {
        ChapterItem,
        draggable
    },

    data() {
        return {
            buttonClickType: null,
            isDeleted: false,
            originData: {
                chapterList: null,
                sectionName: null,
                novelId: null,
                _id: null
            },
            data: {
                chapterList: null,
                sectionName: null,
                novelId: null,
                _id: null
            },
            isExpand: false,
            isMouseOver: false
        }
    },

    computed: {
        ...mapGetters({
            novel: 'novel'
        })
    },

    mounted() {
        const sortingObj = this.$props.volume
        sortingObj['chapterList'] = _.orderBy(sortingObj.chapterList, 'index', 'asc')
        _.set(this, 'originData', sortingObj)
        _.set(this, 'data', sortingObj)
    },

    methods: {
        ...mapActions([
            'setVolumeId',
            'setCreateChapterIndex'
        ]),

        goCreateChapterPage() {
            if (_.size(this.$props.volume.chapterList) > 0) {
                this.setCreateChapterIndex(_.last(this.$props.volume.chapterList).index + 1)
            } else {
                this.setCreateChapterIndex(0)
            }
            this.setVolumeId(this.$props.volume._id)
        },

        dragEnd() {
            const list = _.reduce(this.originData.chapterList, (result, val, key) => {
                const cloneObj = val
                cloneObj['index'] = key

                const obj = {}
                obj['id'] = cloneObj._id
                obj['index'] = cloneObj.index

                result.push(obj)
                return result
            }, [])
            console.log(list)
            ChapterService.updateIndex(list)
        },
        expandChapter() {
            this.isExpand = !this.isExpand
        }
    }
}
</script>

<style scoped>
    .volume-container {
        padding: 20px;
    }
    
    .input {
        height: 40px;
        font-size: 20px;
    }

    .text-sub-container {
        /* display: inline-block; */
        padding-bottom: 10px;
    }

    .chapter-list {
        display: inline-block;
        margin-left: 2em;
        padding: 0.7em;
        min-width: 20em;
    }

    .img-add-chapter {
        margin-left: 3em;
        padding: 0.7em;
        min-width: 20em;
    }

    .img_add {
        margin-left: 1.5em;
        width: 50px;
        height: 50px;
        min-width: 0;
    }

    .button-container {
        display: inline-block;
    }
</style>