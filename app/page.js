"use client";
import { useState, useEffect } from 'react';
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaGoogle, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from 'next/link';

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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
export default function Home() {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    image: "", // You can choose to let users upload an image in the future
  });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 200); // Delay animation after page load
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Set a default image if no image is provided
    if (!newReview.image) {
      newReview.image = "/default-avatar.jpg"; // Add a placeholder image in your public folder
    }

    setReviews([newReview, ...reviews]);
    setNewReview({ name: "", rating: 0, comment: "", image: "" });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  return (
    <div>
      <section>
        <div className="relative w-full h-screen overflow-hidden">
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
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Text Content with Animation */}
          <div
            className={`relative z-10 flex flex-col items-center justify-center h-full text-white text-center transform transition-all duration-1000 ease-out ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h1
              className={`text-4xl md:text-6xl font-bold mb-4 transform transition-all duration-1000 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              LIVE LIFE ABOVE
            </h1>
            <p
              className={`text-lg md:text-2xl mb-8 transform transition-all duration-1000 delay-200 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              Explore your world from a unique 360-degree perspective when you fly
              a Parajet paramotor
            </p>
            <p
              className={`transform transition-all duration-1000 delay-300 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              Fly Over the Breathtaking Beauty of Pondicherry
            </p>
            <a
              href="/Book"
              className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transform transition-all duration-1000 delay-400 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              Get Paramotoring
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Unique Experience */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/land.png"
                alt="Unique Experience"
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <div className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-700">Unique Experience</h3>
              </div>
              <p className="text-gray-600 text-sm">
                We offer a one-of-a-kind paramotoring adventure that will give you a memorable and thrilling experience.
              </p>
            </motion.div>

            {/* Safety Measures */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="images/land.png"
                alt="Safety Measures"
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <div className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-700">Safety Measures</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Safety is our top priority. We follow the highest standards to ensure a safe and secure flight.
              </p>
            </motion.div>

            {/* Experienced Pilots */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <img
                src="/images/land.png"
                alt="Experienced Pilots"
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <div className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-700">Experienced Pilots</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Our experienced and certified pilots will guide you throughout the journey, ensuring both safety and fun.
              </p>
            </motion.div>

            {/* Scenic Views */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <img
                src="/images/land.png"
                alt="Scenic Views"
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <div className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-700">Scenic Views</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Experience breathtaking panoramic views as you glide above the beautiful landscapes of Udaipur.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      <section className="bg-gray-400 py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-6 rounded-lg flex flex-col md:flex-row items-center"
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
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <div className="flex space-x-1 my-2">
                    {Array(review.rating)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                  </div>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>

          {/* New Review Form */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-center mb-4">
              Submit Your Review
            </h3>
            <form
              onSubmit={handleReviewSubmit}
              className="bg-white shadow-md p-6 rounded-lg max-w-lg mx-auto"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded p-2"
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
                  className="w-full border border-gray-300 rounded p-2"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>


      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-white text-center mb-12">Featured Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {packages.slice(0, 4).map((pkg, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative h-60">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    rel='preload'
                    as =  'image'
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // example sizes

                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <p className="text-gray-700 mb-4">{pkg.description}</p>
                  <div className="text-pink-600 text-lg font-semibold">{pkg.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
            Our Location & Flying Zones
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Map Section */}
            <div className="w-full md:w-2/3">
              {/* Google Map Embed */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="shadow-xl rounded-lg overflow-hidden"
              >
                <iframe
                  className="w-full h-96 md:h-80"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3904.482638235919!2d79.8202455!3d11.8714434!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a549fb451d9a7b1%3A0xc74b3ba2c290574d!2sAbhay%20Adventure!5e0!3m2!1sen!2sin!4v1739544585903!5m2!1sen!2sin" width="900" height="900" style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location Map"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
              <div className="bg-gray-100 py-2 flex flex-wrap">
                <div className="container mx-auto px-4 flex justify-between items-center">
                  {/* Contact Info */}
                  <div>
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center">
                      <FaEnvelope className="mr-1" />
                      <a href="mailto:info@parajet.com" className="hover:text-gray-600">abhayadventures582@gmail.com</a>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="mr-1" />
                      <a href="tel:+917014146818" className="hover:text-gray-600">+91 7014146818</a>
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div className='flex justify-center items-center space-x-6 mt-4'> 
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                    <FaFacebook />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                    <FaInstagram />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">
                    <FaYoutube />
                  </a>
                  </div>
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
      </section>
    </div>
  );
}
