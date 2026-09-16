import { ArrowRight, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Logo() { return <Link to="/" className="logo" aria-label="Lombok Explorer home"><Mountain size={44} strokeWidth={1.3}/><span>Lombok Explorer<small>Local people. Real experiences.</small></span></Link>; }
export function ButtonLink({ to, children, outline = false, ...props }) { return <Link to={to} className={`button ${outline ? 'outline' : ''}`} {...props}>{children}<ArrowRight size={16}/></Link>; }
export function SectionHeading({ eyebrow, title, to, link }) { return <div className="section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>{to && <Link className="text-link" to={to}>{link}<ArrowRight size={16}/></Link>}</div>; }
export function DataState({ loading, error, retry, children }) { if (loading) return <div className="state" role="status">Finding your next adventure…</div>; if (error) return <div className="state" role="alert"><h2>We couldn’t load this page</h2><p>Please try again.</p><button className="button" onClick={retry}>Try again</button></div>; return children; }
export function NotFound() { return <div className="container state"><span className="eyebrow">A little off the beaten path</span><h1>Page not found</h1><p>Let’s get you back to exploring.</p><ButtonLink to="/tours">Explore tours</ButtonLink></div>; }
