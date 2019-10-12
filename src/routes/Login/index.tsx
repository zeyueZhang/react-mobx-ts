import React, { Component } from 'react';
import styles from './index.module.less';
import { Form, Button, Icon, Input, Checkbox } from 'antd';
import { authenticateSuccess } from '../../utils/util'
import { inject, observer } from 'mobx-react';

@inject('userStore') @(Form.create() as any)
@observer
class Login extends Component<any, any> {

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: {}, values: {username: string, password: string}) => {
      if (!err) {
        authenticateSuccess(values.username + values.password)
        this.props.userStore!.setUserInfoToSessionStorage(values)
        
        const pathname = this.props.location.state ? this.props.location.state.from.pathname : '/'
        this.props.history.replace(pathname)
        console.log('Received values of form: ', values);
      }
    });
  };

  componentDidMount() {
    console.log(this.props.location.state)
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className={styles.loginForgot} href="/">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>
              Log in
            </Button>
            Or <a href="/">register now!</a>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Login