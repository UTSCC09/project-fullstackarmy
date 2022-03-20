import { useState } from "react"
import Logo from "./Logo"
import Icon from "./Icon"
import Button from "./Button"
import TabHeader from "./TabHeader"
import {GoGear} from 'react-icons/go'
import {BiInfoSquare} from 'react-icons/bi'
import {BiWorld} from 'react-icons/bi'
import {AiOutlineLineChart} from 'react-icons/ai'
import {BiBarChartSquare} from 'react-icons/bi'

export const Header = () => {
  const currentPath = window.location.pathname
  return (
    <header>
      <div className="nav-bar">
        <div className="top-bar">
          <Logo />
          <div className="top-bar-btns">
            <Icon icon={GoGear}/>
            <Button text="Login" color="#FFFFFF"/>
            <Button text="Sign Up" color="#00ACEA"/>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="tabs">
            <TabHeader title="Background Information " icon={BiInfoSquare} selected={currentPath === '/background-information' ? true : false} path="/background-information"/>
            <TabHeader title="Vaccination Status " icon={BiWorld} selected={currentPath === '/vaccination-status' ? true : false} path="/vaccination-status"/>
            <TabHeader title="Vaccination Rates " icon={AiOutlineLineChart} selected={currentPath === '/vaccination-rates' ? true : false} path="/vaccination-rates"/>
            <TabHeader title="Vaccination Distribution " icon={BiBarChartSquare} selected={currentPath === '/vaccination-distribution' ? true : false} path="/vaccination-distribution"/>
          </div>
        </div>
      </div>
    </header>
  )
}

