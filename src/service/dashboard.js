/* eslint-disable import/prefer-default-export */
import Fetch from '@/utils/fetch';

export function getAllOS() {
    return Fetch.get('/api/OS/getAllOS');
}


export function getAllService({ page, pageSize }){
    return Fetch.get('/api/service/getAllService',{page: page , pageSize: pageSize});
}

export default {
    getAllOS,
    getAllService,
};
