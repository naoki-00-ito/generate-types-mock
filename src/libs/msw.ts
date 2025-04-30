export async function initMsw() {
  if (process.env.NEXT_PUBLIC_MOCK_ENABLED !== 'true') return;

  if (typeof window === 'undefined') {
    const { server } = await import('../mocks/node')
    server.listen()
  } else {
    const { worker } = await import('../mocks/browser')
    worker.start()
  }
}