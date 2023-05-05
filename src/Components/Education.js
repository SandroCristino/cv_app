import React, { Component } from 'react'
import '../Styles/Education.css'

export default class Education extends Component {
    constructor() {
        super()
        this.state = {
            provider: '',
            topic: '',
            fromDate: '',
            untilDate: '',
            degree: '',
            showAddButton: false,
            educationList: [],
            hoverIndex: '',
        }
        this.handleShowForm = this.handleShowForm.bind(this);
        this.handleInformation = this.handleInformation.bind(this);
    }

    handleShowForm() {
        if (this.state.showAddButton) this.setState({ showAddButton: false })
        else this.setState({ showAddButton: true })
    }

    handleInformation(event) {
        event.preventDefault()
        const { provider, topic, fromDate, untilDate, degree } = event.target.elements;
        const education = {
            provider: provider.value,
            topic: topic.value,
            fromDate: fromDate.value,
            untilDate: untilDate.value,
            degree: degree.value,
        };
        this.setState(prevState => ({ educationList: [...prevState.educationList, education] }));
        localStorage.setItem('educationList', JSON.stringify(this.state.educationList));
        event.target.reset();
    }

    handleDelete(index) {
        const educationList = JSON.parse(localStorage.getItem('educationList')) || [];
        educationList.splice(index, 1);
        localStorage.setItem('educationList', JSON.stringify(educationList));
        this.setState({ educationList });
    }

    componentDidMount() {
        const educationList = localStorage.getItem('educationList');
        if (educationList) this.setState({ educationList: JSON.parse(educationList) });
        
    }

  

    render() {
        const { showAddButton, educationList } = this.state;

        return (
            <div className='text-dark'>
                <div className='border border-5 w-100'></div>
                <h1 className='mt-3 mx-5'>Education</h1>
                <div className='addButton mt-4 ' onClick={ this.handleShowForm }>⊕</div>
                {showAddButton && (
                    <div className="formContainer mx-5 mt-3 ">
                        <form onSubmit={this.handleInformation}>
                            <input className='form-control' type="text" name='provider' placeholder='Provider/ Company'/>
                            <input className='form-control' type="text" name='topic' placeholder='Topic/ Subject'/>
                            <div className="input-group">
                                <span className="input-group-text">From</span>
                                <input className="form-control" type='date' name='fromDate'/>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Until</span>
                                <input className="form-control" type='date' name='untilDate'/>
                            </div>
                            <input className='form-control' type="text" name='degree' placeholder='Degree' />
                            <button className='btn btn-success w-100' onClick={() => this.state.showAddButton = false }>Submit</button>
                        </form>
                    </div>
                )}
             <div className='container mt-3 mb-3'>
                <div className='row'>
                    {educationList.map((education, index) => (
                     <div
                     key={index}
                     className='educationItem mb-3 mx-3'
                     onMouseEnter={() => this.setState({ hoverIndex: index })}
                     onMouseLeave={() => this.setState({ hoverIndex: -1 })}
                    >
                     <div>{education.provider}</div>
                     <div>{education.topic}</div>
                     <div>{education.fromDate} - {education.untilDate}</div>
                     <div>{education.degree}</div>
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
