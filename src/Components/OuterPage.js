import React, { Component } from 'react'
import Generalinformation from './Generalinformation'
import Education from './Education'
import Career from './Career'
import '../Styles/OuterPage.css'

class OuterPage extends Component {
  render() {
    return (
      <div className='outer-page'>
        <header>My CV</header>
        <main>
          <Generalinformation />
          <Education />
          <Career />
        </main>
        <footer>&copy; 2023 My CV</footer>
      </div>
    )
  }
}

export default OuterPage
