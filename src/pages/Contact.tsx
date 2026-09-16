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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, email, phone, message, lastName, subject } = formData;

    if (!firstName || !phone || !message) {
      alert("Please fill in First Name, Phone, and Message.");
      return;
    }

    const text = `
      New Inquiry from Contact Form
      Name: ${firstName} ${lastName}
      Email: ${email || "Not provided"}
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
            Let's turn your travel idea into a real plan. One message is all it takes.
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