// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, Phone } from "lucide-react";
// import { Button } from "./ui/button";
// import logo from "@/assets/logo.png";

// const Navigation = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Tour Packages", path: "/packages" },
//     { name: "Custom Trips", path: "/custom-trips" },
//     { name: "Destinations", path: "/destinations" },
//     { name: "Gallery", path: "/gallery" },
//     { name: "About Us", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled 
//           ? "bg-white/95 backdrop-blur-md shadow-lg py-3" 
//           : "py-5"
//       }`}
//     >
//       <nav className="container mx-auto px-4 lg:px-8">
//         <div className="flex items-center justify-between">
//           {/* Logo with Dark Circular Background */}
//           <Link to="/" className="flex items-center space-x-3 group">
//             <div className="h-12 w-12 lg:h-14 lg:w-14 rounded-full bg-black/90 backdrop-blur-md p-1.5 ring-2 ring-black/20 group-hover:ring-accent/50 transition-all flex items-center justify-center shadow-lg">
//               <img 
//                 src={logo} 
//                 alt="SNAV Tourism Logo" 
//                 className="h-full w-full rounded-full object-cover"
//               />
//             </div>
//             <div className={`text-2xl lg:text-3xl font-display font-bold tracking-wider transition-colors ${
//               isScrolled ? "text-primary" : "text-white drop-shadow-lg"
//             } group-hover:text-accent`}>
//               SNAV
//               <span className={`transition-colors ${
//                 isScrolled ? "text-accent" : "text-accent"
//               } group-hover:text-primary`}>Tourism</span>
//             </div>
//           </Link>

//           {/* Desktop Navigation - Adaptive Styling */}
//           <div className="hidden lg:flex items-center space-x-3">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`px-5 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
//                   isScrolled
//                     ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
//                     : "bg-white/10 hover:bg-white/20 text-white drop-shadow-lg"
//                 }`}
//               >
//                 <span className="font-semibold text-sm whitespace-nowrap hover:text-accent transition-colors">
//                   {link.name}
//                 </span>
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Actions - Always Visible */}
//           <div className="hidden lg:flex items-center space-x-3">
//             <a href="https://wa.me/8652885584" target="_blank" rel="noopener noreferrer">
//               <button className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] backdrop-blur-md transition-all shadow-lg text-white font-semibold text-sm flex items-center whitespace-nowrap">
//                 <Phone className="h-4 w-4 mr-2" />
//                 WhatsApp
//               </button>
//             </a>
//             <Link to="/contact">
//               <button className="px-5 py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] backdrop-blur-md transition-all shadow-lg text-white font-semibold text-sm whitespace-nowrap">
//                 BOOK NOW
//               </button>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className={`lg:hidden p-2.5 rounded-full backdrop-blur-md transition-all ${
//               isScrolled
//                 ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
//                 : "bg-white/10 hover:bg-white/20 text-white"
//             } hover:text-accent`}
//           >
//             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className={`lg:hidden mt-6 pb-6 space-y-3 border-t pt-6 animate-fade-in-up backdrop-blur-lg rounded-2xl px-4 ${
//             isScrolled
//               ? "bg-white border-gray-200"
//               : "bg-black/60 border-white/20"
//           }`}>
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className={`block transition-colors font-semibold py-3 rounded-xl px-4 backdrop-blur-sm ${
//                   isScrolled
//                     ? "text-gray-900 hover:text-accent hover:bg-gray-100"
//                     : "text-white hover:text-accent hover:bg-white/10"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <div className="flex flex-col space-y-3 pt-4">
//               <a href="https://wa.me/8652885584" target="_blank" rel="noopener noreferrer">
//                 <button className="w-full px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5A] backdrop-blur-md transition-all shadow-lg text-white font-semibold flex items-center justify-center">
//                   <Phone className="h-4 w-4 mr-2" />
//                   WhatsApp
//                 </button>
//               </a>
//               <Link to="/contact">
//                 <button className="w-full px-5 py-3 rounded-full bg-[#F59E0B] hover:bg-[#D97706] backdrop-blur-md transition-all shadow-lg text-white font-semibold">
//                   BOOK NOW
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Navigation;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Phone } from "lucide-react";
import { Button } from "./ui/button";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tour Packages", path: "/packages" },
    { name: "Custom Trips", path: "/custom-trips" },
    { name: "Destinations", path: "/destinations" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-lg py-3" 
          : "py-5"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`h-12 w-12 lg:h-14 lg:w-14 rounded-full p-1.5 ring-2 transition-all flex items-center justify-center ${
              isScrolled 
                ? "bg-black ring-gray-200 group-hover:ring-accent" 
                : "bg-black/80 backdrop-blur-md ring-white/20 group-hover:ring-accent/50"
            }`}>
              <img 
                src={logo} 
                alt="SNAV Tourism Logo" 
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className={`text-2xl lg:text-3xl font-display font-bold tracking-wider transition-colors ${
              isScrolled 
                ? "text-gray-900" 
                : "text-white drop-shadow-lg"
            } group-hover:text-accent`}>
              SNAV
              <span className="text-accent group-hover:text-gray-900">Tourism</span>
            </div>
          </Link>

          {/* Desktop Navigation - Simple Black/White Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span className="font-semibold text-sm whitespace-nowrap hover:text-accent transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <a href="https://wa.me/8652885584" target="_blank" rel="noopener noreferrer">
              <button className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] transition-all shadow-lg text-white font-semibold text-sm flex items-center whitespace-nowrap">
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </button>
            </a>
            <Link to="/contact">
              <button className="px-5 py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] transition-all shadow-lg text-white font-semibold text-sm whitespace-nowrap">
                BOOK NOW
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-full transition-all ${
              isScrolled
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-gray-900 hover:bg-gray-100"
            } hover:text-accent`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden mt-6 pb-6 space-y-3 border-t pt-6 animate-fade-in-up rounded-2xl px-4 shadow-lg ${
            isScrolled
              ? "bg-white border-gray-200"
              : "bg-black/80 backdrop-blur-lg border-white/20"
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block transition-colors font-semibold py-3 rounded-xl px-4 ${
                  isScrolled
                    ? "text-gray-900 hover:text-accent hover:bg-gray-100"
                    : "text-white hover:text-accent hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
              <a href="https://wa.me/8652885584" target="_blank" rel="noopener noreferrer">
                <button className="w-full px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5A] transition-all shadow-lg text-white font-semibold flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp
                </button>
              </a>
              <Link to="/contact">
                <button className="w-full px-5 py-3 rounded-full bg-[#F59E0B] hover:bg-[#D97706] transition-all shadow-lg text-white font-semibold">
                  BOOK NOW
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;