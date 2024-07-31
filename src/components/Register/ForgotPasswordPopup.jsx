import React, { useRef } from "react";

const ForgotPasswordPopup = ({ isOpen, onClose, onSubmit }) => {
  const emailRef = useRef();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    onSubmit(email);
    emailRef.current.value = ''
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-dark100 p-8 rounded-lg shadow-lg w-[400px] max-w-[90%]">
        <h2 className="text-xl sm:text-base font-bold mb-4">Parol Sıfırlama</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm xs:text-xs font-bold mb-2" htmlFor="email">
              E-poçt adresi
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="E-poçt adresiniz"
              className="w-full xs:text-xs px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-5">
            <button
              onClick={onClose}
              className={`w-24 text-sm xxs:text-xs rounded-[5px] p-[10px] text-dark100 dark:bg-reddark300 bg-redlight300`}>
              Ləğv et
            </button>
            <button
             type="submit"
              className={`w-24 text-sm xxs:text-xs rounded-[5px] p-[10px] text-dark100 dark:bg-green bg-lightgreen`}>
              Göndər
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
