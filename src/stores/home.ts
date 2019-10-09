import {action, computed, observable} from 'mobx'
import {IHomeStore} from '../models/IHomeStore'

class HomeStore implements IHomeStore {
    @observable  public title: string = "ho2me"

    @computed
    public get writeTitle(): string {
        return `hello ${this.title}`
    }

    @action
    public setTitle(title: string): void{
        this.title = title
    }
}

export default HomeStore;