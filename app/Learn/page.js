"use client";
import { useState } from 'react';
import { FaPlane, FaClock, FaUserCheck, FaClipboardList } from 'react-icons/fa';

const LearnToFlyPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-72 bg-blue-600 flex justify-center items-center text-white mt-12">
        <h1 className="text-5xl font-bold">Learn to Fly with Us</h1>
      </section>

      <div className="px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white">
  {/* Left Section - Course Info */}
  <div className="space-y-8">
    <h2 className="text-4xl font-bold mb-4">Become a Certified Paramotor Pilot</h2>
    <p className="text-lg text-gray-600">
      Our paramotoring course is designed to teach you everything you need to know about powered paragliding, from the basics to advanced techniques. Whether you're a complete beginner or looking to refine your flying skills, our certified instructors will guide you step by step.
    </p>
    <p className="text-lg text-gray-600">
      Learn how to safely take off, navigate, and land, while gaining confidence in controlling the paramotor under various conditions.
    </p>

    {/* Course Duration */}
    <div className="flex items-center">
      <FaClock className="text-blue-600 mr-3" size={24} />
      <div>
        <h3 className="text-xl font-semibold">Course Duration</h3>
        <p className="text-gray-600">3 Weeks (20 hours of in-air practice)</p>
      </div>
    </div>

    {/* Requirements */}
    <div className="flex items-center">
      <FaClipboardList className="text-blue-600 mr-3" size={24} />
      <div>
        <h3 className="text-xl font-semibold">Requirements</h3>
        <ul className="list-disc ml-5 text-gray-600">
          <li>No prior experience required</li>
          <li>Must be at least 18 years old</li>
          <li>Good physical condition</li>
          <li>Ability to understand and follow instructions</li>
        </ul>
      </div>
    </div>

    {/* Eligibility */}
    <div className="flex items-center">
      <FaUserCheck className="text-blue-600 mr-3" size={24} />
      <div>
        <h3 className="text-xl font-semibold">Eligibility</h3>
        <p className="text-gray-600">
          Anyone with a passion for flying and meeting the above requirements is eligible to enroll in this course.
        </p>
      </div>
    </div>

    {/* Trainer Details */}
    <div className="flex justify-start">
      <FaPlane className="text-blue-600 mr-3 mt-1" size={24} />
      <div>
        <h3 className="text-xl font-semibold">Meet Our Lead Trainer</h3>
        <p className="text-gray-600">
          Our lead trainer, <strong>John Doe</strong>, is an experienced paramotor pilot with over 15 years of flying experience.
        </p>
        <p className="text-gray-600">
          John has flown in various conditions around the world, and his vast knowledge ensures you learn all aspects of paramotoring safely and effectively.
        </p>
        <h4 className="text-lg font-semibold mt-2">Certifications:</h4>
        <ul className="list-disc ml-5 text-gray-600">
          <li>Certified Paramotor Instructor by the US Powered Paragliding Association (USPPA)</li>
          <li>First Aid & CPR Certified</li>
          <li>FAA Certified Pilot</li>
        </ul>
        <h4 className="text-lg font-semibold mt-2">Experience Highlights:</h4>
        <ul className="list-disc ml-5 text-gray-600">
          <li>Over 10,000 hours of flying experience</li>
          <li>Trained 500+ students successfully</li>
          <li>Flown in international paramotor competitions</li>
        </ul>

        {/* Certificate Image */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Trainer Certification:</h4>
          <img
            src="/images/certificate.jpg" // Replace with actual path to the certificate image
            alt="Trainer Certification"
            className="rounded-lg shadow-md w-full max-w-md"
          />
        </div>
      </div>
    </div>
  </div>

        {/* Right Section - Pricing and Images */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-4">Our Training Courses</h2>
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Beginner's Course</h3>
              <p className="text-lg text-gray-600">Perfect for beginners with no prior experience.</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-600">$1500</span>
                <span className="text-gray-600"> / full course</span>
              </div>
              <p className="text-gray-600 mt-2">Includes ground training, equipment, and 15 hours of in-air practice.</p>
            </div>

            {/* Advanced Course */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Advanced Course</h3>
              <p className="text-lg text-gray-600">For those with prior paramotoring experience.</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-600">$2500</span>
                <span className="text-gray-600"> / full course</span>
              </div>
              <p className="text-gray-600 mt-2">Includes advanced maneuver training, navigation, and 25 hours of in-air practice.</p>
            </div>
          </div>

          {/* Training Images */}
          <div className="space-y-4">
            <img
              src="/images/paramotor1.jpg"
              alt="Paramotor Training"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <img
              src="/images/paramotor2.jpg"
              alt="Paramotor Flying"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="px-8 py-16 bg-blue-600 text-white">
        <h2 className="text-4xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="text-center">
            <FaPlane className="mx-auto text-white mb-4" size={50} />
            <h3 className="text-2xl font-semibold">Certified Instructors</h3>
            <p className="text-lg">
              Our team consists of certified professionals with years of experience in paramotoring.
            </p>
          </div>

          <div className="text-center">
            <FaClock className="mx-auto text-white mb-4" size={50} />
            <h3 className="text-2xl font-semibold">Flexible Schedule</h3>
            <p className="text-lg">
              We offer flexible scheduling options to fit your lifestyle and availability.
            </p>
          </div>

          <div className="text-center">
            <FaUserCheck className="mx-auto text-white mb-4" size={50} />
            <h3 className="text-2xl font-semibold">Personalized Training</h3>
            <p className="text-lg">
              Our one-on-one sessions ensure personalized attention to accelerate your learning process.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LearnToFlyPage;
