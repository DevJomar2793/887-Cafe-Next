'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { showNotification } from '@/components/NotificationManager';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      showNotification('Please select a rating before submitting!');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    showNotification('Thank you for your feedback!');
  };

  return (
    <section id="feedback" className="py-24 bg-soft-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4"
          >
            Share Your Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-warm-black/60 max-w-2xl mx-auto"
          >
            We'd love to hear your thoughts on our service and brews. Your feedback helps us grow.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-cream rounded-3xl p-8 md:p-12 shadow-xl border border-beige/50"
        >
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-coffee text-cream rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-coffee mb-4">Thank You!</h3>
              <p className="text-warm-black/60 text-lg max-w-md mx-auto">
                Your feedback helps us brew a better experience for everyone. We truly appreciate your time.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Star Rating */}
              <div className="flex flex-col items-center gap-4">
                <label className="text-sm font-semibold text-warm-black/50 uppercase tracking-wider">
                  Your Rating
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform active:scale-90"
                    >
                      <Star 
                        className={`w-10 h-10 transition-colors duration-200 ${
                          (hoveredRating || rating) >= star 
                            ? 'fill-coffee text-coffee' 
                            : 'text-beige'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-warm-black/50 uppercase ml-1">Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                    className="w-full bg-white border border-beige rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-coffee/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-warm-black/50 uppercase ml-1">Email (Optional)</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="hello@example.com"
                    className="w-full bg-white border border-beige rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-coffee/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-warm-black/50 uppercase ml-1">Your Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us what you loved or how we can improve..."
                  className="w-full bg-white border border-beige rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-coffee/20 transition-all h-40 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-coffee text-cream font-bold text-lg hover:bg-coffee-light transition-all active:scale-95 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackForm;
