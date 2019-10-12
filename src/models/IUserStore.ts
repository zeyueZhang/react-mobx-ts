export interface IUserInfo {
  username: string;
  password: string;
}

export interface IUserStore {
  userInfo: IUserInfo,
  setUserInfo(userInfo:IUserInfo):void;
  setUserInfoToSessionStorage(userInfo:IUserInfo):void;
  getUserInfoFromSessionStorage():IUserInfo;
}