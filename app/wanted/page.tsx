"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MarketplaceHeader from "@/components/MarketplaceHeader";
import WantedCard from "@/components/WantedCard";
import { WantedRequest } from "@/lib/types";
import { COMMODITIES, NIGERIAN_STATES } from "@/lib/data";

export default function WantedBrowsePage() {
  const [requests, setRequests] = useState<WantedRequest[]>([]);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wanted")
      .then(response => response.ok ? response.json() : null)
      .then(data => setRequests(data?.data ?? []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = requests.filter(r => {
    const matchesSearch = !search || r.notes.toLowerCase().includes(search.toLowerCase());
    const matchesState = !selectedState || r.state === selectedState;
    const matchesCommodity = !selectedCommodity || r.commodityId === selectedCommodity;
    return matchesSearch && matchesState && matchesCommodity;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "budget-high") return (b.budget || 0) - (a.budget || 0);
    if (sortBy === "budget-low") return (a.budget || 0) - (b.budget || 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const clearFilters = () => {
    setSearch("");
    setSelectedState("");
    setSelectedCommodity("");
    setSortBy("newest");
  };

  return (
    <>
      <MarketplaceHeader />
      <main className="marketplace-shell">
        <section className="wanted-hero">
          <div className="wanted-hero-inner">
            <h1 className="wanted-hero-title">What are buyers looking for?</h1>
            <p className="wanted-hero-subtitle">Browse buyer requests and match your produce to demand. Post your own request if you cannot find what you need.</p>
            <div className="marketplace-search-wrap">
              <input
                type="text"
                className="marketplace-search-input"
                placeholder="Search requests..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="marketplace-search-btn">
                <span>🔍</span>
              </button>
            </div>
          </div>
        </section>

        <section className="marketplace-filters">
          <div className="filter-row">
            <select className="filter-select" value={selectedCommodity} onChange={e => setSelectedCommodity(e.target.value)}>
              <option value="">All Commodities</option>
              {COMMODITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select className="filter-select" value={selectedState} onChange={e => setSelectedState(e.target.value)}>
              <option value="">All States</option>
              {NIGERIAN_STATES.map(s => (
                <option key={s.code} value={s.name}>{s.name}</option>
              ))}
            </select>
            <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="newest">Newest first</option>
              <option value="budget-high">Highest budget</option>
              <option value="budget-low">Lowest budget</option>
            </select>
            <button className="filter-clear" onClick={clearFilters}>Clear</button>
          </div>
          <div className="filter-result-count">
            {sorted.length} {sorted.length === 1 ? "request" : "requests"} found
          </div>
        </section>

        {loading ? (
          <div className="marketplace-loading">
            <div className="loading-skeleton" />
            <div className="loading-skeleton" />
            <div className="loading-skeleton" />
            <div className="loading-skeleton" />
          </div>
        ) : sorted.length > 0 ? (
          <div className="marketplace-grid">
            {sorted.map(req => (
              <WantedCard key={req.id} request={req} />
            ))}
          </div>
        ) : (
          <div className="marketplace-empty">
            <div className="empty-icon">📝</div>
            <h3>No requests found</h3>
            <p>Try adjusting your search or filters.</p>
            <button className="btn btn-primary" onClick={clearFilters}>Clear all filters</button>
          </div>
        )}
      </main>

      <footer className="marketplace-footer">
        <div className="marketplace-footer-inner">
          <div className="marketplace-footer-brand">
            <span className="leaf-mark">✦</span>
            farm<span className="brand-accent">to</span>money
          </div>
          <p>© 2026 FarmToMoney. Direct farm trade across Nigeria.</p>
              <div className="marketplace-footer-links">
                <Link href="/market" className="footer-link">Browse</Link>
                <Link href="/wanted" className="footer-link">Wanted</Link>
                <Link href="/info" className="footer-link">Info Centre</Link>
                <a href="https://github.com" className="footer-link">Privacy</a>
              </div>
        </div>
      </footer>
    </>
  );
}
