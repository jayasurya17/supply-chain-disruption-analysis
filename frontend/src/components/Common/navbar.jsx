import React from 'react';
import { useDispatch } from 'react-redux';
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, message } from 'antd';

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
        }
    }

    const handleLogOut = () => {
        logOut();
        window.location.reload();
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Update Profile
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Log Out
          </Menu.Item>
        </Menu>
    );

    return (
        <div className='row text-center border-bottom pt-4 pb-2 stickyNavBar bg-light'>
            <div className='col-md-2'>
                <span>
                    <HomeOutlined onClick={onDashboardClick} />
                </span>
            </div>
            <div className='col-md-2 offset-md-8'>
                {
                    (props.user && 
                    props.user.name) ? 
                    (<Dropdown.Button icon={<UserOutlined />} overlay={menu}>
                        {`Hi ${props.user.name} !`}
                    </Dropdown.Button>)  :
                    (<Button onClick={onLoginClick}>
                        Login
                    </Button>)

                }
            </div>
        </div>
    );
}
//export Navbar Component
export default Navbar
