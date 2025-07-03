import Page from '@/components/sign-up';
import { Suspense } from 'react';

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
