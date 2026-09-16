import { useState } from "react";
import { X } from "lucide-react";

import heroUttarakhand from "@/assets/hero-uttarakhand.jpg";
import heroManali from "@/assets/hero-manali.jpg";
import heroKashmir from "@/assets/hero-kashmir.jpg";
import heroRajasthan from "@/assets/hero-rajasthan.jpg";
import heroGoldenTemple from "@/assets/hero-golden-temple.jpg";
import heroKerala from "@/assets/hero-kerala.jpg";
import heroTamilNadu from "@/assets/hero-tamilnadu.jpg";
import packageGoa from "@/assets/package-goa.jpg";
import packageVaranasi from "@/assets/package-varanasi.jpg";
import packageLadakh from "@/assets/package-ladakh.jpg";
import packageRishikesh from "@/assets/package-rishikesh.jpg";
import packageAndaman from "@/assets/package-andaman.jpg";
import packageJaipur from "@/assets/package-jaipur.jpg";

const galleryImages = [
  { src: heroUttarakhand, location: "Uttarakhand", caption: "Sacred temples and Himalayan majesty" },
  { src: heroManali, location: "Manali, Himachal Pradesh", caption: "Snow-capped peaks and adventure" },
  { src: heroKashmir, location: "Kashmir", caption: "Paradise on earth with Dal Lake" },
  { src: heroRajasthan, location: "Rajasthan", caption: "Royal palaces and desert landscapes" },
  { src: heroGoldenTemple, location: "Amritsar, Punjab", caption: "Golden Temple spiritual magnificence" },
  { src: heroKerala, location: "Kerala", caption: "God's own country backwaters" },
  { src: heroTamilNadu, location: "Tamil Nadu", caption: "Ancient temples and Dravidian architecture" },
  { src: packageGoa, location: "Goa", caption: "Tropical beaches and vibrant culture" },
  { src: packageVaranasi, location: "Varanasi, Uttar Pradesh", caption: "Spiritual capital on the Ganges" },
  { src: packageLadakh, location: "Ladakh", caption: "High altitude desert and monasteries" },
  { src: packageRishikesh, location: "Rishikesh, Uttarakhand", caption: "Yoga capital and adventure hub" },
  { src: packageJaipur, location: "Jaipur, Rajasthan", caption: "Pink City royal heritage" },
  { src: packageAndaman, location: "Andaman Islands", caption: "Pristine beaches and coral reefs" },
];

const Gallery = () => {
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage(
        (lightboxImage - 1 + galleryImages.length) % galleryImages.length
      );
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            Travel Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the world through our lens - stunning destinations captured
            in breathtaking detail
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.location}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-serif font-semibold mb-1">
                  {image.location}
                </h3>
                <p className="text-sm text-primary-foreground/90">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in-up"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            className="max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxImage].src}
              alt={galleryImages[lightboxImage].location}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-6 text-white">
              <h3 className="text-2xl font-serif font-semibold mb-2">
                {galleryImages[lightboxImage].location}
              </h3>
              <p className="text-white/80">
                {galleryImages[lightboxImage].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;