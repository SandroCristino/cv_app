import React from 'react'
import Generalinformation from './Generalinformation'
import Education from './Education'
import Career from './Career'
import '../Styles/OuterPage.css'

function OuterPage() {
  return (
    <div>
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

export default OuterPage
