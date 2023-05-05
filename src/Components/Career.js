import React, { Component } from 'react'
import '../Styles/Career.css'
import Education from './Education';

export default class Career extends Component {
    constructor() {
        super()
        this.state = {
            company: '',
            position: '',
            fromDate: '',
            untilDate: '',
            showAddButton: false,
            careerList: [],
            hoverIndex: '',
        }
        this.handleInformation = this.handleInformation.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
    }

    handleShowButton() {
        if (this.state.showAddButton) this.setState({ showAddButton: false})
        else this.setState({ showAddButton: true})
    }

    handleInformation(event) {
        event.preventDefault();
        const { company, position, fromDate, untilDate} = event.target.elements;
        const career = {
            company: company.value,
            position: position.value,
            fromDate: fromDate.value,
            untilDate: untilDate.value,
        };
        this.setState(prevState => ({ careerList: [...prevState.careerList, career] }))
        localStorage.setItem('carrerList', JSON.stringify(this.state.careerList))
        event.target.reset();
    }

    handleDelete(index) {
        const careerList = JSON.parse(localStorage.getItem('carrerList')) || [];
        careerList.splice(index, 1);
        localStorage.setItem('carrerList', JSON.stringify(careerList));
        this.setState({ careerList });
    }

    componentDidMount() {
        const carrerList = localStorage.getItem('carrerList');
        if (carrerList) this.setState({ carrerList: JSON.parse(carrerList)})
    }


    render() {
        const { showAddButton, careerList } = this.state

        return (
        <div className='text-dark '>
            <div className='border border-5 w-100'></div>
            <h1 className='mx-5 mt-3'>Career</h1>
            <div className='mt-4 addButton' onClick={ this.handleShowButton }>⊕</div>
            {showAddButton && (
                <div className="formContainer mx-5 mt-3 ">
                    <form onSubmit={this.handleInformation}>
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
                        <button className='btn btn-success w-100' onClick={() => this.state.showAddButton = false }>Submit</button>
                    </form>
                </div>
            )}
            <div className='container mt-3 mb-3'>
                <div className='row'>
                    {careerList.map((career, index) => (
                        <div
                        key={index}
                        className='box mb-3 mx-3'
                        onMouseEnter={() => this.setState({ hoverIndex: index})}
                        onMouseLeave={() => this.setState({ hoverIndex: -1 })}
                        >
                        <div>{career.company}</div>
                        <div>{career.position}</div>
                        <div>{career.fromDate} - {career.untilDate}</div>
                        {this.state.hoverIndex === index && (
                              <button
                              className='btn btn-danger'
                              onClick={() => this.handleDelete(index)}
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
}
