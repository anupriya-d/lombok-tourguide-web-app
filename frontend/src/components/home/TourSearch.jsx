import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, Compass, Search } from 'lucide-react';
import { destinations } from '../../data/demo';
export default function TourSearch() {
  const navigate = useNavigate();
  function submit(e) { e.preventDefault(); const params = new URLSearchParams(); for (const [key, value] of new FormData(e.currentTarget)) if (value) params.set(key, value); navigate(`/tours?${params}`); }
  return <div className="container search-container"><form className="tour-search" onSubmit={submit}><label>Where to?<span className="input-icon"><MapPin size={18}/><select name="destination" defaultValue=""><option value="">All destinations</option>{destinations.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></span></label><label>When?<span className="input-icon"><CalendarDays size={18}/><input type="date" name="date" min={new Date().toLocaleDateString('en-CA')}/></span></label><label>What are you interested in?<span className="input-icon"><Compass size={18}/><select name="activity" defaultValue=""><option value="">All activities</option><option value="hiking">Hiking & trekking</option><option value="snorkeling">Snorkeling</option><option value="nature">Waterfalls & nature</option><option value="culture">Culture & beaches</option></select></span></label><button className="button" type="submit"><Search size={17}/>Search Tours</button></form></div>;
}
