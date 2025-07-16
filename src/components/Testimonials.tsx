import { Quote } from 'lucide-react';
import { Card } from './ui/card';

const testimonials = [
  {
    quote: "Finally, a space that honors my intuition while providing the gentle guidance I was searching for. MomWise feels like having a wise friend by my side.",
    author: "Sarah Chen",
    role: "Mother of two"
  },
  {
    quote: "The combination of ancestral wisdom and modern expertise is exactly what I needed. It's reassuring to know I'm not alone in this journey.",
    author: "Maria González",
    role: "New mother"
  },
  {
    quote: "MomWise respects my choices and empowers me to trust my instincts. The content is thoughtful, gentle, and deeply nurturing.",
    author: "Aisha Patel",
    role: "Expecting mother"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-sage/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-foreground mb-6">
            Voices of Wisdom
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from mothers who have found their path through gentle guidance and intuitive wisdom.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-8 bg-background/80 backdrop-blur-sm border-sage/20 relative hover:shadow-organic transition-all duration-300"
            >
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-background" />
                </div>
              </div>
              
              <div className="pt-4">
                <blockquote className="text-foreground/80 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-sage/20 pt-4">
                  <cite className="not-italic">
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </cite>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;