import { useEffect, useState } from "react";
import api from "../api/client";

const useDeals = ({ limit = 50 } = {}) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/deals?limit=${limit}`);
        setDeals(res.data.data.items || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [limit]);

  return { deals, loading };
};

export default useDeals;


