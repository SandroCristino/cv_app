/* eslint-disable no-const-assign */
import React, { useState } from 'react'
import '../Styles/Generalinformation.css';

function Generalinformation() {
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');
    const [showDownloadButton, setShowDownloadButton] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;
        switch ( name) {
            case 'gender':
                setGender(value)
                break;
            case 'name':
                setName(value);
                break;
            case 'surname':
                setSurname(value)
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'email':
                setEmail(value);
                break;
            default:
                break;
        }
    }   

    function handleUpload(event) {
        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPicture(event.target.result);
                localStorage.setItem("Photo",reader.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    return(
        <div className="mainContainer container d-flex w-100 align-items-center justify-content-center">
            <div className='imageContainer col-md-3'  onMouseEnter={() => { setShowDownloadButton(true) }} onMouseLeave={() => { setShowDownloadButton(false) }}>
                <img src={picture} alt="Profile" className='rounded-circle'/>
                {showDownloadButton && <input type='file' onChange={handleUpload} />}
            </div>
            <form className='w-100 col-md-9'>
            <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    className="form-control"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary/different">Non-binary/different</option>
                </select>
            </div>
            <div className="form-group">
                <input type="text" name="name" className="form-control" value={name} placeholder='Name' onChange={handleChange} />
            </div>
            <div className="form-group">
                <input type="text" name="surname" className="form-control" value={surname} placeholder='Surname' onChange={handleChange} />
            </div>
            <div className="form-group">
                <input type="text" name="phone" className="form-control" value={phone} placeholder='Phone' onChange={handleChange} />
            </div>
            <div className="form-group">
                <input type="text" name="email" className="form-control" value={email} placeholder='Email' onChange={handleChange} />
            </div>
            </form>
    </div>
    )
}

export default Generalinformation
