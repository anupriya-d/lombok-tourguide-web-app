import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { photo } from '../../data/demo';
export default function DestinationCard({ destination }) { return <Link className="destination-card" to={`/destinations/${destination.slug}`}><img src={photo(destination.image)} alt={`${destination.name} landscape illustration`} loading="lazy"/><div><h3>{destination.name}</h3><p>{destination.category}</p></div><ArrowUpRight className="destination-arrow" size={20}/></Link>; }
