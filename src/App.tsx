import React, { useState } from 'react';
import './index.css';
import AccessCode from './components/AccessCode';
import NetelipConfig from './components/NetelipConfig';
import GoogleCalendarIntegration from './components/GoogleCalendarIntegration'; // Importación correcta

const App: React.FC = () => {
  const [isValidCode, setIsValidCode] = useState(false);

  return (
    <div className="container mx-auto p-4">
      {!isValidCode ? (
        <AccessCode onValidCode={() => setIsValidCode(true)} />
      ) : (
        <div className="space-y-6">
          <NetelipConfig />
          <GoogleCalendarIntegration />
          {/* Aquí puedes agregar los demás componentes */}
        </div>
      )}
    </div>
  );
};

export default App;