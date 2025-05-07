'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [currentView, setCurrentView] = useState('hero');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const galleryIntervalRef = useRef(null);

  // Messages data
  const messages = [
    "Kamu adalah sosok yang sangat berharga dalam hidupku, lebih dari yang bisa aku tunjukkan selama ini.",
    "Maaf jika aku belum bisa memberimu tempat di keluargaku tapi kamu sudah punya tempat yang dalam di hatiku.",
    "Aku melihat masa depanku bersamamu, meski saat ini jalannya belum mudah.",
    "Kamu pantas dihargai, dicintai, dan dikenalkan ke dunia. Aku sedang berjuang untuk membuat itu terjadi.",
    "Maaf atas air mata yang jatuh karenaku. Aku sedang belajar menjadi pria yang bisa jadi tempatmu bersandar.",
    "Mood kamu penting buatku. Senyummu adalah hal yang paling aku rindukan saat hari terasa berat.",
    "Aku tidak sempurna, tapi aku sedang berusaha. Untukmu. Untuk kita.",
    "Mungkin sekarang belum waktunya, tapi aku janji aku akan terus melangkah ke arah itu.",
    "Aku ingin kamu tahu kamu tidak sendiri dalam rasa ini.",
    "Terima kasih karena masih bertahan di sampingku, meski aku belum bisa memberi segalanya."
  ];

  // Photo data - replace with your own photos in the public folder
  const photos = [
    '/photo1.jpg',
    '/photo2.jpg',
    '/photo3.jpg', 
    '/photo4.jpg',
    '/photo5.jpg',
    '/photo6.jpg',
    '/photo7.jpg',
    '/photo8.jpg',
    '/photo9.jpg',
    '/photo10.jpg',
  ];

  // Handle opening the letter
  const openLetter = () => {
    setCurrentView('message');
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log("Autoplay prevented. User interaction needed to play audio.");
      });
      setIsPlaying(true);
    }
    createHearts();
  };

  // Toggle the floating menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle music play/pause
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Go to home screen
  const goToHome = () => {
    setCurrentView('hero');
    setCurrentMessageIndex(0); 
    clearInterval(galleryIntervalRef.current);
  };

  // Show specific message
  const showMessage = (index) => {
    setCurrentView('message');
    setCurrentMessageIndex(index);
    clearInterval(galleryIntervalRef.current);
  };

  // Go to next message
  const nextMessage = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      showGallery();
    }
  };

  // Show gallery
  const showGallery = () => {
    setCurrentView('gallery');
    setCurrentGalleryIndex(0);
    
    // Auto-rotate gallery
    galleryIntervalRef.current = setInterval(() => {
      setCurrentGalleryIndex(prev => (prev + 1) % photos.length);
    }, 2000);
  };

  // Show specific gallery item
  const showGalleryItem = (index) => {
    clearInterval(galleryIntervalRef.current);
    setCurrentGalleryIndex(index);
    
    // Restart auto-rotation
    galleryIntervalRef.current = setInterval(() => {
      setCurrentGalleryIndex(prev => (prev + 1) % photos.length);
    }, 2000);
  };

  // Create floating hearts animation
  const createHearts = (count = 10) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        const size = Math.floor(Math.random() * 20) + 10;
        const startPos = Math.random() * window.innerWidth;
        const speed = Math.floor(Math.random() * 10) + 10;
        
        heart.style.left = startPos + 'px';
        heart.style.bottom = '-50px';
        heart.style.height = size + 'px';
        heart.style.width = size + 'px';
        heart.style.animation = `floatHeart ${speed}s linear forwards`;
        
        document.body.appendChild(heart);
        
        // Remove heart from DOM after animation completes
        setTimeout(() => {
          heart.remove();
        }, speed * 1000);
      }, i * 300);
    }
  };

  // Create occasional hearts
  useEffect(() => {
    if (currentView !== 'hero') {
      const heartsInterval = setInterval(() => {
        createHearts(2);
      }, 5000);
      
      return () => clearInterval(heartsInterval);
    }
  }, [currentView]);

  // Clean up gallery interval on component unmount
  useEffect(() => {
    return () => {
      if (galleryIntervalRef.current) {
        clearInterval(galleryIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-amber-100 overflow-x-hidden pb-24">
      <audio 
        ref={audioRef} 
        src="/love-song.mp3" 
        loop 
      />

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        {currentView === 'hero' && (
          <section className="flex flex-col justify-center items-center min-h-screen text-center relative overflow-hidden">
            <h1 className="font-cormorant text-5xl md:text-6xl mb-8 text-pink-500 drop-shadow-lg">
              Surat dari aku untuk kamu
            </h1>
            <button 
              onClick={openLetter}
              className="bg-gradient-to-r from-pink-500 to-rose-400 text-white border-none py-4 px-8 text-xl rounded-full cursor-pointer shadow-lg shadow-pink-300/50 hover:shadow-xl hover:shadow-pink-400/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              Buka Surat
            </button>
          </section>
        )}

        {/* Messages Section */}
        {currentView === 'message' && (
          <section className="min-h-screen py-16 flex flex-col items-center justify-center">
            <h2 className="text-center font-cormorant text-4xl md:text-5xl mb-10 text-pink-500">
              Dari Hati, Untukmu Tersayangku
            </h2>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="heart absolute rounded-full bg-pink-500 opacity-50 animate-float-heart"
                  style={{
                    left: `${Math.random() * 100}vw`,
                    bottom: `${Math.random() * 100}vh`,
                    width: `${Math.random() * 20 + 10}px`,
                    height: `${Math.random() * 20 + 10}px`,
                    animationDuration: `${Math.random() * 5 + 5}s`,
                  }}
                ></div>
              ))}
            </div>
            
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-xl w-full max-w-2xl text-center">
              <p className="font-cormorant text-xl md:text-2xl leading-relaxed text-gray-700 mb-8">
                "{messages[currentMessageIndex]}"
              </p>
              <button 
                onClick={nextMessage}
                className="bg-gradient-to-r from-pink-500 to-rose-400 text-white border-none py-3 px-6 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {currentMessageIndex < messages.length - 1 ? 'Selanjutnya' : 'Lihat Galeri'}
              </button>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {currentView === 'gallery' && (
          <section className="py-16">
            <h2 className="text-center font-cormorant text-4xl md:text-5xl mb-10 text-pink-500">
              Galeri Kenangan Kita
            </h2>
            
            <div className="relative h-96 md:h-[400px] flex justify-center mb-8">
              {photos.map((photo, index) => (
                <div 
                  key={`gallery-${index}`}
                  className={`absolute w-72 h-96 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl transition-all duration-500 ${
                    currentGalleryIndex === index 
                      ? 'opacity-100 scale-100 translate-x-0 z-10' 
                      : 'opacity-0 scale-90 translate-x-24'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src={photo} 
                      alt={`Kenangan ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-2">
              {photos.map((_, index) => (
                <div 
                  key={`dot-${index}`}
                  onClick={() => showGalleryItem(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    currentGalleryIndex === index 
                      ? 'bg-pink-500 transform scale-125' 
                      : 'bg-pink-300/30'
                  }`}
                ></div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Floating Navigation */}
      {currentView !== 'hero' && (
        <div className="fixed bottom-5 right-5 z-50">
          <div className={`flex flex-col items-end transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div 
              onClick={toggleMusic}
              className="bg-white/90 text-pink-500 py-2 px-5 rounded-full mb-3 shadow-md cursor-pointer transition-all duration-300 text-sm hover:bg-pink-50 transform translate-x-0 opacity-100"
            >
              {isPlaying ? 'Pause Musik' : 'Putar Musik'}
            </div>
            <div 
              onClick={goToHome}
              className="bg-white/90 text-pink-500 py-2 px-5 rounded-full mb-3 shadow-md cursor-pointer transition-all duration-300 text-sm hover:bg-pink-50 transform translate-x-0 opacity-100"
            >
              Kembali ke Awal
            </div>
          </div>
          
          <div 
            onClick={toggleMenu}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 flex justify-center items-center text-white shadow-lg shadow-pink-400/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
        </div>
      )}

      <footer className="text-center py-5 text-gray-500 text-sm">
        <p>Dibuat dengan ❤️ untuk kamu</p>
      </footer>
    </div>
  );
}