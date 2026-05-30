import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { whatsAppUrl } from '@/content/companyContact';
import { BrandIcon } from '@/components/BrandIcon';

const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative">
      {/* Chat Window */}
      {isOpen && (
        <div
          className="absolute bottom-16 right-0 w-80 glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/40 animate-fade-in-up mb-3"
          style={{ animationDuration: '300ms' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5">
                <BrandIcon size="sm" className="w-full h-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Xenura Support</h4>
                <p className="text-xs text-green-100">Typically replies in 3 min</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3" style={{ background: 'var(--theme-surface-bg)' }}>
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 flex-shrink-0 mt-1">
                <BrandIcon size="xs" className="w-full h-full" />
              </div>
              <div className="glass-card rounded-xl rounded-tl-none px-4 py-3 max-w-[85%]">
                <p className="text-sm text-slate-300">
                  👋 Hello! Welcome to Xenura. How can we help you today?
                </p>
                <p className="text-[10px] text-slate-600 mt-1">Just now</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-4 border-t border-white/5" style={{ background: 'var(--theme-page-bg)' }}>
            <a
              href={whatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
              id="whatsapp-link"
            >
              <Send className="w-4 h-4" />
              Start Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-slate-800 rotate-0 shadow-black/40'
            : 'bg-green-500 hover:bg-green-600 shadow-green-500/30 hover:shadow-green-500/50 hover:scale-110'
        }`}
        aria-label="Chat with us"
        id="whatsapp-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppChatbot;