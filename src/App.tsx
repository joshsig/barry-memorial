import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { useTransform, useScroll, motion } from 'framer-motion'
import './App.scss'

// Select 16 specific images for the 4 columns (4 images each)
const images = [
  "Document_20250911_0015.jpg",
  "Document_20250911_0013.jpg",
  "Document_20250911_0003.jpg",
  "Document_20250911_0004.jpg",
  "Document_20250911_0005.jpg",
  "Document_20250911_0006.jpg",
  "Document_20250911_0007.jpg",
  "Document_20250911_0008.jpg",
  "Document_20250911_0009.jpg",
  "Document_20250911_0010.jpg",
  "Document_20250911_0011.jpg",
  "Document_20250911_0012.jpg",
  "Document_20250911_0028.jpg",
  "Document_20250911_0033.jpg",
  "Document_20250911_0036.jpg",
  "Document_20250911_0040.jpg",
  "Document_20250911_0041.jpg",
  "Document_20250911_0042.jpg",
  "Document_20250911_0046.jpg",
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

  // Different parallax speeds for mobile vs desktop
  const y = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 0.5 : 2)])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 0.6 : 3.3)])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 0.3 : 1.25)])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 0.6 : 3)])

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
              <span className="birth-date">Born: [Birth Date]</span>
              <span className="separator">•</span>
              <span className="death-date">Passed: [Date of Passing]</span>
            </div>
            <p className="memorial-quote">
              "A life well-lived leaves behind a legacy of love, laughter, and cherished memories."
            </p>
          </div>
          <div className="hero-image">
            <img src="/barry-memorial/barry/Document_20250911_0001.jpg" alt="Barry" className="main-photo" />
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
              Barry was a remarkable person whose presence brought light and joy to everyone around him.
              His warm smile, kind heart, and generous spirit touched the lives of countless people throughout his journey.
            </p>
            <p>
              As a devoted family member, Barry cherished every moment spent with his loved ones.
              He was the kind of person who would drop everything to help a friend in need,
              and his laughter could fill a room with happiness.
            </p>
            <p>
              Throughout his life, Barry pursued his passions with dedication and brought enthusiasm
              to everything he did. His positive spirit and determination were an inspiration to all
              who had the privilege of knowing him.
            </p>
            <p>
              Though he may no longer be with us in person, Barry's memory lives on in the hearts
              of all who loved him. His legacy of kindness, love, and joy continues to inspire
              those whose lives he touched.
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
        <div ref={gallery} className="gallery">
          <Column images={[images[0], images[1], images[2], images[3]]} y={y} />
          <Column images={[images[4], images[5], images[6], images[7]]} y={y2} />
          <Column images={[images[8], images[9], images[10], images[11]]} y={y3} />
          <Column images={[images[12], images[13], images[14], images[15]]} y={y4} />
        </div>
        <div className="gallery-cta">
          <Link to="/gallery" className="view-all-btn">View All Photos</Link>
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
            <a href="#eulogy">Eulogy</a>
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
              src={`/barry-memorial/barry/${src}`}
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
