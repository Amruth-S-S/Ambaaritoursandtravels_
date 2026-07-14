"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Twitter, Send, ArrowRight } from "lucide-react";
import { useState } from "react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/About" },
  { label: "Packages", href: "/Packages" },
  { label: "Gallery", href: "/Gallery" },
  { label: "Contact", href: "/Contact" },
  { label: "Book Now", href: "/Booking" },
   { label: "Privacy Policy", href: "/privacy-policy" },
];

const internationalPackages = [
  { label: "Thailand Tours", href: "/Packages?region=international" },
  // { label: "Europe Tours", href: "/Packages?region=international" },
  // { label: "Sri Lanka Tours", href: "/Packages?region=international" },
  // { label: "Turkey Tours", href: "/Packages?region=international" },
];

const domesticPackages = [
  { label: "Ladakh", href: "/Packages?region=domestic&zone=north" },
  { label: "Spiti Valley", href: "/Packages?region=domestic&zone=north" },
  { label: "Varanasi", href: "/Packages?region=domestic&zone=north" },
  { label: "Dandeli", href: "/Packages?region=domestic&zone=south" },
  { label: "Murdeshwara", href: "/Packages?region=domestic&zone=south" },
  { label: "Dharmasthala", href: "/Packages?region=domestic&zone=south" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.message === "already_subscribed") {
        setStatus("duplicate");
      } else if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-black text-gray-300 relative overflow-hidden">
      {/* Top decorative line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

    
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-5">
            <Image
              src="/Images/logo_bg.png"
              alt="Ambaari Tours"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Ambaari Tours &amp; Travels — crafting unforgettable journeys across India and the world since 2009. Your dream trip is just one call away.
          </p>
          {/* Social Links */}
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
              { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-700" },
              { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
              { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
            ].map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white ${color} hover:border-transparent transition-all duration-300 hover:scale-110`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-5 relative">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500 rounded-full" />
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-yellow-400 text-sm flex items-center gap-2 group transition-colors duration-200"
                >
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Packages Column */}
        <div>
          <h4 className="text-white font-bold text-base mb-5 relative">
            Our Packages
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500 rounded-full" />
          </h4>
          <div className="mb-4">
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">International</p>
            <ul className="space-y-2">
              {internationalPackages.map((pkg) => (
                <li key={pkg.label}>
                  <Link href={pkg.href} className="text-gray-400 hover:text-yellow-400 text-sm flex items-center gap-2 group transition-colors duration-200">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    {pkg.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">Domestic</p>
            <ul className="space-y-2">
              {domesticPackages.map((pkg) => (
                <li key={pkg.label}>
                  <Link href={pkg.href} className="text-gray-400 hover:text-yellow-400 text-sm flex items-center gap-2 group transition-colors duration-200">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    {pkg.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold text-base mb-5 relative">
            Contact Us
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500 rounded-full" />
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                <Phone className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Call Us</p>
                <a href="tel:+918073097430" className="text-gray-300 hover:text-yellow-400 text-sm transition-colors">
                  +91 80730 97430
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                <Mail className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email Us</p>
                <a href="mailto:ambaaritoursandtravels19@gmail.com" className="text-gray-300 hover:text-yellow-400 text-sm transition-colors break-all">
                ambaaritoursandtravels19@gmail.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                <MapPin className="w-4 h-4 text-yellow-400" />
              </div>
              <a
                href="https://maps.app.goo.gl/jtJaTcpWxKCkXRTi9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Visit Us</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                  1st A Main Rd, 2nd Block, Govindaraja Nagar Ward, Mudalapalya, Nagarbhavi, Bengaluru, Karnataka 560072
                  </p>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Business Hours</p>
                <p className="text-gray-300 text-sm">Mon–Sun: 10:00 AM – 7:00 PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Ambaari Tours &amp; Travels. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/Privacy">Privacy Policy</Link>
            <Link href="/Contact" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
