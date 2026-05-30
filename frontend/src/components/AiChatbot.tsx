import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

const WELCOME_MESSAGE =
  'Hi! I\'m Xenura AI Assistant. Ask about our services, pricing approach, or how we can help with your project.';

const QUICK_PROMPTS = [
  'What services do you offer?',
  'How do I start a project?',
  'Do you build AI products?',
];

function getDemoReply(input: string): string {
  const text = input.toLowerCase();

  if (text.includes('service') || text.includes('offer')) {
    return 'We offer engineering, AI & data, cloud transformation, and digital marketing — from web/mobile apps to AI automation and cloud migration.';
  }
  if (text.includes('price') || text.includes('cost') || text.includes('budget')) {
    return 'Project scope drives pricing. Share your goals via our contact form and we\'ll recommend the right approach and estimate.';
  }
  if (text.includes('ai') || text.includes('machine learning')) {
    return 'Yes — we build AI-powered products, Gen AI workflows, data pipelines, and intelligent automation tailored to your business.';
  }
  if (text.includes('start') || text.includes('begin') || text.includes('project')) {
    return 'Start with a quick discovery call. Use the contact section on our site or WhatsApp below — we\'ll align on goals, timeline, and next steps.';
  }
  if (text.includes('contact') || text.includes('talk') || text.includes('call')) {
    return 'You can reach us through the Contact section, email hello@xenuralabs.com, or tap the green WhatsApp button below for a fast reply.';
  }

  return 'Thanks for your question! For a tailored answer, share a bit more detail or connect with our team via Contact or WhatsApp.';
}

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', text: WELCOME_MESSAGE },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  if (!isVisible) return null;

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: getDemoReply(trimmed),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div
          className="absolute bottom-16 right-0 w-[min(100vw-3rem,340px)] glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/40 animate-fade-in-up mb-3 flex flex-col max-h-[min(70vh,460px)]"
          style={{ animationDuration: '300ms' }}
        >
          <div className="bg-gradient-to-r from-[#7f4adf] to-[#5b21b6] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Xenura AI Assistant</h4>
                <p className="text-xs text-purple-100">Ask about our services</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close AI chat"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px]"
            style={{ background: 'var(--theme-surface-bg)' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#7f4adf]/15 flex items-center justify-center shrink-0 mr-2 mt-1">
                    <Bot className="w-3.5 h-3.5 text-[#7f4adf]" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-[#7f4adf] text-white rounded-br-md'
                      : 'glass-card rounded-tl-md'
                  }`}
                  style={message.role === 'assistant' ? { color: 'var(--theme-text-strong)' } : undefined}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#7f4adf]/15 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-[#7f4adf]" />
                </div>
                <div className="glass-card rounded-2xl rounded-tl-md px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7f4adf] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7f4adf] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7f4adf] animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-white/5 shrink-0" style={{ background: 'var(--theme-page-bg)' }}>
            <div className="flex flex-wrap gap-2 mb-3">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isTyping}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-[#7f4adf]/25 text-[#7f4adf] hover:bg-[#7f4adf]/10 transition-colors disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Xenura AI..."
                maxLength={500}
                className="ai-chat-input flex-1 rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7f4adf]/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-[#7f4adf] hover:bg-[#6d3ec9] disabled:opacity-40 flex items-center justify-center transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-slate-800 shadow-black/40'
            : 'bg-gradient-to-br from-[#7f4adf] to-[#5b21b6] hover:scale-110 shadow-[#7f4adf]/30 hover:shadow-[#7f4adf]/45'
        }`}
        aria-label="Open AI assistant"
        id="ai-chat-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}

export default AiChatbot;
