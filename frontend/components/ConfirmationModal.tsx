'use client';

import React from 'react';
import Modal from './Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      containerClassName="bg-white rounded-2xl border-none shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
    >
      <div className="p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-warm-black mb-2 tracking-tight">
            {title}
          </h3>
          <p className="text-warm-black/60 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-warm-black/70 bg-gray-100 hover:bg-gray-200 transition-all duration-200 active:scale-95"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#FF6B6B] hover:bg-[#FF5252] transition-all duration-200 shadow-sm active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
