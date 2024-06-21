import React, { useState, useEffect } from 'react';
import './Updatemembers.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateMember() {
  const [id_number, setId_number] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cell_number, setCell_number] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [age, setAge] = useState('');
  const [member_of, setMember_of] = useState('');
  const [local_church, setLocal_church] = useState('');
  const [from_date, setFrom_date] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [status, setStatus] = useState('active');
  const [published, setPublished] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing member data to populate the form
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4343/api/v1/members/${id}`
        );
        const member = response.data;
        setId_number(member.id_number);
        setName(member.name);
        setSurname(member.surname);
        setCell_number(member.cell_number);
        setDate_of_birth(member.date_of_birth);
        setAge(member.age);
        setMember_of(member.member_of);
        setLocal_church(member.local_church);
        setFrom_date(member.from_date);
        setFather(member.father);
        setMother(member.mother);
        setStatus(member.status);
        setPublished(member.published);
        setSelectedImages(member.selectedImages);
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    fetchMemberData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('id_number', id_number);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('cell_number', cell_number);
    formData.append('date_of_birth', date_of_birth);
    formData.append('age', age);
    formData.append('member_of', member_of);
    formData.append('local_church', local_church);
    formData.append('from_date', from_date);
    formData.append('father', father);
    formData.append('mother', mother);
    formData.append('status', status);
    formData.append('published', published);
    if (selectedImages) {
      formData.append('images', selectedImages);
    }

    try {
      await axios.patch(
        `http://127.0.0.1:4343/api/v1/members/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      navigate('/churchmembers');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='create-member'>
      <div className='create-member-form'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <h2 className='headerUpdate'>Update A Member</h2>
          <button
            type='button'
            className='close-btn'
            onClick={() => (window.location.href = '/churchmembers')}>
            &times;
          </button>

          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='id_number'>ID Number</label>
              <input
                type='text'
                id='id_number'
                placeholder='Enter ID Number'
                className='form-control'
                onChange={(e) => setId_number(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                placeholder='Enter Name'
                className='form-control'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='surname'>Surname</label>
              <input
                type='text'
                id='surname'
                placeholder='Enter Surname'
                className='form-control'
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='cell_number'>Cell Number</label>
              <input
                type='number'
                id='cell_number'
                placeholder='Enter Cell Number'
                className='form-control'
                onChange={(e) => setCell_number(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='date_of_birth'>Date of Birth</label>
              <input
                type='date'
                id='date_of_birth'
                className='form-control'
                onChange={(e) => setDate_of_birth(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='age'>Age</label>
              <input
                type='text'
                id='age'
                placeholder='Enter Age'
                className='form-control'
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='member_of'>Member Of</label>
              <input
                type='text'
                id='member_of'
                placeholder='Enter Member Of'
                className='form-control'
                onChange={(e) => setMember_of(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='local_church'>Local Church</label>
              <input
                type='text'
                id='local_church'
                placeholder='Enter Local Church'
                className='form-control'
                onChange={(e) => setLocal_church(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='from_date'>From Date</label>
              <input
                type='date'
                id='from_date'
                className='form-control'
                onChange={(e) => setFrom_date(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='father'>Father</label>
              <input
                type='text'
                id='father'
                placeholder='Enter Father'
                className='form-control'
                onChange={(e) => setFather(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='mother'>Mother</label>
              <input
                type='text'
                id='mother'
                placeholder='Enter Mother'
                className='form-control'
                onChange={(e) => setMother(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='status'>Status</label>
              <input
                type='text'
                id='status'
                placeholder='Enter status "active or inactive"'
                className='form-control'
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>

          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='image'>Images</label>
              <div className='file-upload'>
                <input
                  type='file'
                  id='image'
                  accept='image/*'
                  multiple
                  className='file-upload-input'
                  onChange={(event) => setSelectedImages(event.target.files[0])}
                />
              </div>
            </div>
          </div>
          <button className='submit-button'>Updata Member</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMember;
