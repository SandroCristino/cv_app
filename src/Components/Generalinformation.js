import React, { Component } from 'react'
import '../Styles/Generalinformation.css';

class Generalinformation extends Component {
    constructor() {
        super()
        this.state = {
            gender: '',
            name: '',
            surname: '',
            phone: '',
            email: '',
            picture: '', 
            showDownloadButton: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleUpload = event => {
        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
              this.setState({ picture: event.target.result });
              localStorage.setItem("Photo",reader.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    render() {
        return (
            <div className="mainContainer container d-flex w-100 align-items-center justify-content-center">
                <div className='imageContainer col-md-3'  onMouseEnter={() => this.setState({ showDownloadButton: true })} onMouseLeave={() => this.setState({ showDownloadButton: false })}>
                    <img src={this.state.picture} alt="Profile" className='rounded-circle'/>
                    {this.state.showDownloadButton && <input type='file' onChange={this.handleUpload} />}
                </div>
                <form className='w-100 col-md-9'>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        className="form-control"
                        value={this.state.gender}
                        onChange={e => this.setState({ gender: e.target.value })}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary/different">Non-binary/different</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" name="name" className="form-control" placeholder='Name' onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" name="surname" className="form-control" placeholder='Surname' onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" name="phone" className="form-control" placeholder='Phone' onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" name="email" className="form-control" placeholder='Email' onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" name="website" className="form-control" placeholder='Website' onChange={this.handleChange} />
                </div>
                </form>
          </div>
        )
  }
}

export default Generalinformation
