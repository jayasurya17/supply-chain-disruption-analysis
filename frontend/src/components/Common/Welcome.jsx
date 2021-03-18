import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs, Form, Input, Button, Typography, Row, Col, DatePicker } from 'antd';
import * as R from 'ramda';


import operations from '../../store/features/profile/operations';
import './Welcome.css';

const { Title } = Typography;
const { TabPane } = Tabs;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
};

function callback(key) {
//   console.log(key);
}

const Welcome = (props) => {

  const [currentTab, setCurrenTab] = useState('1');

  // Dispatch and Operations
  const dispatch = useDispatch();
  const signUp = operations.dispatchSignUp(dispatch);
  const logIn = operations.dispatchLogIn(dispatch);

  const onTabChange = (key) => {
    setCurrenTab(key);
  }

  /* Triggered when submit button of form is clicked and also the form is valid */
  const onSignUpClick = (values) => {
    // console.log('Success:', values);
    const user = values;
    user.name = user.fname + ' ' + user.lname;
    delete user.fname;
    delete user.lname;
    signUp(user);
    //props.history.push('/dashboard');
  };

  const onLoginClick = (values) => {
    // console.log('Success:', values);
      const user = values;
      
      let redirectURL;
      if(!R.isNil(props.location.search) && !R.isEmpty(props.location.search)) {
          let temp = decodeURIComponent(props.location.search);
          let s = temp.split('=');
          redirectURL = s[1];
      }
    logIn({
          user,
          redirectURL,
      });
  };

  return (
    <div className='container-welcome'>
      <div className='content-welcome'>
        <Row align="middle">
          <Col span={8}>
            <div style={{backgroundImage: 'linear-gradient(253deg,#3ba5b4 0,#38ba8a 100%)', textAlign: 'center', padding: '70% 0% 70% 0%', fontSize: '20px', color: 'white'}}>
              {currentTab == '1'?
                <div>
                  New here?
                  <br />
                  Sign up!
                </div>:
                <div>
                  Old user?
                  <br />
                  Login to your account.
                </div>}
            </div>  
          </Col>
          <Col span={16} style={{paddingLeft: '2%'}}>
            <Tabs defaultActiveKey={currentTab} onChange={onTabChange}>
              <TabPane tab="Sign Up" key="1">
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onSignUpClick}
                >
                  <Form.Item
                    label="First Name"
                    name="fname"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your First Name!',
                      },
                    ]}
                    
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="lname"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Last Name!',
                      },
                    ]}
                    
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                    
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                    ]}
                    
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    rules={[
                      {
                        type : 'object',
                        required: true,
                        message: 'Please input your date of birth!',
                      },
                    ]}
                    
                  >
                    <DatePicker format={'YYYY/MM/DD'} />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Log In" key="2">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onLoginClick}
                  >
                    <Form.Item
                      label="Email"
                      name="loginId"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your username (Email)!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Log In
                      </Button>
                    </Form.Item>
                  </Form>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Welcome;