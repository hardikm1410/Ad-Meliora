import React from 'react';
import './globals.css';
import Header from '../components/header';

export const metadata = {
  title: 'Ad Meliora — AI Automation Agency',
  description: 'We bridge the gap between complex data and actionable automation. Uncover hidden inefficiencies and maximize productivity with intelligent AI solutions.',
};

export default function Layout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logoo.png" />
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        {/* Brand fonts: Poetsen One (display) · Poltawski Nowy (body) · Pontano Sans (label/UI) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poetsen+One&family=Poltawski+Nowy:ital,wght@0,400..700;1,400..700&family=Pontano+Sans:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
