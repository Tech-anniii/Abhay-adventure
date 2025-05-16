"use client";
import Image from "next/image";
import { useState } from "react";

const ParamotoringPage = () => {
    const [activeSection, setActiveSection] = useState("About");

    const sections = [
        { id: "About", title: "About Paramotoring" },
        { id: "Parts", title: "Paramotor Parts" },
        { id: "HowTo", title: "How to do Paramotoring" },
        { id: "Equipment", title: "Equipment of Paramotoring" },
    ];

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
    };

    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section */}
            <section className="relative h-64 md:h-80 bg-blue-700 flex justify-center items-center text-white">
                <h1 className="text-2xl md:text-4xl font-bold z-10 text-center">
                    Discover the World of Paramotoring
                </h1>
                <Image
                    src="/images/paramotoring-hero.jpg" // Replace with actual image path
                    alt="Paramotoring Hero"
                    fill
                    className="object-cover opacity-60"
                />
            </section>

            {/* Navigation */}
            <nav className="  flex flex-wrap justify-center space-x-4 md:space-x-6 py-2 md:py-4 bg-blue-600  top-0 z-50 text-white">
                {sections.map(({ id, title }) => (
                    <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={`text-sm md:text-lg px-2 py-1 md:px-4 md:py-2 rounded hover:bg-blue-800 ${
                            activeSection === id ? "bg-blue-800" : ""
                        }`}
                    >
                        {title}
                    </button>
                ))}
            </nav>

            {/* About Paramotoring */}
            <section id="About" className="px-4 md:px-8 py-8 md:py-12 bg-white">
                <div className="flex items-center space-x-2 mb-4">
                    <img height={15} width={30} src="/images/icon.png" alt="" />
                    <h2 className="text-2xl md:text-3xl font-bold">
                        About Paramotoring
                    </h2>
                </div>
                <p className="text-base md:text-lg mb-4">
                    Paramotoring is an exhilarating form of powered paragliding where a
                    pilot wears a motor on their back to provide thrust and maintain
                    flight. It allows for a unique flying experience with the freedom to
                    soar over landscapes without the need for wind or thermals.
                </p>
                <div className="relative w-full mt-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                    <Image
                        height={300}
                        width={500}
                        src="/images/paramotoring-flight.jpg" // Replace with actual image path
                        alt="Paramotoring Flight"
                        className="rounded-lg shadow-lg object-cover"
                    />
                    <Image
                        height={300}
                        width={500}
                        src="/images/paramotoring-vehicle.png" // Replace with actual image path
                        alt="Paramotoring Vehicle"
                        className="rounded-lg shadow-lg object-cover"
                    />
                </div>
            </section>

            {/* Paramotor Parts */}
            <section id="Parts" className="px-4 md:px-8 py-8 md:py-12 bg-gray-50">
                <div className="flex items-center space-x-2 mb-4">
                    <img height={15} width={30} src="/images/icon.png" alt="" />
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Paramotor Parts
                    </h2>
                </div>
                <p className="text-base md:text-lg mb-8">
                    A paramotor consists of various essential components that work
                    together to keep the pilot safe and airborne. Here are the major
                    parts:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Glider",
                            description: "The wing or glider that generates lift.",
                            img: "/images/glider.jpg",
                        },
                        {
                            title: "Motor",
                            description:
                                "The engine that powers the propeller to generate thrust.",
                            img: "/images/motor.jpg",
                        },
                        {
                            title: "Propeller",
                            description: "A propeller that provides forward thrust.",
                            img: "/images/propeller.jpg",
                        },
                        {
                            title: "Harness",
                            description:
                                "The seat where the pilot sits, connected to the motor.",
                            img: "/images/harness.jpg",
                        },
                    ].map((part, index) => (
                        <div key={index} className="relative group cursor-pointer">
                            <Image
                                src={part.img} // Replace with actual image path
                                alt={part.title}
                                width={500}
                                height={300}
                                className="rounded-lg object-cover shadow-md group-hover:opacity-80 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex justify-center items-center transition duration-300 flex-col gap-2 p-2">
                                <p className="text-white text-lg md:text-2xl font-semibold">
                                    {part.title}
                                </p>
                                <p className="text-white text-sm md:text-lg font-semibold text-center">
                                    {part.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How to do Paramotoring */}
            <section id="HowTo" className="px-4 md:px-8 py-8 md:py-12 bg-white">
                <div className="flex items-center space-x-2 mb-4">
                    <img height={15} width={30} src="/images/icon.png" alt="" />
                    <h2 className="text-2xl md:text-3xl font-bold">
                        How to do Paramotoring
                    </h2>
                </div>
                <p className="text-base md:text-lg mb-4">
                    Paramotoring requires proper training and knowledge. Here's how the
                    process typically works:
                </p>
                <ul className="list-disc ml-6 text-base md:text-lg space-y-2">
                    <li>Enroll in a certified paramotoring course.</li>
                    <li>Learn how to control the glider on the ground before attempting flight.</li>
                    <li>Get familiar with the motor and equipment handling.</li>
                    <li>Perform training flights under instructor supervision.</li>
                    <li>Gradually gain solo flying experience with proper safety precautions.</li>
                </ul>
                <div className="relative w-full mt-8 flex justify-center">
                    <Image
                        height={200}
                        width={1200}
                        src="/images/paramotoring-training.jpg" // Replace with actual image path
                        alt="Paramotoring Training"
                        className="object-cover rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* Equipment of Paramotoring */}
            <section id="Equipment" className="px-4 md:px-8 py-8 md:py-12 bg-gray-50">
                <div className="flex items-center space-x-2 mb-4">
                    <img height={15} width={30} src="/images/icon.png" alt="" />
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Equipment of Paramotoring
                    </h2>
                </div>
                <p className="text-base md:text-lg mb-4">
                    Paramotoring requires specialized equipment to ensure safe and
                    efficient flying. Here is a breakdown of essential gear:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Helmet",
                            description:
                                "A lightweight helmet for head protection and communication.",
                            img: "/images/helmet.jpg",
                        },
                        {
                            title: "Reserve Parachute",
                            description:
                                "A backup parachute in case of emergencies.",
                            img: "/images/reserve.jpg",
                        },
                        {
                            title: "Flight Suit",
                            description:
                                "A protective suit to guard against cold air and abrasions.",
                            img: "/images/flightsuit.jpg",
                        },
                        {
                            title: "GPS",
                            description:
                                "A GPS device for navigation during long-distance flights.",
                            img: "/images/gps.jpg",
                        },
                    ].map((equipment, index) => (
                        <div key={index} className="relative group cursor-pointer">
                            <Image
                                src={equipment.img} // Replace with actual image path
                                alt={equipment.title}
                                width={500}
                                height={300}
                                className="rounded-lg object-cover shadow-md group-hover:opacity-80 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex justify-center items-center transition duration-300 flex-col gap-2 p-2">
                                <p className="text-white text-lg md:text-2xl font-semibold">
                                    {equipment.title}
                                </p>
                                <p className="text-white text-sm md:text-lg font-semibold text-center">
                                    {equipment.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ParamotoringPage;
