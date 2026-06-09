import { useEffect, useState } from 'react';

export default function useCurrentLocation() {
  const [coords, setCoords] = useState({ latitude: 23.0225, longitude: 72.5714 });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => setError('Location permission denied. Showing default city location.')
    );
  }, []);

  return { coords, error };
}
