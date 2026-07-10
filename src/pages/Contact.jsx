import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin, User } from 'lucide-react';
import { SITE_CONFIG } from '../constants/site';
import { contactService } from '../services';
import Breadcrumb from '../components/common/Breadcrumb';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import contactbg from '../assets/img/contactbg.png';
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await contactService.sendMessage(form);
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-16 md:pt-20 pb-20 min-h-screen">
      <section className="relative h-[45vh] md:h-[30vh] lg:h-[40vh] xl:h-[50vh]" 
            >
        
              <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${contactbg})`}}  >
               
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-heading text-4xl md:text-6xl font-medium text-white"
                >
                  Contact Us
                </motion.h1>
              </div>
            </section>
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Contact' },
          ]}
        />

        <div className="max-w-5xl mx-auto pt-6">
         

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-1">Location</h3>
                  <p className="text-sm">{SITE_CONFIG.contact.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <User size={20} className="text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-1">
                    Business Development & Operations Manager
                  </h3>
                  <p className="text-sm">{SITE_CONFIG.contact.manager}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={20} className="text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-1">Phone</h3>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock size={20} className="text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-1">Hours</h3>
                  <p className="text-sm">{SITE_CONFIG.contact.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={20} className="text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-1">Email</h3>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-sm hover:text-gold transition-colors break-all"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {submitted ? (
                <div className="border border-obsidian p-8 text-center">
                  <h3 className="font-heading text-xl mb-2">Message Sent</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    size="sm"
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <Input
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-wider text-obsidian mb-2 font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors ${
                        errors.message ? 'border-destructive' : 'border-obsidian'
                      }`}
                      required
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>
                  <Button type="submit" size="lg" disabled={submitting} className="w-full">
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}