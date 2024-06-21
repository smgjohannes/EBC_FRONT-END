import React from 'react';
import Image1 from '../assets/img.jpg';
import Image2 from '../assets/2.jpg';
import Image3 from '../assets/image.jpg';
import '../style/memberList.css';

const members = [
  {
    image: Image1,
    name: 'Johannes Shishasha',
    cellNo: '081 333 1245',
    address: 'Oshitenda',
  },
  {
    image: Image2,
    name: 'Gloria Shishasha',
    cellNo: '081 333 1245',
    address: 'Oshitenda',
  },
  {
    image: Image3,
    name: 'Gloria  Johannes',
    cellNo: '081 333 1245',
    address: 'Otjomuise',
  },
];
const MemberList = () => {
  return (
    <div className='member--list'>
      <div className='list--header'>
        <h2>Access Admins</h2>
        <select>
          <option value='english'>English</option>
          <option value='rumanyo'>Rumanyo</option>
        </select>
      </div>
      <div className='list--container'>
        {members.map((member) => (
          <div className='list'>
            <div className='member--detail'>
              <img src={member.image} alt={member.name} />
              <h2>{member.name}</h2>
            </div>
            <span>{member.cellNo}</span>
            <span>{member.address}</span>
            <span className='member--todo'>:</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
