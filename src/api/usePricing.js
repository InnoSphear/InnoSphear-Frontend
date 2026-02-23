import { useEffect, useState } from "react";
import api from "../api/client";

const usePricing = ({ active = true, limit = 50 } = {}) => {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/pricing?active=${active}&limit=${limit}`);
        setPricing(res.data.data.items || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [active, limit]);

  return { pricing, loading };
};

export default usePricing;


