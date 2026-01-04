"use client";
import { useMemo, useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const initialReviews = [
  {
    name: "John Doe",
    rating: 5,
    comment: "Amazing experience! Highly recommended for adventure lovers.",
    image: "/images/user.png",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment: "Had a great time! The views were breathtaking.",
    image: "/images/user.png",
  },
];


const packages = [
  {
    title: "Sunset Paramotoring Adventure",
    description:
      "Experience the magic of flying over breathtaking landscapes as the sun sets. A truly unforgettable journey.",
    price: "$199",
    image: "/images/sunset-adventure.jpg",
  },
  {
    title: "Mountain Peak Expedition",
    description:
      "Soar over the stunning mountain ranges with a bird's-eye view of nature's finest wonders. Perfect for adventurers.",
    price: "$249",
    image: "/images/mountain-peak.jpg",
  },
  {
    title: "Beachside Exploration",
    description:
      "Fly along the scenic coastline and enjoy the calm and serenity of the ocean with this exclusive beach package.",
    price: "$179",
    image: "/images/beachside-exploration.jpg",
  },
  {
    title: "Winter Wonderland Flight",
    description:
      "Experience the snowy landscapes from above during our seasonal Winter Wonderland paramotoring offer.",
    price: "$229",
    image: "/images/winter-wonderland.jpg",
  },
];

export default function Home() {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    image: "", // You can choose to let users upload an image in the future
  });
  const easing = [0.22, 1, 0.36, 1];

  const heroContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.12 },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: easing },
    },
  };

  const sectionContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.06 },
    },
  };

  const sectionItem = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
  };

  const whyChooseUs = useMemo(
    () => [
      {
        title: "Unique Experience",
        description:
          "We offer a one-of-a-kind paramotoring adventure that will give you a memorable and thrilling experience.",
        image: "/images/land.png",
      },
      {
        title: "Safety Measures",
        description:
          "Safety is our top priority. We follow the highest standards to ensure a safe and secure flight.",
        image: "/images/land.png",
      },
      {
        title: "Experienced Pilots",
        description:
          "Our experienced and certified pilots will guide you throughout the journey, ensuring both safety and fun.",
        image: "/images/land.png",
      },
      {
        title: "Scenic Views",
        description:
          "Experience breathtaking panoramic views as you glide above the beautiful landscapes of Udaipur.",
        image: "/images/land.png",
      },
    ],
    []
  );

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const normalizedReview = {
      ...newReview,
      image: newReview.image || "/default-avatar.jpg",
    };

    setReviews([normalizedReview, ...reviews]);
    setNewReview({ name: "", rating: 0, comment: "", image: "" });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  return (
    <div className="bg-white">
      <section>
        <div className="relative w-full h-[92vh] sm:h-screen overflow-hidden">
          {/* Video Background */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/land.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
          <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          {/* Text Content with Animation */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white sm:px-6"
          >
            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            >
              LIVE LIFE ABOVE
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-4 text-base sm:text-lg md:text-2xl text-white/90 max-w-3xl"
            >
              Explore your world from a unique 360-degree perspective when you fly a Parajet paramotor
            </motion.p>

            <motion.p variants={heroItem} className="mt-2 text-sm sm:text-base text-white/70">
              Fly Over the Breathtaking Beauty of Pondicherry
            </motion.p>

            <motion.div variants={heroItem} className="mt-7 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/Book"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Get Paramotoring
              </Link>
              <Link
                href="/Gallery"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                View Gallery
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionContainer}
        className="py-14 sm:py-16 bg-gray-50"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <motion.h2 variants={sectionItem} className="text-3xl font-bold text-center text-green-600 mb-8">
            Why Choose Us
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((card) => (
              <motion.div
                key={card.title}
                variants={sectionItem}
                className="group bg-white shadow-lg rounded-2xl overflow-hidden"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <FaCheckCircle className="text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionContainer}
        className="bg-gray-200 py-12 sm:py-14 px-4"
      >
        <div className="mx-auto w-full max-w-6xl">
          <motion.h2 variants={sectionItem} className="text-3xl font-bold text-center mb-8 text-gray-900">
            Testimonials
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={sectionItem}
                className="bg-white shadow-lg p-6 rounded-2xl flex flex-col sm:flex-row items-center"
              >
                {/* Check if review.image exists */}
                {review.image && (
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                    <Image
                      src={review.image || "/default-avatar.jpg"} // Default image
                      alt={review.name}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                  <div className="flex space-x-1 my-2">
                    {Array(review.rating)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* New Review Form */}
          <motion.div variants={sectionItem} className="mt-12">
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-900">
              Submit Your Review
            </h3>
            <form
              onSubmit={handleReviewSubmit}
              className="bg-white shadow-md p-6 rounded-2xl max-w-lg mx-auto"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 outline-none transition focus:ring-2 focus:ring-green-500/40"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <FaStar
                      key={rating}
                      className={`cursor-pointer ${newReview.rating >= rating
                        ? "text-yellow-500"
                        : "text-gray-400"
                        }`}
                      onClick={() => handleRatingChange(rating)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Comment
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 outline-none transition focus:ring-2 focus:ring-green-500/40"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition font-semibold"
              >
                Submit Review
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>


      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionContainer}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 py-14 sm:py-16 px-4"
      >
        <div className="mx-auto w-full max-w-6xl">
          <motion.h2 variants={sectionItem} className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-10 sm:mb-12">
            Featured Packages
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {packages.slice(0, 4).map((pkg, index) => (
              <motion.div
                key={index}
                variants={sectionItem}
                className="group bg-white/95 shadow-lg rounded-2xl overflow-hidden"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              >
                <div className="relative h-60">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // example sizes
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{pkg.description}</p>
                  <div className="text-pink-600 text-lg font-semibold">{pkg.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionContainer}
        className="w-full bg-gray-100 py-12"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <motion.h2 variants={sectionItem} className="text-3xl font-bold text-center text-green-600 mb-8">
            Our Location & Flying Zones
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Map Section */}
            <div className="w-full md:w-2/3">
              {/* Google Map Embed */}
              <motion.div
                variants={sectionItem}
                className="shadow-xl rounded-2xl overflow-hidden bg-white"
              >
                <div className="aspect-[4/3] sm:aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3904.482638235919!2d79.8202455!3d11.8714434!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a549fb451d9a7b1%3A0xc74b3ba2c290574d!2sAbhay%20Adventure!5e0!3m2!1sen!2sin!4v1739544585903!5m2!1sen!2sin"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Location Map"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            </div>

            {/* Info Section */}
            <motion.div
              variants={sectionItem}
              className="w-full md:w-1/3 text-center md:text-left"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Visit Us at Our Main Location
              </h3>
              <p className="text-gray-600 mb-6">
                Come and experience the thrill of paramotoring with breathtaking views of the beautiful landscapes of Pondicherry! Our team ensures your safety and an unforgettable adventure.
              </p>

              <div className="flex items-center justify-center md:justify-start mb-4">
                <FaMapMarkerAlt className="text-green-600 mr-2" size={20} />
                <p className="text-gray-700">Abhay Adventures, Pondicherry</p>
              </div>
              {/* Top Section: Contact Info and Social Icons */}
              <div className="rounded-2xl bg-white shadow-md p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-700">
                    <div className="flex items-center justify-center md:justify-start">
                      <FaEnvelope className="mr-2" />
                      <a href="mailto:abhayadventures582@gmail.com" className="hover:text-gray-900">
                        abhayadventures582@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <FaPhone className="mr-2" />
                      <a href="tel:+917014146818" className="hover:text-gray-900">
                        +91 7014146818
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-start items-center space-x-6">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition"
                      aria-label="Facebook"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black transition"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-red-600 transition"
                      aria-label="YouTube"
                    >
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out">
                <Link
                  href="https://www.google.com/maps/place/Abhay+Adventure/@11.8714434,79.8202455,17z/data=!4m6!3m5!1s0x3a549fb451d9a7b1:0xc74b3ba2c290574d!8m2!3d11.8717889!4d79.8201158!16s%2Fg%2F11l1md39gs?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                >
                  View on Google Maps
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
