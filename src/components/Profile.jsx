import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileHeader from './ProfileHeader';
import '../style/profile.css';
import userImage from '../assets/image.jpg';
import { BiLocationPlus } from 'react-icons/bi';

const userAddress = [
  {
    Location: 'Johannes Gloria',
    date_of_birth: '20/05/1995',
    icon: <BiLocationPlus />,
  },
];

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://127.0.0.1:4343/api/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='profile'>
      <ProfileHeader />
      <div className='user--profile'>
        <div className='user--detail'>
          <img src={userImage} alt='User' />
          <h3 className='username'>{user.name || 'Johannes Gloria'}</h3>
          <span className='profession'>{user.email || 'Secretary'}</span>
        </div>
        <div className='user-infor'>
          {userAddress.map((address, index) => (
            <div className='address' key={index}>
              <div className='address-detail'>
                <div className='address-cover'>{address.icon}</div>
                <div className='address-name'>
                  <h5 className='Location'>{address.Location}</h5>
                  <span className='date_of_birth'>{user.role}</span>
                </div>
              </div>
              <div className='action'>:</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
