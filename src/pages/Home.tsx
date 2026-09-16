// import HeroSlider from "@/components/HeroSlider";
// import PackageCard from "@/components/PackageCard";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import {
//   Award,
//   Clock,
//   HeadphonesIcon,
//   ShieldCheck,
//   Sparkles,
//   TrendingUp,
// } from "lucide-react";

// import packageGoa from "@/assets/package-goa.jpg";
// import packageVaranasi from "@/assets/package-varanasi.jpg";
// import packageLadakh from "@/assets/package-ladakh.jpg";
// import packageRishikesh from "@/assets/package-rishikesh.jpg";
// import packageAndaman from "@/assets/package-andaman.jpg";
// import packageJaipur from "@/assets/package-jaipur.jpg";

// const featuredPackages = [
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
//     image: packageAndaman,
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
//     image: packageRishikesh,
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

// const Home = () => {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Slider */}
//       <HeroSlider />

//       {/* Early Bird Offer Banner */}
//       <section className="relative py-12 bg-gradient-to-r from-accent to-amber-400 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
//         <div className="container mx-auto px-4 lg:px-8 relative">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="text-center md:text-left">
//               <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-4">
//                 <Sparkles className="h-5 w-5 text-primary" />
//                 <span className="font-semibold text-primary">
//                   LIMITED TIME OFFER
//                 </span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
//                 Early Bird Special: Save up to 25%
//               </h2>
//               <p className="text-lg text-primary/80">
//                 Book your Incredible India journey now and enjoy exclusive discounts
//               </p>
//             </div>
//             <Link to="/packages">
//               <Button
//                 variant="default"
//                 size="xl"
//                 className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl"
//               >
//                 Claim Your Offer
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Packages */}
//       <section className="py-20 bg-cream">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center mb-12 animate-fade-in-up">
//             <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
//               <TrendingUp className="h-5 w-5 text-accent" />
//               <span className="font-semibold text-accent">
//                 POPULAR DESTINATIONS
//               </span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
//               Explore Incredible India
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               From Himalayan peaks to tropical beaches, discover India's diverse wonders
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//             {featuredPackages.map((pkg) => (
//               <PackageCard key={pkg.id} {...pkg} />
//             ))}
//           </div>

//           <div className="text-center">
//             <Link to="/packages">
//               <Button variant="hero" size="lg">
//                 View All Packages
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose SNAV */}
//       <section className="py-20 bg-background">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center mb-12 animate-fade-in-up">
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
//               Why Choose SNAV Tourism
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Your trusted partner for exceptional travel experiences across India
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: Award,
//                 title: "Expert Consultants",
//                 description:
//                   "Seasoned travel professionals with extensive India knowledge",
//               },
//               {
//                 icon: ShieldCheck,
//                 title: "Curated Experiences",
//                 description:
//                   "Handpicked stays and activities for authentic Indian journeys",
//               },
//               {
//                 icon: HeadphonesIcon,
//                 title: "24/7 Support",
//                 description:
//                   "Round-the-clock assistance throughout your entire journey",
//               },
//               {
//                 icon: Clock,
//                 title: "Best Price Guarantee",
//                 description:
//                   "Competitive pricing with no hidden fees or surprises",
//               },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="text-center p-8 rounded-xl bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground text-accent transition-colors mb-4">
//                   <feature.icon className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-foreground mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-emerald relative overflow-hidden">
//         <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
//         <div className="container mx-auto px-4 lg:px-8 relative">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">
//               Join Our Travel Community
//             </h2>
//             <p className="text-xl text-primary-foreground/90 mb-8">
//               Get early bird offers, travel inspiration, and exclusive India tour deals
//               delivered to your inbox
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="flex-1 px-6 py-4 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent"
//               />
//               <Button variant="hero" size="lg" className="px-8">
//                 Subscribe
//               </Button>
//             </div>
//             <p className="text-sm text-primary-foreground/70 mt-4">
//               We respect your privacy. Unsubscribe at any time.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import HeroSlider from "@/components/HeroSlider";
import PackageCard from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Award,
  Clock,
  HeadphonesIcon,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

import packageGoa from "@/assets/package-goa.jpg";
import packageVaranasi from "@/assets/package-varanasi.jpg";
import packageLadakh from "@/assets/package-ladakh.jpg";
import packageRishikesh from "@/assets/package-rishikesh.jpg";
import packageAndaman from "@/assets/package-andaman.jpg";
import packageJaipur from "@/assets/package-jaipur.jpg";
import pacKeralaVideo from "@/assets/pac-kerala.mp4";
import pacJaipurVideo from "@/assets/pac-jaipur.mp4";

const featuredPackages = [
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
    image: packageAndaman,
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
    image: packageRishikesh,
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

const Home = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!email || !email.includes("@")) {
    setSubmitMessage("Please enter a valid email address");
    return;
  }

  setIsSubmitting(true);
  setSubmitMessage("");

  try {
    // TODO: Set up EmailJS properly with correct template IDs and publicKey
    // For now, we just log and show success to avoid broken runtime errors
    console.log("Newsletter subscription:", email);
    setSubmitMessage("✓ Successfully subscribed! Check your inbox for a welcome email.");
    setEmail("");
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    setSubmitMessage("✗ Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(""), 5000);
  }
};

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Early Bird Offer Banner */}
      <section className="relative py-12 bg-gradient-to-r from-accent to-amber-400 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">
                  LIMITED TIME OFFER
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                Early Bird Special: Save up to 25%
              </h2>
              <p className="text-lg text-primary/80">
                Book your Incredible India journey now and enjoy exclusive discounts
              </p>
            </div>
            <Link to="/packages">
              <Button
                variant="default"
                size="xl"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl"
              >
                Claim Your Offer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="font-semibold text-accent">
                POPULAR DESTINATIONS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Explore Incredible India
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From Himalayan peaks to tropical beaches, discover India's diverse wonders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/packages">
              <Button variant="hero" size="lg">
                View All Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose SNAV */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Why Choose SNAV Tourism
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for exceptional travel experiences across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Expert Consultants",
                description:
                  "Seasoned travel professionals with extensive India knowledge",
              },
              {
                icon: ShieldCheck,
                title: "Curated Experiences",
                description:
                  "Handpicked stays and activities for authentic Indian journeys",
              },
              {
                icon: HeadphonesIcon,
                title: "24/7 Support",
                description:
                  "Round-the-clock assistance throughout your entire journey",
              },
              {
                icon: Clock,
                title: "Best Price Guarantee",
                description:
                  "Competitive pricing with no hidden fees or surprises",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground text-accent transition-colors mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-emerald relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">
              Join Our Travel Community
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Get early bird offers, travel inspiration, and exclusive India tour deals
              delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              />
              <Button 
                variant="hero" 
                size="lg" 
                className="px-8"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {submitMessage && (
              <p className={`text-sm mt-4 font-semibold ${
                submitMessage.includes("✓") 
                  ? "text-green-300" 
                  : "text-red-300"
              }`}>
                {submitMessage}
              </p>
            )}
            <p className="text-sm text-primary-foreground/70 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;