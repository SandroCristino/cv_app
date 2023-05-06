import React, { useState, useEffect } from 'react'
import '../Styles/Career.css'

function Career() {
    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [untilDate, setUntilDate] = useState('')
    const [showAddButton, setShowAddButton] = useState(false)
    const [careerList, setCareerList] = useState([])
    const [hoverIndex, setHoverIndex] = useState(-1)

    function handleShowButton() {
        setShowAddButton(prev => !prev)
    }

    function handleInformation(event) {
        event.preventDefault();
        const { company, position, fromDate, untilDate } = event.target.elements
        const career = {
            company: company.value,
            position: position.value,
            fromDate: fromDate.value,
            untilDate: untilDate.value,
        }
        setCareerList(prevState => [...prevState, career])
        localStorage.setItem('careerList', JSON.stringify([...careerList, career]))        
        event.target.reset();
    }

    function handleDelete(index){
        const loadingList = JSON.parse(localStorage.getItem('careerList')) || []
        loadingList.splice(index, 1)
        localStorage.setItem('careerList', JSON.stringify(loadingList))
        setCareerList(loadingList);
    }

    useEffect(() => {
        const careerListFromStorage = localStorage.getItem('careerList')
        if (careerListFromStorage) setCareerList(JSON.parse(careerListFromStorage))
    }, [])

    return (
        <div className='text-dark '>
            <div className='border border-5 w-100'></div>
            <h1 className='mx-5 mt-3'>Career</h1>
            <div className='mt-4 addButton' onClick={ handleShowButton }>⊕</div>
            {showAddButton && (
            <div className="formContainer mx-5 mt-3 ">
                <form onSubmit={handleInformation}>
                    <input className='form-control' type="text" name='company' placeholder='Company'/>
                    <input className='form-control' type="text" name='position' placeholder='Position'/>
                    <div className="input-group">
                        <span className="input-group-text">From</span>
                        <input className="form-control" type='date' name='fromDate'/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Until</span>
                        <input className="form-control" type='date' name='untilDate'/>
                    </div>
                    <button className='btn btn-success w-100' onClick={() => setShowAddButton(false) }>Submit</button>
                </form>
            </div>
        )}
        <div className='container mt-3 mb-3'>
            <div className='row'>
                {careerList.map((career, index) => (
                    <div
                    key={index}
                    className='box mb-3 mx-3'
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(-1)}
                    >
                    <div>{career.company}</div>
                    <div>{career.position}</div>
                    <div>{career.fromDate} - {career.untilDate}</div>
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

export default Career;