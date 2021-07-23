import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
    // headers: ''
})



const API = {};


// 获取部门
API.getDepartment = async (param) => {
    let {status, statusText, data} = await instance.get('/setting/department', param);
    return {status, statusText, data: data}
}
// 新增部门
API.createDepartment = async(param) => {
    let {status, statusText, data} = await instance.post('/setting/department', param);
    return {status, statusText, data}
}
// 删除部门
API.deleteDepartment = async(param) => {
    let {status, statusText, data} = await instance.post('/setting/department', param);
    return {status, statusText, data: data}
}
// 更新部门
API.updateDepartment = async(param) => {
    let {status, statusText, data} = await instance.post('/setting/department', param);
    return {status, statusText, data: data}
}


export default API;

