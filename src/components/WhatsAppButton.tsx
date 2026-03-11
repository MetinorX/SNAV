import { MessageCircle } from "lucide-react";
import { useState } from "react";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const message = encodeURIComponent(
      "Hello SNAV Tourism! I have a question about your travel services."
    );
    window.open(`https://wa.me/8652885584?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
        
        {/* Main button */}
        <div className="relative flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-4">
          <MessageCircle className="h-6 w-6" />
          
          {/* Tooltip */}
          <div
            className={`absolute right-full mr-3 whitespace-nowrap bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2 pointer-events-none"
            }`}
          >
            <span className="text-sm font-medium">Chat with us</span>
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-primary" />
          </div>
        </div>
      </div>
    </button>
  );
};

export default WhatsAppButton;
