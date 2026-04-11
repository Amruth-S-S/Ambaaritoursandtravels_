"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Plane, Phone, Mail, User, Calendar, Users, MapPin } from "lucide-react";

export default function EnquiryPopup({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
    travelers: "",
    destination: "Thailand"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destinations = [
    "Thailand",
    "Europe",
    "Turkey",
    "Leh_ladakh",
    "Spiti Valley",
    "Dandeli",
    "Gokarna",
    "Murdeshwara",
    "Dharmastala",
    "Sigandour",
    "Varanasi & Ayodhya",
    "Mantralaya"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(formData.mobile.trim())) newErrors.mobile = "Enter valid 10-digit mobile number";
    if (!formData.date) newErrors.date = "Travel date is required";
    if (!formData.destination) newErrors.destination = "Destination is required";
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-yellow-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left Side - Info/Image Section */}
            <div className="md:w-2/5 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl" />
              </div>
              
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">AMBAARI TOURS AND TRAVELS</h3>
                  {/* <p className="text-gray-300 text-sm">India's Premier Travel Company</p> */}
                </div>

                <div className="space-y-4 mb-6">
                  {/* <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <Plane className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-sm">15+ Years of Excellence</span>
                  </div> */}
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-sm">4 Thousand+ Happy Travelers</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-sm">50+ Destinations Worldwide</span>
                  </div>
                </div>

                <div className="border-t border-yellow-500/20 pt-4">
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Full support for visa arrangements, hotel bookings, tour guides, 
                    flight reservations, and more.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Send us a Query</h2>
                <p className="text-gray-400 text-sm">
                  Ready to venture out into the world? Fill the form below and start your brand new journey with us.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
                          errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-yellow-500 focus:border-transparent"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full pl-10 pr-4 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
                          errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-yellow-500 focus:border-transparent"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Mobile Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Mobile <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        maxLength="10"
                        className={`w-full pl-10 pr-4 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
                          errors.mobile ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-yellow-500 focus:border-transparent"
                        }`}
                      />
                    </div>
                    {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>}
                  </div>

                  {/* Date Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Travel Date <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white ${
                          errors.date ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-yellow-500 focus:border-transparent"
                        }`}
                      />
                    </div>
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                  </div>

                  {/* Travelers Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      No of Travellers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                      >
                        <option value="">Select number of travelers</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                        ))}
                        <option value="10+">10+ Travelers</option>
                      </select>
                    </div>
                  </div>

                  {/* Destination Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Destination <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white ${
                          errors.destination ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-yellow-500 focus:border-transparent"
                        }`}
                      >
                        {destinations.map(dest => (
                          <option key={dest} value={dest}>{dest}</option>
                        ))}
                      </select>
                    </div>
                    {errors.destination && <p className="text-red-400 text-xs mt-1">{errors.destination}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Enquiry
                    </>
                  )}
                </button>

                <p className="text-gray-500 text-xs text-center mt-4">
                  By submitting, you agree to our terms and privacy policy. We'll contact you shortly.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}