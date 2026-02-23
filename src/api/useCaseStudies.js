import { useEffect, useState } from "react";
import api from "../api/client";

const useCaseStudies = ({ active = true, limit = 50 } = {}) => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/case-studies?active=${active}&limit=${limit}`);
        setCaseStudies(res.data.data.items || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [active, limit]);

  return { caseStudies, loading };
};

export default useCaseStudies;


