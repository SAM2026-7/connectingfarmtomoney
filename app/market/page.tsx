"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MarketplaceHeader from "@/components/MarketplaceHeader";
import ProduceCard from "@/components/ProduceCard";
import { ProduceListing } from "@/lib/types";
import { COMMODITIES, NIGERIAN_STATES, getCommodityName } from "@/lib/data";

const GRADE_OPTIONS = [
  { value: "A", label: "Grade A" },
  { value: "B", label: "Grade B" },
  { value: "C", label: "Grade C" },
  { value: "export", label: "Export Quality" },
];

export default function MarketplaceBrowsePage() {
  const [produce, setProduce] = useState<ProduceListing[]>([]);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/produce")
      .then(response => response.ok ? response.json() : null)
      .then(data => setProduce(data?.data ?? []))
      .catch(() => setProduce([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = produce.filter(p => {
    const matchesSearch = !search || getCommodityName(p.commodityId).toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()) || (p.variety && p.variety.toLowerCase().includes(search.toLowerCase()));
    const matchesState = !selectedState || p.state === selectedState;
    const matchesCommodity = !selectedCommodity || p.commodityId === selectedCommodity;
    const matchesGrade = !selectedGrade || p.grade === selectedGrade;
    const matchesPrice = !priceMax || p.price <= Number(priceMax);
    return matchesSearch && matchesState && matchesCommodity && matchesGrade && matchesPrice && p.status === "active";
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return getCommodityName(a.commodityId).localeCompare(getCommodityName(b.commodityId));
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const clearFilters = () => {
    setSearch("");
    setSelectedState("");
    setSelectedCommodity("");
    setSelectedGrade("");
    setPriceMax("");
    setSortBy("newest");
  };

  return (
    <>
      <MarketplaceHeader />
      <main className="marketplace-shell">
        <section className="marketplace-hero">
          <div className="marketplace-hero-inner">
            <h1 className="marketplace-hero-title">Where local farms and buyers meet</h1>
            <p className="marketplace-hero-subtitle">Find quality produce from verified farmers, agents, and exporters across Nigeria. Direct from farm. Fair prices. No middlemen.</p>
            <div className="marketplace-search-wrap">
              <input
                type="text"
                className="marketplace-search-input"
                placeholder="Search produce, variety, or location..."
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
            <select
              className="filter-select"
              value={selectedCommodity}
              onChange={e => setSelectedCommodity(e.target.value)}
            >
              <option value="">All Commodities</option>
              {COMMODITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
            >
              <option value="">All States</option>
              {NIGERIAN_STATES.map(s => (
                <option key={s.code} value={s.name}>{s.name}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
            >
              <option value="">All Grades</option>
              {GRADE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="filter-price">
              <input
                type="number"
                className="filter-price-input"
                placeholder="Max price (₦)"
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
                min="0"
              />
            </div>
            <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
            <button className="filter-clear" onClick={clearFilters}>Clear</button>
          </div>
          <div className="filter-result-count">
            {sorted.length} {sorted.length === 1 ? "listing" : "listings"} found
          </div>
        </section>

        {loading ? (
          <div className="marketplace-loading">
            <div className="loading-skeleton" />
            <div className="loading-skeleton" />
            <div className="loading-skeleton" />
            <div className="loading-skeleton" />
            <div className="loading-skeleton" />
            <div className="loading-skeleton" />
          </div>
        ) : sorted.length > 0 ? (
          <div className="marketplace-grid">
            {sorted.map(listing => (
              <ProduceCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="marketplace-empty">
            <div className="empty-icon">🔍</div>
            <h3>No listings found</h3>
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
          <p>&copy; 2026 FarmToMoney. Direct farm trade across Nigeria.</p>
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
