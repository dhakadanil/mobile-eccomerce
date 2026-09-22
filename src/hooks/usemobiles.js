import { useState, useEffect } from 'react';
import API from '../service/API';

export function usemobiles() {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMobiles = async () => {
    setLoading(true);
    try {
      const response = await API.get('/mobiles');
      if (Array.isArray(response.data)) {
        setMobiles(response.data);
      } else {
        setMobiles([]);
      }
    } catch (error) {
      console.error("User side query error:", error);
      setMobiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMobiles();
  }, []);

  return {
    mobiles,
    loading
  };
}
