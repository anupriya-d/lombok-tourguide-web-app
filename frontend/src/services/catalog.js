import { tours, destinations, reviews } from '../data/demo';

// Replace these adapters with API requests in Phase 2; pages retain async states.
export async function getTours(filters = {}) {
  return tours.filter(t => (!filters.destination || t.destination === filters.destination || t.destinations?.includes(filters.destination)) && (!filters.activity || t.activity === filters.activity) && (!filters.difficulty || t.difficulty === filters.difficulty) && (!filters.duration || (filters.duration === 'multi' ? t.days > 1 : t.days === 1)) && (!filters.price || t.price <= Number(filters.price)));
}
export async function getTour(slug) { return tours.find(t => t.slug === slug); }
export async function getDestinations() { return destinations; }
export async function getDestination(slug) { return destinations.find(d => d.slug === slug); }
export async function getReviews() { return reviews.filter(r => r.approved); }
