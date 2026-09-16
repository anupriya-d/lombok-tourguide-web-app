import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import Destinations, { DestinationDetails } from './pages/Destinations';
import { About, Reviews, Contact, Information } from './pages/Information';
import { NotFound } from './components/common/UI';
function RouteEffects() { const { pathname, hash } = useLocation(); useEffect(() => { const label = pathname === '/' ? 'Discover the Real Lombok' : pathname.split('/').filter(Boolean).pop().split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' '); document.title = `${label} | Lombok Explorer`; if (hash) document.querySelector(hash)?.scrollIntoView(); else window.scrollTo(0, 0); }, [pathname, hash]); return null; }
export default function App() { return <><RouteEffects/><a className="skip-link" href="#main">Skip to content</a><Navbar/><main id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/tours" element={<Tours/>}/><Route path="/tours/:slug" element={<TourDetails/>}/><Route path="/destinations" element={<Destinations/>}/><Route path="/destinations/:slug" element={<DestinationDetails/>}/><Route path="/about" element={<About/>}/><Route path="/reviews" element={<Reviews/>}/><Route path="/contact" element={<Contact/>}/><Route path="/information/:topic" element={<Information/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></>; }
