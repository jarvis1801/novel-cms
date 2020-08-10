<template>
    <div class="chapter-container" v-show="!isDeleted">
        <div class="chapter-sub-container">
            <p
                v-if="chapter.sectionName != null"
                class="title is-4 chapter-list">
                {{ chapter.sectionName }}{{ chapter.title != null ? ' - ' + chapter.title : '' }}
            </p>

            <div class="button-container" v-show="buttonClickType == null">
                <a class="button is-danger" @click.stop.prevent="buttonClick('delete')">
                    <span>Delete</span>
                    <span class="icon">
                        <i class="fa fa-times"></i>
                    </span>
                </a>
            </div>
            <div class="button-confirm-container" v-show="buttonClickType != null">
                <a class="button is-danger" @click.stop.prevent="buttonClick(null)" >
                    <span>No</span>
                    <span class="icon">
                        <i class="fa fa-times"></i>
                    </span>
                </a>
                <a class="button is-success" @click.stop.prevent="buttonConfirmClick('delete')" >
                    <span>Yes</span>
                    <span class="icon">
                        <i class="fa fa-times"></i>
                    </span>
                </a>
            </div>

        </div>
    </div>
</template>

<script>
import ChapterService from '../../../axios/ChapterService'

export default {
    props: ['chapter'],

    data() {
        return {
            buttonClickType: null,
            isDeleted: false,
            originData: {

            },
            data: {

            }
        }
    },

    mounted() {
        _.set(this, 'originData', this.$props.chapter)
        _.set(this, 'data', this.$props.chapter)
    },

    methods: {
        buttonClick(type) {
            _.set(this, 'buttonClickType', type)
        },
        buttonConfirmClick() {
            if (this.buttonClickType === 'delete') {
                this.deleteChapter()
            } else if (this.buttonClickType === 'edit') {
                // this.updateNovel()
            }
        },
        deleteChapter() {
            ChapterService.delete(this.$props.chapter._id)
                .then(response => {
                    _.set(this, 'isDeleted', true)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
}
</script>

<style scoped>
    /* .chapter-container {
        border: 1px solid #e6e6e6;
    } */

    .chapter-sub-container {
        display: inline-block;
        border: 1px solid #e6e6e6;
        margin-left: 5em;
    }
    
    .input {
        height: 40px;
        font-size: 20px;
    }

    .chapter-list {
        display: inline-block;
        padding: 0.7em;
        min-width: 20em;
        margin-bottom: 0;
        /* border: 1px solid #cccccc;// */
    }

    .button-container, .button-confirm-container {
        display: inline-block;
        margin-right: 2em;
        margin-left: 2em;
    }
</style>