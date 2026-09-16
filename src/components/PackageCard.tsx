// import { Clock, MapPin, Star, Heart } from "lucide-react";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// interface PackageCardProps {
//   id: string;
//   image: string;
//   title: string;
//   location: string;
//   duration: string;
//   price: number;
//   tier: "Essential" | "Signature" | "Elite";
//   rating: number;
//   highlights: string[];
//   badge?: "NEW" | "POPULAR";
// }

// const PackageCard = ({
//   id,
//   image,
//   title,
//   location,
//   duration,
//   price,
//   tier,
//   rating,
//   highlights,
//   badge,
// }: PackageCardProps) => {
//   const [isSaved, setIsSaved] = useState(false);

//   const tierColors = {
//     Essential: "bg-emerald text-emerald-foreground",
//     Signature: "bg-accent text-accent-foreground",
//     Elite: "bg-gradient-to-r from-accent to-amber-400 text-primary",
//   };

//   return (
//     <div className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
//       {/* Image Container */}
//       <div className="relative h-64 overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
//         {/* Badges */}
//         <div className="absolute top-4 left-4 flex gap-2">
//           {badge && (
//             <Badge className="bg-sunset text-sunset-foreground font-semibold">
//               {badge}
//             </Badge>
//           )}
//           <Badge className={tierColors[tier]}>{tier}</Badge>
//         </div>

//         {/* Save Button */}
//         <button
//           onClick={() => setIsSaved(!isSaved)}
//           className="absolute top-4 right-4 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-all duration-300"
//         >
//           <Heart
//             className={`h-5 w-5 transition-colors ${
//               isSaved ? "fill-sunset text-sunset" : "text-foreground"
//             }`}
//           />
//         </button>

//         {/* Rating */}
//         <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
//           <Star className="h-4 w-4 fill-accent text-accent" />
//           <span className="text-sm font-semibold">{rating}</span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6 space-y-4">
//         {/* Location */}
//         <div className="flex items-center gap-2 text-muted-foreground text-sm">
//           <MapPin className="h-4 w-4" />
//           <span>{location}</span>
//         </div>

//         {/* Title */}
//         <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
//           {title}
//         </h3>

//         {/* Duration & Price */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <Clock className="h-4 w-4" />
//             <span>{duration}</span>
//           </div>
//           <div className="text-right">
//             <p className="text-xs text-muted-foreground">Starting from</p>
//             <p className="text-2xl font-bold text-accent">₹{price.toLocaleString()}</p>
//           </div>
//         </div>

//         {/* Highlights */}
//         <ul className="space-y-1">
//           {highlights.slice(0, 3).map((highlight, index) => (
//             <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
//               <span className="text-accent mt-1">•</span>
//               <span>{highlight}</span>
//             </li>
//           ))}
//         </ul>

//         {/* Buttons */}
//         <div className="flex gap-2 pt-2">
//           <Link to={`/packages/${id}`} className="flex-1">
//             <Button variant="default" size="default" className="w-full">
//               View Details
//             </Button>
//           </Link>
//           <Link to="/contact">
//             <Button variant="outline" size="default">
//               Inquire
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageCard;

import { Clock, MapPin, Star, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

interface PackageCardProps {
  id: string;
  image: string;
  video?: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  tier: "Essential" | "Signature" | "Elite";
  rating: number;
  highlights: string[];
  badge?: "NEW" | "POPULAR";
}

const PackageCard = ({
  id,
  image,
  video,
  title,
  location,
  duration,
  price,
  tier,
  rating,
  highlights,
  badge,
}: PackageCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const tierColors = {
    Essential: "bg-emerald text-emerald-foreground",
    Signature: "bg-accent text-accent-foreground",
    Elite: "bg-gradient-to-r from-accent to-amber-400 text-primary",
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && video) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current && video) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image/Video Container */}
      <div className="relative h-64 overflow-hidden">
        {/* Image - Always present */}
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            video ? (isHovering ? 'opacity-0' : 'opacity-100 group-hover:scale-110') : 'group-hover:scale-110'
          }`}
        />
        
        {/* Video - Only if video prop exists */}
        {video && (
          <video
            ref={videoRef}
            src={video}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: isHovering ? 1 : 0 }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {badge && (
            <Badge className="bg-sunset text-sunset-foreground font-semibold">
              {badge}
            </Badge>
          )}
          <Badge className={tierColors[tier]}>{tier}</Badge>
        </div>

        {/* Save Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-all duration-300 z-10"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isSaved ? "fill-sunset text-sunset" : "text-foreground"
            }`}
          />
        </button>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full z-10">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Duration & Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-accent">₹{price.toLocaleString()}</p>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-1">
          {highlights.slice(0, 3).map((highlight, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Link to="/packages" className="flex-1">
            <Button variant="default" size="default" className="w-full">
              View Details
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="default">
              Inquire
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;