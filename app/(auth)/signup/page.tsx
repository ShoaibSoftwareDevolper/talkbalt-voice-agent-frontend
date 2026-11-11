import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/auth-form';

export default function Page() {
  // The form reads ?next= from the URL, which only exists at request time.
  return (
    <Suspense>
      <AuthForm mode="signup" />
    </Suspense>
  );
}
