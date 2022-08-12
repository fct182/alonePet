import request from './request';
import base from './base';

/**
 * 测试接口
 */
export function getData() {
  return request({
    url: base.TestData
  })
}

/**
 * 验证输入的手机号是否已被注册
 * @param {string} account (手机号、用户名、密码)
 * @returns 
 */
export function verifyUserAccount(account) {
  return request({
    method: 'post',
    url: base.VerifyUserAccount,
    data: { account }
  })
}

/**
 * 用户注册的接口
 * @param {Object} user (手机号、用户名、密码)
 * @returns 
 */
export function userRegister(user) {
  return request({
    method: 'post',
    url: base.UserRegister,
    data: user
  })
}

/**
 * 用户登录
 * @param {object} user (手机号、密码)
 * @returns 
 */
export function userLogin(user) {
  return request.post(base.UserLogin, user);
}

/**
 * 通过用户ID获取用户的信息
 * @param {*} id 
 * @returns 
 */
export function getUserInfoById(id) {
  return request(base.UserInfo + id);
}

/**
 * 修改用户的昵称
 * @param {object} data (newName,userId)
 * @returns 
 */
export function editUsername(data) {
  return request.post(base.EditUserName, data);
}

/**
 * 修改用户的性别
 * @param {object} data (newSex,userId)
 * @returns 
 */
export function editUserSex(data) {
  return request.post(base.EditUserSex, data);
}

/**
 * 修改用户的地址
 * @param {object} data (newAddress,userId)
 * @returns 
 */
export function editUserAddress(data) {
  return request.post(base.EditUserAddress, data);
}

/**
 * 修改用户的个性签名
 * @param {object} data (newSignature,userId)
 * @returns 
 */
export function editUserSignature(data) {
  return request.post(base.EditUserSignature, data);
}

/**
 * 上传用户的头像
 * @param {FormData} data 
 * @returns 
 */
export function uploadHeadshots(data) {
  return request.post(base.UploadHeadshots, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
/**
 * 上传犬鼻纹
 * @param {FormData} data {'qbw': file}
 * @returns 
 */
export function uploadQbw(data) {
  return request.post(base.UploadQbw, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 通过宠物ID获取宠物狗的信息
 * @param {*} id 
 * @returns 
 */
export function getPetInfoById(id) {
  return request(base.getPetInfo + id);
}

/**
 * 新增流浪宠物狗信息
 * @param {*} data 宠物信息对象
 * @returns 
 */
export function insertPet(data) {
  return request.post(base.insertPet, data);
}

/**
 * 上传宠物狗的 日常照片
 * @param {FormData} data 图片formdata
 * @returns 
 */
export function uploadPetPic(data) {
  return request.post(base.uploadPetPic, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 寻找丢失的宠物By犬鼻纹
 * @param {FormData} data 犬鼻纹pic
 * @returns 
 */
export function findMyPet(data) {
  return request.post(base.findMyPet, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}


/**
 * 获取 区间范围内 宠物狗的  部分信息
 * @param {*} isFeeding 是否投喂
 * @param {*} limit 取多少条数据
 * @param {*} offset 从哪开取 偏移量
 * @returns 
 */
export function getAllPartInfo(isFeeding, limit, offset) {
  return request.get(base.getAllPartInfo + isFeeding, {
    params: {
      limit,
      offset
    }
  });
}

/**
 * 获取宠物狗的位置
 * @param {*} id 宠物的ID
 */
export function getPetAddress(id) {
  return request(base.getPetAddress + id);
}

/**
 * 获取宠物的轮播图
 * @returns 
 */
export function getPetBanner() {
  return request(base.getPetBanner);
}

/**
 * 获得搜索后的宠物列表
 * @param {*} value 搜索的关键值
 * @returns 
 */
export function getSearchPet(value) {
  return request(base.getSearchPet + value);
}

/**
 * 用于验证 对应ID 宠物狗的犬鼻纹信息
 * @param {*} id 宠物ID
 * @param {*} data FormData数据
 * @returns 
 */
export function verifyPetQbw(id, data) {
  return request.post(base.verifyPetQbw + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 提交宠物的救助表单信息
 * @param {*} data 宠物列表信息
 * @returns 
 */
export function submitHelp(data) {
  return request.post(base.submitHelp, data);
}
/**
 * 提交宠物的 投喂 表单信息
 * @param {*} data 宠物列表信息
 * @returns 
 */
export function submitFeed(data) {
  return request.post(base.submitFeed, data);
}

/**
 * 获取坐标下的准确位置信息
 * @param {*} wd 纬度
 * @param {*} jd 经度
 * @returns 
 */
export function dealLocation(wd, jd) {
  // return request(base.dealLocation+"30.778255,103.954018&key=QLSBZ-KFK3U-QFNVT-2DQ76-7RU4V-MFBO5");
  return request(base.dealLocation + `${wd},${jd}&key=QLSBZ-KFK3U-QFNVT-2DQ76-7RU4V-MFBO5`);
}

/**
 * 获取 用户的投喂记录
 * @param {*} id 用户的ID
 */
export function getUserFeedingRecord(id) {
  return request(base.getUserFeedingRecord + id);
}

/**
 * 获取 用户的救助、领养记录
 * @param {*} id 用户的ID
 */
export function getUserRescueRecord(id) {
  return request(base.getUserRescueRecord + id);
}
/**
 * 获取 用户的 发布流浪狗信息 记录
 * @param {*} id 用户的ID
 */
export function getUserPublishRecord(id) {
  return request(base.getUserPublishRecord + id);
}

/**
 * 插入用户聊天室列表记录 
 * @param {*} info 聊天室列表
 * @returns 
 */
export function insertChatRecord(info) {
  return request.post(base.insertChatRecord, info);
}

/**
 * 获取 用户的 聊天室列表 
 * @param {*} id 用户ID
 * @returns 
 */
export function getUserChatList(id) {
  return request(base.getUserChatList + id);
}

