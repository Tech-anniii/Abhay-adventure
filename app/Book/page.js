"use client";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaUsers, FaClock, FaMountain, FaWeight, FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Head from 'next/head';
import Image from "next/image";
import Script from "next/script";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import logoImage from "@/public/images/logo.png";

const Page = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [travellers, setTravellers] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const pricePerAdult = 2499;
    const totalPrice = travellers * pricePerAdult;

    const ensureRazorpayLoaded = () => {
        if (typeof window === "undefined") return Promise.resolve(false);
        if (window.Razorpay) return Promise.resolve(true);

        return new Promise((resolve) => {
            const src = "https://checkout.razorpay.com/v1/checkout.js";
            const existing = document.querySelector(`script[src="${src}"]`);

            if (existing) {
                existing.addEventListener("load", () => resolve(true), { once: true });
                existing.addEventListener("error", () => resolve(false), { once: true });
                return;
            }

            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!name || !email || !selectedDate || !travellers) {
            alert("Please fill all the fields before proceeding.");
            return;
        }

        const dateObj = new Date(selectedDate);
        const formattedDate = dateObj.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        try {
            const res = await fetch("/api/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: totalPrice * 100,
                    name,
                    email,
                    date: formattedDate,
                    dateISO: dateObj.toISOString(),
                    travellers,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data?.error || "Order creation failed");
            }

            const bookingId = data?.bookingId;
            const razorpayKey = data?.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

            const generateTicketPDF = async ({ name, email, amount, paymentId }) => {
                const doc = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: "a4"
                });

                const fetchImageAsBase64 = async (url) => {
                    try {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        return await new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                        });
                    } catch (e) {
                        console.warn(`Image could not be loaded: ${url}`, e);
                        return null;
                    }
                };

                const logoBase64 = await fetchImageAsBase64("/images/logo.png");
                const ticketIconBase64 = await fetchImageAsBase64("/images/paraglider.png");

                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();
                const margin = 12;
                const contentWidth = pageWidth - 2 * margin;

                doc.setFillColor(30, 58, 138);
                doc.rect(0, 0, pageWidth, 45, 'F');

                if (logoBase64) {
                    doc.addImage(logoBase64, "PNG", margin, 8, 30, 20);
                }

                doc.setFont(undefined, 'bold');
                doc.setFontSize(24);
                doc.setTextColor(255, 255, 255);
                doc.text("ABHAY ADVENTURES", pageWidth / 2, 28, { align: 'center' });

                doc.setFontSize(12);
                doc.setTextColor(255, 200, 0);
                doc.text("PARAMOTORING ADVENTURE TICKET", pageWidth / 2, 36, { align: 'center' });

                doc.setDrawColor(255, 200, 0);
                doc.setLineWidth(0.5);
                doc.line(margin, 48, pageWidth - margin, 48);

                doc.setFillColor(76, 175, 80);
                doc.rect(pageWidth - margin - 40, 55, 35, 12, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFont(undefined, 'bold');
                doc.setFontSize(9);
                doc.text("✓ CONFIRMED", pageWidth - margin - 18, 62, { align: 'center' });

                let yPosition = 55;

                doc.setTextColor(30, 58, 138);
                doc.setFont(undefined, 'bold');
                doc.setFontSize(11);
                doc.text("PASSENGER DETAILS", margin, yPosition);

                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.3);
                doc.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);

                yPosition += 10;
                doc.setTextColor(50, 50, 50);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(10);

                doc.setFont(undefined, 'bold');
                doc.text("Name:", margin + 2, yPosition);
                doc.setFont(undefined, 'normal');
                doc.text(name, margin + 30, yPosition);

                yPosition += 7;

                doc.setFont(undefined, 'bold');
                doc.text("Email:", margin + 2, yPosition);
                doc.setFont(undefined, 'normal');
                doc.text(email, margin + 30, yPosition);

                yPosition += 7;

                doc.setFont(undefined, 'bold');
                doc.text("Travellers:", margin + 2, yPosition);
                doc.setFont(undefined, 'normal');
                doc.text(`${travellers} Person${travellers > 1 ? 's' : ''}`, margin + 30, yPosition);

                yPosition += 13;
                doc.setTextColor(30, 58, 138);
                doc.setFont(undefined, 'bold');
                doc.setFontSize(11);
                doc.text("BOOKING DETAILS", margin, yPosition);

                doc.setLineWidth(0.3);
                doc.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);

                yPosition += 10;
                doc.setTextColor(50, 50, 50);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(10);

                doc.setFont(undefined, 'bold');
                doc.text("Activity:", margin + 2, yPosition);
                doc.setFont(undefined, 'normal');
                doc.text("Powered Paramotoring (10-15 KM)", margin + 30, yPosition);

                yPosition += 7;

                doc.setFont(undefined, 'bold');
                doc.text("Duration:", margin + 2, yPosition);
                doc.setFont(undefined, 'normal');
                doc.text("20 mins (Incl. Briefing & Flying)", margin + 30, yPosition);

                yPosition += 7;

                doc.setFont(undefined, 'bold');
                doc.text("Location:", margin + 2, yPosition);
                doc.setFont(undefined, 'normal');
                doc.text("Pudukuppam, Puducherry 607402", margin + 30, yPosition);

                yPosition += 13;
                doc.setFillColor(255, 200, 0);
                doc.rect(margin, yPosition - 5, contentWidth, 22, 'F');

                doc.setTextColor(30, 58, 138);
                doc.setFont(undefined, 'bold');
                doc.setFontSize(14);
                doc.text("AMOUNT PAID", margin + 5, yPosition + 2);

                doc.setFontSize(18);
                doc.text(`₹${amount}`, pageWidth - margin - 20, yPosition + 2, { align: 'right' });

                yPosition += 10;
                doc.setFontSize(9);
                doc.text(`Payment ID: ${paymentId}`, margin + 5, yPosition + 5);

                yPosition += 18;
                doc.setTextColor(30, 58, 138);
                doc.setFont(undefined, 'bold');
                doc.setFontSize(11);
                doc.text("SAFETY GUIDELINES", margin, yPosition);

                doc.setLineWidth(0.3);
                doc.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);

                yPosition += 8;
                doc.setTextColor(50, 50, 50);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);

                const safetyPoints = [
                    "• Wear safety gear provided before the flight",
                    "• Follow all pilot instructions strictly",
                    "• People with heart conditions should avoid this activity",
                    "• Age limit: 10 to 70 years | Weight limit: 15-100 kg",
                    "• Best time: October to March (cooler weather)"
                ];

                safetyPoints.forEach((point) => {
                    doc.text(point, margin + 3, yPosition);
                    yPosition += 5;
                });

                yPosition += 5;
                doc.setDrawColor(30, 58, 138);
                doc.setLineWidth(0.5);
                doc.line(margin, yPosition, pageWidth - margin, yPosition);

                yPosition += 6;
                doc.setTextColor(100, 100, 100);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(8);
                doc.text("Thank you for choosing Abhay Adventures! Enjoy your flight! 🎉", pageWidth / 2, yPosition, { align: 'center' });

                yPosition += 5;
                doc.text("For inquiries: www.abhay-adventure.com | Phone: +91-8533812266", pageWidth / 2, yPosition, { align: 'center' });

                doc.save(`Abhay_Adventure_Ticket_${name}.pdf`);
            };

            if (!data?.id) {
                toast.error(
                    "Payment is not configured on the server (missing Razorpay keys). Booking was saved in DB."
                );
                return;
            }

            if (!razorpayKey) {
                toast.error("Razorpay key is missing. Set NEXT_PUBLIC_RAZORPAY_KEY_ID or configure server keys.");
                return;
            }

            const ready = await ensureRazorpayLoaded();
            if (!ready) {
                toast.error("Razorpay checkout failed to load. Please check your internet and try again.");
                return;
            }

            const options = {
                key: razorpayKey,
                amount: data.amount,
                currency: "INR",
                name: "Abhay Adventure",
                description: "Paramotoring Booking",
                order_id: data.id,
                handler: async function (response) {
                    try {
                        toast.success("✅ Payment Successful!");

                        if (bookingId) {
                            await fetch("/api/bookings/confirm", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    bookingId,
                                    razorpayPaymentId: response.razorpay_payment_id || response.payment_id,
                                    razorpayOrderId: response.razorpay_order_id || data.id,
                                    razorpaySignature: response.razorpay_signature,
                                }),
                            });
                        }

                        await generateTicketPDF({
                            name,
                            email,
                            amount: totalPrice,
                            paymentId: response.razorpay_payment_id || response.payment_id,
                        });
                    } catch (err) {
                        console.error("❌ PDF generation error:", err);
                        alert("Something went wrong while generating the ticket.");
                    }
                },
                prefill: { name, email },
                theme: { color: "#f37254" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            alert("Payment initialization failed: " + err.message);
        }
    };

    useEffect(() => {
        ensureRazorpayLoaded();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Head>
                <title>Paramotoring in Pondicherry | Abhay Adventure</title>
                <meta name="description" content="Book an adrenaline-filled paramotoring experience in Pondicherry with certified pilots. Explore now!" />
            </Head>
            
            <Script 
                src="https://checkout.razorpay.com/v1/checkout.js" 
                strategy="afterInteractive"
            />
            
            {/* Hero Section with Animation */}
            <section className="relative">
                <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                    {/* Video Background */}
                    <div className="absolute inset-0 transform scale-105 transition-transform duration-700 hover:scale-100">
                        <Image 
                            width="1920" 
                            height="1080" 
                            className="w-full h-full object-cover" 
                            src="/images/land.png" 
                            alt="Paramotoring Adventure" 
                            priority
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

                    {/* Animated Text Content */}
                    <div className={`relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-6 animate-fade-in-down tracking-tight">
                            LIVE LIFE <span className="text-yellow-400">ABOVE</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 max-w-3xl animate-fade-in-up font-light px-2">
                            Explore your world from a unique 360-degree perspective when you fly a
                            Parajet paramotor
                        </p>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium animate-pulse bg-yellow-500/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-sm border border-yellow-500/30">
                            ✈️ Fly Over the Breathtaking Beauty of Pondicherry
                        </p>
                        
                        {/* Scroll Indicator */}
                        <div className="absolute bottom-8 animate-bounce hidden md:block">
                            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-ping"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-8 md:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Side - Main Content (2 columns on xl screens) */}
                        <div className="xl:col-span-2 space-y-6 md:space-y-8">
                            {/* Title and Price Card with Animation */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
                                <div className="flex flex-col space-y-4">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                        Powered Paramotoring in Pondicherry
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                        <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full">
                                            <FaStar className="text-yellow-500 text-lg" />
                                            <span className="text-xl font-bold text-gray-900">4.5</span>
                                            <span className="text-sm text-gray-600">/ 5</span>
                                        </div>
                                        <p className="text-sm text-gray-600 px-4 py-2 bg-gray-50 rounded-full">⭐ 16 reviews</p>
                                    </div>
                                    <div className="flex items-start space-x-2 text-gray-600 group cursor-pointer">
                                        <FaMapMarkerAlt className="text-red-500 mt-1 text-lg group-hover:animate-bounce" />
                                        <p className="text-sm md:text-base">Sandune Paradise beach, Pudukuppam, Puducherry 607402</p>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200">
                                        <button className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                            🎟️ Booking Starting at ₹2499
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Experience Section with Staggered Animation */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 md:p-8 transform hover:scale-[1.02] transition-all duration-300">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">✨ What will you experience</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                    {[

                                        { icon: "/images/paraglider.png", text: "Upto 10 Mins of Paramotoring", delay: "delay-100" },
                                        { icon: "/images/instructor.png", text: "Certified Instructor", delay: "delay-200" },
                                        { icon: "/images/adrenaline.png", text: "Feel the Adrenaline Rush", delay: "delay-300" }
                                    ].map((item, index) => (
                                        <div 
                                            key={index}
                                            className={`flex flex-col items-center text-center space-y-3 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in ${item.delay} group`}
                                        >
                                            <div className="relative w-12 h-12 md:w-16 md:h-16 group-hover:scale-110 transition-transform duration-300">
                                                <Image 
                                                    height={64} 
                                                    width={64} 
                                                    src={item.icon} 
                                                    alt={item.text}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <p className="text-sm md:text-base font-semibold text-gray-800">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Activity Info with Modern Design */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transform hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="relative w-8 h-8">
                                        <Image height={30} width={30} src="/images/icon.png" alt="" className="w-full h-full" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">📋 Activity Details</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <tbody className="divide-y divide-gray-100">
                                            {[
                                                { label: "Activity Location", value: "Bagru, Jaipur", icon: <FaMapMarkerAlt className="text-red-500" /> },
                                                { label: "Activity Duration", value: "20 Mins (Incl. Briefing, Flying)", icon: <FaClock className="text-blue-500" /> },
                                                { label: "Flying Duration", value: "10 to 15 KM", icon: <FaMountain className="text-green-500" /> },
                                                { label: "Maximum Height", value: "500-700 feet", icon: <FaMountain className="text-purple-500" /> },
                                                { label: "Age Limit", value: "10 to 70 Years", icon: <FaUsers className="text-orange-500" /> },
                                                { label: "Weight Limit", value: "15 KG to 100 KG", icon: <FaWeight className="text-indigo-500" /> },
                                                { label: "Morning Timing", value: "06:00 AM to 10:00 AM", icon: <FaClock className="text-yellow-500" /> },
                                                { label: "Evening Timing", value: "03:00 PM to 07:00 PM", icon: <FaClock className="text-pink-500" /> },
                                            ].map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                                    <td className="p-4 font-semibold text-gray-700 text-sm md:text-base">
                                                        <div className="flex items-center space-x-2">
                                                            {item.icon}
                                                            <span>{item.label}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-gray-900 font-medium text-sm md:text-base">{item.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Package Option with Enhanced Design */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transform hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="relative w-8 h-8">
                                        <Image height={30} width={30} src="/images/icon.png" alt="" className="w-full h-full" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">🎫 Package Option</h2>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 transform hover:scale-[1.02]">
                                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4">Powered Paragliding (10 to 15 KM)</h3>
                                        <div className="flex items-center space-x-2 text-gray-700 mb-3">
                                            <FaClock className="text-indigo-600" />
                                            <span className="font-medium">10 Mins</span>
                                        </div>
                                        <div className="flex items-baseline space-x-2 mb-4">
                                            <span className="text-3xl md:text-4xl font-bold text-indigo-600">₹ 2499</span>
                                            <span className="text-gray-600">per person</span>
                                        </div>
                                        <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 group">
                                            <FaMapMarkerAlt className="group-hover:animate-bounce" />
                                            <span>View Activity Location</span>
                                        </button>
                                    </div>
                                    
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <ul className="space-y-3">
                                            {[
                                                { included: true, text: "10 to 15 KM (Upto 10 Mins)" },
                                                { included: true, text: "Experienced & Licensed Pilot" },
                                                { included: true, text: "Upto 700 Feet Height" },
                                                { included: false, text: "Any Personal Expenses" },
                                                { included: false, text: "Any Travel Expenses" }
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-start space-x-3 text-sm md:text-base transform hover:translate-x-2 transition-transform duration-200">
                                                    {item.included ? (
                                                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                                                    ) : (
                                                        <FaTimesCircle className="text-red-600 mt-1 flex-shrink-0" />
                                                    )}
                                                    <span className={item.included ? "text-gray-800" : "text-gray-600"}>{item.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Know Before You Book */}
                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-yellow-200 transform hover:scale-[1.02] transition-all duration-300">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 flex items-center space-x-2">
                                    <span>⚠️</span>
                                    <span>Know before you book</span>
                                </h3>
                                <ul className="space-y-3 text-sm md:text-base text-gray-700">
                                    {[
                                        "If you are suffering from bone and joint injuries, disc compression, and osteoporosis, avoid the activity.",
                                        "People with common health issues like migraine and high blood pressure are also told to inform before flying.",
                                        "Read and follow instructions given by the pilot who assists you."
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start space-x-3 transform hover:translate-x-2 transition-transform duration-200">
                                            <span className="text-yellow-600 font-bold text-lg flex-shrink-0">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}

                                </ul>
                                <button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 py-3 px-6 mt-6 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
                                    📖 Read More
                                </button>
                            </div>
                            {/* Things to Carry */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transform hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="relative w-8 h-8">
                                        <Image height={30} width={30} src="/images/icon.png" alt="" className="w-full h-full" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">🎒 Things to Carry</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        "Wear Comfortable Clothes",
                                        "Long Trousers",
                                        "Wear Sports Shoes",
                                        "Sunscreen",
                                        "Sunglasses",
                                        "Camera/Phone",
                                        "Valid ID Proof",
                                        "UA Voucher"
                                    ].map((item, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 group"
                                        >
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
                                            <span className="text-sm md:text-base text-gray-800 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* FAQ Section with Accordion */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transform hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="relative w-8 h-8">
                                        <Image height={30} width={30} src="/images/icon.png" alt="" className="w-full h-full" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">❓ Frequently Asked Questions</h2>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        {
                                            q: "Is it Safe to Book Powered Paragliding in Jaipur?",
                                            a: "Yes, it is safe to book Powered Paragliding in Jaipur because Universal Adventures is a well-known platform for booking adventure activities like this, and all their ground staff members are experienced with years of experience."
                                        },
                                        {
                                            q: "How can I book Powered Paragliding in Jaipur?",
                                            a: "One can book Powered Paragliding in Jaipur via a trusted platform like Universal Adventures or call on +91-8533812266 to book your slot via phone call."
                                        },
                                        {
                                            q: "What is the Cost of Powered Paragliding in Jaipur?",
                                            a: "The Cost of Powered Paragliding in Jaipur starts from INR 2249/- Person."
                                        },
                                        {
                                            q: "What is powered paragliding?",
                                            a: "Powered paragliding involves flying a paraglider equipped with a small motor (a power unit) that provides thrust, allowing you to stay airborne without relying solely on wind conditions."
                                        },
                                        {
                                            q: "When is the best time to go powered paragliding in Jaipur?",
                                            a: "The best time is from October to March when the weather is cooler and more stable."
                                        },
                                        {
                                            q: "What is the Age Limit for Powered Paragliding in Jaipur?",
                                            a: "The age limit for Powered Paragliding in Jaipur is between 10 to 70 years, depending on the health and fitness of the individual."
                                        },
                                        {
                                            q: "What is the Weight Limit for Powered Paragliding in Jaipur?",
                                            a: "The weight limit for Powered Paragliding in Jaipur is between 15 to 100 kgs, depending on the health and fitness of the individual."
                                        },
                                        {
                                            q: "What is the difficulty level of Powered Paragliding in Jaipur?",
                                            a: "The difficulty level of Powered Paragliding in Jaipur is easy to moderate."
                                        },
                                        {
                                            q: "What is the best platform to book Powered Paragliding in Jaipur?",
                                            a: "The best platform to book Powered Paragliding in Jaipur is through the Universal Adventures Website as they are well known and follow all the safety guidelines to ensure a hassle-free experience."
                                        },
                                        {
                                            q: "Is Powered Paragliding in Jaipur considered safe for beginners?",
                                            a: "Yes, Powered Paragliding in Jaipur is considered safe for beginners, so everyone meeting the basic requirements of Age Limit and Weight Limit and who doesn&apos;t have any medical ailments can go for this activity."
                                        }
                                    ].map((faq, index) => (
                                        <div 
                                            key={index}
                                            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                                        >
                                            <button
                                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                                className="w-full flex items-start justify-between p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white hover:from-indigo-50 hover:to-blue-50 transition-all duration-300"
                                            >
                                                <span className="text-left font-semibold text-gray-900 text-sm md:text-base pr-4">
                                                    {faq.q}
                                                </span>
                                                <span className={`text-2xl text-indigo-600 transform transition-transform duration-300 flex-shrink-0 ${expandedFaq === index ? 'rotate-45' : ''}`}>
                                                    +
                                                </span>
                                            </button>
                                            <div 
                                                className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96' : 'max-h-0'}`}
                                            >
                                                <div className="p-4 md:p-5 bg-gray-50 text-gray-700 text-sm md:text-base border-t border-gray-200">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Booking Form with Sticky Position */}
                        <div className="xl:col-span-1">
                            <div className="sticky top-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-2xl p-6 md:p-8 transform hover:scale-[1.02] transition-all duration-300 border border-indigo-100">
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h2 className="text-lg font-bold mb-4 text-center">Bookings Details</h2>

                                        <div className="mt-6 space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full p-2 border rounded"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full p-2 border rounded"
                                            />
                                            <div className="flex flex-col md:flex-row items-center gap-4">
                                                <label>Choose Date:</label>
                                                <DatePicker
                                                    selected={selectedDate}
                                                    onChange={(date) => setSelectedDate(date)}
                                                    className="p-2 border rounded"
                                                    minDate={new Date()}
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <label>No. of Travellers:</label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={travellers === 0 || isNaN(travellers) ? "" : travellers}
                                                    onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        setTravellers(isNaN(val) || val < 1 ? 1 : val);
                                                    }}
                                                    className="w-20 p-2 border rounded"
                                                />
                                            </div>
                                            <p className="font-semibold text-lg">Total Price: ₹{totalPrice}</p>

                                            <button
                                                onClick={handlePayment}
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
                                            >
                                                Pay ₹{totalPrice} & Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>      
    );
};

export default Page;