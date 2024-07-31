// app/layout.tsx
import RootLayout from './root-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout footerProps={{ page: 'home' }}>
      {children}
    </RootLayout>
  );
}