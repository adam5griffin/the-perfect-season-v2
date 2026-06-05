import './globals.css';

export const metadata = {
  title: 'The Perfect Season',
  description: 'Build the greatest NBA, NFL, or MLB team ever and chase perfection.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
