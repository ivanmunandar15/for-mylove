import '../styles/globals.css';

export const metadata = {
  title: 'Surat Cinta Untukmu',
  description: 'A love letter for you',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}