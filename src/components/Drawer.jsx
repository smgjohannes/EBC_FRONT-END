// Drawer.js
import React from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { Link } from 'react-router-dom';

const MemberDrawer = ({ isVisible, member, onClose }) => {
  return (
    <Drawer
      className='drawer-container'
      open={isVisible}
      onClose={onClose}
      direction='right'>
      <div className='drawer-content'>
        <Link to={`/individualpayments`} className='payment-button'>
          Payments
        </Link>
        <button onClick={onClose} className='close-button'>
          Close
        </button>

        {member ? (
          <>
            {member.Images && member.Images.length > 0 && (
              <div className='image_holder'>
                {member.Images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={`Member ${index}`}
                      style={{ width: '100%' }}
                    />
                  </div>
                ))}
              </div>
            )}
            <h2>Member Details</h2>
            <div className='column_container'>
              <p className='drawer--column_container'>
                <strong>Id Number:</strong> {member.id_number}
              </p>
              <p className='drawer--column_container '>
                <strong>Name:</strong> {member.name}
              </p>
            </div>
            <div className='column_container'>
              <p className='drawer--column_container '>
                <strong>Surname:</strong> {member.surname}
              </p>
              <p className='drawer--column_container '>
                <strong>Cell Number:</strong> {member.cell_number}
              </p>
            </div>
            <div className='column_container'>
              <p className='drawer--column_container '>
                <strong>Date Of Bbirth:</strong> {member.date_of_birth}
              </p>
              <p className='drawer--column_container '>
                <strong>Age:</strong> {member.age}
              </p>
            </div>
            <div className='column_container'>
              <p className='drawer--column_container '>
                <strong>Member Of:</strong> {member.member_of}
              </p>
              <p className='drawer--column_container '>
                <strong>Local Church:</strong> {member.local_church}
              </p>
            </div>
            <div className='column_container'>
              <p className='drawer--column_container '>
                <strong>From Date:</strong> {member.from_date}
              </p>
              <p className='drawer--column_container '>
                <strong>Father:</strong> {member.father}
              </p>
            </div>
            <div className='column_container'>
              <p className='drawer--column_container '>
                <strong>Mother:</strong> {member.mother}
              </p>
              <p className='drawer--column_container '>
                <strong>Status:</strong> {member.status}
              </p>
            </div>
          </>
        ) : (
          <p>No member selected.</p>
        )}
      </div>
    </Drawer>
  );
};

export default MemberDrawer;
