// import { useState } from "react";
// import PackageCard from "@/components/PackageCard";
// import { Button } from "@/components/ui/button";
// import { Filter, SlidersHorizontal } from "lucide-react";

// import packageGoa from "@/assets/package-goa.jpg";
// import packageVaranasi from "@/assets/package-varanasi.jpg";
// import packageLadakh from "@/assets/package-ladakh.jpg";
// import packageJaipur from "@/assets/package-jaipur.jpg";
// import packagekerala from "@/assets/package-kerala.jpg";
// import herogoldentemple from "@/assets/hero-golden-temple.jpg";

// const allPackages = [
//   {
//     id: "kashmir-paradise",
//     image: packageLadakh,
//     title: "Kashmir & Ladakh Himalayan Odyssey",
//     location: "Jammu & Kashmir, Ladakh",
//     duration: "9 Days / 8 Nights",
//     price: 45999,
//     tier: "Elite" as const,
//     rating: 5.0,
//     highlights: [
//       "Dal Lake shikara ride & houseboat stay",
//       "Gulmarg & Sonamarg valley tours",
//       "Leh-Ladakh mountain adventure",
//       "Pangong Lake & Nubra Valley",
//     ],
//     badge: "POPULAR" as const,
//   },
//   {
//     id: "rajasthan-royal",
//     image: packageJaipur,
//     title: "Royal Rajasthan Heritage Circuit",
//     location: "Rajasthan",
//     duration: "8 Days / 7 Nights",
//     price: 35999,
//     tier: "Signature" as const,
//     rating: 4.9,
//     highlights: [
//       "Jaipur Pink City & Amber Fort",
//       "Udaipur City Palace & Lake Pichola",
//       "Jaisalmer Golden Fort & desert safari",
//       "Traditional Rajasthani cuisine",
//     ],
//     badge: "NEW" as const,
//   },
//   {
//     id: "kerala-backwaters",
//     image: packagekerala,
//     title: "Kerala Backwaters & Beaches Retreat",
//     location: "Kerala",
//     duration: "6 Days / 5 Nights",
//     price: 28999,
//     tier: "Signature" as const,
//     rating: 4.8,
//     highlights: [
//       "Alleppey houseboat cruise",
//       "Munnar tea plantation visit",
//       "Ayurvedic spa treatments",
//       "Kovalam beach relaxation",
//     ],
//   },
//   {
//     id: "goa-beaches",
//     image: packageGoa,
//     title: "Goa Beach Paradise & Nightlife",
//     location: "Goa",
//     duration: "5 Days / 4 Nights",
//     price: 22999,
//     tier: "Essential" as const,
//     rating: 4.7,
//     highlights: [
//       "North & South Goa beaches",
//       "Water sports & beach shacks",
//       "Old Goa churches tour",
//       "Sunset cruise on Mandovi River",
//     ],
//     badge: "POPULAR" as const,
//   },
//   {
//     id: "spiritual-india",
//     image: packageVaranasi,
//     title: "Spiritual India: Varanasi & Rishikesh",
//     location: "Uttar Pradesh, Uttarakhand",
//     duration: "7 Days / 6 Nights",
//     price: 32999,
//     tier: "Signature" as const,
//     rating: 4.9,
//     highlights: [
//       "Varanasi Ganga Aarti & boat ride",
//       "Rishikesh yoga & meditation",
//       "River rafting adventure",
//       "Temple & ashram visits",
//     ],
//   },
//   {
//     id: "golden-temple",
//     image: herogoldentemple,
//     title: "Golden Temple & Amritsar Heritage",
//     location: "Punjab",
//     duration: "4 Days / 3 Nights",
//     price: 19999,
//     tier: "Essential" as const,
//     rating: 4.8,
//     highlights: [
//       "Golden Temple darshan & langar",
//       "Wagah Border ceremony",
//       "Jallianwala Bagh memorial",
//       "Traditional Punjabi cuisine",
//     ],
//   },
// ];

// const Packages = () => {
//   const [selectedTier, setSelectedTier] = useState<string>("all");
//   const [showFilters, setShowFilters] = useState(false);

//   const filteredPackages =
//     selectedTier === "all"
//       ? allPackages
//       : allPackages.filter(
//           (pkg) => pkg.tier.toLowerCase() === selectedTier.toLowerCase()
//         );

//   return (
//     <div className="min-h-screen pt-24 pb-16">
//       <div className="container mx-auto px-4 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12 animate-fade-in-up">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
//             India Tour Packages
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Discover handcrafted journeys to India's most captivating
//             destinations
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="mb-12">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
//             <div className="flex items-center gap-2">
//               <Filter className="h-5 w-5 text-muted-foreground" />
//               <span className="text-sm text-muted-foreground">
//                 {filteredPackages.length} packages found
//               </span>
//             </div>

//             <Button
//               variant="outline"
//               size="default"
//               onClick={() => setShowFilters(!showFilters)}
//               className="md:hidden"
//             >
//               <SlidersHorizontal className="h-4 w-4 mr-2" />
//               Filters
//             </Button>
//           </div>

//           {/* Filter Buttons */}
//           <div
//             className={`flex flex-wrap gap-3 ${
//               showFilters ? "flex" : "hidden md:flex"
//             }`}
//           >
//             <Button
//               variant={selectedTier === "all" ? "hero" : "outline"}
//               size="default"
//               onClick={() => setSelectedTier("all")}
//             >
//               All Packages
//             </Button>
//             <Button
//               variant={selectedTier === "essential" ? "adventure" : "outline"}
//               size="default"
//               onClick={() => setSelectedTier("essential")}
//             >
//               Essential
//             </Button>
//             <Button
//               variant={selectedTier === "signature" ? "hero" : "outline"}
//               size="default"
//               onClick={() => setSelectedTier("signature")}
//             >
//               Signature
//             </Button>
//             <Button
//               variant={selectedTier === "elite" ? "premium" : "outline"}
//               size="default"
//               onClick={() => setSelectedTier("elite")}
//             >
//               Elite
//             </Button>
//           </div>
//         </div>

//         {/* Package Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPackages.map((pkg) => (
//             <PackageCard key={pkg.id} {...pkg} />
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredPackages.length === 0 && (
//           <div className="text-center py-16">
//             <p className="text-xl text-muted-foreground mb-6">
//               No packages found in this category
//             </p>
//             <Button
//               variant="hero"
//               size="lg"
//               onClick={() => setSelectedTier("all")}
//             >
//               View All Packages
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Packages;


import { useState } from "react";
import PackageCard from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal } from "lucide-react";

import packageGoa from "@/assets/package-goa.jpg";
import packageVaranasi from "@/assets/package-varanasi.jpg";
import packageLadakh from "@/assets/package-ladakh.jpg";
import packageJaipur from "@/assets/package-jaipur.jpg";
import packagekerala from "@/assets/package-kerala.jpg";
import herogoldentemple from "@/assets/hero-golden-temple.jpg";
import pacKeralaVideo from "@/assets/pac-kerala.mp4";
import pacJaipurVideo from "@/assets/pac-jaipur.mp4";

const allPackages = [
  {
    id: "kashmir-paradise",
    image: packageLadakh,
    title: "Kashmir & Ladakh Himalayan Odyssey",
    location: "Jammu & Kashmir, Ladakh",
    duration: "9 Days / 8 Nights",
    price: 45999,
    tier: "Elite" as const,
    rating: 5.0,
    highlights: [
      "Dal Lake shikara ride & houseboat stay",
      "Gulmarg & Sonamarg valley tours",
      "Leh-Ladakh mountain adventure",
      "Pangong Lake & Nubra Valley",
    ],
    badge: "POPULAR" as const,
  },
  {
    id: "rajasthan-royal",
    image: packageJaipur,
    video: pacJaipurVideo,
    title: "Royal Rajasthan Heritage Circuit",
    location: "Rajasthan",
    duration: "8 Days / 7 Nights",
    price: 35999,
    tier: "Signature" as const,
    rating: 4.9,
    highlights: [
      "Jaipur Pink City & Amber Fort",
      "Udaipur City Palace & Lake Pichola",
      "Jaisalmer Golden Fort & desert safari",
      "Traditional Rajasthani cuisine",
    ],
    badge: "NEW" as const,
  },
  {
    id: "kerala-backwaters",
    image: packagekerala,
    video: pacKeralaVideo,
    title: "Kerala Backwaters & Beaches Retreat",
    location: "Kerala",
    duration: "6 Days / 5 Nights",
    price: 28999,
    tier: "Signature" as const,
    rating: 4.8,
    highlights: [
      "Alleppey houseboat cruise",
      "Munnar tea plantation visit",
      "Ayurvedic spa treatments",
      "Kovalam beach relaxation",
    ],
  },
  {
    id: "goa-beaches",
    image: packageGoa,
    title: "Goa Beach Paradise & Nightlife",
    location: "Goa",
    duration: "5 Days / 4 Nights",
    price: 22999,
    tier: "Essential" as const,
    rating: 4.7,
    highlights: [
      "North & South Goa beaches",
      "Water sports & beach shacks",
      "Old Goa churches tour",
      "Sunset cruise on Mandovi River",
    ],
    badge: "POPULAR" as const,
  },
  {
    id: "spiritual-india",
    image: packageVaranasi,
    title: "Spiritual India: Varanasi & Rishikesh",
    location: "Uttar Pradesh, Uttarakhand",
    duration: "7 Days / 6 Nights",
    price: 32999,
    tier: "Signature" as const,
    rating: 4.9,
    highlights: [
      "Varanasi Ganga Aarti & boat ride",
      "Rishikesh yoga & meditation",
      "River rafting adventure",
      "Temple & ashram visits",
    ],
  },
  {
    id: "golden-temple",
    image: herogoldentemple,
    title: "Golden Temple & Amritsar Heritage",
    location: "Punjab",
    duration: "4 Days / 3 Nights",
    price: 19999,
    tier: "Essential" as const,
    rating: 4.8,
    highlights: [
      "Golden Temple darshan & langar",
      "Wagah Border ceremony",
      "Jallianwala Bagh memorial",
      "Traditional Punjabi cuisine",
    ],
  },
];

const Packages = () => {
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages =
    selectedTier === "all"
      ? allPackages
      : allPackages.filter(
          (pkg) => pkg.tier.toLowerCase() === selectedTier.toLowerCase()
        );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            India Tour Packages
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover handcrafted journeys to India's most captivating
            destinations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredPackages.length} packages found
              </span>
            </div>

            <Button
              variant="outline"
              size="default"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Buttons */}
          <div
            className={`flex flex-wrap gap-3 ${
              showFilters ? "flex" : "hidden md:flex"
            }`}
          >
            <Button
              variant={selectedTier === "all" ? "hero" : "outline"}
              size="default"
              onClick={() => setSelectedTier("all")}
            >
              All Packages
            </Button>
            <Button
              variant={selectedTier === "essential" ? "adventure" : "outline"}
              size="default"
              onClick={() => setSelectedTier("essential")}
            >
              Essential
            </Button>
            <Button
              variant={selectedTier === "signature" ? "hero" : "outline"}
              size="default"
              onClick={() => setSelectedTier("signature")}
            >
              Signature
            </Button>
            <Button
              variant={selectedTier === "elite" ? "premium" : "outline"}
              size="default"
              onClick={() => setSelectedTier("elite")}
            >
              Elite
            </Button>
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-6">
              No packages found in this category
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => setSelectedTier("all")}
            >
              View All Packages
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;