import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import './Gallery.scss'

function Gallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHeaderVisible, setIsHeaderVisible] = useState(true)
    const lastScrollY = useRef(0)

    // Generate array of all 120 images
    const images = Array.from({ length: 120 }, (_, i) =>
        `/barry-memorial/barry/Document_20250911_${String(i + 1).padStart(4, '0')}.jpg`
    )

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down
                setIsHeaderVisible(false)
            } else {
                // Scrolling up
                setIsHeaderVisible(true)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll)
        requestAnimationFrame(raf)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            lenis.destroy()
        }
    }, [])

    const openModal = (imageSrc: string, index: number) => {
        setSelectedImage(imageSrc)
        setCurrentIndex(index)
    }

    const closeModal = () => {
        setSelectedImage(null)
    }

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length
        setCurrentIndex(nextIndex)
        setSelectedImage(images[nextIndex])
    }

    const prevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length
        setCurrentIndex(prevIndex)
        setSelectedImage(images[prevIndex])
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closeModal()
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
    }

    const downloadImage = async (imageSrc: string, index: number) => {
        try {
            const response = await fetch(imageSrc)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `barry-memory-${index + 1}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error downloading image:', error)
        }
    }

    return (
        <div className="gallery-page" onKeyDown={handleKeyDown} tabIndex={0}>
            <header className={`gallery-header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
                <div className="gallery-nav">
                    <Link to="/" className="back-btn">← Back to Memorial</Link>
                    <h1>Barry's Photo Gallery</h1>
                    <p>All {images.length} precious memories</p>
                </div>
            </header>

            <main className="gallery-main">
                <div className="gallery-grid">
                    {images.map((imageSrc, index) => (
                        <div
                            key={index}
                            className="gallery-item"
                            onClick={() => openModal(imageSrc, index)}
                        >
                            <img
                                src={imageSrc}
                                alt={`Memory ${index + 1}`}
                                loading="lazy"
                            />
                            <div className="gallery-overlay">
                                <span className="image-number">{index + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal for full-size image viewing */}
            {selectedImage && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>×</button>
                        <button className="modal-nav modal-prev" onClick={prevImage}>‹</button>
                        <img src={selectedImage} alt={`Memory ${currentIndex + 1}`} />
                        <button className="modal-nav modal-next" onClick={nextImage}>›</button>
                        <button className="modal-download" onClick={() => downloadImage(selectedImage, currentIndex)}>
                            ↓ Download
                        </button>
                        <div className="modal-info">
                            <span>Image {currentIndex + 1} of {images.length}</span>
                        </div>
                    </div>
                </div>
            )}

            <footer className="gallery-footer">
                <p>Click any image to view full size • Use arrow keys to navigate • Download button available in full view</p>
                <Link to="/" className="back-to-memorial">Return to Memorial</Link>
            </footer>
        </div>
    )
}

export default Gallery
