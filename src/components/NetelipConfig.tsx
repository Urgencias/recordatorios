import React, { useState } from 'react';

const NetelipConfig: React.FC = () => {
  const [netelipToken, setNetelipToken] = useState('');
  const [netelipApiKey, setNetelipApiKey] = useState('');
  const [netelipBaseUrl, setNetelipBaseUrl] = useState('https://api.netelip.com/v1');
  const [netelipOriginNumber, setNetelipOriginNumber] = useState('349');
  const [netelipCallsEndpoint, setNetelipCallsEndpoint] = useState('/calls');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveNetelipConfig = async () => {
    try {
      const response = await fetch('/api/netelip/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: netelipToken,
          apiKey: netelipApiKey,
          baseUrl: netelipBaseUrl,
          originNumber: netelipOriginNumber,
          callsEndpoint: netelipCallsEndpoint,
        }),
      });

      if (response.ok) {
        setNetelipToken('********');
        setNetelipApiKey('********');
        setErrorMessage('');
      } else {
        setErrorMessage('Error al guardar la configuración de Netelip.');
      }
    } catch {
      setErrorMessage('Error de conexión al guardar la configuración de Netelip.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Configuración de Netelip</h2>
      <div className="space-y-3">
        <div>
          <label>Token de Netelip:</label>
          <input
            type="text"
            value={netelipToken}
            onChange={(e) => setNetelipToken(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Clave API:</label>
          <input
            type="text"
            value={netelipApiKey}
            onChange={(e) => setNetelipApiKey(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleSaveNetelipConfig}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Guardar Configuración
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default NetelipConfig;