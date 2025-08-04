import { Shield } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const socialLinks = [
    { href: '#', label: 'Twitter', icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg> },
    { href: '#', label: 'LinkedIn', icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
    { href: '#', label: 'GitHub', icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg> }
  ];

  const footerLinks = {
    Product: [
      { href: '#', label: 'Features' },
      { href: '#', label: 'Security' },
      { href: '#', label: 'Enterprise' },
    ],
    Developers: [
      { href: '#', label: 'Documentation' },
      { href: '#', label: 'API Reference' },
      { href: '#', label: 'SDKs' },
    ],
    Company: [
      { href: '#', label: 'About' },
      { href: '#', label: 'Contact' },
    ],
  };

  return (
    <footer className="relative z-10 border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 bg-primary/90 flex items-center justify-center rounded-md">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold font-headline text-white">Keynest</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Secure API key management for modern developers and teams.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} className="text-muted-foreground hover:text-white transition-colors" aria-label={link.label}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground space-y-4 sm:space-y-0">
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Keynest. All rights reserved.</p>
          <p className="text-center">
            Created by{' '}
            <a
              href="https://vjlivetech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              VJLIVE
            </a>
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}