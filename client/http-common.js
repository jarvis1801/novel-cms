'use strict'

import axios from 'axios'
import config from '../config/index'

const url = config.dev.type === 'dev' ? 'http://59.148.97.71:3306/api' : 'http://59.148.97.71:3307/api'

const axiosObj = axios.create({
    baseURL: url,
    headers: {
        'Content-type': 'application/json'
    }
})

export default axiosObj