'use strict'

import axios from 'axios'
import config from '../config/index'

const url = config.dev.type === 'dev' ? 'http://119.236.132.61:3306/api' : 'http://119.236.132.61:3307/api'

const axiosObj = axios.create({
    baseURL: url,
    headers: {
        'Content-type': 'application/json'
    }
})

export default axiosObj