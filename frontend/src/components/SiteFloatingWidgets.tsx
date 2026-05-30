import { AiChatbot } from '@/components/AiChatbot';
import WhatsAppChatbot from '@/components/WhatsAppChatbot';

const SiteFloatingWidgets = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <AiChatbot />
    <WhatsAppChatbot />
  </div>
);

export default SiteFloatingWidgets;
