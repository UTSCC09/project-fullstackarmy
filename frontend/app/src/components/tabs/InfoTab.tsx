import React, { CSSProperties } from 'react'
import {useSpring, animated} from 'react-spring'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import bgdImg from '../../media/bgd.gif'
import worldImg from '../../media/world.png'
import destinationImg from '../../media/destination.png'
import vaccineImg from '../../media/vaccine.png'
import arrowImg from '../../media/arrow.png'

export const InfoTab = () => {
  // style for parallax layer 1 'Scroll Down' arrow
  const arrowStyle = useSpring(
    {loop: true, to: [{top: '80px'}, { opacity: 0, top: '70px'}],
    from: {position: 'relative' as 'relative', top: '70px', color:'#D84C77'},
    delay: 200,
  })
  // style for parallax layer 2 progress bar animation
  const progressBarStyle = useSpring(
    {loop: true, to: [{width: '50%', backgroundColor:'orange'}, {width: '75%', backgroundColor:'#AEF359'}, {width: '100%', backgroundColor:'#3CB043'}],
    from: {height: '20px', width: '25%', backgroundColor:'red', display:'flex', justifyContent: 'center',  color:'black'},
    delay: 500,
  })
  // style for parallax layer 3 world population animation
  const worldStyle = useSpring(
    {loop: true, to: [{transform:'rotate(20deg)'}, {transform:'rotate(40deg)'}, {transform:'rotate(60deg)'}, 
    {transform:'rotate(80deg)'}, {transform:'rotate(100deg)'}, {transform:'rotate(120deg)'},
    {transform:'rotate(140deg)'}, {transform:'rotate(160deg)'}, {transform:'rotate(180deg)'}],
    from: {transform:'rotate(0deg)'},
  })
  // style for parallax layer 4 destination animation
  const destStyle = useSpring(
    {loop: true, to: [{top: '50px'}, { top: '5px'}],
    from: {position: 'relative' as 'relative', top: '5px', alignSelf: 'flex-end'},
    delay: 100,
  })
  // style for parallax layer 5 arrow animation
  const upArrowStyle = useSpring(
    {loop: true, to: [{top: '100px'}, { top: '1px'}],
    from: {position: 'relative' as 'relative', top: '1px'},
    delay: 100,
  })

  return (
    <div>
      <Parallax pages={5} style={{backgroundImage: `url(${bgdImg})`, backgroundSize: '100%'}}>
        {/* layer 1 - title */}
        <ParallaxLayer speed={3.5} offset={0} style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#2148c0'}}>
          <h3 >Vaccination and Herd Immunity</h3>
          <h1 style={{fontSize: '40px'}}>WHAT IS HERD IMMUNITY ?</h1>
          <animated.div style={arrowStyle}><h3>Scroll Down</h3></animated.div>
          <animated.div style={arrowStyle}>⬆️</animated.div>
        </ParallaxLayer>
        {/* layer 2 - definition of herd immunity */}
        <ParallaxLayer speed={2} offset={0.9} style={{backgroundColor:"#4169E1"}}>
        </ParallaxLayer>
        <ParallaxLayer speed={0.5} offset={0.4} style={{display:"flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color:'white'}}>
          <p style={{fontSize: '25px'}}>Herd Immunity occurs when a sufficient proportion of the population develops immunity to a disease.</p>
          <animated.div style={progressBarStyle}>Towards Herd Immunity</animated.div>
        </ParallaxLayer>
        {/* layer 3 - result of herd immunity */}
        <ParallaxLayer speed={2} offset={1.9} style={{backgroundColor:"#FF9912"}}>
        </ParallaxLayer>
        <ParallaxLayer speed={0.5} offset={1.4} style={{display:"flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color:'white', fontSize: '25px'}}>
          <div style={{display:'flex'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
              <p >If herd immunity is achieved </p>
              <p>the disease will stop circulating and </p>
              <h2>all of the population</h2>
              <p>including those who have immunity and those who do not will be protected </p>
            </div>
            <div>
              <ParallaxLayer speed={4} offset={1.9} style={{display:'flex', justifyContent: 'flex-end'}}>
                <img style={{width:'250px', height:'250px', marginRight: '40px'}} src={worldImg}></img>
              </ParallaxLayer>
            </div>
          </div>  
        </ParallaxLayer>
        {/* layer 4 - COVID-19 herd immunity */}
        <ParallaxLayer speed={2} offset={2.9} style={{backgroundColor:"#03A89E"}}>
        </ParallaxLayer>
        <ParallaxLayer speed={0.5} offset={2.4} style={{display:"flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color:'white', fontSize: '20px'}}>
          <div style={{display:'flex', flexDirection:'column'}}>
            <h3 style={{alignSelf: 'flex-start'}}>For COVID-19</h3>
            <p>the percentage of the population that needs to be vaccinated to achieve herd immunity is speculated by experts to be around </p>
            <animated.div style={destStyle}>
              <h2>80%  -  90%</h2>
              <img style={{width:'215px', height:'186.75px'}} src={destinationImg}></img>
            </animated.div>
          </div>
        </ParallaxLayer>
        {/* layer 5 - vaccination and introduction of other tabs */}
        <ParallaxLayer speed={2} offset={3.9} style={{backgroundColor:"white"}}>
        </ParallaxLayer>
        <ParallaxLayer speed={0.5} offset={3.4} style={{display:"flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color:'black', fontSize: '15px'}}>
          <div style={{display:'flex'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
              <img style={{width:'150px', height:'150px'}} src={vaccineImg}></img>
              <h4>Vaccination is key for providing prolonged lasting immunity and ahcieving herd immunity</h4>
              <p>To learn more about the progress towards herd immunity against COVID-19, browse the data models in the tabs above</p>
            </div>
            <animated.div style={upArrowStyle}>
              <img style={{width:'68px', height:'136px'}} src={arrowImg}></img>
            </animated.div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}