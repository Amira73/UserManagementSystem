import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export function useApiGet<TResponse = any>(
  queryKey: (string | number)[],
  path: string,
  enabled: boolean = true
) {
  return useQuery<TResponse, Error>({
    queryKey,
    enabled,
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}${path}`);
      return res.data;
    },
  });
}