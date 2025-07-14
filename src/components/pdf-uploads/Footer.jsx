import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About us */}
          <div>
            <h3 className="font-semibold mb-6 text-gray-300">About us</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our mission</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Institutional Framework</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">History</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Leadership and governance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Impact</a></li>
            </ul>
          </div>

          {/* More from the Forum */}
          <div>
            <h3 className="font-semibold mb-6 text-gray-300">More from the Forum</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Centres</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Meetings</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Stakeholders</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Forum stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press releases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Picture gallery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Podcasts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Videos</a></li>
            </ul>
          </div>

          {/* Engage with us */}
          <div>
            <h3 className="font-semibold mb-6 text-gray-300">Engage with us</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sign in</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner with us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Become a member</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sign up for our press releases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Subscribe to our newsletters</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-6 text-gray-300">Quick links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sustainability at the Forum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Language editions */}
          <div>
            <h3 className="font-semibold mb-6 text-gray-300">Language editions</h3>
            <div className="flex flex-wrap gap-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">EN</a>
              <span className="text-gray-600">·</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">ES</a>
              <span className="text-gray-600">·</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">中文</a>
              <span className="text-gray-600">·</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">日本語</a>
            </div>
          </div>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-6 mt-12 mb-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Youtube className="w-6 h-6" />
          </a>
        </div>

        {/* Bottom links */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy & Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Sitemap
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 World Economic Forum
          </p>
        </div>
      </div>
    </footer>
  );
} 