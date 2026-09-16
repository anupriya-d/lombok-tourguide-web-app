import { useEffect, useState } from 'react';
export function useData(loader, key = '') {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, retry] = useState(0);
  useEffect(() => {
    let active = true;
    setState({ data: null, loading: true, error: null });
    Promise.resolve().then(loader).then(data => { if (active) setState({ data, loading: false, error: null }); }).catch(error => { if (active) setState({ data: null, loading: false, error }); });
    return () => { active = false; };
  }, [key, attempt]);
  return { ...state, retry: () => retry(n => n + 1) };
}
