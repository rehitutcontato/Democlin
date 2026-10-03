import type {Metadata} from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Instituto Vanguarda • Cirurgia Plástica & Contorno Corporal | Cambuí & Jardins',
  description: 'A convergência entre rigor cirúrgico e a naturalidade absoluta do contorno corporal. Protocolos cirúrgicos avançados em ambiente hospitalar de ponta.',
  openGraph: {
    title: 'Instituto Vanguarda • Cirurgia Plástica & Contorno Corporal',
    description: 'Protocolos cirúrgicos avançados e contorno corporal de alta definição com privacidade e suporte hospitalar de referência.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instituto Vanguarda • Cirurgia Plástica & Contorno Corporal',
    description: 'A convergência entre rigor cirúrgico e a naturalidade absoluta do contorno corporal.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jakarta.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body className="bg-[#050505] text-zinc-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-200 overflow-x-hidden min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
