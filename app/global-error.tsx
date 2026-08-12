'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#060B16', color: '#FFFFFF', fontFamily: 'sans-serif', textAlign: 'center', padding: '50px' }}>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()} style={{ padding: '10px 20px', background: '#FF5722', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}>
          Try again
        </button>
      </body>
    </html>
  );
}
