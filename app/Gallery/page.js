"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaYoutube, FaPlay } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Array of images and videos (replace with actual paths/URLs)
  const galleryItems = [
    { type: 'image', src: '/images/paramotor1.jpg', alt: 'Paramotoring Adventure 1' },
    { type: 'image', src: '/images/paramotor2.jpg', alt: 'Paramotoring Adventure 2' },
    { type: 'image', src: '/images/paramotor3.jpg', alt: 'Customer enjoying Paramotoring 1' },
    { type: 'image', src: '/images/paramotor4.jpg', alt: 'Customer enjoying Paramotoring 2' },
    { type: 'video', src: '/videos/paramotor1.mp4', alt: 'Paramotoring Video 1' },
    { type: 'video', src: '/videos/paramotor2.mp4', alt: 'Paramotoring Video 2' },
    { type: 'video', src: '/videos/paramotor3.mp4', alt: 'Paramotoring Video 1' },
    { type: 'video', src: '/videos/paramotor4.mp4', alt: 'Paramotoring Video 2' },
    { type: 'video', src: '/videos/paramotor5.mp4', alt: 'Paramotoring Video 2' },
  ];

  // Handle click to open item
  const handleOpenItem = (item) => {
    setSelectedItem(item);
  };

  // Handle close
  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <div className="px-8 py-12 bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen relative">
      <h1 className="text-5xl font-bold text-white mb-12 mt-24 text-center">GALLERY</h1>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleOpenItem(item)}
            whileHover={{ scale: 0.7 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.alt}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="relative">
                <video
                  src={item.src}
                  alt={item.alt}
                  className="object-cover w-full h-full"
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* YouTube Channel Advertisement Section */}
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-semibold text-white mb-8">
          Check Out Our Paramotoring YouTube Channel
        </h2>
        <div className="flex justify-center items-center mb-4">
          <FaYoutube className="text-red-600 mr-3" size={36} />
          <h3 className="text-2xl text-white font-medium">Subscribe for More Adventures</h3>
        </div>

        {/* YouTube Embed */}
        <motion.div
          className="overflow-hidden rounded-lg shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <iframe
            width="80%"
            height="480"
            src="https://www.youtube.com/embed/lAVQNykVqxk"
            title="YouTube Paramotoring Channel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg "
          ></iframe>
        </motion.div>
      </div>

      {/* Modal for Selected Item */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-3xl p-2 focus:outline-none"
            >
              <IoMdClose />
            </button>

            {/* Show Image or Video */}
            {selectedItem.type === 'image' ? (
              <motion.img
                src={selectedItem.src}
                alt={selectedItem.alt}
                className="max-w-full max-h-[80vh] rounded-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                
              />
            ) : (
              <motion.video
                src={selectedItem.src}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] rounded-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
