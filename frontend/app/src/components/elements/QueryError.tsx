import React from 'react'
import './QueryError.css'
interface Props {
    message: string
}

const QueryError: React.FC<Props> = ({message}) => {

  return (
    <div className="errorMsg">
        <h1> Error: {message} </h1>
    </div>    
  )
}

export default QueryError
