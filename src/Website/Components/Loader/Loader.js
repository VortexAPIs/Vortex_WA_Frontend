import React from 'react'
import loader from '../../Assets/Vortex_Loader.gif'

function Loader() {
  return (
    <div className="loader-container">
        <img src={loader} height={79} width={219} />
    </div>
  )
}

export default Loader
