"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlay, FaYoutube } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Array of images and videos (replace with actual paths/URLs)
  const galleryItems = useMemo(
    () => [
      { type: "image", src: "/images/paramotor1.jpg", alt: "Paramotoring Adventure 1" },
      { type: "image", src: "/images/paramotor2.jpg", alt: "Paramotoring Adventure 2" },
      { type: "image", src: "/images/paramotor3.jpg", alt: "Customer enjoying Paramotoring 1" },
      { type: "image", src: "/images/paramotor4.jpg", alt: "Customer enjoying Paramotoring 2" },
      { type: "video", src: "/videos/paramotor1.mp4", alt: "Paramotoring Video 1" },
      { type: "video", src: "/videos/paramotor2.mp4", alt: "Paramotoring Video 2" },
      { type: "video", src: "/videos/paramotor3.mp4", alt: "Paramotoring Video 3" },
      { type: "video", src: "/videos/paramotor4.mp4", alt: "Paramotoring Video 4" },
      { type: "video", src: "/videos/paramotor5.mp4", alt: "Paramotoring Video 5" },
    ],
    []
  );

  // Handle click to open item
  const handleOpenItem = useCallback((item) => setSelectedItem(item), []);

  // Handle close
  const handleClose = useCallback(() => setSelectedItem(null), []);

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedItem, handleClose]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950" />

      <header className="pt-28 sm:pt-32 pb-8 sm:pb-10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Gallery
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
              Moments from the sky — photos and short clips from our paramotoring adventures.
            </p>
          </motion.div>
        </div>
      </header>
      
      {/* Gallery Grid */}
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-12 sm:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6"
        >
          {galleryItems.map((item, index) => (
            <motion.button
              type="button"
              key={index}
              variants={cardVariants}
              onClick={() => handleOpenItem(item)}
              className="group relative mb-5 sm:mb-6 w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left backdrop-blur-sm"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Open ${item.type}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    priority={index < 2}
                  />
                ) : (
                  <>
                    <video
                      src={item.src}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
                        <FaPlay className="text-white/90" />
                      </span>
                    </div>
                  </>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              <div className="px-4 py-3">
                <p className="text-sm font-medium text-white/90 line-clamp-1">
                  {item.alt}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  {item.type === "image" ? "Photo" : "Video"}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* YouTube Channel Advertisement Section */}
        <section className="mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-7 backdrop-blur-sm"
          >
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Check out our YouTube channel
              </h2>
              <div className="mt-3 inline-flex items-center justify-center gap-3 text-white/80">
                <FaYoutube className="text-white/80" size={28} />
                <span className="text-sm sm:text-base">Subscribe for more adventures</span>
              </div>
            </div>

            <motion.div
              className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/20"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/lAVQNykVqxk"
                  title="YouTube Paramotoring Channel"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Modal for Selected Item */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 px-4 py-10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 p-2 text-2xl text-white/90 backdrop-blur-sm transition hover:bg-white/15 focus:outline-none"
              aria-label="Close"
            >
              <IoMdClose />
            </button>

            {/* Show Image or Video */}
            <motion.div
              className="mx-auto flex h-full w-full max-w-5xl items-center justify-center"
              initial={{ y: 10, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 10, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                {selectedItem.type === "image" ? (
                  <div className="relative max-h-[78vh] w-full">
                    <Image
                      src={selectedItem.src}
                      alt={selectedItem.alt}
                      width={1600}
                      height={1200}
                      className="h-auto max-h-[78vh] w-full object-contain"
                      priority
                    />
                  </div>
                ) : (
                  <video
                    src={selectedItem.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[78vh] w-full object-contain"
                  />
                )}

                <div className="border-t border-white/10 px-4 py-3">
                  <p className="text-sm text-white/80 line-clamp-2">{selectedItem.alt}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
