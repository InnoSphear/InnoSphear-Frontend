import { useEffect, useState } from "react";
import api from "../api/client";

const useBlogs = ({ status = "published", limit = 10 } = {}) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/blogs?status=${status}&limit=${limit}`);
        setBlogs(res.data.data.items || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [status, limit]);

  return { blogs, loading };
};

export default useBlogs;




