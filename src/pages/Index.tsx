import { Shield, CheckCircle, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ClaimCheckerForm from "@/components/ClaimCheckerForm";
import heroBg from "@/assets/hero-bg.jpg";
import howItWorksImg from "@/assets/how-it-works.png";
import whatCostImg from "@/assets/what-cost.png";
import pleaseNoteImg from "@/assets/please-note.png";

const testimonials = [
  { name: "Mr Ball", title: "Received £5,000 - 10/10", quote: "Quick easy process, received £5,000.00, could not be happier with the service" },
  { name: "Mr Slater", title: "Very easy - 10/10", quote: "Very easy to do, dealt with quickly and efficiently, always responded to quickly, would highly recommend" },
  { name: "Ms Slade", title: "Highly recommend - 10/10", quote: "Easy, simple, process, couldn't fault it one bit. Highly recommend." },
  { name: "Mr Parr", title: "Brilliant - 10/10", quote: "Brilliant! Quick, simple, process! Communication was fantastic from start to finish, cannot fault it! Could not recommend this company enough" },
  { name: "Mr Thompson", title: "Extremely happy - 10/10", quote: "Excellent from start to finish, simple and easy to understand, recommended to friends and family extremely happy with the service provided" },
  { name: "Miss Southern", title: "Quick and Easy - 10/10", quote: "I found the process quick and easy from start to finish, was kept up to date every step of the way highly recommend for anyone with a deposit protection dispute." },
];

const Index = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[testimonialIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-[hsl(40,40%,95%)]/85" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Headline + USPs */}
          <div className="px-6 py-16 lg:py-24 lg:px-12">
            <h1 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary leading-tight mb-8">
              Claim up to 3 times your deposit back for each breach plus the return of your deposit.
            </h1>

            <div className="space-y-4 mb-10">
              {[
                { icon: Shield, text: "No Win, No Fee" },
                { icon: CheckCircle, text: "Free Service" },
                { icon: Zap, text: "Very quick and easy process" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 border-t border-primary/30 pt-4"
                >
                  <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-secondary font-[Montserrat] font-semibold text-lg">{text}</span>
                </div>
              ))}
            </div>

            <a href="#form">
              <Button size="lg" className="w-full md:w-auto text-lg font-bold px-12 py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                START MY CLAIM
              </Button>
            </a>
          </div>

          {/* Right: Testimonial Carousel */}
          <div className="px-6 pb-16 lg:py-24 lg:px-12">
            <div className="bg-card border border-border rounded-xl p-8 shadow-md">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <h3 className="text-secondary font-[Montserrat] font-bold text-2xl mb-4">{t.title}</h3>
              <p className="text-muted-foreground italic text-lg mb-4">"{t.quote}"</p>
              <p className="text-muted-foreground font-medium">- {t.name}</p>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-secondary hover:border-primary/60 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`h-2 rounded-full transition-all ${i === testimonialIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-secondary hover:border-primary/60 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-16 bg-background">
        <ClaimCheckerForm />
      </section>

      {/* Info Cards Section */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              img: howItWorksImg,
              title: "HOW DOES THIS WORK?",
              text: "Please complete our claim checker above, we will then run a free check on your deposit to see if it was placed in a protection scheme or not. We will then contact you with your potential claim value and the next steps.",
            },
            {
              img: whatCostImg,
              title: "WHAT WILL IT COST ME?",
              text: "We work on a strict no win, no fee basis. If there's no claim then there's no charge to you. Better still we take no payment from you at any point, everything is covered by the costs claimed from the other side. Based on a successful claim we charge 25%.",
            },
            {
              img: pleaseNoteImg,
              title: "PLEASE NOTE…",
              text: "By completing our claim checker you are not entering into a contract with Deposit Hero and you are not obligated to use our service. Your information will not be used for any other function other than to determine the validity of your case.",
            },
          ].map((card) => (
            <div key={card.title} className="text-center flex flex-col items-center">
              <img src={card.img} alt={card.title} className="h-48 w-auto mb-6 object-contain" />
              <h3 className="font-[Montserrat] font-bold text-lg text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-12 text-center text-sm text-muted-foreground space-y-2 px-6">
          <p>
            If you have any questions please contact us at{" "}
            <a href="mailto:hello@mydeposithero.co.uk" className="text-primary hover:underline font-medium">
              hello@mydeposithero.co.uk
            </a>{" "}
            or on WhatsApp by clicking{" "}
            <a
              href="https://api.whatsapp.com/send?phone=447843472999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              here
            </a>.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <a href="https://www.mydeposithero.co.uk/our-claim-process/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="font-[Montserrat] font-semibold">Our Process</Button>
          </a>
          <a href="https://www.mydeposithero.co.uk/faqs/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="font-[Montserrat] font-semibold">Read our FAQs</Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
