import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#060B16',
      color: '#FFFFFF',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '24px'
    }}>
      <h1 style={{ fontSize: '4rem', color: '#FF5722', marginBottom: '16px' }}>404</h1>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Page Not Found</h2>
      <p style={{ color: '#94A3B8', marginBottom: '32px', maxWidth: '480px' }}>
        The requested logistics route or page could not be located.
      </p>
      <Link
        href="/"
        style={{
          padding: '12px 28px',
          backgroundColor: '#FF5722',
          color: '#FFFFFF',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: 600
        }}
      >
        Return to Home
      </Link>
    </div>
  );
}
