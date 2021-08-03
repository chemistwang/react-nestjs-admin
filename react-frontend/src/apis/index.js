import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
    // headers: ''
})
const API = {};

/****************************************************************** 部门 ******************************************************************/

// 获取部门
API.getDepartment = async (param) => {
    let {status, statusText, data} = await instance.get('/setting/department', param);
    return {status, statusText, data}
}

// 获取部门人数
API.getDepartmentMemberCount = async(param) => {
    let {status, statusText, data} = await instance.get('/setting/departmentMember', param);
    return {status, statusText, data}
}

// 新增部门
API.createDepartment = async(param) => {
    let {status, statusText, data} = await instance.post('/setting/department', param);
    return {status, statusText, data}
}
// 删除部门
API.deleteDepartment = async(param) => {
    let {status, statusText, data} = await instance.delete('/setting/department', param);
    return {status, statusText, data: data}
}
// 更新部门
API.updateDepartment = async(param) => {
    let {status, statusText, data} = await instance.put('/setting/department', param);
    return {status, statusText, data: data}
}

/****************************************************************** 警员 ******************************************************************/
// 获取警员
API.getPolice = async (param) => {
    let {status, statusText, data} = await instance.get('/police', param);
    return {status, statusText, data}
}

// 新增警员
API.createPolice = async(param) => {
    let {status, statusText, data} = await instance.post('/police', param);
    return {status, statusText, data}
}
// 删除警员
API.deletePolice = async(param) => {
    let {status, statusText, data} = await instance.delete('/police', param);
    return {status, statusText, data: data}
}
// 更新警员
API.updatePolice = async(param) => {
    let {status, statusText, data} = await instance.put('/police', param);
    return {status, statusText, data: data}
}



export default API;

