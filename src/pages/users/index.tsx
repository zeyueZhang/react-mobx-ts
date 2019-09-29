import React, { Component } from 'react';
import styles from './index.module.less';
import { Form, Table, Card, Button, Modal, Input } from 'antd';
import http from '@/server';

type State = {
  tableData: {
    value: any[],
    loading: boolean,
    pagination: any
  },
  modalData: {
    visible: boolean,
    value: {
      age?: number,
      id?: number,
      name?: string
    },
    type: string
  }
}

class Users extends Component<any, State> {

  state = {
    tableData: {
      value: [],
      loading: false,
      pagination: false
    },
    modalData: {
      visible: false,
      value: {
        id: 1,
        age: 1,
        name: ''
      },
      type: 'add'
    }
  }

  columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text: string | undefined, record: {id: number, age: number, name: string}) => (
        <div className={styles.operation}>
          <Button className={styles.operationBtn} type="primary" size="small" onClick={() => this.showModal('edit', record)}>编辑</Button>  
          <Button className={styles.operationBtn} type="danger" size="small" onClick={() => this.deleteUser(record.id)}>删除</Button>
        </div>
      )
    }
  ]

  fetchUserList=() => {
    http.get('/users/list',{

    }).then((res: any) => {
      this.setState({
        tableData: {
          loading: false,
          value: res.data,
          pagination: false
        }
      })
    }).catch((err: any) => {
      console.log(err);
    })
  }

  deleteUser = (id: number) => {
    const _this = this
    Modal.confirm({
      title: '操作确认',
      content: '确认删除吗?',
      onOk: () => {
        http.post('/users/delete', {
          id,
        }).then((res: any) => {
          _this.fetchUserList()
        }).catch((err: any) => {
          console.log(err)
        })
      }
    })
  }

  showModal = (type: string, record: {id?: number, age?: number, name?: string}) => {
    this.setState({
      modalData: {
        visible: true,
        value: {
          ...record
        },
        type
      }
    })
    this.props.form.setFieldsValue({
      name: record.name,
      age: record.age
    })
  }

  hideModal = () => {
    this.setState({
      modalData: {
        visible: false,
        value: {},
        type: 'add'
      }
    })
  }

  addUser = (params: {name: string, age: number}) => {
    http.post('/users/add', params)
      .then(res => {
        this.setState({
          modalData: {
            ...this.state.modalData,
            visible: false
          }
        })
        this.fetchUserList()
      }).catch((err: any) => {
        console.log(err)
      })
  }

  editUser = (params: {id: number, age: number, name: string}) => {
    http.post('/users/update', params)
      .then(res => {
        this.setState({
          modalData: {
            ...this.state.modalData,
            visible: false
          }
        })
        this.fetchUserList()
      }).catch((err: any) => {
        console.log(err)
      })
  }

  handleModalSubmit = (e:any) => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:{name: string, age: number}) => {
      if (!err) {
        const { type, value } = this.state.modalData
        if(type==='edit') {
          this.editUser({
            ...values,
            id: value.id
          })
        }else {
          this.addUser(values)
        }
        
      }
    });
  }

  componentDidMount() {
    this.fetchUserList()
  }

  render() {
    const {
      tableData,
      modalData
    } = this.state
    const { getFieldDecorator } = this.props.form
    return(
      <div className={styles.main}>
        <Button type="primary" onClick={() => this.showModal('add', {})}>添加用户</Button>
        <Card
          title="userTable"
          bordered
          size="small"
        >
          <Table
            columns={this.columns}
            dataSource={tableData.value}
            loading={tableData.loading}
            pagination={false}
            rowKey={(record:{id: number}) => String(record.id)}
          />
        </Card>
        <Modal
          visible={modalData.visible}
          title="操作"
          onOk={this.handleModalSubmit}
          onCancel={this.hideModal}
        >
          <Form>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('age', {
                rules: [{ required: true, message: 'Please input your userage!' }],
              })(
                <Input
                  type="number"
                  placeholder="Userage"
                />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(Users)