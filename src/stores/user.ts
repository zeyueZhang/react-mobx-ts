import {action, computed, observable} from 'mobx'
import { IUserStore, IUserInfo } from '../models/IUserStore'
import { setSessionStorage, getSessionStorage } from '../utils/util';

class UserStore implements IUserStore {
    @observable  public userInfo:IUserInfo = {
      username: '',
      password: ''
    }
    @computed
    public get getUserInfo(): IUserInfo {
        return this.userInfo
    }

    @action
    public getUserInfoFromSessionStorage(): IUserInfo{
      this.userInfo = getSessionStorage('userInfo') ? JSON.parse(getSessionStorage('userInfo')!) : this.userInfo
      return this.userInfo
    }

    @action
    public setUserInfo(userInfo: IUserInfo): void{
      this.userInfo = {...userInfo}
    }

    @action
    public setUserInfoToSessionStorage(userInfo: IUserInfo): void{
      setSessionStorage('userInfo', { ...userInfo })
      this.userInfo = {...userInfo}
    }
}

export default UserStore;