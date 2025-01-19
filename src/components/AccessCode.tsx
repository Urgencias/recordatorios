import React, { useState } from 'react';

interface AccessCodeProps {
  onValidCode: () => void;
}

const AccessCode: React.FC<AccessCodeProps> = ({ onValidCode }) => {
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidateCode = async () => {
    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode }),
      });

      if (response.ok) {
        onValidCode();
        setErrorMessage('');
      } else {
        setErrorMessage('Código inválido. Por favor, intente nuevamente.');
      }
    } catch {
      setErrorMessage('Error de conexión al validar el código.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ingrese su Código de Acceso</h2>
      <input
        type="text"
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value)}
        placeholder="Código de Acceso"
        className="w-full p-2 border rounded mb-4 text-gray-700"
      />
      <button
        onClick={handleValidateCode}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Validar
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default AccessCode;