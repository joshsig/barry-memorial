import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { useTransform, useScroll, motion } from 'framer-motion'
import './App.scss'

// Select 20 specific images for the 4 columns (5 images each)
const images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
  "image9.jpg",
  "image10.jpg",
  "image11.jpg",
  "image12.jpg",
  "image13.jpg",
  "image14.jpg",
  "image15.jpg",
  "image16.jpg",
  "image17.jpg",
  "image18.jpg",
  "image19.jpg",
  "image20.jpg",
]

function App() {
  const gallery = useRef(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })

  const { height, width } = dimension
  const isMobile = width <= 768
  const isSmallMobile = width <= 480

  // Parallax speeds - mobile follows desktop pattern but scaled appropriately
  // Desktop: 2, 3.3, 1.25, 3
  // Mobile: scaled down but still noticeable (1.2, 2, 0.8, 1.8)
  // Small mobile: further scaled (0.8, 1.3, 0.5, 1.2)
  const getParallaxMultiplier = (desktopValue: number) => {
    if (isSmallMobile) {
      return desktopValue * 0.4 // Scale down to 40% of desktop
    } else if (isMobile) {
      return desktopValue * 0.6 // Scale down to 60% of desktop
    }
    return desktopValue
  }

  const y = useTransform(scrollYProgress, [0, 1], [0, height * getParallaxMultiplier(2)])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * getParallaxMultiplier(3.3)])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * getParallaxMultiplier(1.25)])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * getParallaxMultiplier(3)])

  useEffect(() => {
    const lenis = new Lenis()

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf)
    resize()

    return () => {
      window.removeEventListener("resize", resize)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="memorial-page">
      {/* Landing Section */}
      <section className="landing-section" id="landing">
        <div className="landing-content">
          <div className="hero-text">
            <h1 className="memorial-title">In Loving Memory</h1>
            <h2 className="name-title">Barry Wood</h2>
            <div className="dates">
              <span className="birth-date">Born: December 8, 1959</span>
              <span className="separator">•</span>
              <span className="death-date">Passed: September 2, 2025</span>
            </div>
            <p className="memorial-quote">

            </p>
          </div>
          <div className="hero-image">
            <img src="/barry-memorial/media/image66.jpg" alt="Barry" className="main-photo" />
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Eulogy Section */}
      <section className="eulogy-section" id="eulogy">
        <div className="eulogy-content">
          <h3>Remembering Barry</h3>
          <div className="eulogy-text">
            <p>
              Barry will be remembered as a devoted father and a cherished friend. He is survived by his former wife, Michele Reimer, and their son, Stephen Wood. He is also lovingly remembered by his former partner, Denise Klassen, and her children, Ashley, Aidan, and Arika Klassen.
            </p>
            <p>
              Born on December 8, 1959, in Winnipeg to June and Ronald Wood, Barry spent his early years in the Windsor Park and Niakwa Park neighbourhoods. A passionate golfer from a young age, he dedicated countless hours to the sport, earning the Green Jacket in 1975.
            </p>
            <p>
              Barry dedicated most of his professional life to Premier Personnel, joining in 1984 and quickly rising to the role of Executive Director, which he held until his retirement in 2017. A passionate advocate for supported employment, Barry played a pivotal role in shaping the field in Manitoba. He was instrumental in the development of the Manitoba Supported Employment Network and provided training across the province, earning widespread respect for his leadership and compassion.
            </p>
            <p>
              Outside of work, Barry embraced life with enthusiasm. He was a connoisseur of fine food and a master of the barbecue, always eager to share meals with loved ones. His deep love of music—spanning rock, jazz, blues, and folk—was reflected in his extensive CD and stereo collection.
            </p>
            <p>
              One of Barry’s happiest places was Dogtooth Lake, where he found peace and joy fishing and enjoying the natural beauty of the Canadian Shield. It was a place of deep connection and treasured memories.
            </p>
            <p>
              Barry was known for his generosity and warmth. Whether through food, music, golf, or time on the water, he shared his passions freely and left a lasting impact on those around him.
            </p>
            <p>
              In later years, Parkinson’s disease imposed many challenges, limiting his ability to enjoy the activities he loved. Despite this, Barry faced his illness with quiet strength and resilience. His family extends heartfelt thanks to the professional team at the Movement Disorder Clinic and to the friends who supported him with kindness and care.
            </p>
          </div>
        </div>
      </section>

      {/* Parallax Gallery Section */}
      <section className="parallax-gallery-section" id="gallery">
        <div className="gallery-header">
          <h3>Photo Gallery</h3>
          <p>A collection of precious moments and memories</p>
        </div>
        <div className="gallery-cta">
          <Link to="/gallery" className="view-all-btn">View All Photos</Link>
        </div>
        <div ref={gallery} className="gallery">
          <Column images={[images[0], images[1], images[2], images[3], images[4]]} y={y} />
          <Column images={[images[5], images[6], images[7], images[8], images[9]]} y={y2} />
          <Column images={[images[10], images[11], images[12], images[13], images[14]]} y={y3} />
          <Column images={[images[15], images[16], images[17], images[18], images[19]]} y={y4} />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="memorial-footer" id="footer">
        <div className="footer-content">
          <div className="footer-text">
            <h4>Forever in our hearts</h4>
            <p>This memorial page was created with love to honor Barry's memory and celebrate his life.</p>
          </div>
          <div className="footer-links">
            <a href="#landing">Home</a>
            <a href="#eulogy">Obituary</a>
            <a href="#gallery">Gallery</a>
            <Link to="/gallery">All Photos</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Barry Memorial. Created with love and remembrance.</p>
          <p>Created by <a href="https://joshsig.ca/">Joshua Sigurdson</a></p>
        </div>
      </footer>
    </div>
  )
}

const Column = ({ images, y }: { images: string[], y: any }) => {
  return (
    <motion.div
      className="column"
      style={{ y }}
    >
      {
        images.map((src, i) => {
          return <div key={i} className="imageContainer">
            <img
              src={`/barry-memorial/media/${src}`}
              alt='memory'
              className="gallery-image"
            />
          </div>
        })
      }
    </motion.div>
  )
}

export default App
