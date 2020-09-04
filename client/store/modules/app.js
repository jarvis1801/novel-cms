import * as types from '../mutation-types'

const state = {
    device: {
        isMobile: false,
        isTablet: false
    },
    sidebar: {
        opened: false,
        hidden: false
    },
    effect: {
        translate3d: true
    },
    novel: {
        novel: null,
        currentNovelId: null,
        currentVolumeId: null,
        createChapterIndex: null,
        createVolumeIndex: null
    }
}

const mutations = {
    [types.TOGGLE_DEVICE](state, device) {
        state.device.isMobile = device === 'mobile'
        state.device.isTablet = device === 'tablet'
    },

    [types.TOGGLE_SIDEBAR](state, config) {
        if (state.device.isMobile && config.hasOwnProperty('opened')) {
            state.sidebar.opened = config.opened
        } else {
            state.sidebar.opened = true
        }

        if (config.hasOwnProperty('hidden')) {
            state.sidebar.hidden = config.hidden
        }
    },

    [types.SWITCH_EFFECT](state, effectItem) {
        for (let name in effectItem) {
            state.effect[name] = effectItem[name]
        }
    },

    // novel
    [types.SET_NOVEL](state, novel) {
        _.set(state.novel, 'novel', novel)
    },

    [types.SET_NOVEL_ID](state, novelId) {
        _.set(state.novel, 'currentNovelId', novelId)
    },

    [types.SET_VOLUME_ID](state, volumeId) {
        _.set(state.novel, 'currentVolumeId', volumeId)
    },

    [types.SET_CHAPTER_INDEX](state, chapterIndex) {
        _.set(state.novel, 'createChapterIndex', chapterIndex)
    },

    [types.SET_VOLUME_INDEX](state, volumeIndex) {
        _.set(state.novel, 'createVolumeIndex', volumeIndex)
    }
}

export default {
    state,
    mutations
}