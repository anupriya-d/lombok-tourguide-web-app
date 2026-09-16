import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Logo } from '../common/UI';
export const navigation = [['/', 'Home'], ['/destinations', 'Destinations'], ['/tours', 'Tours'], ['/about', 'About'], ['/reviews', 'Reviews'], ['/contact', 'Contact']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return <header className={`navbar ${pathname === '/' ? 'over-hero' : ''}`}><div className="container nav-inner"><Logo/><nav id="main-navigation" aria-label="Main navigation" className={open ? 'nav-links is-open' : 'nav-links'}>{navigation.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}</nav><div className="nav-actions"><Link className="icon-button search-icon" to="/tours" aria-label="Search tours"><Search size={18}/></Link><span className="currency">IDR <ChevronDown size={13}/></span><Link className="button nav-book" to="/tours" onClick={() => setOpen(false)}>Book Now</Link><button className="icon-button menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></div></header>;
}
