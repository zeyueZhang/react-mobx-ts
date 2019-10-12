
import React, { Component } from 'react';
import lessStyles from './index.module.less'
import styles from './index.module.css';
import { inject, observer } from 'mobx-react';
import { IHomeStore } from '@/models/IHomeStore';
import { IUserStore } from '@/models/IUserStore';

interface IHomeProps {
  homeStore?: IHomeStore,
  userStore?: IUserStore
}

@inject('homeStore', 'userStore')
@observer
class Home extends Component<IHomeProps, object> {

  componentDidMount() {
    console.log(this.props.userStore!.getUserInfoFromSessionStorage().username, this.props.homeStore!)
  }

  public render() {
    const {title} = this.props.homeStore!

    return (
      <div className={lessStyles.home}>
       	<p>{title}<span className={styles.ss}>222</span></p> 
      </div>
    );
  }
}
 
export default Home;
