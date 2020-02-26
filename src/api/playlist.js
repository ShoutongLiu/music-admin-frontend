import request from '@/utils/request'
const URL = 'http://localhost:3000'

export const fetchList = (params) => {
    return request({
        url: `${URL}/playlist/list`,
        method: 'get',
        params
    })
}

