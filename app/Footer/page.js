import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaGoogle, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="w-full bg-[#333333] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Address and Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center text-sm">
              <FaMapMarkerAlt className="text-green-600 mr-2" />
              <a target="_blank" href="https://www.google.com/maps/place/Abhay+Adventure/@11.8714434,79.8202455,17z/data=!4m7!3m6!1s0x3a549fb451d9a7b1:0xc74b3ba2c290574d!4b1!8m2!3d11.8714434!4d79.8202455!16s%2Fg%2F11l1md39gs?entry=ttu"><p>Sandune Paradise beach, Pudukuppam, Puducherry 607402</p></a>
            </div>
            <div className="flex items-center text-sm">
              <FaPhone className="text-green-600 mr-2" />
              <a href="tel:+918003892498" className="hover:text-green-600">08003892498</a>
            </div>
            <div className="flex items-center text-sm">
              <FaPhone className="text-green-600 mr-2" />
              <a href="tel:+917014146818" className="hover:text-green-600">07014146818</a>
            </div>
            <div className="flex items-center text-sm">
              <FaEnvelope className="text-green-600 mr-2" />
              <a href="mailto:info@udaipuradventures.com" className="hover:text-green-600">abhayadventures582@gmail.com</a>
            </div>
          </div>

          <div className="flex items-center">
          <Link href="/">
            {/* Add your logo here */}
            <img src="/images/newlogo.png" alt="Parajet Logo" className="w-18 md:w-[12rem] mix-blend-multiply" />
          </Link>
        </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
              <FaInstagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
              <FaYoutube size={20} />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              <FaGoogle size={20} />
            </a>
            <a href="https://wa.me/917014146818" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-center">
          <p>&copy; 2025 Abhay Adventures. All rights reserved.</p>
          <p className="text-green-600">Designed by Tech_Annii</p>
        </div>
      </div>
    </footer>
  );
}
