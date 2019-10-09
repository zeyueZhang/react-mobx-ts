
import React, { Component } from 'react';
import lessStyles from './index.module.less'
import styles from './index.module.css';
import { inject, observer } from 'mobx-react';
import { IHomeStore } from '@/models/IHomeStore';

interface IHomeProps {
  homeStore?: IHomeStore
}

@inject('homeStore')
@observer
class Home extends Component<IHomeProps, object> {

  componentDidMount() {
    setTimeout(() => {
      this.props.homeStore!.setTitle('hhh')
    }, 2000)
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
