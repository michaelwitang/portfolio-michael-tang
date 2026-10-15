import { createContext, useContext, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contact } from '@/lib/portfolio';
const LanguageContext = createContext<{ en: boolean; setEn: (value: boolean) => void }>({ en: false, setEn: () => {} });
export const useLanguage = () => useContext(LanguageContext);
export function PortfolioLayout({ children }: { children: ReactNode }) {
 const [en, setEn] = useState(false);
 const [open, setOpen] = useState(false);
 const nav = [{ to: '/' as const, label: en ? 'About me' : 'Sobre mim' }, { to: '/projetos' as const, label: en ? 'Projects' : 'Projetos' }, { to: '/experiencias' as const, label: en ? 'Experience' : 'Experiências' }, { to: '/contato' as const, label: en ? 'Contact' : 'Contato' }];
 return <LanguageContext.Provider value={{ en, setEn }}><div className="portfolio-shell">
  <a className="skip-link" href="#main">{en ? 'Skip to content' : 'Ir para o conteúdo'}</a>
  <header className="site-header"><div className="container header-inner">
   <Link to="/" className="brand" aria-label="Michael Tang — início"><span className="brand-mark">m<span>t</span><i>.</i></span><span>Michael Tang<span className="brand-caption">SOFTWARE & DATA</span></span></Link>
   <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Menu principal">{nav.map(item => <Link key={item.to} to={item.to} activeProps={{ className: 'active' }} activeOptions={{ exact: true }} onClick={() => setOpen(false)}>{item.label}</Link>)}</nav>
   <div className="header-actions"><div className="language-control" aria-label="Idioma"><Button variant="ghost" size="sm" aria-pressed={!en} className={!en ? 'selected' : ''} onClick={() => setEn(false)}>PT</Button><span>/</span><Button variant="ghost" size="sm" aria-pressed={en} className={en ? 'selected' : ''} onClick={() => setEn(true)}>EN</Button></div><Button asChild variant="outline" className="header-contact"><Link to="/contato">{en ? 'Let’s talk' : 'Vamos conversar'}<ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="mobile-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div>
  </div></header>
  {children}
  <footer className="site-footer"><div className="container footer-inner"><span>© 2026 Michael Tang<span className="footer-dot">·</span>{en ? 'Made with intention.' : 'Feito com propósito.'}</span><span className="location"><MapPin size={13}/>Belo Horizonte, BR</span><a href={`mailto:${contact.email}`}>{en ? 'Get in touch' : 'Entre em contato'}<ArrowUpRight size={14}/></a></div></footer>
 </div></LanguageContext.Provider>;
}
export function SectionHeading({ number, label, title, text }: { number: string; label: string; title: string; text?: string }) { return <div className="section-heading"><span className="eyebrow"><span>{number}</span> / {label}</span><h1>{title}</h1>{text && <p>{text}</p>}</div>; }
