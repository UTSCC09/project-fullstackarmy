// rafc creates arrow function
import Logo from "./Logo"
import Icon from "./Icon"
import Button from "./Button"
import TabHeader from "./TabHeader"
import customizeImg from "../media/gear.png"
import infoImg from "../media/info.png"
import barsImg from "../media/bar-chart.png"
import trendImg from "../media/trend.png"
import mapImg from "../media/map.png"

export const Header = () => {
  return (
    <header>
      <div className="top-bar">
        <Logo />
        <div className="top-bar-btns">
          <Icon imgPath={customizeImg}/>
          <Button text="Login" color="#FFFFFF"/>
          <Button text="Sign Up" color="#00ACEA"/>
        </div>
      </div> 
      <div className="nav-bar">
        <div className="tabs">
          <TabHeader title="Tab 1" imgPath={infoImg}/>
          <TabHeader title="Tab 2" imgPath={barsImg}/>
          <TabHeader title="Tab 3" imgPath={trendImg}/>
          <TabHeader title="Tab 4" imgPath={mapImg}/>
        </div>
      </div>
    </header>
  )
}

