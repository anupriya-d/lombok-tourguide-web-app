import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { destinations } from '../data/demo';
import { getTours } from '../services/catalog';
import { useData } from '../hooks/useData';
import TourCard from '../components/tour/TourCard';
import { DataState } from '../components/common/UI';
export default function Tours() {
  const [params, setParams] = useSearchParams();
  const state = useData(() => getTours(Object.fromEntries(params)), params.toString());
  const update = (key, value) => { const next = new URLSearchParams(params); value ? next.set(key, value) : next.delete(key); setParams(next); };
  return <div className="container page"><div className="page-heading"><span className="eyebrow">Make memories, take the scenic route</span><h1>Find your Lombok adventure</h1><p>Mountain mornings, island days and everything in between.</p></div><div className="filter-bar"><span className="filter-title"><SlidersHorizontal size={18}/>Filter tours</span>{[['destination', 'Destination', destinations.map(d => [d.slug, d.name])], ['activity', 'Activity', [['hiking', 'Hiking'], ['snorkeling', 'Snorkeling'], ['nature', 'Nature'], ['culture', 'Culture']]], ['difficulty', 'Difficulty', [['Easy', 'Easy'], ['Moderate', 'Moderate'], ['Challenging', 'Challenging']]], ['duration', 'Duration', [['day', '1 day'], ['multi', 'Multiple days']]], ['price', 'Max. price', [['750000', 'IDR 750,000'], ['1000000', 'IDR 1,000,000'], ['3000000', 'IDR 3,000,000']]]].map(([key, label, options]) => <label key={key} htmlFor={key}>{label}<select id={key} aria-label={label} value={params.get(key) || ''} onChange={e => update(key, e.target.value)}><option value="">All</option>{options.map(([v, text]) => <option value={v} key={v}>{text}</option>)}</select></label>)}<button className="text-link reset" onClick={() => setParams({})}>Reset filters</button></div>{params.get('date') && <p className="notice">Preferred date: {params.get('date')}. Live availability will be available when booking launches.</p>}<DataState {...state}>{state.data && <><p className="results-count">{state.data.length} {state.data.length === 1 ? 'adventure' : 'adventures'} to explore <span>· Demo collection</span></p>{state.data.length ? <div className="tour-grid">{state.data.map(t => <TourCard key={t.id} tour={t}/>)}</div> : <div className="state"><h2>No tours found</h2><p>Try another destination or clear a filter to find your adventure.</p><button className="button" onClick={() => setParams({})}>Clear filters</button></div>}</>}</DataState></div>;
}
