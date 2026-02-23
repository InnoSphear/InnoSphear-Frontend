import { useEffect, useState } from "react";
import api from "../api/client";

const useServices = ({ active = true, limit = 50 } = {}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/services?active=${active}&limit=${limit}`);
        setServices(res.data.data.items || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [active, limit]);

  return { services, loading };
};

export default useServices;



