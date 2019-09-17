
import React, { Component } from 'react';
import lessStyles from './index.module.less'
import styles from './index.module.css';
import { inject, observer } from 'mobx-react';
import { IHomeStore } from '@/models/IHomeStore';

interface IHomeProps {
  homeStore?: IHomeStore  //  这里比较关键 ？表示可或缺，如果没有就会报错。
}

@inject('homeStore')
@observer
class Home extends Component<IHomeProps, object> {
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
