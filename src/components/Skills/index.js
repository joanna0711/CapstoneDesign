import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import WordCloud from './wordcloud'
import WebcamComponent from './WebcamComponent'

const Skills = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const skillsArray = 'Skills'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container skills-page">
        <div className="text-zone">
          <h1>
            <WebcamComponent></WebcamComponent>
            <br />
          </h1>
          <p>
           yolo 카메라 자리
          </p>
        </div>

        {/* <div className="tagcloud-wrap">
          <WordCloud />
        </div> */}
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Skills
