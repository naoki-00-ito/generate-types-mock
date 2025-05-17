'use client';

import { Suspense } from 'react';

function initMsw() {
  if (process.env.NEXT_PUBLIC_MOCK_ENABLED !== 'true') return;

  if (typeof window === 'undefined') {
    import('@/mocks/node').then(async (module) => {
      const { server } = module;
      server.listen();
    });
  } else {
    import('@/mocks/browser').then(async (module) => {
      const { worker } = module;
      worker.start({
        onUnhandledRequest(request, print) {
          if (request.url.includes('_next')) {
            return
          }
          print.warning()
        },
      });
    });
  }
}

// rsc
initMsw();

export default function MswProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  initMsw();

  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}
