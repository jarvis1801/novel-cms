import http from '../http-common'

class NovelService {
    getNovelList() {
        return http.get('/novelList')
    }

    getNovelById(id) {
        return http.get(`/novel/${id}`)
    }

    createNovel(data) {
        return http.post('/novel', data)
    }

    update(id, data) {
        return http.put(`/novel/${id}`, data)
    }

    delete(id) {
        return http.delete(`/novel/${id}`)
    }
}

export default new NovelService()