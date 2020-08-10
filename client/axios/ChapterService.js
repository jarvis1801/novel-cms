import http from '../http-common'

class ChapterService {
    getChapterByVolumeId(id) {
        return http.get(`/chapterList/${id}`)
    }

    createChapter(data) {
        return http.post('/chapter', data)
    }

    update(id, data) {
        return http.put(`/chapter/${id}`, data)
    }

    delete(id) {
        return http.delete(`/chapter/${id}`)
    }
}

export default new ChapterService()