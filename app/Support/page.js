"use client";
import { useState } from 'react';
import {  FaFacebook, FaInstagram, FaYoutube, FaGoogle, FaWhatsapp } from "react-icons/fa";

const SupportPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Web3Forms API submission
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: '1a705b38-0088-4b43-a873-75d962fd1e98', // Your Web3Forms access key
        ...formData, // Form data being sent
      }),
    });

    if (response.ok) {
      setFormSuccess(true); // Set success if the form is submitted successfully
      setFormData({ name: '', email: '', message: '' }); // Reset the form fields
    } else {
      console.error('Form submission failed.');
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-60 bg-blue-600 flex justify-center items-center text-white mt-12">
        <h1 className="text-4xl font-bold">Support Center</h1>
      </section>

      {/* FAQ Section */}
      <section className="px-8 py-12 bg-white">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-gray-100 rounded-md p-4">
            <summary className="cursor-pointer text-lg font-semibold">What is Paramotoring?</summary>
            <p className="mt-2 text-gray-600">
              Paramotoring is a form of powered paragliding where a pilot uses a paramotor to fly.
            </p>
          </details>

          <details className="bg-gray-100 rounded-md p-4">
            <summary className="cursor-pointer text-lg font-semibold">How safe is Paramotoring?</summary>
            <p className="mt-2 text-gray-600">
              Paramotoring is generally safe when conducted by trained pilots with proper equipment and weather conditions.
            </p>
          </details>

          <details className="bg-gray-100 rounded-md p-4">
            <summary className="cursor-pointer text-lg font-semibold">What equipment do I need to start?</summary>
            <p className="mt-2 text-gray-600">
              You need a paramotor, a glider, helmet, and safety gear such as a reserve parachute and GPS.
            </p>
          </details>

          <details className="bg-gray-100 rounded-md p-4">
            <summary className="cursor-pointer text-lg font-semibold">Do I need prior experience to fly?</summary>
            <p className="mt-2 text-gray-600">
              Yes, it is recommended to undergo training with a certified paramotoring instructor before flying solo.
            </p>
          </details>
        </div>
      </section>

      {/* Troubleshooting Tips */}
      <section className="px-8 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">Troubleshooting Tips</h2>
        <div className="space-y-6">
          <div className="p-4 bg-white rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-2">Motor Won't Start</h3>
            <p className="text-gray-600">
              If your motor isn’t starting, check the fuel levels and spark plug. Make sure all connections are secure.
            </p>
          </div>

          <div className="p-4 bg-white rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-2">Wing Won't Inflate Properly</h3>
            <p className="text-gray-600">
              If your wing doesn’t inflate correctly, make sure the lines aren’t tangled and that you are launching into the wind.
            </p>
          </div>

          <div className="p-4 bg-white rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-2">Glider Handling Issues</h3>
            <p className="text-gray-600">
              If the glider is hard to control, check the harness and brake settings. Adjusting the glider’s trim may also help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-8 py-12 bg-white">
        <h2 className="text-3xl font-bold mb-6">Contact Support</h2>
        {formSuccess ? (
          <div className="bg-green-100 p-4 rounded-md text-green-700">
            Thank you for reaching out! We'll get back to you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="access_key" value="1a705b38-0088-4b43-a873-75d962fd1e98" />

            <div>
              <label className="block text-lg font-semibold mb-1" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-black rounded-md"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-1" htmlFor="email">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-black rounded-md"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-1" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                className="w-full p-3 border border-black rounded-md"
              />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200">
              Send Message
            </button>
          </form>
        )}
      </section>

      {/* Connect via Social Media */}
      <section className="px-8 py-12 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Connect with Us</h2>
        <p className="text-lg mb-6">For more assistance, feel free to reach us via social media or email.</p>
        <div className="flex justify-center items-center space-x-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#3a42a0] hover:text-[#323946] transform-[.9s] border border-[#0ef] rounded-[50%] p-2 hover:bg-[#0ef] hover:shadow-2xl ">
          <FaFacebook size={30} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#323946] transform-[.9s] border border-[#0ef] rounded-[50%] p-2 hover:bg-[#0ef] hover:shadow-2xl ">
          <FaInstagram size={30} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-[#323946] transform-[.9s] border border-[#0ef] rounded-[50%] p-2 hover:bg-[#0ef] hover:shadow-2xl ">
          <FaYoutube size={30} />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#323946] transform-[.9s] border border-[#0ef] rounded-[50%] p-2 hover:bg-[#0ef] hover:shadow-2xl ">
          <FaGoogle size={30} />
        </a>
        <a href="https://wa.me/917014146818" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-[#323946] transform-[.9s] border border-[#0ef] rounded-[50%] p-2 hover:bg-[#0ef] hover:shadow-2xl ">
          <FaWhatsapp size={30} />
        </a>
      </div>
      </section>

      

    </div>
  );
};

export default SupportPage;
