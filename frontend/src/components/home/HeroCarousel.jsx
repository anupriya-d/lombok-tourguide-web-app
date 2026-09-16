import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Pause, Play } from 'lucide-react';
import { ButtonLink } from '../common/UI';
import { photo } from '../../data/demo';
const slides = [
  { image: 'rinjani', title: <>Discover the<br/>Real Lombok</>, location: 'Mount Rinjani, Lombok', description: 'From majestic mountains to stunning beaches, hidden waterfalls and authentic local culture.' },
  { image: 'island', title: <>A little island.<br/>A big adventure.</>, location: 'Inspired by the Gili Islands', description: 'Find your own slice of paradise. Crystal-clear waters, ocean adventures and the freedom to slow down.' },
  { image: 'waterfall', title: <>Follow nature’s<br/>hidden paths.</>, location: 'Inspired by Senaru', description: 'Trade the everyday for green forest trails, cascading waterfalls and moments worth remembering.' },
  { image: 'beach', title: <>Less hurry.<br/>More discovery.</>, location: 'Inspired by South Lombok', description: 'Salt in the air, sand between your toes and a whole coastline waiting to be explored.' },
];
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [interacting, setInteracting] = useState(false);
  const startX = useRef(null);
  const change = (direction) => setIndex(i => (i + direction + slides.length) % slides.length);
  useEffect(() => { if (paused || interacting) return; const timer = setInterval(() => setIndex(i => (i + 1) % slides.length), 6500); return () => clearInterval(timer); }, [paused, interacting]);
  return <section className="hero" aria-roledescription="carousel" aria-label="Explore Lombok" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }} onTouchStart={e => { startX.current = e.touches[0].clientX; }} onTouchEnd={e => { if (startX.current !== null) { const delta = e.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 50) change(delta > 0 ? -1 : 1); } startX.current = null; }}>
    {slides.map((s, i) => <img key={s.image} className={`hero-photo ${index === i ? 'visible' : ''}`} src={photo(s.image)} alt="" fetchPriority={i === 0 ? 'high' : 'auto'}/>)}<div className="hero-shade"/>
    <div className="container hero-content"><span className="eyebrow">Explore · Experience · Belong</span><h1>{slides[index].title}</h1><p>{slides[index].description}</p><div className="hero-buttons"><ButtonLink to="/tours">Explore Tours</ButtonLink><a className="hero-secondary" href="#destinations">Find your escape <ChevronRight size={17}/></a></div><span className="hero-location"><MapPin size={14}/>{slides[index].location}</span></div>
    <button className="hero-arrow previous" aria-label="Previous slide" onClick={() => change(-1)}><ChevronLeft/></button><button className="hero-arrow next" aria-label="Next slide" onClick={() => change(1)}><ChevronRight/></button>
    <div className="hero-pagination">{slides.map((s, i) => <button key={s.image} className={index === i ? 'selected' : ''} aria-label={`Go to slide ${i + 1}`} aria-current={index === i ? 'true' : undefined} onClick={() => setIndex(i)}/>)}<button className="pause" aria-label={paused ? 'Play carousel' : 'Pause carousel'} onClick={() => setPaused(!paused)}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button></div><div className="hero-note">More than a trip.<br/><span>A deeper connection.</span></div>
  </section>;
}
