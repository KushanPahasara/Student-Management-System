import React, {useEffect, useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    SetLoading(true);
    axios.get(`http://localhost:8070/student/get/${id}`)
    .then((response) => {
       setName(response.data.student.name);
       setAge(response.data.student.age);
       setGender(response.data.student.gender);
       SetLoading(false);
    }).catch((error) => {
      alert('Please check console');
      SetLoading(false);
    });

  }, [])
  const handleEditStudent = () => {
      const data = {
        name,
        age,
        gender,
      };
      SetLoading(true);
      axios
        .put(`http://localhost:8070/student/update/${id}`, data)
        .then(() => {
          SetLoading(false);
          navigate('/');
        })
        .catch((error) => {
          SetLoading(false);
          alert('An error');
          console.log(error);
        });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Age</label>
        <input
          type='text'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Gender</label>
        <input
          type='text'
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleEditStudent}>Save</button>
      </div>

    </div>
  )
}

export default EditStudent
