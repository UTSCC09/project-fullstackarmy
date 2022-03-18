import React from 'react'
import {Link} from "react-router-dom"

export const Footer = () => {
  return (
    <div>
        <footer>
            <span>
                <Link to="/datasources">Data Sources</Link> | <Link to="/credits">Credits</Link>
            </span>
        </footer>
    </div>
  )
}