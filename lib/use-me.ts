import { useApiResource } from '@/lib/use-api-resource';

export type Me = { name: string; email: string; org_name: string; role: string; is_admin: boolean };

/** The signed-in member. `is_admin` (Talkbalt operators) unlocks costs, tokens and latency. */
export function useMe() {
  return useApiResource<Me>('/api/auth/me');
}
