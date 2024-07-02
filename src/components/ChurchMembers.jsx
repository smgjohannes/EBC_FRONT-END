import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';
import '../style/churchMember.css';
import Profile from './Profile';
import MemberDrawer from './Drawer';
import ContentHeader from './ContentHeader';

const ChurchMembers = () => {
  const [members, setMembers] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://127.0.0.1:4343/api/v1/members', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMembers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:4343/api/v1/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(members.filter((member) => member.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedMember(null);
  };

  return (
    <div className='dashboard'>
      <Sidebar />

      <div className='dashboard--content'>
        <div className='contentheade-post__container--holder'>
          <ContentHeader />
          <div className='post-container'>
            <div className='post-title'>List for Post</div>
            <Link to='/createmember' className='add-button'>
              Add +
            </Link>
            <div className='post-content'>
              <div className='post-table'>
                {' '}
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>CellNo</th>
                      <th>Id Number</th>
                      <th>Status</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((data, i) => (
                      <tr key={i} onClick={() => handleRowClick(data)}>
                        <td>{data.name}</td>
                        <td>{data.surname}</td>
                        <td>{data.cell_number}</td>
                        <td>{data.id_number}</td>
                        <td>{data.status}</td>
                        <td>
                          <Link
                            to={`/updateMember/${data.id}`}
                            className='update-button'>
                            Update
                          </Link>
                          <button
                            className='delete-button'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(data.id);
                            }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <MemberDrawer
          isVisible={drawerVisible}
          member={selectedMember}
          onClose={closeDrawer}
        />
        <Profile />
      </div>
    </div>
  );
};

export default ChurchMembers;
