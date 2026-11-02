import React from 'react';
import Icon from './Icon.jsx';
function ShieldScene() {
  return <div className="shield-scene" aria-hidden="true">
    <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
    <div className="shield-glow"/>
    <div className="hero-shield"><div className="shield-inner"><div className="shield-core"><span/></div></div></div>
    <div className="orbit-point p-one"/><div className="orbit-point p-two"/><div className="orbit-point p-three"/>
    <div className="floating-tile tile-left"><span className="tile-label">MONITORING</span><span className="tile-value"><i/>STACK CONNECTED</span></div>
    <div className="floating-tile tile-right"><span className="tile-label">RISK MODEL</span><span className="tile-value mono">RULE-BASED / LAB</span></div>
    <span className="scene-label scene-label-top mono">VW — 001 / CONTROL</span><span className="scene-label scene-label-bottom mono">DESIGNED FOR RELEVANCE</span>
  </div>;
}
export default function Hero({ stats }) {
  return <section id="home" className="hero-section">
    <div className="hero-grid-bg"/>
    <div className="container hero-layout">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/> SECURITY OPERATIONS / REIMAGINED</div>
        <h1>Know what<br/><span>matters.</span><br/>Act sooner.</h1>
        <p>Focused vulnerability intelligence for the software you actually use. Build your stack, inspect signals, and turn noise into decisions.</p>
        <div className="hero-actions"><a className="button button-primary" href="#watchlist">Manage your stack <Icon name="arrow" size={17}/></a><a className="button button-ghost" href="#signals">Explore signals <span className="arrow-tail">↗</span></a></div>
        <div className="hero-meta"><div className="hero-meta-item"><span className="meta-mark"/><strong>{stats.monitored.toString().padStart(2,'0')}</strong><span>monitored<br/>assets</span></div><div className="hero-meta-sep"/><div className="hero-meta-item"><span className="meta-mark amber"/><strong>{stats.critical.toString().padStart(2,'0')}</strong><span>critical-priority<br/>assets</span></div></div>
      </div>
      <ShieldScene />
    </div>
    <div className="hero-bottom container"><span className="mono">01 / YOUR INTELLIGENCE WORKSPACE</span><span className="scroll-invite">SCROLL TO EXPLORE <span>↓</span></span></div>
  </section>;
}
