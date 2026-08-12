'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#060B16',
      color: '#FFFFFF',
      textAlign: 'center',
      padding: '24px'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        style={{
          padding: '12px 24px',
          backgroundColor: '#2563EB',
          color: '#FFFFFF',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600
        }}
      >
        Try again
      </button>
    </div>
  );
}
