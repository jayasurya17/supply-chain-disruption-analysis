import React from 'react';
import { useDispatch } from 'react-redux';
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Dropdown, Menu, Row } from 'antd';

import ProfileOperations from '../../store/features/profile/operations';
import './navbar.css';

const Navbar = (props) => {
    // Dispatch Operations
    const dispatch = useDispatch();
    const setRoute = ProfileOperations.dispatchSetRoute(dispatch);
    const logOut = ProfileOperations.dispatchLogOut(dispatch);

    const onDashboardClick = () => {
        setRoute('/dashboard');
    };

    const onLoginClick = () => {
        setRoute('/welcome?redirect=' + encodeURIComponent(window.location.pathname));
    }

    const handleMenuClick =(e) => {

        switch(e.key) {
            case '2':
                return handleLogOut();
            default:
                return null
        }
    }

    const handleLogOut = () => {
        logOut();
        window.location.reload();
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Log Out
          </Menu.Item>
        </Menu>
    );

    return (
      <Row className='stickyNavBar'>
        <Col span='4' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <span>
            <HomeOutlined onClick={onDashboardClick} />
          </span>
        </Col>
        <Col offset='16' span='4' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {
            (props.user && 
            props.user.name) ? 
            (<Dropdown.Button icon={<UserOutlined />} overlay={menu}>
                {`Hi ${props.user.name} !`}
            </Dropdown.Button>)  :
            (<Button onClick={onLoginClick} type='primary'>
                Login
            </Button>)
          }
        </Col>  
      </Row>  
    );
}
//export Navbar Component
export default Navbar
