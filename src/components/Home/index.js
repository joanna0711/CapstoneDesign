import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
// import AnimatedLetters from '../AnimatedLetters'
// import LogoTitle from '../../assets/images/logo-s.png'
import Logo from './Logo'
import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  // const nameArray = 'udip'.split('')
  // const jobArray = 'Blockchain Developer'.split('')
  // const interestArray = 'Ethical Hacker'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const path = () => {
    let pathButton = document.getElementById("pathButton");
    pathButton.click();
    // alert("ㅇㅇ")
  }
  const pathcode =()=> {
    console.log("필터링 조건걸고(정상적인 path값), 해당 경로를 저장하는 함수를 만들거임"); // 가능만들어야함
    let pathValue = document.getElementById("pathButton").value; // 경로값
    console.log(pathValue); 
  }

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>Automatic CAMERA</span>
            <br />
          </h1>
          <h2>
          object recognition + hands FREE!
          </h2>
          <input type="file" onChange={pathcode} className="file-input" id="pathButton"/>
          <Link to="" onClick={path} className="flat-button">
          📩 Set save path
          </Link>
        </div>
      </div>

      <div className="logoImage">
        <Logo />
      </div>


      <Loader type="pacman" />
    </>
  )
}

export default Home
