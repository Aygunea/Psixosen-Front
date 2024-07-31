import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ForgotPassword = () => {
  const { userId, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('Yeni şifrələr eyni deyil');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/reset-password-with-mail', {
        token,
        newPassword,
        confirmNewPassword
      });

      setSuccess(response.data.message);
      setTimeout(() => {
        navigate('/sign-in'); 
      }, 2000); 
    } catch (error) {
      setError(error.response?.data?.error || 'Bir hata oluştu');
    }
  };

  return (
    <div className="py-[100px] min-h-[100vh] bg-dark bg-fixed flex justify-center items-center">
      <div className="w-[400px] max-w-[90%] bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Şifre Yenileme</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              Yeni Şifre
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Yeni şifrenizi girin"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
              Yeni Şifre (Tekrar)
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              placeholder="Yeni şifrenizi tekrar girin"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Şifreyi Yenile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
