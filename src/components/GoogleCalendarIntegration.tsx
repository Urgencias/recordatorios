import React, { useEffect, useState } from 'react';

const GoogleCalendarIntegration: React.FC = () => {
  const [googleAuthUrl, setGoogleAuthUrl] = useState('');
  const [calendarList, setCalendarList] = useState<any[]>([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const generateGoogleAuthUrl = async () => {
      try {
        const response = await fetch('/api/google/auth-url');
        if (!response.ok) throw new Error('Failed to fetch Google Auth URL');
        const data = await response.json();
        setGoogleAuthUrl(data.url);
      } catch (error) {
        console.error('Error fetching Google Auth URL:', error);
        setErrorMessage('Error al obtener la URL de autenticación de Google.');
      }
    };

    generateGoogleAuthUrl();
  }, []);

  const handleGoogleSignIn = () => {
    window.location.href = googleAuthUrl;
  };

  const handleCalendarSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedCalendarId(selectedId);

    try {
      const response = await fetch('/api/google/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calendarId: selectedId }),
      });

      if (!response.ok) throw new Error('Failed to fetch events.');
      const data = await response.json();
      setEvents(data.events);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching events:', error);
      setErrorMessage('Error al obtener eventos. Verifique su configuración de Google.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Integración con Google Calendar</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
      >
        Conectar con Google
      </button>

      {calendarList.length > 0 && (
        <div className="mt-4">
          <label htmlFor="calendarSelect" className="block text-gray-700">
            Seleccionar Calendario:
          </label>
          <select
            id="calendarSelect"
            className="w-full p-2 border rounded"
            onChange={handleCalendarSelect}
            value={selectedCalendarId}
          >
            <option value="">Seleccionar un calendario</option>
            {calendarList.map((calendar) => (
              <option key={calendar.id} value={calendar.id}>
                {calendar.summary}
              </option>
            ))}
          </select>
        </div>
      )}

      {events.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Eventos Importados</h3>
          <ul>
            {events.map((event: any) => (
              <li key={event.id}>
                <p>{event.summary}</p>
                <p>
                  {new Date(
                    event.start.dateTime || event.start.date
                  ).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendarIntegration;