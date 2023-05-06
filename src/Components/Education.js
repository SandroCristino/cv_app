import React, { useState, useEffect } from 'react'
import '../Styles/Education.css'

function Education() {
    const [provider, setProvider] = useState('');
    const [topic, setTopic] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [untilDate, setUntilDate] = useState('');
    const [degree, setDegree] = useState('');
    const [showAddButton, setShowAddButton] = useState(false);
    const [educationList, setEducationList] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(-1);

    function handleShowForm() {
        setShowAddButton(prev => !prev)
    }

    function handleInformation(event) {
        event.preventDefault();
        const { provider, topic, fromDate, untilDate, degree } = event.target.elements;
        const education = {
          provider: provider.value,
          topic: topic.value,
          fromDate: fromDate.value,
          untilDate: untilDate.value,
          degree: degree.value,
        };
        setEducationList(prevEducationList => [...prevEducationList, education]);
        localStorage.setItem('educationList', JSON.stringify([...educationList, education]));
        event.target.reset();
      }
      

    function handleDelete(index) {
        const educationList = JSON.parse(localStorage.getItem('educationList'))
        educationList.splice(index, 1);
        localStorage.setItem('educationList', JSON.stringify(educationList))
        setEducationList(educationList)
    }

    useEffect(() => {
        const educationListFromStorage = JSON.parse(localStorage.getItem('educationList'));
        if (educationListFromStorage) {
          setEducationList(educationListFromStorage);
        }
    }, []);

    return(
        <div className='text-dark'>
            <div className='border border-5 w-100'></div>
            <h1 className='mt-3 mx-5'>Education</h1>
            <div className='addButton mt-4 ' onClick={ handleShowForm }>⊕</div>
            {showAddButton && (
            <div className="formContainer mx-5 mt-3 ">
                <form onSubmit={handleInformation}>
                    <input className='form-control' type="text" value={provider} name='provider' placeholder='Provider/ Company' onChange={(event) => setProvider(event.target.value)}/>
                    <input className='form-control' type="text" value={topic} name='topic' placeholder='Topic/ Subject' onChange={(event) => setTopic(event.target.value)}/>
                    <div className="input-group">
                        <span className="input-group-text">From</span>
                        <input className="form-control" type='date' value={fromDate} name='fromDate' onChange={(event) => setFromDate(event.target.value)}/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Until</span>
                        <input className="form-control" type='date' value={untilDate} name='untilDate' onChange={(event) => setUntilDate(event.target.value)}/>
                    </div>
                    <input className='form-control' type="text" value={degree} name='degree' placeholder='Degree' onChange={(event) => setDegree(event.target.value)} />
                    <button className='btn btn-success w-100' onClick={() => setShowAddButton(false) } type='submit'>Submit</button>
                </form>
            </div>
        )}
        <div className='container mt-3 mb-3'>
        <div className='row'>
            {educationList.map((education, index) => (
                <div
                key={index}
                className='educationItem mb-3 mx-3'
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
            >
                <div>{education.provider}</div>
                <div>{education.topic}</div>
                <div>{education.fromDate} - {education.untilDate}</div>
                <div>{education.degree}</div>
                {hoverIndex === index && (
                <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(index)}
                >
                    Delete
                </button>
                )}
            </div>
            ))}
        </div>
    </div>
    </div>
    )
}

export default Education