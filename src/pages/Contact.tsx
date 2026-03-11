// import { Mail, MapPin, Phone } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// const Contact = () => {
//   const handleWhatsApp = () => {
//     const message = encodeURIComponent(
//       "Hi SNAV Tourism! I'm interested in learning more about your travel packages. Can you help me plan my journey?"
//     );
//     window.open(`https://wa.me/8652885584?text=${message}`, "_blank");
//   };

//   return (
//     <div className="min-h-screen pt-24 pb-16">
//       <div className="container mx-auto px-4 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12 animate-fade-in-up">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
//             Get in Touch
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Ready to start your journey? We're here to help plan your perfect
//             adventure
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//           {/* Contact Form */}
//           <div className="bg-card p-8 rounded-2xl shadow-lg animate-fade-in-up">
//             <h2 className="text-2xl font-serif font-semibold mb-6">
//               Send Us a Message
//             </h2>
//             <form className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     First Name
//                   </label>
//                   <Input placeholder="SNAV" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Last Name
//                   </label>
//                   <Input placeholder="Tourism" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Email</label>
//                 <Input type="email" placeholder="your_email@example.com" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Phone</label>
//                 <Input type="tel" placeholder="+91 XXXXX XXXXX" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Subject
//                 </label>
//                 <Input placeholder="Inquiry about travel packages" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Message
//                 </label>
//                 <Textarea
//                   placeholder="Tell us about your dream journey..."
//                   className="min-h-[150px]"
//                 />
//               </div>

//               <Button
//                 onClick={handleWhatsApp}
//                 size="lg"
//                 className="w-full bg-white text-[#25D366] hover:bg-white/90"
//               >
//                 <Phone className="h-5 w-5 mr-2" />
//                 Send Message
//               </Button>
//             </form>
//           </div>

//           {/* Contact Info & WhatsApp */}
//           <div className="space-y-8 animate-slide-in-right">
//             {/* WhatsApp Card */}
//             <div className="bg-gradient-to-br from-[#25D366] to-[#20BA5A] p-8 rounded-2xl text-white shadow-lg">
//               <h3 className="text-2xl font-serif font-semibold mb-4">
//                 Chat with Us on WhatsApp
//               </h3>
//               <p className="mb-6 text-white/90">
//                 Get instant responses to your travel queries. Our team is ready
//                 to help you plan your perfect journey.
//               </p>
//               <Button
//                 onClick={handleWhatsApp}
//                 variant="default"
//                 size="lg"
//                 className="w-full bg-white text-[#25D366] hover:bg-white/90"
//               >
//                 <Phone className="h-5 w-5 mr-2" />
//                 Start WhatsApp Chat
//               </Button>
//             </div>

//             {/* Contact Details */}
//             <div className="bg-card p-8 rounded-2xl shadow-lg space-y-6">
//               <h3 className="text-2xl font-serif font-semibold mb-6">
//                 Contact Information
//               </h3>

//               <div className="flex items-start gap-4">
//                 <div className="p-3 rounded-full bg-accent/10 text-accent">
//                   <Phone className="h-6 w-6" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-1">Phone</h4>
//                   <p className="text-muted-foreground">+91 8652885584</p>
//                   <p className="text-sm text-muted-foreground">
//                     Mon-Fri: 9AM-6PM EST
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div className="p-3 rounded-full bg-accent/10 text-accent">
//                   <Mail className="h-6 w-6" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-1">Email</h4>
//                   <p className="text-muted-foreground">snavtourism@gmail.com</p>
//                   <p className="text-sm text-muted-foreground">
//                     We'll respond within 24 hours
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div className="p-3 rounded-full bg-accent/10 text-accent">
//                   <MapPin className="h-6 w-6" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-1">Office</h4>
//                   <p className="text-muted-foreground">
//                     Gopi Cine Mall, 210
//                     <br />
//                     Dombivli West, Maharashtra
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Office Hours */}
//             <div className="bg-card p-8 rounded-2xl shadow-lg">
//               <h3 className="text-xl font-serif font-semibold mb-4">
//                 Office Hours
//               </h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Monday - Friday</span>
//                   <span className="font-medium">9:00 AM - 6:00 PM</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Saturday</span>
//                   <span className="font-medium">10:00 AM - 4:00 PM</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Sunday</span>
//                   <span className="font-medium">Closed</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const { firstName, phone, message, lastName, subject } = formData;

    if (!firstName || !phone || !message) {
      alert("Please fill in First Name, Phone, and Message.");
      return;
    }

    const text = `
      New Inquiry from Contact Form
      Name: ${firstName} ${lastName}
      Phone: ${phone}
      Subject: ${subject || "No subject provided"}
      Message: ${message}
    `.trim();

    const url = `https://wa.me/8652885584?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mt-3">
            Let’s turn your travel idea into a real plan. One message is all it takes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* FORM */}
          <div className="lg:col-span-2 bg-card p-8 rounded-2xl shadow-lg space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-serif font-semibold">Send Us a Message</h2>
            <form className="space-y-5" onSubmit={handleWhatsApp}>

              <div className="grid md:grid-cols-2 gap-4">
                <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
              </div>

              <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <Input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
              <Input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />

              <Textarea
                name="message"
                placeholder="Your message..."
                className="min-h-[140px]"
                value={formData.message}
                onChange={handleChange}
              />

              <Button type="submit" size="lg" className="w-full bg-[#25D366] hover:bg-[#1eaf56] text-white">
                <Phone className="w-5 h-5 mr-2" /> Send via WhatsApp
              </Button>
            </form>
          </div>

          {/* INFO */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="bg-card p-6 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <span className="text-muted-foreground">+91 8652885584</span>
                </div>
              </div>
              <div className="flex items-start gap-4 mt-4">
                <Mail className="w-6 h-6" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <span className="text-muted-foreground">snavtourism@gmail.com</span>
                </div>
              </div>
              <div className="flex items-start gap-4 mt-4">
                <MapPin className="w-6 h-6" />
                <div>
                  <h4 className="font-semibold">Office</h4>
                  <span className="text-muted-foreground">
                    Gopi Cine Mall, 210<br />Dombivli West, Maharashtra
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg text-sm">
              <h3 className="font-semibold">Office Hours</h3>
              <div className="flex justify-between mt-2">
                <span>Mon – Fri</span> <span>9 AM – 6 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span> <span>10 AM – 4 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span> <span>Closed</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
