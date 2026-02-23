import { useEffect, useState } from "react";
import api from "../api/client";

const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/settings");
        setSettings(res.data.data || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { settings, loading };
};

export default useSettings;





