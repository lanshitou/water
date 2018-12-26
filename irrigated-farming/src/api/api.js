import axios from './index'
import Qs from 'qs'
let base = '/api/admin'
// V2接口api===============================================================================================================================
// 区域查询
export const getRegions = params => { return axios.get(`${base}/region/get_region`, {params: params}) }
// 地址新增
export const addRegions = params => { return axios.post(`${base}/region/add_address`, Qs.stringify(params)) }
// 用户列表
export const getUserList = params => { return axios.get(`${base}/user/get_user_list`, {params: params}) }
// 用户新增
export const addUser = params => { return axios.put(`${base}/user/add_user`, Qs.stringify(params)) }
// 用户删除
export const deleteUser = params => { return axios.post(`${base}/user/` + params.id) }
// 用户编辑-详情
export const getUserEditDetail = params => { return axios.get(`${base}/user/get_user_detail`, {params: params}) }
// 用户编辑
export const editUser = params => { return axios.post(`${base}/user/update_user`, Qs.stringify(params)) }
// 用户详情---查看
export const getUserDetails = params => { return axios.get(`${base}/user/` + params.id) }
// 用户详情---查看用户拥有的系统
export const getUserSystem = params => { return axios.get(`${base}/iasystems/user/` + params.id) }
// 用户角色
export const getRoles = params => { return axios.get(`${base}/user/role`, {params: params}) }
// 用户详情---系统下的农田
export const getUserFarms = params => { return axios.get(`${base}/iasystems/user/` + params.id + `/`+ params.ids) }
// 用户详情---可选系统列表
export const getChooceSystem = params => { return axios.get(`${base}/user/iasystem_in_user/` + params.id, {params: params}) }
// 用户详情---分配系统
export const addUserSystem = params => { return axios.put(`${base}/user/add_iasystem`, Qs.stringify(params)) }
// 用户详情---分配农田
export const addUserSystemFarm = params => { return axios.put(`${base}/iasystems/add_farmland`, Qs.stringify(params)) }
// 用户详情---解绑系统
export const deleteUserSystem = params => { return axios.delete(`${base}/user/iasystem/` + params.userId + `/`+ params.iasId) }
// 用户详情---修改用户系统权限
export const editUserSystem = params => { return axios.post(`${base}/iasystems/update_role`, Qs.stringify(params)) }
// 系统列表
export const getSystems = params => { return axios.get(`${base}/iasystems`, {params: params}) }
// 创建系统
export const addIasSystem = params => { return axios.put(`${base}/iasystems`, Qs.stringify(params)) }
// 系统编辑--详情
export const getSystemDetail = params => { return axios.get(`${base}/iasystems/` + params.id) }
// 系统编辑
export const editSystems = params => { return axios.put(`${base}/iasystems/` + params.id, Qs.stringify(params)) }
// 系统列表  删除系统
export const deleteSystems = params => { return axios.delete(`${base}/iasystems/` + params.id) }
// 系统架构--农田灌溉区详情
export const getSystemFarmDetail = params => { return axios.get(`${base}/iasystems/get_ias_detail/` + params.id) }
// 新增农田
export const addFarms = params => { return axios.post(`${base}/farmlands`, Qs.stringify(params)) }
// 新增灌溉区
export const addIrrArea = params => { return axios.post(`${base}/irrigations`, Qs.stringify(params)) }
// 删除农田
export const deleteFarms = params => { return axios.post(`${base}/farmlands/delete`, Qs.stringify(params)) }
// 删除灌溉区
export const deleteIrrArea = params => { return axios.post(`${base}/irrigations/delete`, Qs.stringify(params)) }
// 系统详情---设备架构详情
export const getSystemDeviceDetail = params => { return axios.get(`${base}/iasystems/` + params.id + `/devices/topo`) }
// 系统详情---设备列表
export const getSystemsDeviceType = params => { return axios.get(`${base}/device/type`, {params: params}) }
// 系统详情---添加设备
export const addSystemDevice = params => { return axios.put(`${base}/iasystems/` + params.iasId + `/devices`, Qs.stringify(params)) }
// 系统详情---删除设备
export const deleteDevice = params => { return axios.post(`${base}/iasystems/` + params.iasId + `/devices/delete/` + params.dev_id) }
// 系统详情---卸载设备
export const delFarmDevice = params => { return axios.post(`${base}/iasystems/uninstalldevice/` + params.id) }
// 系统详情---卸载设备
export const installFarmDevice = params => { return axios.post(`${base}/iasystems/installdevice`, Qs.stringify(params)) }
// 新增文章分类
export const addArticleCategory = params => { return axios.put(`${base}/info/cat`, Qs.stringify(params)) }
// 文章分类树查询
export const getArticleCategoryTree = params => { return axios.get(`${base}/info/cat/0`, {params: params}) }
// 文章分类树查询删除
export const deleteArticleCategoryTree = params => { return axios.delete(`${base}/info/cat/` + params.id) }
// 文章列表
export const getArticles = params => { return axios.get(`${base}/info/article/` + params.id, {params: params}) }
// 删除文章
export const deleteArticle = params => { return axios.post(`${base}/info/article/delete`, Qs.stringify(params)) }
// 文章详情
export const getArticleDetail = params => { return axios.get(`${base}/info/article/detail/` + params.id) }
// 修改文章
export const editArticle = params => { return axios.post(`${base}/info/article/`, Qs.stringify(params)) }
// 上传缩略图
export const uploadImages = params => { return axios.post(`${base}/file/image_upload/1`, params) }
// 上传原图
export const uploadImage = params => { return axios.post(`${base}/file/image_upload/0`, params) }
// 新增文章
export const creatArticle = params => { return axios.put(`${base}/info/article/`, Qs.stringify(params)) }
// 新增每日推荐、农业资讯
export const creatInformationRecommendation = params => { return axios.put(`${base}/recommendation_and_infomation/`, Qs.stringify(params)) }
// 资讯推荐列表
export const getNews = params => { return axios.get(`${base}/recommendation_and_infomation/`, {params: params}) }
// 资讯推荐删除
export const deleteNews = params => { return axios.delete(`${base}/recommendation_and_infomation/` + params.id) }
// 通知列表
export const getNotices = params => { return axios.get(`${base}/notification`, {params: params}) }
// 新增通知
export const creatNotification = params => { return axios.put(`${base}/notification`, Qs.stringify(params)) }
// 新增通知
export const editNotification = params => { return axios.post(`${base}/notification/`, Qs.stringify(params)) }
// 通知详情
export const getNotificationDetail = params => { return axios.get(`${base}/notification/detail/` + params.id) }
// 通知详情  用户列表
export const getNotificationUsersDetail = params => { return axios.get(`${base}/notification/user/` + params.id, {params: params}) }
// V1接口api===============================================================================================================================
// 设备类型列表
export const getDeviceTYpe = params => { return axios.get(`${base}/device/type`, {params: params}) }
// 农业系统列表
export const getSystemList = params => { return axios.get(`${base}/iasystems/getbykeyword`, {params: params}) }
// 农业系统设备管理下拉框
export const getSystemListSelect = params => { return axios.get(`${base}/iasystems`, {params: params}) }
// 农业系统新增
export const addSystem = params => { return axios.post(`${base}/iasystems`,  Qs.stringify(params)) }
// 农业系统删除
export const deleteSystem = params => { return axios.delete(`${base}/iasystems/` + Qs.stringify(params).substring(3)) }
// 农业系统修改--------------------put 请求
export const editSystem = params => { return axios.put(`${base}/iasystems/` + Qs.stringify(params).substring(3,Qs.stringify(params).indexOf('&')),  Qs.stringify(params)) }
// 农业系统详情
export const getSystemById = params => { return axios.get(`${base}/iasystems/detail`, {params: params}) }
// 设备拓扑结构
export const getDeviceTree = params => { return axios.get(`${base}/iasystems/` + Qs.stringify(params).substring(3) + `/devices/topo`) }
// 设备拓扑结构修改
export const editDevice = params => { return axios.put(`${base}/iasystems/`+ Qs.stringify(params).substring(6,Qs.stringify(params).indexOf('&')) +  `/devices`, Qs.stringify(params)) }
// 设备拓扑结构新增
export const addDevice = params => { return axios.post(`${base}/iasystems/` + Qs.stringify(params).substring(6,Qs.stringify(params).indexOf('&')) + `/devices`, Qs.stringify(params)) }
// 设备拓扑结构删除
export const delDevice = params => { return axios.delete(`${base}/iasystems/`+ Qs.stringify(params).substring(6,Qs.stringify(params).indexOf('&'))+ `/devices/`+ Qs.stringify(params).substring(Qs.stringify(params).indexOf('&') + 7),  Qs.stringify(params)) }
// 农田系统结构
export const getFarmJPG = params => { return axios.get(`${base}/iasystems/` + Qs.stringify(params).substring(3)) }
// 农田新增
export const addfarm = params => { return axios.post(`${base}/farmlands`, Qs.stringify(params)) }
// 农田编辑
export const editfarm = params => { return axios.put(`${base}/farmlands`, Qs.stringify(params)) }
// 农田删除
export const deletefarms = params => { return axios.delete(`${base}/farmlands`, {params: params}) }
// 水肥一体化新增
export const addWaterSystem = params => { return axios.post(`${base}/irriandfers`, Qs.stringify(params)) }
// 水肥一体化编辑
export const editWater = params => { return axios.put(`${base}/irriandfers`, Qs.stringify(params)) }
// 水肥一体化删除
export const deleteWater = params => { return axios.delete(`${base}/irriandfers`, {params: params}) }
// 灌溉区新增
export const addIrrigateds = params => { return axios.post(`${base}/irrigations`, Qs.stringify(params)) }
// 灌溉区编辑
export const editIrrigateds = params => { return axios.put(`${base}/irrigations`, Qs.stringify(params)) }
// 灌溉区删除
export const deleteIrrigateds = params => { return axios.delete(`${base}/irrigations`, {params: params}) }
// 设备删除
export const deleteDevicesImpl = params => { return axios.post(`${base}/iasystems/uninstalldevice`, Qs.stringify(params)) }
// 设备安装
export const addDevices = params => { return axios.post(`${base}/iasystems/installdevice`, Qs.stringify(params)) }
// 设备用途
export const getDevicesList = params => { return axios.get(`${base}/iasystems/usage`, {params: params}) }
// 根据系统ID查询设备列表
export const getDevicesListById = params => { return axios.get(`${base}/iasystems/devicelist`, {params: params}) }


