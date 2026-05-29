import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { InquiryForm } from '@/components/InquiryForm';
import { ModalPromoPanel } from '@/components/ModalPromoPanel';

type Props = { open: boolean; onClose: () => void };

const LeadCaptureModal = ({ open, onClose }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSuccess = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-[260]">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 w-full h-full bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative min-h-full flex items-center justify-center p-3 sm:p-6">
        <div
          className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(8,41,90,0.5)] border border-white/10 flex flex-col lg:flex-row lg:items-stretch bg-white"
          style={{ maxHeight: 'min(95vh, 900px)' }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <ModalPromoPanel onClose={onClose} />

          <div className="lg:w-[58%] bg-white flex flex-col overflow-y-auto min-h-0 flex-1">
            {submitted ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[320px]">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-9 h-9 text-green-600" />
                </div>
                <h3 id="lead-modal-title" className="text-xl font-bold text-slate-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-slate-600">Our team will reach out shortly.</p>
              </div>
            ) : (
              <div className="flex-1 p-6 lg:p-8">
                <InquiryForm
                  variant="light"
                  source="popup"
                  idPrefix="popup"
                  showIntro
                  showCancel
                  onCancel={onClose}
                  onSuccess={handleSuccess}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
