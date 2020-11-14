import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs, Form, Input, Button, Typography, Row, Col, DatePicker } from 'antd';
import { Redirect } from 'react-router'
import moment from 'moment';

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
  console.log(key);
}

const Welcome = (props) => {

  const [signUpDetails, setSignUpDetails] = useState({});
  const [loginDetails , setLoginDetails] = useState({});

  // Dispatch and Operations
  const dispatch = useDispatch();
  const signUp = operations.dispatchSignUp(dispatch);
  const logIn = operations.dispatchLogIn(dispatch);

  const onSignUpValuesChange = (changedFields, allFields) => {
    setSignUpDetails(allFields);
  };

  const onLoginValuesChange = (changedFields, allFields) => {
    setLoginDetails(allFields);
  };

  /* Triggered when submit button of form is clicked and also the form is valid */
const onSignUpClick = (values) => {
	console.log('Success:', values);
	const user = values;
	user.name = user.fname + ' ' + user.lname;
	delete user.fname;
	delete user.lname;
	signUp(user);
	//props.history.push('/dashboard');
};

const onLoginClick = (values) => {
	console.log('Success:', values);
	const user = values;
	logIn(user);
};

  return (
    <div className="content">
      <Row align="middle">
        <Col span={8}>  
        </Col>
        <Col span={8}>
          <Title>Welcome</Title>
        </Col>
        <Col span={8}>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Sign Up" key="1">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onSignUpClick}
            onValuesChange = {onSignUpValuesChange}
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
              onValuesChange={onLoginValuesChange}
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
    </div>
  );
};

export default Welcome;