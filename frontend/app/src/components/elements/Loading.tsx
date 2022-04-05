import React from 'react'
import './Loading.css'
interface Props {
}

const Loading: React.FC<Props> = () => {

  return (
    <div className="loadContainer">
      <div className="dotLoad"></div>    
    </div>
  )
}

export default Loading


