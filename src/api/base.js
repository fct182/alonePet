const base = {
  baseUrl: "/api",
  TestData: "/homedatas", // 测试 axios 跨域请求
  VerifyUserAccount: "/users/verifyUserAccount", // 验证输入的手机号是否已被注册
  UserRegister: "/users/register", // 用户注册
  UserLogin: "/users/login", // 用户登录
  UserInfo: "/users/getUserInfo/", // 获取用户信息  + params参数
  EditUserName: "/users/editUsername", // 修改用户的昵称
  EditUserSex: "/users/editUserSex", // 修改用户的性别
  EditUserAddress: "/users/editUserAddress", // 修改用户的地址
  EditUserSignature: "/users/editUserSignature", // 修改用户的个性签名
  UploadHeadshots: "/users/uploadHeadshots", // 上传用户的头像
  UploadQbw: "/upload/uploadQbw", // 上传 犬鼻纹照片
  getPetInfo: "/pet/getInfo/", // 获取宠物狗的信息 + params参数
  insertPet: "/pet/registerPet", // 新增流浪宠物狗信息
  uploadPetPic: "/upload/uploadPetImg", // 上传宠物狗的日常照片
  findMyPet: "/upload/findMyPet",   // 找寻丢失的宠物狗(上传犬鼻纹寻找)
  getAllPartInfo: "/pet/getAllPartInfo/",   // 获取 区间范围内的宠物部分信息 + params参数
  getPetAddress: "/pet/getPetAddress/",   // 获取宠物狗的位置 + params参数
  getPetBanner: "/pet/getPetBanner",    // 获取宠物的轮播图
  getSearchPet: "/pet/search/",   // 获得搜索后的宠物列表 + params参数
  verifyPetQbw: "/pet/verifyQbw/",   // 获得搜索后的宠物列表 + params参数
  submitHelp: "/pet/submitHelp", // 提交宠物的 救助 表单信息
  submitFeed: "/pet/submitFeed", // 提交宠物的 投喂 表单信息
  getUserFeedingRecord: "/users/getUserFeedingRecord/", // 获取 用户的投喂记录 + params参数(用户ID)
  getUserRescueRecord: "/users/getUserRescueRecord/", // 获取 用户的救助、领养记录 + params参数(用户ID)
  getUserPublishRecord: "/users/getUserPublishRecord/", // 获取 发布流浪狗信息 记录 + params参数(用户ID)
  dealLocation: "https://apis.map.qq.com/ws/geocoder/v1/?location=", // 百度地图地址解析服务
  insertChatRecord: "/users//insertChatRecord",   // 插入用户聊天室列表记录 
  getUserChatList: "/users/getUserChatList/", // 获取 用户的投喂记录 + params参数(用户ID)
}
export default base