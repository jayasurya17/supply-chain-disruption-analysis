import React from 'react';
import { useDispatch } from 'react-redux';
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

import ProfileOperations from '../../store/features/profile/operations';
import './navbar.css';
import { Button, Dropdown } from 'antd';

const Navbar = (props) => {
    // Dispatch Operations
    const dispatch = useDispatch();
    const setRoute = ProfileOperations.dispatchSetRoute(dispatch);

    const onDashboardClick = () => {
        setRoute('/dashboard');
    };

    const onLoginClick = () => {
        setRoute('/welcome?redirect=' + encodeURIComponent(window.location.pathname));
    }

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
                    (<Dropdown.Button icon={<UserOutlined />}>
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
