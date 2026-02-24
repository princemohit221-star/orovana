import { useState } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navigation = ({ currentPage, setCurrentPage }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, userProfile } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setCurrentPage('shop');
  };
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-2xl font-bold text-forest-green font-playfair hover:text-green-800 transition-colors"
            >
              O'rovana
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
              {user ? (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handleNavClick('dashboard')}
                    className="flex items-center space-x-2 text-charcoal hover:text-forest-green transition-colors"
                  >
                    <User size={20} />
                    <span className="hidden sm:block text-sm">
                      {userProfile?.first_name || 'Account'}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button 
                    onClick={() => handleAuthClick('signin')}
                    className="text-charcoal hover:text-forest-green transition-colors text-sm font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => handleAuthClick('signup')}
                    className="bg-forest-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              
                    currentPage === item.id
                      ? 'text-forest-green border-b-2 border-forest-green'
                      : 'text-charcoal hover:text-forest-green'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-charcoal hover:text-forest-green transition-colors">
              <ShoppingBag size={20} />
            </button>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-charcoal hover:text-forest-green transition-colors"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
                
                {!user && (
                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <button 
                      onClick={() => handleAuthClick('signin')}
                      className="block w-full text-left px-3 py-2 text-sm font-medium text-charcoal hover:text-forest-green transition-colors"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => handleAuthClick('signup')}
                      className="block w-full text-left px-3 py-2 text-sm font-medium bg-forest-green text-white rounded-lg hover:bg-green-800 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-forest-green bg-forest-green/5'
                      : 'text-charcoal hover:text-forest-green'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navigation;