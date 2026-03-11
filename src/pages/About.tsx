import { Award, Globe, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 mb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            Your Journey Across Incredible India
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            At SNAV Tourism, we believe travel is more than just visiting
            places—it's about experiencing the rich tapestry of India's culture, heritage,
            and natural beauty that transforms your perspective and enriches your life.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-cream py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                <Globe className="h-5 w-5 text-accent" />
                <span className="font-semibold text-accent">OUR STORY</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Crafting Dreams Since 2021
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What started as a small boutique travel agency has blossomed
                  into a trusted partner for thousands of travelers seeking
                  authentic, meaningful journeys across India's diverse landscapes.
                </p>
                <p>
                  Our team of passionate travel experts brings decades of
                  combined experience, intimate knowledge of India's hidden gems, and an
                  unwavering commitment to excellence. We don't just book trips—we
                  curate transformative experiences across Incredible India.
                </p>
                <p>
                  From the pristine beaches of Goa to the ancient temples of Tamil Nadu,
                  from Kashmir's paradise valleys to Kerala's serene backwaters,
                  we've helped travelers discover India's most extraordinary destinations with personalized service and
                  attention to detail.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-emerald/20" />
                <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                  <div className="bg-background/90 backdrop-blur-sm p-8 rounded-xl">
                    <p className="text-6xl font-display font-bold text-accent mb-2">
                      10K+
                    </p>
                    <p className="text-xl font-serif text-foreground">
                      Happy Travelers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every journey we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Passion",
                description:
                  "We love what we do, and it shows in every detail of your journey",
                color: "text-sunset",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "Unwavering commitment to quality and exceptional service",
                color: "text-accent",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "Building lasting relationships with travelers and local partners",
                color: "text-emerald",
              },
              {
                icon: Globe,
                title: "Sustainability",
                description:
                  "Responsible travel practices that protect our planet",
                color: "text-primary",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-card mb-4 border-2 ${value.color} border-current`}
                >
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Why Travel With SNAV
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-12">
              Experience the SNAV difference on your next adventure
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  number: "15+",
                  label: "Years Experience",
                },
                {
                  number: "50+",
                  label: "Destinations in India",
                },
                {
                  number: "10K+",
                  label: "Happy Travelers",
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-5xl font-display font-bold text-accent mb-2">
                    {stat.number}
                  </p>
                  <p className="text-lg text-primary-foreground/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/packages">
              <Button variant="hero" size="xl">
                Explore Our Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Trusted & Certified
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              We're proud members of leading travel associations and hold
              certifications that demonstrate our commitment to excellence and
              responsible tourism practices.
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[
                "ASTA Member",
                "IATA Certified",
                "Sustainable Tourism",
                "Best Travel Agency 2023",
              ].map((cert, index) => (
                <div
                  key={index}
                  className="px-6 py-4 bg-card rounded-lg shadow-md border border-border"
                >
                  <p className="font-semibold text-foreground">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
