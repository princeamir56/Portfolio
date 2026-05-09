import { useEffect, useState } from 'react';
import { api } from '../api/client';

export function usePortfolioData<T>(path: string, fallback: T): { data: T; loading: boolean; error: string | null; refetch: () => void } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    api.get<T>(path)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(fetchData, [path]);

  return { data, loading, error, refetch: fetchData };
}
