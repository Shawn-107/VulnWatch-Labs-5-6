import React, { useState } from 'react';
import Icon from './Icon.jsx';
export default function LocalRadar() {
  const [location, setLocation] = useState(null); const [message, setMessage] = useState('Location has not been requested.'); const [loading, setLoading] = useState(false);
  const locate = () => {
    if (!navigator.geolocation) { setMessage('Geolocation is not supported by your browser.'); return; }
    setLoading(true); setMessage('Requesting browser location permission…');
    navigator.geolocation.getCurrentPosition(pos => { setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }); setMessage('Browser location acquired. No verified indicator source is configured.');setLoading(false); }, err => { setMessage(`Location unavailable: ${err.message}`);setLoading(false); }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 120000 });
  };
  return <section className="radar-section section" id="radar"><div className="container radar-layout"><div className="radar-copy"><div className="kicker mono">04 / LOCATION CONTEXT</div><h2>Zoom into<br/><span>your area.</span></h2><p>Geolocation can establish your browser's coordinates. Because the original live threat API backend was not provided, the radar deliberately shows <strong>zero unverified threat markers.</strong></p>
    <button className="button button-primary" onClick={locate} disabled={loading}><Icon name="crosshair" size={17}/>{loading ? 'Locating…' : 'Use my location'}</button>
    <div className="location-status"><span className="mono">GEOLOCATION API</span><strong>{location ? `${location.lat.toFixed(3)}°, ${location.lon.toFixed(3)}°` : 'Permission not requested'}</strong><p role="status">{message}</p></div>
  </div><div className="radar-visual" aria-label="Illustrative radar diagram with no plotted threats"><div className="radar-outer"/><div className="radar-circle c-one"/><div className="radar-circle c-two"/><div className="radar-circle c-three"/><div className="radar-axis h"/><div className="radar-axis v"/><div className="radar-sweep"/><div className="radar-center"/><span className="radar-coord top mono">N / 000.00</span><span className="radar-coord bottom mono">VERIFIED MARKERS / 00</span><div className="radar-label"><div className="radar-label-icon"><Icon name="shield" size={21}/></div><strong>Real data only.</strong><span>Awaiting a configured indicator feed.</span></div></div></div></section>;
}
