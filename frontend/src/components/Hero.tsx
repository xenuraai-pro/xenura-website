import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Slide 1: Code Editor + CI/CD Pipeline ─── */
const Slide1 = () => (
  <svg viewBox="0 0 820 440" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'auto' }}>
    <defs>
      <linearGradient id="s1bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0b1629"/><stop offset="1" stopColor="#0e1e36"/></linearGradient>
      <linearGradient id="s1bar" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#7f4adf"/><stop offset="0.6" stopColor="#ff6b35"/><stop offset="0.6" stopColor="#1e2d45" stopOpacity="0.5"/><stop offset="1" stopColor="#1e2d45" stopOpacity="0.5"/></linearGradient>
    </defs>
    <rect width="820" height="440" fill="url(#s1bg)"/>
    {/* Chrome bar */}
    <rect width="820" height="36" fill="#1a2640"/>
    <circle cx="16" cy="18" r="5" fill="#EF4444"/><circle cx="34" cy="18" r="5" fill="#FBBF24"/><circle cx="52" cy="18" r="5" fill="#22C55E"/>
    <rect x="84" y="10" width="340" height="16" rx="4" fill="#0f1a2e"/>
    <text x="254" y="22" textAnchor="middle" fontSize="9" fill="#4a6080" fontFamily="monospace">xenuralabs.com / dashboard</text>
    {/* Sidebar */}
    <rect x="0" y="36" width="136" height="404" fill="#0d1828"/>
    <text x="8" y="56" fontSize="7.5" fill="#2d4060" fontFamily="monospace" letterSpacing="0.05em">EXPLORER</text>
    <text x="8" y="73" fontSize="9" fill="#4a6080" fontFamily="monospace">▼ src</text>
    <text x="18" y="88" fontSize="8.5" fill="#7f4adf" fontFamily="monospace">▼ components</text>
    <rect x="16" y="93" width="2" height="72" fill="#7f4adf" rx="1"/>
    <rect x="18" y="98" width="112" height="14" rx="2" fill="#7f4adf" fillOpacity="0.16"/>
    <text x="24" y="109" fontSize="8.5" fill="#9b8aff" fontFamily="monospace">Hero.tsx</text>
    <text x="24" y="124" fontSize="8.5" fill="#4a6080" fontFamily="monospace">Navigation.tsx</text>
    <text x="24" y="139" fontSize="8.5" fill="#4a6080" fontFamily="monospace">Services.tsx</text>
    <text x="24" y="154" fontSize="8.5" fill="#4a6080" fontFamily="monospace">Footer.tsx</text>
    <text x="18" y="170" fontSize="8.5" fill="#4a6080" fontFamily="monospace">▼ hooks</text>
    <text x="24" y="185" fontSize="8.5" fill="#4a6080" fontFamily="monospace">use-scroll.ts</text>
    <text x="24" y="200" fontSize="8.5" fill="#4a6080" fontFamily="monospace">use-dark.ts</text>
    <text x="8" y="256" fontSize="7.5" fill="#22C55E" fontFamily="monospace">M Hero.tsx</text>
    <text x="8" y="270" fontSize="7.5" fill="#22C55E" fontFamily="monospace">M Services.tsx</text>
    <text x="8" y="284" fontSize="7.5" fill="#22C55E" fontFamily="monospace">M index.css</text>
    {/* Editor */}
    <rect x="136" y="36" width="454" height="404" fill="#1a2640"/>
    <rect x="136" y="36" width="454" height="24" fill="#0f1a2e"/>
    <rect x="136" y="36" width="100" height="24" fill="#1a2640"/>
    <text x="186" y="52" textAnchor="middle" fontSize="8.5" fill="#c8d4e8" fontFamily="monospace">Hero.tsx</text>
    <rect x="136" y="60" width="26" height="380" fill="#14203a"/>
    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((n,i)=>(
      <text key={n} x="140" y={78+i*15} fontSize="7.5" fill="#2d4060" fontFamily="monospace">{n}</text>
    ))}
    <text x="168" y="78" fontSize="9.5" fill="#9b8aff" fontFamily="monospace">import</text><text x="208" y="78" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">{'{ useState, useMemo }'}</text>
    <text x="168" y="93" fontSize="9.5" fill="#9b8aff" fontFamily="monospace">import</text><text x="208" y="93" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">{'{ ArrowRight, Zap }'}</text>
    <text x="168" y="123" fontSize="9.5" fill="#9b8aff" fontFamily="monospace">const</text><text x="204" y="123" fontSize="9.5" fill="#fde68a" fontFamily="monospace"> Hero</text><text x="236" y="123" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace"> = () =&gt; {'{'}</text>
    <text x="180" y="138" fontSize="9.5" fill="#9b8aff" fontFamily="monospace">const</text><text x="216" y="138" fontSize="9.5" fill="#c4b5fd" fontFamily="monospace"> [slide, set]</text><text x="308" y="138" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace"> = </text><text x="322" y="138" fontSize="9.5" fill="#fde68a" fontFamily="monospace">useState</text><text x="376" y="138" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">(0);</text>
    <text x="180" y="153" fontSize="9.5" fill="#fde68a" fontFamily="monospace">useEffect</text><text x="242" y="153" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">(() =&gt; {'{'}</text>
    <text x="196" y="168" fontSize="9.5" fill="#9b8aff" fontFamily="monospace">const</text><text x="232" y="168" fontSize="9.5" fill="#c4b5fd" fontFamily="monospace"> timer</text><text x="276" y="168" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace"> = </text><text x="290" y="168" fontSize="9.5" fill="#fde68a" fontFamily="monospace">setInterval</text>
    <text x="196" y="183" fontSize="9.5" fill="#fde68a" fontFamily="monospace">setSlide</text><text x="248" y="183" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">(p =&gt; (p+1) % slides.length);</text>
    <text x="196" y="198" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">{'}, 4500);'}</text>
    <text x="196" y="213" fontSize="9.5" fill="#9b8aff" fontFamily="monospace">return</text><text x="232" y="213" fontSize="9.5" fill="#fde68a" fontFamily="monospace"> clearInterval</text><text x="342" y="213" fontSize="9.5" fill="#c4b5fd" fontFamily="monospace">(timer)</text>
    <text x="180" y="228" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">{'}, []);'}</text>
    <text x="168" y="258" fontSize="9.5" fill="#9b8aff" fontFamily="monospace">return</text><text x="204" y="258" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace"> {'('}</text>
    <text x="180" y="273" fontSize="9.5" fill="#fb923c" fontFamily="monospace">{'<section'}</text><text x="238" y="273" fontSize="9.5" fill="#fde68a" fontFamily="monospace"> id</text><text x="256" y="273" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">=</text><text x="264" y="273" fontSize="9.5" fill="#86efac" fontFamily="monospace">"hero"</text>
    <text x="180" y="288" fontSize="9.5" fill="#fde68a" fontFamily="monospace"> className</text><text x="256" y="288" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">=</text><text x="264" y="288" fontSize="9.5" fill="#86efac" fontFamily="monospace">"hero-section..."</text>
    <rect x="192" y="293" width="7" height="11" fill="#7f4adf" opacity="0.85"/>
    {/* CI/CD Panel */}
    <rect x="590" y="36" width="230" height="404" fill="#0c1a2e"/>
    <rect x="590" y="36" width="230" height="26" fill="#152038"/>
    <text x="705" y="54" textAnchor="middle" fontSize="10" fill="#c8d4e8" fontFamily="sans-serif" fontWeight="600">CI / CD Pipeline</text>
    <text x="602" y="80" fontSize="8" fill="#2d4060" fontFamily="monospace">PIPELINE · main</text>
    {[
      { y:102, color:'#22C55E', label:'Build', sub:'42s', done:true },
      { y:136, color:'#22C55E', label:'Test Suite', sub:'47/47 ✓', done:true },
      { y:170, color:'#22C55E', label:'Security Scan', sub:'0 issues', done:true },
      { y:204, color:'#22C55E', label:'Staging Deploy', sub:'Preview ↗', done:true },
      { y:238, color:'#7f4adf', label:'Production', sub:'Deploying 68%', done:false },
      { y:272, color:'#2d4060', label:'Monitor', sub:'Pending', done:false },
    ].map((s,i)=>(
      <g key={i}>
        <circle cx="614" cy={s.y} r="9" fill={s.color}/>
        <text x="614" y={s.y+3.5} textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif">{s.done?'✓':'…'}</text>
        <text x="630" y={s.y-4} fontSize="9.5" fill="#c8d4e8" fontFamily="sans-serif" fontWeight="500">{s.label}</text>
        <text x="630" y={s.y+9} fontSize="8" fill={s.done?'#22C55E':s.color==='#7f4adf'?'#c4b5fd':'#2d4060'} fontFamily="sans-serif">{s.sub}</text>
        {i<5&&<rect x="613" y={s.y+9} width="2" height="16" fill="#1e3050" rx="1"/>}
      </g>
    ))}
    <rect x="602" y="302" width="206" height="20" rx="4" fill="#152038"/>
    <rect x="604" y="304" width="140" height="16" rx="3" fill="url(#s1bar)"/>
    <text x="705" y="315" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif">68% complete</text>
    <rect x="602" y="332" width="206" height="52" rx="5" fill="#0f1a2e"/>
    <text x="612" y="350" fontSize="8" fill="#2d4060" fontFamily="monospace">Branch: main</text>
    <text x="612" y="364" fontSize="8" fill="#2d4060" fontFamily="monospace">Commit: a3f7c2d "feat: hero"</text>
    <text x="612" y="378" fontSize="8" fill="#2d4060" fontFamily="monospace">By: xenura · 2min ago</text>
    <rect y="432" width="820" height="8" fill="#08121f"/>
    <text x="140" y="439" fontSize="7" fill="#2d4060" fontFamily="monospace">TypeScript · UTF-8 · Branch: main ● Ready</text>
    <circle cx="808" cy="436" r="4" fill="#22C55E"/>
  </svg>
);

/* ─── Slide 2: AI Operations Dashboard ─── */
const Slide2 = () => (
  <svg viewBox="0 0 820 440" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'auto' }}>
    <defs>
      <linearGradient id="s2bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f2f4fa"/><stop offset="1" stopColor="#eaecf8"/></linearGradient>
      <linearGradient id="s2n1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7f4adf"/><stop offset="1" stopColor="#9b6bf2"/></linearGradient>
      <linearGradient id="s2n2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff6b35"/><stop offset="1" stopColor="#ff9e5c"/></linearGradient>
      <linearGradient id="s2n3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#3b82f6"/></linearGradient>
      <marker id="arr2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#c4b5fd"/></marker>
    </defs>
    <rect width="820" height="440" fill="url(#s2bg)"/>
    {Array.from({length:22}).map((_,i)=>Array.from({length:12}).map((_,j)=>(<circle key={`${i}-${j}`} cx={20+i*38} cy={18+j*38} r="1.2" fill="rgba(127,74,223,0.07)"/>)))}
    {/* Header */}
    <rect width="820" height="50" fill="white" fillOpacity="0.88"/>
    <rect width="820" height="50" fill="none" stroke="rgba(11,45,99,0.08)" strokeWidth="1"/>
    <rect x="18" y="12" width="26" height="26" rx="6" fill="url(#s2n1)"/>
    <text x="31" y="29" textAnchor="middle" fontSize="13" fill="white" fontFamily="sans-serif">⚡</text>
    <text x="54" y="24" fontSize="13" fill="#0b2d63" fontFamily="sans-serif" fontWeight="700">AI Operations Centre</text>
    <text x="54" y="38" fontSize="9.5" fill="#5f6f8a" fontFamily="sans-serif">Xenura Intelligence Platform · Live</text>
    <rect x="700" y="12" width="56" height="22" rx="5" fill="rgba(127,74,223,0.08)" stroke="rgba(127,74,223,0.2)" strokeWidth="0.8"/>
    <circle cx="716" cy="23" r="3.5" fill="#22C55E"/>
    <text x="736" y="27" textAnchor="middle" fontSize="9" fill="#7f4adf" fontFamily="sans-serif" fontWeight="600">Live</text>
    <rect x="762" y="12" width="50" height="22" rx="5" fill="url(#s2n1)"/>
    <text x="787" y="27" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">Config</text>
    <text x="410" y="82" textAnchor="middle" fontSize="10" fill="#5f6f8a" fontFamily="sans-serif" letterSpacing="0.07em">AI PROCESSING PIPELINE</text>
    {/* Pipeline connectors */}
    <line x1="165" y1="220" x2="240" y2="220" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#arr2)" strokeDasharray="5,3"/>
    <line x1="380" y1="220" x2="455" y2="220" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#arr2)" strokeDasharray="5,3"/>
    <line x1="595" y1="220" x2="670" y2="220" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#arr2)" strokeDasharray="5,3"/>
    {/* Nodes */}
    <rect x="44" y="178" width="124" height="84" rx="13" fill="url(#s2n1)" opacity="0.95"/>
    <text x="106" y="210" textAnchor="middle" fontSize="20" fontFamily="sans-serif">🗄</text>
    <text x="106" y="232" textAnchor="middle" fontSize="10.5" fill="white" fontFamily="sans-serif" fontWeight="700">Data Sources</text>
    <text x="106" y="248" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif">120 events/min</text>
    <rect x="248" y="160" width="134" height="120" rx="13" fill="url(#s2n2)" opacity="0.95"/>
    <circle cx="315" cy="200" r="24" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <text x="315" y="206" textAnchor="middle" fontSize="20" fontFamily="sans-serif">🧠</text>
    <text x="315" y="230" textAnchor="middle" fontSize="10.5" fill="white" fontFamily="sans-serif" fontWeight="700">AI Engine</text>
    <text x="315" y="244" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif">99.98% accuracy</text>
    <text x="315" y="258" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.55)" fontFamily="sans-serif">XAI v3.2</text>
    <rect x="463" y="178" width="134" height="84" rx="13" fill="url(#s2n3)" opacity="0.95"/>
    <text x="530" y="210" textAnchor="middle" fontSize="20" fontFamily="sans-serif">📊</text>
    <text x="530" y="232" textAnchor="middle" fontSize="10.5" fill="white" fontFamily="sans-serif" fontWeight="700">Insights</text>
    <text x="530" y="248" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif">Real-time &lt;50ms</text>
    <rect x="678" y="178" width="124" height="84" rx="13" fill="url(#s2n1)" opacity="0.95"/>
    <text x="740" y="210" textAnchor="middle" fontSize="20" fontFamily="sans-serif">⚡</text>
    <text x="740" y="232" textAnchor="middle" fontSize="10.5" fill="white" fontFamily="sans-serif" fontWeight="700">Auto Actions</text>
    <text x="740" y="248" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif">2,840/day</text>
    {/* Metric cards */}
    {[
      { x:26, label:'Models', val:'14', color:'#7f4adf' },
      { x:220, label:'Predictions', val:'2.8K', color:'#ff6b35' },
      { x:414, label:'Latency', val:'47ms', color:'#06b6d4' },
      { x:608, label:'Accuracy', val:'96%', color:'#22c55e' },
    ].map(m=>(
      <g key={m.x}>
        <rect x={m.x} y={310} width={178} height={64} rx="9" fill="white" fillOpacity="0.75" stroke="rgba(11,45,99,0.07)" strokeWidth="0.8"/>
        <rect x={m.x} y={310} width="3" height="64" rx="1.5" fill={m.color}/>
        <text x={m.x+14} y={330} fontSize="8" fill="#5f6f8a" fontFamily="sans-serif">{m.label}</text>
        <text x={m.x+14} y={358} fontSize="22" fill={m.color} fontFamily="sans-serif" fontWeight="700">{m.val}</text>
      </g>
    ))}
    {/* Status bar */}
    <rect y="400" width="820" height="40" fill="white" fillOpacity="0.6"/>
    <circle cx="22" cy="420" r="4" fill="#22C55E"/>
    <text x="34" y="424" fontSize="9.5" fill="#0b2d63" fontFamily="sans-serif" fontWeight="600">All systems operational · SLA 99.97%</text>
    <rect x="660" y="406" width="76" height="26" rx="6" fill="url(#s2n1)"/>
    <text x="698" y="423" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">View Reports →</text>
  </svg>
);

/* ─── Slide 3: Revenue Analytics ─── */
const Slide3 = () => {
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const vals=[28,35,30,44,52,48,62,70,65,80,88,96];
  const W=820,H=440,px=56,py=52,cH=200,cW=W-px*2,mV=100;
  const pts=vals.map((v,i)=>({x:px+(i/(vals.length-1))*cW,y:py+cH-(v/mV)*cH}));
  const line=pts.map((p,i)=>`${i===0?'M':'L'}${p.x},${p.y}`).join(' ');
  const area=`${line} L${pts[pts.length-1].x},${py+cH} L${pts[0].x},${py+cH} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'auto' }}>
      <defs>
        <linearGradient id="s3bg" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f3f5fb"/><stop offset="1" stopColor="#eaecf8"/></linearGradient>
        <linearGradient id="s3fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7f4adf" stopOpacity="0.2"/><stop offset="1" stopColor="#7f4adf" stopOpacity="0"/></linearGradient>
        <linearGradient id="s3line" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#7f4adf"/><stop offset="1" stopColor="#ff6b35"/></linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#s3bg)"/>
      {Array.from({length:22}).map((_,i)=>Array.from({length:14}).map((_,j)=>(<circle key={`${i}-${j}`} cx={18+i*38} cy={14+j*32} r="1.2" fill="rgba(127,74,223,0.055)"/>)))}
      <rect x="18" y="12" width={W-36} height={H-24} rx="14" fill="white" fillOpacity="0.9" stroke="rgba(11,45,99,0.07)" strokeWidth="1"/>
      <text x="46" y="44" fontSize="14" fill="#0b2d63" fontFamily="sans-serif" fontWeight="700">Revenue Analytics</text>
      <text x="46" y="60" fontSize="9.5" fill="#5f6f8a" fontFamily="sans-serif">Jan - Dec 2025 · All channels</text>
      <rect x="654" y="26" width="60" height="20" rx="5" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.8"/>
      <text x="684" y="40" textAnchor="middle" fontSize="9" fill="#16A34A" fontFamily="sans-serif" fontWeight="700">+34.2% ↑</text>
      <rect x="720" y="26" width="82" height="20" rx="5" fill="url(#s3line)"/>
      <text x="761" y="40" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">Export</text>
      {[0,25,50,75,100].map(v=>{const y=py+cH-(v/mV)*cH;return <g key={v}><line x1={px} y1={y} x2={W-px} y2={y} stroke="rgba(11,45,99,0.055)" strokeWidth="1" strokeDasharray="4,4"/><text x={px-6} y={y+4} textAnchor="end" fontSize="8" fill="#94a3b8" fontFamily="monospace">${v}K</text></g>;})}
      <path d={area} fill="url(#s3fill)"/>
      <path d={line} fill="none" stroke="url(#s3line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p,i)=>(<g key={i}><circle cx={p.x} cy={p.y} r="4.5" fill="white" stroke="#7f4adf" strokeWidth="2"/>{i===pts.length-1&&<><circle cx={p.x} cy={p.y} r="8" fill="none" stroke="#7f4adf" strokeWidth="1" opacity="0.4"/><rect x={p.x-22} y={p.y-28} width="44" height="18" rx="4" fill="#7f4adf"/><text x={p.x} y={p.y-15} textAnchor="middle" fontSize="8.5" fill="white" fontFamily="monospace" fontWeight="700">$96K</text></>}</g>))}
      {months.map((m,i)=>{const x=px+(i/(months.length-1))*cW;return <text key={m} x={x} y={py+cH+15} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontFamily="sans-serif">{m}</text>;})}
      {[
        {label:'Active Users',val:'840',chg:'+18%',color:'#7f4adf',x:46},
        {label:'Conversion',val:'68%',chg:'+6.2%',color:'#ff6b35',x:306},
        {label:'Revenue',val:'$96K',chg:'+34%',color:'#06b6d4',x:566},
      ].map(k=>(
        <g key={k.x}>
          <rect x={k.x} y={330} width={220} height={84} rx="10" fill="white" stroke="rgba(11,45,99,0.07)" strokeWidth="0.8"/>
          <rect x={k.x} y={330} width="3" height="84" rx="1.5" fill={k.color}/>
          <text x={k.x+16} y={352} fontSize="8.5" fill="#5f6f8a" fontFamily="sans-serif">{k.label}</text>
          <text x={k.x+16} y={387} fontSize="26" fill={k.color} fontFamily="sans-serif" fontWeight="700">{k.val}</text>
          <rect x={k.x+16} y={398} width="48" height="14" rx="3" fill="rgba(34,197,94,0.1)"/>
          <text x={k.x+40} y={409} textAnchor="middle" fontSize="8.5" fill="#16A34A" fontFamily="sans-serif" fontWeight="600">{k.chg} ↑</text>
        </g>
      ))}
    </svg>
  );
};

/* ─── Slide 4: E-Commerce Platform ─── */
const Slide4 = () => (
  <svg viewBox="0 0 820 440" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'auto' }}>
    <defs>
      <linearGradient id="s4bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0b1629"/><stop offset="1" stopColor="#1a0a30"/></linearGradient>
      <linearGradient id="s4acc" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#7f4adf"/><stop offset="1" stopColor="#ff6b35"/></linearGradient>
    </defs>
    <rect width="820" height="440" fill="url(#s4bg)"/>
    {Array.from({length:22}).map((_,i)=>Array.from({length:12}).map((_,j)=>(<circle key={`${i}-${j}`} cx={20+i*38} cy={18+j*38} r="1" fill="rgba(127,74,223,0.06)"/>)))}
    {/* Header */}
    <rect width="820" height="46" fill="#1a2640" opacity="0.9"/>
    <text x="24" y="20" fontSize="11" fill="#9b6bf2" fontFamily="sans-serif" fontWeight="700">🛒 Xenura Commerce</text>
    <text x="24" y="36" fontSize="8.5" fill="#4a6080" fontFamily="sans-serif">Multi-vendor E-commerce Platform · Admin Panel</text>
    <rect x="660" y="10" width="70" height="24" rx="5" fill="url(#s4acc)"/>
    <text x="695" y="26" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">+ New Order</text>
    <rect x="736" y="10" width="70" height="24" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(127,74,223,0.3)" strokeWidth="1"/>
    <text x="771" y="26" textAnchor="middle" fontSize="9" fill="#9b6bf2" fontFamily="sans-serif">Analytics</text>
    {/* Stat cards */}
    {[
      {x:20,label:'Total Revenue',val:'₹4.8L',chg:'+23%',icon:'💰',color:'#7f4adf'},
      {x:224,label:'Orders Today',val:'86',chg:'+12%',icon:'📦',color:'#ff6b35'},
      {x:428,label:'Active Users',val:'620',chg:'+8%',icon:'👥',color:'#06b6d4'},
      {x:632,label:'Avg Order Val',val:'₹3,760',chg:'+5%',icon:'🎯',color:'#22c55e'},
    ].map(s=>(
      <g key={s.x}>
        <rect x={s.x} y={56} width={186} height={86} rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(127,74,223,0.18)" strokeWidth="0.8"/>
        <text x={s.x+14} y={80} fontSize="14" fontFamily="sans-serif">{s.icon}</text>
        <text x={s.x+14} y={98} fontSize="8.5" fill="#4a6080" fontFamily="sans-serif">{s.label}</text>
        <text x={s.x+14} y={122} fontSize="21" fill={s.color} fontFamily="sans-serif" fontWeight="700">{s.val}</text>
        <rect x={s.x+14} y={128} width="36" height="12" rx="3" fill="rgba(34,197,94,0.15)"/>
        <text x={s.x+32} y={137} textAnchor="middle" fontSize="7.5" fill="#22c55e" fontFamily="sans-serif" fontWeight="600">{s.chg}</text>
      </g>
    ))}
    {/* Product table */}
    <rect x="20" y="154" width="486" height="268" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(127,74,223,0.15)" strokeWidth="0.8"/>
    <text x="34" y="176" fontSize="10" fill="#c8d4e8" fontFamily="sans-serif" fontWeight="600">Recent Orders</text>
    <rect x="20" y="182" width="486" height="1" fill="rgba(127,74,223,0.2)"/>
    {['Order ID','Customer','Product','Amount','Status'].map((h,i)=>(
      <text key={h} x={34+[0,90,200,340,430][i]} y={198} fontSize="8" fill="#4a6080" fontFamily="sans-serif" fontWeight="600">{h}</text>
    ))}
    {[
      {id:'#ORD-2847',cust:'Priya S.',prod:'MacBook Pro 14"',amt:'₹2,12,900',status:'Delivered',sc:'#22c55e'},
      {id:'#ORD-2846',cust:'Rahul M.',prod:'iPhone 15 Pro',amt:'₹1,34,900',status:'Shipped',sc:'#06b6d4'},
      {id:'#ORD-2845',cust:'Ananya K.',prod:'AirPods Pro',amt:'₹24,900',status:'Processing',sc:'#fbbf24'},
      {id:'#ORD-2844',cust:'Vikram R.',prod:'iPad Air',amt:'₹69,900',status:'Delivered',sc:'#22c55e'},
      {id:'#ORD-2843',cust:'Meera P.',prod:'Apple Watch',amt:'₹45,900',status:'Cancelled',sc:'#ef4444'},
    ].map((r,i)=>(
      <g key={r.id}>
        <rect x="20" y={206+i*38} width="486" height="37" fill={i%2===0?'rgba(255,255,255,0.015)':'transparent'}/>
        <text x="34" y={230+i*38} fontSize="8.5" fill="#6b8aac" fontFamily="monospace">{r.id}</text>
        <text x="124" y={230+i*38} fontSize="8.5" fill="#c8d4e8" fontFamily="sans-serif">{r.cust}</text>
        <text x="234" y={230+i*38} fontSize="8.5" fill="#c8d4e8" fontFamily="sans-serif">{r.prod}</text>
        <text x="374" y={230+i*38} fontSize="8.5" fill="#9b6bf2" fontFamily="sans-serif" fontWeight="600">{r.amt}</text>
        <rect x="464" y={218+i*38} width="32" height="14" rx="3" fill={`${r.sc}20`}/>
        <text x="480" y={229+i*38} textAnchor="middle" fontSize="7" fill={r.sc} fontFamily="sans-serif" fontWeight="600">{r.status}</text>
      </g>
    ))}
    {/* Side panel */}
    <rect x="516" y="154" width="284" height="130" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(127,74,223,0.15)" strokeWidth="0.8"/>
    <text x="530" y="176" fontSize="10" fill="#c8d4e8" fontFamily="sans-serif" fontWeight="600">Top Categories</text>
    {[
      {label:'Electronics',pct:42,color:'#7f4adf'},
      {label:'Fashion',pct:28,color:'#ff6b35'},
      {label:'Home & Kitchen',pct:18,color:'#06b6d4'},
      {label:'Sports',pct:12,color:'#22c55e'},
    ].map((cat,i)=>(
      <g key={cat.label}>
        <text x="530" y={198+i*20} fontSize="8.5" fill="#6b8aac" fontFamily="sans-serif">{cat.label}</text>
        <text x="774" y={198+i*20} textAnchor="end" fontSize="8.5" fill={cat.color} fontFamily="sans-serif" fontWeight="600">{cat.pct}%</text>
        <rect x="530" y={202+i*20} width="236" height="6" rx="3" fill="rgba(255,255,255,0.05)"/>
        <rect x="530" y={202+i*20} width={236*cat.pct/100} height="6" rx="3" fill={cat.color}/>
      </g>
    ))}
    <rect x="516" y="294" width="284" height="128" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,107,53,0.15)" strokeWidth="0.8"/>
    <text x="530" y="316" fontSize="10" fill="#c8d4e8" fontFamily="sans-serif" fontWeight="600">Inventory Alert</text>
    {[
      {prod:'Nike Air Max',stock:3,color:'#ef4444'},
      {prod:'Samsung TV 55"',stock:7,color:'#fbbf24'},
      {prod:'Whey Protein 1kg',stock:12,color:'#22c55e'},
    ].map((it,i)=>(
      <g key={it.prod}>
        <text x="530" y={338+i*28} fontSize="9" fill="#c8d4e8" fontFamily="sans-serif">{it.prod}</text>
        <rect x="680" y={326+i*28} width="110" height="16" rx="4" fill={`${it.color}15`}/>
        <text x="735" y={337+i*28} textAnchor="middle" fontSize="8" fill={it.color} fontFamily="sans-serif" fontWeight="600">{it.stock} units left</text>
      </g>
    ))}
  </svg>
);

/* ─── Slide 5: Mobile App UX Showcase ─── */
const Slide5 = () => (
  <svg viewBox="0 0 820 440" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'auto' }}>
    <defs>
      <linearGradient id="s5bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f2f4fa"/><stop offset="1" stopColor="#ede8fb"/></linearGradient>
      <linearGradient id="s5acc" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#7f4adf"/><stop offset="1" stopColor="#ff6b35"/></linearGradient>
      <linearGradient id="s5phone" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#1a0d2e"/><stop offset="1" stopColor="#0f0a1e"/></linearGradient>
    </defs>
    <rect width="820" height="440" fill="url(#s5bg)"/>
    {Array.from({length:22}).map((_,i)=>Array.from({length:12}).map((_,j)=>(<circle key={`${i}-${j}`} cx={18+i*38} cy={14+j*38} r="1.2" fill="rgba(127,74,223,0.07)"/>)))}
    {/* Left: info panel */}
    <rect x="24" y="24" width="310" height="392" rx="14" fill="white" fillOpacity="0.82" stroke="rgba(11,45,99,0.08)" strokeWidth="0.8"/>
    <rect x="24" y="24" width="310" height="46" rx="14" fill="url(#s5acc)"/>
    <rect x="24" y="52" width="310" height="18" fill="url(#s5acc)"/>
    <text x="179" y="52" textAnchor="middle" fontSize="12" fill="white" fontFamily="sans-serif" fontWeight="700">📱 Mobile App Suite</text>
    <text x="38" y="88" fontSize="10" fill="#0b2d63" fontFamily="sans-serif" fontWeight="600">React Native · Cross-Platform</text>
    <text x="38" y="102" fontSize="8.5" fill="#5f6f8a" fontFamily="sans-serif">iOS + Android from one codebase</text>
    {/* Feature list */}
    {[
      {icon:'⚡',label:'60fps Performance',desc:'Smooth native transitions'},
      {icon:'🔒',label:'Biometric Auth',desc:'Face ID, fingerprint, PIN'},
      {icon:'📡',label:'Offline Mode',desc:'Works without internet'},
      {icon:'🔔',label:'Push Notifications',desc:'Firebase, APNs integrated'},
      {icon:'💳',label:'Payment Gateway',desc:'Razorpay, Stripe, UPI'},
      {icon:'🗺',label:'Maps & Location',desc:'Google Maps, geofencing'},
      {icon:'📊',label:'Analytics SDK',desc:'Mixpanel, Firebase built-in'},
    ].map((f,i)=>(
      <g key={f.label}>
        <rect x="34" y={116+i*36} width="294" height="32" rx="7" fill={i===0?'rgba(127,74,223,0.08)':'transparent'} stroke={i===0?'rgba(127,74,223,0.2)':'transparent'} strokeWidth="0.8"/>
        <text x="50" y={136+i*36} fontSize="13" fontFamily="sans-serif">{f.icon}</text>
        <text x="70" y={132+i*36} fontSize="9.5" fill="#0b2d63" fontFamily="sans-serif" fontWeight="600">{f.label}</text>
        <text x="70" y={144+i*36} fontSize="8" fill="#5f6f8a" fontFamily="sans-serif">{f.desc}</text>
      </g>
    ))}
    {/* Tech stack badges */}
    <text x="38" y="378" fontSize="8" fill="#5f6f8a" fontFamily="sans-serif" fontWeight="600">TECH STACK</text>
    {['React Native','TypeScript','Redux','Expo','Firebase'].map((t,i)=>(
      <g key={t}>
        <rect x={38+i*56} y={382} width={52} height={16} rx="4" fill="rgba(127,74,223,0.1)"/>
        <text x={64+i*56} y={394} textAnchor="middle" fontSize="7.5" fill="#7f4adf" fontFamily="sans-serif" fontWeight="600">{t}</text>
      </g>
    ))}
    {/* Phone 1 */}
    <rect x="354" y="16" width="148" height="294" rx="22" fill="url(#s5phone)" stroke="#2a1a4e" strokeWidth="2"/>
    <rect x="358" y="34" width="140" height="270" rx="16" fill="#1a0d2e"/>
    <rect x="406" y="20" width="36" height="6" rx="3" fill="#2a1a4e"/>
    <rect x="362" y="38" width="132" height="262" rx="14" fill="#0f0820"/>
    <rect x="368" y="44" width="120" height="30" rx="6" fill="url(#s5acc)"/>
    <text x="428" y="63" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">Good morning, Priya 👋</text>
    <text x="376" y="92" fontSize="8" fill="#9b8aff" fontFamily="sans-serif" fontWeight="600">Your Balance</text>
    <text x="376" y="108" fontSize="18" fill="white" fontFamily="sans-serif" fontWeight="700">₹24,680</text>
    <text x="376" y="120" fontSize="7.5" fill="#22c55e" fontFamily="sans-serif">+₹2,340 this month</text>
    {[{icon:'💸',label:'Send',x:376},{icon:'📥',label:'Receive',x:412},{icon:'🏦',label:'Pay Bill',x:448},{icon:'📊',label:'Invest',x:484}].map(b=>(
      <g key={b.label}>
        <circle cx={b.x+12} cy={144} r="14" fill="rgba(255,255,255,0.08)"/>
        <text x={b.x+12} y={149} textAnchor="middle" fontSize="12" fontFamily="sans-serif">{b.icon}</text>
        <text x={b.x+12} y={167} textAnchor="middle" fontSize="6.5" fill="#6b8aac" fontFamily="sans-serif">{b.label}</text>
      </g>
    ))}
    <text x="376" y="186" fontSize="8" fill="#9b8aff" fontFamily="sans-serif" fontWeight="600">Recent Transactions</text>
    {[
      {icon:'🛍',label:'Myntra',amt:'-₹2,899',color:'#ef4444',y:202},
      {icon:'🍕',label:'Swiggy',amt:'-₹340',color:'#ef4444',y:220},
      {icon:'💰',label:'Salary',amt:'+₹85,000',color:'#22c55e',y:238},
      {icon:'⚡',label:'BESCOM',amt:'-₹1,200',color:'#ef4444',y:256},
    ].map(t=>(
      <g key={t.y}>
        <text x="376" y={t.y+11} fontSize="11" fontFamily="sans-serif">{t.icon}</text>
        <text x="394" y={t.y+8} fontSize="8.5" fill="#c8d4e8" fontFamily="sans-serif">{t.label}</text>
        <text x="476" y={t.y+8} textAnchor="end" fontSize="8.5" fill={t.color} fontFamily="sans-serif" fontWeight="600">{t.amt}</text>
      </g>
    ))}
    {/* Phone 2 */}
    <rect x="524" y="60" width="136" height="270" rx="20" fill="url(#s5phone)" stroke="#2a1a4e" strokeWidth="2"/>
    <rect x="528" y="76" width="128" height="248" rx="14" fill="#1a0d2e"/>
    <rect x="565" y="64" width="34" height="5" rx="2.5" fill="#2a1a4e"/>
    <rect x="532" y="80" width="120" height="240" rx="12" fill="#0f0820"/>
    <text x="592" y="102" textAnchor="middle" fontSize="8.5" fill="#9b8aff" fontFamily="sans-serif" fontWeight="600">Discover</text>
    {[
      {x:536,y:112,w:114,h:68,color:'rgba(127,74,223,0.3)',label:'🎧 Music'},
      {x:536,y:186,w:54,h:60,color:'rgba(255,107,53,0.3)',label:'🏋 Fitness'},
      {x:596,y:186,w:54,h:60,color:'rgba(6,182,212,0.3)',label:'📚 Books'},
      {x:536,y:252,w:114,h:56,color:'rgba(34,197,94,0.3)',label:'🌿 Wellness'},
    ].map((c,i)=>(
      <g key={i}>
        <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="8" fill={c.color}/>
        <text x={c.x+c.w/2} y={c.y+c.h/2+5} textAnchor="middle" fontSize="11" fontFamily="sans-serif">{c.label}</text>
      </g>
    ))}
    {/* App Store badges */}
    <rect x="354" y="322" width="306" height="50" rx="10" fill="white" fillOpacity="0.8" stroke="rgba(11,45,99,0.08)" strokeWidth="0.8"/>
    <text x="507" y="342" textAnchor="middle" fontSize="9" fill="#0b2d63" fontFamily="sans-serif" fontWeight="600">Published & Live</text>
    <text x="507" y="358" textAnchor="middle" fontSize="8" fill="#5f6f8a" fontFamily="sans-serif">App Store ★ 4.8 · Google Play ★ 4.7 · 800+ Downloads</text>
    {/* Stats row */}
    {[
      {x:354,label:'Dev Time',val:'8 wks',color:'#7f4adf'},
      {x:454,label:'Platforms',val:'iOS+Android',color:'#ff6b35'},
      {x:594,label:'Users',val:'3K+',color:'#06b6d4'},
    ].map(s=>(
      <g key={s.x}>
        <rect x={s.x} y={382} width={s.x===454?134:92} height={50} rx="8" fill="white" fillOpacity="0.7" stroke="rgba(11,45,99,0.07)" strokeWidth="0.8"/>
        <text x={s.x+(s.x===454?67:46)} y={404} textAnchor="middle" fontSize="8" fill="#5f6f8a" fontFamily="sans-serif">{s.label}</text>
        <text x={s.x+(s.x===454?67:46)} y={422} textAnchor="middle" fontSize="14" fill={s.color} fontFamily="sans-serif" fontWeight="700">{s.val}</text>
      </g>
    ))}
  </svg>
);

/* ─── Slide 6: Cloud & DevOps ─── */
const Slide6 = () => (
  <svg viewBox="0 0 820 440" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'auto' }}>
    <defs>
      <linearGradient id="s6bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0b1629"/><stop offset="1" stopColor="#1a0a30"/></linearGradient>
      <linearGradient id="s6acc" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#7f4adf"/><stop offset="1" stopColor="#ff6b35"/></linearGradient>
      <linearGradient id="s6sky" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#3b82f6"/></linearGradient>
    </defs>
    <rect width="820" height="440" fill="url(#s6bg)"/>
    {Array.from({length:22}).map((_,i)=>Array.from({length:12}).map((_,j)=>(<circle key={`${i}-${j}`} cx={20+i*38} cy={18+j*38} r="1" fill="rgba(127,74,223,0.055)"/>)))}
    {/* Header */}
    <rect width="820" height="44" fill="#1a2640" opacity="0.9"/>
    <text x="24" y="18" fontSize="11" fill="#9b6bf2" fontFamily="sans-serif" fontWeight="700">☁️ Cloud Infrastructure</text>
    <text x="24" y="33" fontSize="8.5" fill="#4a6080" fontFamily="sans-serif">Multi-Cloud Architecture · AWS + Azure + GCP</text>
    <circle cx="780" cy="22" r="4" fill="#22C55E"/>
    <text x="760" y="26" textAnchor="end" fontSize="8.5" fill="#22C55E" fontFamily="sans-serif">All Systems OK</text>
    {/* Central cloud hub */}
    <circle cx="410" cy="190" r="54" fill="rgba(127,74,223,0.12)" stroke="rgba(127,74,223,0.3)" strokeWidth="1.5"/>
    <circle cx="410" cy="190" r="36" fill="rgba(127,74,223,0.18)" stroke="rgba(127,74,223,0.4)" strokeWidth="1"/>
    <text x="410" y="197" textAnchor="middle" fontSize="24" fontFamily="sans-serif">☁</text>
    <text x="410" y="216" textAnchor="middle" fontSize="8.5" fill="#9b6bf2" fontFamily="sans-serif" fontWeight="600">Xenura Cloud</text>
    {/* Provider nodes */}
    {[
      {cx:160,cy:130,label:'AWS',icon:'⚡',color:'#ff6b35',note:'EC2 · S3 · RDS'},
      {cx:660,cy:130,label:'Azure',icon:'🔷',color:'#3b82f6',note:'AKS · CosmosDB'},
      {cx:160,cy:280,label:'GCP',icon:'🌐',color:'#22c55e',note:'GKE · BigQuery'},
      {cx:660,cy:280,label:'CDN',icon:'🌍',color:'#06b6d4',note:'CloudFront · CF'},
    ].map(n=>(
      <g key={n.label}>
        <line x1={n.cx<410?n.cx+50:n.cx-50} y1={n.cy} x2={n.cy<200?360:460} y2={190} stroke="rgba(127,74,223,0.3)" strokeWidth="1.2" strokeDasharray="5,4"/>
        <circle cx={n.cx} cy={n.cy} r="42" fill={`${n.color}18`} stroke={`${n.color}40`} strokeWidth="1.2"/>
        <text x={n.cx} y={n.cy-10} textAnchor="middle" fontSize="18" fontFamily="sans-serif">{n.icon}</text>
        <text x={n.cx} y={n.cy+8} textAnchor="middle" fontSize="11" fill="#c8d4e8" fontFamily="sans-serif" fontWeight="700">{n.label}</text>
        <text x={n.cx} y={n.cy+22} textAnchor="middle" fontSize="7.5" fill={n.color} fontFamily="sans-serif">{n.note}</text>
      </g>
    ))}
    {/* Uptime bars */}
    <rect x="20" y="344" width="380" height="84" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(127,74,223,0.18)" strokeWidth="0.8"/>
    <text x="34" y="364" fontSize="9.5" fill="#c8d4e8" fontFamily="sans-serif" fontWeight="600">Service Uptime · Last 90 Days</text>
    {[
      {label:'API Gateway',pct:99.99,color:'#22c55e'},
      {label:'App Services',pct:99.97,color:'#22c55e'},
      {label:'Database Cluster',pct:99.95,color:'#fbbf24'},
    ].map((s,i)=>(
      <g key={s.label}>
        <text x="34" y={384+i*20} fontSize="8.5" fill="#6b8aac" fontFamily="sans-serif">{s.label}</text>
        <text x="390" y={384+i*20} textAnchor="end" fontSize="8.5" fill={s.color} fontFamily="sans-serif" fontWeight="600">{s.pct}%</text>
        <rect x="34" y={387+i*20} width="354" height="5" rx="2.5" fill="rgba(255,255,255,0.05)"/>
        <rect x="34" y={387+i*20} width={354*s.pct/100} height="5" rx="2.5" fill={s.color}/>
      </g>
    ))}
    {/* Metrics right */}
    <rect x="420" y="344" width="380" height="84" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(6,182,212,0.18)" strokeWidth="0.8"/>
    <text x="434" y="364" fontSize="9.5" fill="#c8d4e8" fontFamily="sans-serif" fontWeight="600">Infrastructure Metrics</text>
    {[
      {label:'CPU Utilization',val:'34%',color:'#22c55e'},
      {label:'Memory Used',val:'61%',color:'#fbbf24'},
      {label:'Network I/O',val:'2.4 GB/s',color:'#06b6d4'},
    ].map((m,i)=>(
      <g key={m.label}>
        <text x="434" y={384+i*20} fontSize="8.5" fill="#6b8aac" fontFamily="sans-serif">{m.label}</text>
        <text x="792" y={384+i*20} textAnchor="end" fontSize="9" fill={m.color} fontFamily="sans-serif" fontWeight="700">{m.val}</text>
      </g>
    ))}
  </svg>
);

/* ─── Slide 7: Digital Marketing Dashboard ─── */
const Slide7 = () => (
  <svg viewBox="0 0 820 440" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'auto' }}>
    <defs>
      <linearGradient id="s7bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f3f5fb"/><stop offset="1" stopColor="#ede8fb"/></linearGradient>
      <linearGradient id="s7acc" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#7f4adf"/><stop offset="1" stopColor="#ff6b35"/></linearGradient>
    </defs>
    <rect width="820" height="440" fill="url(#s7bg)"/>
    {Array.from({length:22}).map((_,i)=>Array.from({length:12}).map((_,j)=>(<circle key={`${i}-${j}`} cx={20+i*38} cy={16+j*38} r="1.2" fill="rgba(127,74,223,0.07)"/>)))}
    {/* Header card */}
    <rect x="18" y="12" width="784" height="44" rx="10" fill="white" fillOpacity="0.88" stroke="rgba(11,45,99,0.07)" strokeWidth="0.8"/>
    <rect x="18" y="12" width="4" height="44" rx="2" fill="url(#s7acc)"/>
    <text x="36" y="30" fontSize="13" fill="#0b2d63" fontFamily="sans-serif" fontWeight="700">📈 Marketing Performance Dashboard</text>
    <text x="36" y="46" fontSize="9" fill="#5f6f8a" fontFamily="sans-serif">May 2025 · All Channels · Xenura Digital Team</text>
    <rect x="700" y="20" width="96" height="28" rx="6" fill="url(#s7acc)"/>
    <text x="748" y="38" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">Download Report</text>
    {/* KPI cards */}
    {[
      {x:18,label:'Total Impressions',val:'24K',chg:'+28%',icon:'👁',color:'#7f4adf'},
      {x:218,label:'Click-Through Rate',val:'3.8%',chg:'+0.6%',icon:'🖱',color:'#ff6b35'},
      {x:418,label:'Leads Generated',val:'142',chg:'+34%',icon:'🎯',color:'#06b6d4'},
      {x:618,label:'Cost Per Lead',val:'₹680',chg:'-12%',icon:'💰',color:'#22c55e'},
    ].map(s=>(
      <g key={s.x}>
        <rect x={s.x} y={66} width={184} height={80} rx="10" fill="white" fillOpacity="0.88" stroke="rgba(11,45,99,0.07)" strokeWidth="0.8"/>
        <rect x={s.x} y={66} width="3" height="80" rx="1.5" fill={s.color}/>
        <text x={s.x+18} y={86} fontSize="13" fontFamily="sans-serif">{s.icon}</text>
        <text x={s.x+18} y={104} fontSize="8" fill="#5f6f8a" fontFamily="sans-serif">{s.label}</text>
        <text x={s.x+18} y={128} fontSize="24" fill={s.color} fontFamily="sans-serif" fontWeight="700">{s.val}</text>
        <rect x={s.x+18} y={132} width="38" height="12" rx="3" fill="rgba(34,197,94,0.1)"/>
        <text x={s.x+37} y={141} textAnchor="middle" fontSize="8" fill="#16a34a" fontFamily="sans-serif" fontWeight="600">{s.chg}</text>
      </g>
    ))}
    {/* Channel breakdown */}
    <rect x="18" y="156" width="320" height="272" rx="10" fill="white" fillOpacity="0.88" stroke="rgba(11,45,99,0.07)" strokeWidth="0.8"/>
    <text x="34" y="176" fontSize="10" fill="#0b2d63" fontFamily="sans-serif" fontWeight="600">Channel Performance</text>
    {[
      {label:'Google Ads',pct:38,spend:'₹1.2L',leads:712,color:'#7f4adf'},
      {label:'Meta Ads',pct:28,spend:'₹88K',leads:514,color:'#ff6b35'},
      {label:'SEO (Organic)',pct:20,spend:'₹42K',leads:368,color:'#06b6d4'},
      {label:'Email Marketing',pct:9,spend:'₹18K',leads:166,color:'#22c55e'},
      {label:'LinkedIn Ads',pct:5,spend:'₹16K',leads:82,color:'#f59e0b'},
    ].map((ch,i)=>(
      <g key={ch.label}>
        <text x="34" y={202+i*44} fontSize="9" fill="#0b2d63" fontFamily="sans-serif" fontWeight="600">{ch.label}</text>
        <text x="310" y={202+i*44} textAnchor="end" fontSize="8" fill="#5f6f8a" fontFamily="sans-serif">{ch.spend}</text>
        <text x="34" y={215+i*44} fontSize="8" fill="#5f6f8a" fontFamily="sans-serif">{ch.leads} leads · {ch.pct}%</text>
        <rect x="34" y={218+i*44} width="284" height="7" rx="3.5" fill="rgba(11,45,99,0.06)"/>
        <rect x="34" y={218+i*44} width={284*ch.pct/100} height="7" rx="3.5" fill={ch.color}/>
      </g>
    ))}
    {/* Campaign table */}
    <rect x="348" y="156" width="454" height="180" rx="10" fill="white" fillOpacity="0.88" stroke="rgba(11,45,99,0.07)" strokeWidth="0.8"/>
    <text x="364" y="176" fontSize="10" fill="#0b2d63" fontFamily="sans-serif" fontWeight="600">Active Campaigns</text>
    {['Campaign','Platform','Status','Budget','ROAS'].map((h,i)=>(
      <text key={h} x={364+[0,120,210,280,360][i]} y={194} fontSize="7.5" fill="#5f6f8a" fontFamily="sans-serif" fontWeight="600">{h}</text>
    ))}
    <rect x="348" y="198" width="454" height="1" fill="rgba(11,45,99,0.08)"/>
    {[
      {camp:'Xenura Spring Sale',plat:'Google',status:'Active',budget:'₹50K',roas:'4.2x',sc:'#22c55e'},
      {camp:'Brand Awareness Q2',plat:'Meta',status:'Active',budget:'₹35K',roas:'2.8x',sc:'#22c55e'},
      {camp:'Retargeting Flow',plat:'Meta+Google',status:'Paused',budget:'₹20K',roas:'5.1x',sc:'#fbbf24'},
      {camp:'Lead Gen BFSI',plat:'LinkedIn',status:'Active',budget:'₹16K',roas:'3.6x',sc:'#22c55e'},
    ].map((r,i)=>(
      <g key={r.camp}>
        <rect x="348" y={203+i*32} width="454" height="31" fill={i%2===0?'rgba(11,45,99,0.02)':'transparent'}/>
        <text x="364" y={223+i*32} fontSize="8.5" fill="#0b2d63" fontFamily="sans-serif">{r.camp}</text>
        <text x="484" y={223+i*32} fontSize="8.5" fill="#5f6f8a" fontFamily="sans-serif">{r.plat}</text>
        <rect x="574" y={211+i*32} width="32" height="14" rx="3" fill={`${r.sc}20`}/>
        <text x="590" y={221+i*32} textAnchor="middle" fontSize="7.5" fill={r.sc} fontFamily="sans-serif" fontWeight="600">{r.status}</text>
        <text x="644" y={223+i*32} fontSize="8.5" fill="#5f6f8a" fontFamily="sans-serif">{r.budget}</text>
        <text x="724" y={223+i*32} fontSize="9" fill="#7f4adf" fontFamily="sans-serif" fontWeight="700">{r.roas}</text>
      </g>
    ))}
    {/* Bottom row */}
    <rect x="348" y="346" width="220" height="82" rx="10" fill="white" fillOpacity="0.88" stroke="rgba(11,45,99,0.07)" strokeWidth="0.8"/>
    <text x="364" y="366" fontSize="10" fill="#0b2d63" fontFamily="sans-serif" fontWeight="600">SEO Rankings</text>
    {['xenuralabs.com → #1','react developer → #3','ai solutions india → #2','cloud services → #4'].map((t,i)=>(
      <text key={i} x="364" y={384+i*14} fontSize="8.5" fill="#5f6f8a" fontFamily="sans-serif">{t}</text>
    ))}
    <rect x="578" y="346" width="224" height="82" rx="10" fill="white" fillOpacity="0.88" stroke="rgba(11,45,99,0.07)" strokeWidth="0.8"/>
    <text x="594" y="366" fontSize="10" fill="#0b2d63" fontFamily="sans-serif" fontWeight="600">Email Performance</text>
    {['Open Rate: 28.4%','Click Rate: 6.2%','Conversions: 184','Revenue: ₹9.2L'].map((t,i)=>(
      <text key={i} x="594" y={384+i*14} fontSize="8.5" fill="#5f6f8a" fontFamily="sans-serif">{t}</text>
    ))}
  </svg>
);

const slides = [
  { Component: Slide1, title: 'Product Engineering', subtitle: 'Scalable digital platforms for modern teams' },
  { Component: Slide2, title: 'Operations Intelligence', subtitle: 'AI-assisted workflows that reduce friction' },
  { Component: Slide3, title: 'Growth Performance', subtitle: 'Data-driven delivery for measurable outcomes' },
  { Component: Slide4, title: 'E-Commerce Platform', subtitle: 'Multi-vendor commerce with real-time analytics' },
  { Component: Slide5, title: 'Mobile App Suite', subtitle: 'Cross-platform iOS & Android from one codebase' },
  { Component: Slide6, title: 'Cloud Infrastructure', subtitle: 'Multi-cloud architecture with 99.99% uptime' },
  { Component: Slide7, title: 'Digital Marketing', subtitle: 'Performance campaigns across all channels' },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setActiveSlide(p => (p + 1) % slides.length), 4800);
    return () => window.clearInterval(t);
  }, []);
  const goNext = () => setActiveSlide(p => (p + 1) % slides.length);
  const goPrev = () => setActiveSlide(p => (p - 1 + slides.length) % slides.length);
  const { Component, title, subtitle } = slides[activeSlide];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--theme-hero-bg)', paddingTop: 'var(--header-height)' }}>
      <div className="container-custom relative z-10 py-10 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7f4adf]/20 bg-[#7f4adf]/5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7f4adf] animate-pulse"/>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7f4adf]">AI-Powered Solutions</span>
            </div>
            <h1 className="text-[2.1rem] sm:text-[2.7rem] md:text-[3.1rem] lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight mb-5 sm:mb-6">
              <span className="theme-text-strong">Build Faster With </span>
              <span className="gradient-text-accent">AI-Powered</span>
              <br/>
              <span className="theme-text-strong">Products That </span>
              <span className="gradient-text-secondary">Scale</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mb-8 sm:mb-10 leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
              Turn bold ideas into live products — faster launches, AI at the core, and measurable growth from strategy to scale.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 max-w-md">
              <a href="#contact" className="btn-primary flex items-center justify-center gap-2" id="hero-cta-consult">
                <span>Start Your Project</span><ArrowRight className="w-5 h-5"/>
              </a>
              <a href="#services" className="btn-secondary flex items-center justify-center gap-2" id="hero-cta-explore">
                <span>View Services</span>
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#7f4adf','#ff6b35','#06b6d4','#0b2d63'].map((c,i)=>(
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: c }}>
                    {['R','V','K','A'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 text-xs">★★★★★</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>Trusted by 10+ clients · 98% satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right slider */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_-20px_rgba(11,45,99,0.3)] border border-black/5 dark:border-white/10">
              <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {slides.map((s, i) => (
                  <div key={s.title} className="w-full shrink-0">
                    <s.Component/>
                  </div>
                ))}
              </div>
              {/* Controls: arrows + dots centered bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <button onClick={goPrev} aria-label="Previous" className="w-9 h-9 rounded-full bg-white/90 border border-white/80 text-slate-700 flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <ChevronLeft className="w-4 h-4"/>
                </button>
                <div className="flex gap-1.5 items-center">
                  {slides.map((_,i)=>(
                    <button key={i} onClick={()=>setActiveSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i===activeSlide ? 'w-6 bg-[#7f4adf]' : 'w-1.5 bg-white/40'}`} aria-label={`Slide ${i+1}`}/>
                  ))}
                </div>
                <button onClick={goNext} aria-label="Next" className="w-9 h-9 rounded-full bg-white/90 border border-white/80 text-slate-700 flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
            {/* Slide caption */}
              <div className="mt-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.14em] font-semibold" style={{ color: 'var(--theme-accent-purple)' }}>{title}</span>
              </div>
              <p className="text-sm mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
