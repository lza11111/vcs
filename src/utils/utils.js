/* eslint-disable eqeqeq */
import DataSet from '@antv/data-set';

export const PREFIX = '';

export function filterZero(obj) {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] != 0) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}

export function transformData(list, options) {
    const { map, scale } = options;
    const fields = Object.values(map);
    const ds = new DataSet();
    const dv = ds.createView().source(list);
    // 先重命名
    dv.transform({
        type: 'rename',
        map
    });
    // 再根据字段进行展开
    if (scale.y) {
        dv.transform({
            type: 'fold',
            fields, // 展开字段集
            key: 'color', // key字段
            value: scale.y.name // value字段
        });
    } else {
        dv.transform({
            type: 'fold',
            fields, // 展开字段集
            key: 'color', // key字段
            value: scale.y0.name // value字段
        });
    }

    return { data: dv, scale };
}

export function setQuery(params) {
    // 把无效的params过滤掉再生成url
    const newUrl = `${Object.keys(params)
        .filter(key => params[key] && params[key].toString().length > 0)
        .map(key => `${key}=${params[key]}`)
        .join('&')}`;
    return newUrl;
}

// 设置cookie
export function setCookie(cookie, value, expiredays) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = `${cookie}=${escape(value)};\
    expires=${exdate.toGMTString()};\
    path=/`;
}
