import * as types from './mutation-types'

export const toggleSidebar = ({ commit }, config) => {
    if (config instanceof Object) {
        commit(types.TOGGLE_SIDEBAR, config)
    }
}

export const toggleDevice = ({ commit }, device) => commit(types.TOGGLE_DEVICE, device)

export const expandMenu = ({ commit }, menuItem) => {
    if (menuItem) {
        menuItem.expanded = menuItem.expanded || false
        commit(types.EXPAND_MENU, menuItem)
    }
}

export const switchEffect = ({ commit }, effectItem) => {
    if (effectItem) {
        commit(types.SWITCH_EFFECT, effectItem)
    }
}

// novel
export const setNovel = ({ commit }, novel) => {
    if (novel) {
        commit(types.SET_NOVEL, novel)
    }
}

export const setNovelId = ({ commit }, novelId) => {
    if (novelId) {
        commit(types.SET_NOVEL_ID, novelId)
    }
}

export const setVolumeId = ({ commit }, volumeId) => {
    if (volumeId) {
        commit(types.SET_VOLUME_ID, volumeId)
    }
}

export const setCreateChapterIndex = ({ commit }, chapterIndex) => {
    commit(types.SET_CHAPTER_INDEX, chapterIndex)
}