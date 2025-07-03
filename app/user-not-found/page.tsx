import UserNotFound from '@/components/user-not-found';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserNotFound />
    </Suspense>
  );
}
