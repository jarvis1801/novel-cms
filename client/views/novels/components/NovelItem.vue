<template>
    <div class="novel-container" v-show="!isDeleted" @click="goVolumePage()">
        <img :src="`data:image/png;base64,${novel.thumbnailMain}`" class="cover" />
        <div class="text-container">
            <div class="text-sub-container">
                <p class="title is-4">Name: </p>
                <p
                    v-if="buttonClickType != 'edit'"
                    v-show="originData.name != null"
                    class="title is-4">{{ originData.name }}</p>
                <p 
                    v-else
                    @click.stop.prevent=""
                    class="edit-input is-4">
                    <input class="input" type="text" v-model="data.name">
                </p>
            </div>
            <br />
            <div class="text-sub-container">
                <p class="title is-4">Author: </p>
                <p
                    v-if="buttonClickType != 'edit'"
                    v-show="originData.author != null"
                    class="title is-4">{{ originData.author }}</p>
                <p 
                    v-else
                    @click.stop.prevent=""
                    class="edit-input is-4">
                    <input class="input" type="text" v-model="data.author">
                </p>
            </div>
            <br />
            <div class="text-sub-container">
                <p 
                    v-show="originData.isEnd != null"
                    class="title is-4">Is End: {{ originData.isEnd }}</p>
            </div>
            <br />
            <div class="text-sub-container">
                <p
                    v-show="originData.updatedAt != null"
                    class="title is-4">Updated At: {{ originData.updatedAt }}</p>
            </div>
        </div>
        <div class="button-container" v-show="buttonClickType == null">
            <a class="button" @click.stop.prevent="buttonClick('edit')">
                <span class="icon">
                    <i class="fa fa-pencil"></i>
                </span>
                <span>Edit</span>
            </a>
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
</template>

<script>
import NovelService from '../../../axios/NovelService'
import { mapActions } from 'vuex'

export default {
    props: ['novel'],

    data() {
        return {
            buttonClickType: null,
            isDeleted: false,
            originData: {
                name: null,
                author: null,
                isEnd: null,
                updatedAt: null
            },
            data: null
        }
    },

    mounted() {
        _.set(this, 'originData', this.$props.novel)
        _.set(this, 'data', this.$props.novel)
    },

    methods: {
        ...mapActions([
            'setNovel'
        ]),
        buttonClick(type) {
            _.set(this, 'buttonClickType', type)
        },
        buttonConfirmClick() {
            if (this.buttonClickType === 'delete') {
                this.deleteNovel()
            } else if (this.buttonClickType === 'edit') {
                this.updateNovel()
            }
        },
        deleteNovel() {
            NovelService.delete(this.$props.novel._id)
                .then(response => {
                    _.set(this, 'isDeleted', true)
                })
                .catch(e => {
                    console.log(e)
                })
        },
        updateNovel() {
            NovelService.update(this.$props.novel._id, this.data)
                .then(response => {
                    _.set(this.originData, 'name', response.data['name'])
                    _.set(this.originData, 'author', response.data['author'])
                    _.set(this, 'buttonClickType', null)
                })
                .catch(e => {
                    console.log(e)
                })
        },

        goVolumePage() {
            const novel = this.$props.novel
            this.setNovel(novel)
            this.$router.push({ name: 'Volume', params: { novel: novel } })
        }
    }
}
</script>

<style lang="scss" scoped>
    .novel-container {
        padding: 20px;
        border-radius: 15px;
        cursor: pointer;
        position: relative;
    }

    .novel-container:hover {
        background: #f5f5f5;
    }

    .cover {
        display: inline-block;
        background-color: #000000;
        height: 170px;
        width: 120px;
        object-fit: cover; /* Do not scale the image */
        object-position: center; /* Center the image within the element */
    }

    .text-container {
        display: inline-block;
        vertical-align: top;
        padding-left: 10px;
        padding-right: 10px;
    }

    .text-sub-container {
        display: inline-block;
        padding-bottom: 10px;
    }

    .button-container, .button-confirm-container {
        display: inline-block;
        position: absolute;
        right: 35px;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .title {
        display: inline-block;
        margin-bottom: 0.2em;
    }

    .edit-input {
        display: inline-block;
        margin-bottom: 0px;
    }
</style>