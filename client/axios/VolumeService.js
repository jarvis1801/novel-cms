import http from '../http-common'

class VolumeService {
    getVolumeById(id) {
        return http.get(`/volumeList/${id}`)
    }

    createVolume(data) {
        return http.post('/volume', data)
    }

    update(id, data) {
        return http.put(`/volume/${id}`, data)
    }

    delete(id) {
        return http.delete(`/volume/${id}`)
    }
}

export default new VolumeService()