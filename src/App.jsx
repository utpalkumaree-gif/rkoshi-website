import { useState, useEffect } from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --navy: #0A1628; } html, body { background: #0A1628 !important; --blue: #1A5CFF; --blue-light: #3B7BFF; --blue-pale: #EEF3FF;
      --orange: #FF6B2B; --orange-light: #FF8F5C; --orange-pale: #FFF3ED;
      --white: #FFFFFF; --gray-50: #F8FAFC; --gray-100: #F1F5F9; --gray-200: #E2E8F0;
      --gray-400: #94A3B8; --gray-600: #475569; --gray-800: #1E293B;
      --font-display: 'Syne', sans-serif; --font-body: 'DM Sans', sans-serif;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08); --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
      --shadow-lg: 0 10px 40px rgba(0,0,0,0.1); --shadow-blue: 0 8px 30px rgba(26,92,255,0.25);
      --shadow-orange: 0 8px 30px rgba(255,107,43,0.3); --radius: 12px; --radius-lg: 20px;
    }
    html { scroll-behavior: smooth; }
    html, body { background: #0A1628 !important; width: 100%; max-width: 100%; overflow-x: hidden; margin:0; padding:0; }
    body { font-family: var(--font-body); background: var(--white); color: var(--gray-800); line-height: 1.6; -webkit-font-smoothing: antialiased; }
    h1,h2,h3,h4,h5 { font-family: var(--font-display); line-height: 1.15; color: var(--navy); }
    @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes pulse-dot { 0%,100% { transform:scale(1); } 50% { transform:scale(1.4); } }
    @keyframes truck-move { 0% { transform:translateX(-8px); } 50% { transform:translateX(8px); } 100% { transform:translateX(-8px); } }
    .btn { display:inline-flex; align-items:center; gap:8px; padding:13px 28px; border-radius:50px; font-family:var(--font-display); font-size:15px; font-weight:600; cursor:pointer; border:none; transition:all 0.22s cubic-bezier(0.34,1.56,0.64,1); text-decoration:none; white-space:nowrap; }
    .btn-primary { background:var(--orange); color:#fff; box-shadow:var(--shadow-orange); }
    .btn-primary:hover { background:var(--orange-light); transform:translateY(-2px) scale(1.03); }
    .btn-secondary { background:var(--blue); color:#fff; box-shadow:var(--shadow-blue); }
    .btn-secondary:hover { background:var(--blue-light); transform:translateY(-2px) scale(1.03); }
    .btn-outline { background:transparent; color:var(--blue); border:2px solid var(--blue); }
    .btn-outline:hover { background:var(--blue); color:#fff; transform:translateY(-2px); }
    .btn-ghost { background:rgba(255,255,255,0.12); color:#fff; border:1.5px solid rgba(255,255,255,0.3); backdrop-filter:blur(8px); }
    .btn-ghost:hover { background:rgba(255,255,255,0.22); transform:translateY(-2px); }
    .form-group { display:flex; flex-direction:column; gap:6px; }
    .form-label { font-size:13px; font-weight:600; color:var(--gray-600); text-transform:uppercase; letter-spacing:0.06em; }
    .form-input { padding:13px 16px; border:1.5px solid var(--gray-200); border-radius:var(--radius); font-family:var(--font-body); font-size:15px; color:var(--gray-800); background:var(--white); transition:all 0.2s; outline:none; width:100%; }
    .form-input:focus { border-color:var(--blue); box-shadow:0 0 0 3px rgba(26,92,255,0.12); }
    .form-select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; padding-right:42px; }
    .card { background:var(--white); border-radius:var(--radius-lg); box-shadow:var(--shadow-md); border:1px solid rgba(226,232,240,0.8); transition:all 0.25s ease; }
    .card:hover { box-shadow:var(--shadow-lg); transform:translateY(-3px); }
    .section { padding:96px 0; }
    .section-sm { padding:64px 0; }
    .container { max-width:1200px; margin:0 auto; padding:0 24px; }
    .section-tag { display:inline-flex; align-items:center; gap:8px; background:var(--blue-pale); color:var(--blue); padding:6px 16px; border-radius:50px; font-size:13px; font-weight:700; font-family:var(--font-display); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:16px; }
    .section-title { font-size:clamp(28px,4vw,44px); font-weight:800; margin-bottom:16px; }
    .section-subtitle { font-size:17px; color:var(--gray-600); max-width:560px; line-height:1.7; }
    .navbar { position:fixed; top:0; left:0; right:0; z-index:1000; transition:all 0.3s ease; }
    .navbar.scrolled { background:rgba(255,255,255,0.95); backdrop-filter:blur(20px); box-shadow:0 1px 0 rgba(0,0,0,0.08); }
    .navbar.transparent { background:rgba(10,22,40,0.95); backdrop-filter:blur(10px); width:100%; left:0; right:0; }
    .nav-inner { display:flex; align-items:center; justify-content:space-between; height:72px; max-width:1200px; margin:0 auto; padding:0 24px; }
    .nav-logo { display:flex; align-items:center; gap:10px; font-family:var(--font-display); font-size:18px; font-weight:800; color: isHero ? "white" : "var(--navy)"; text-decoration:none; cursor:pointer; }
    .nav-logo span { color:var(--orange); }
    .nav-links { display:flex; align-items:center; gap:4px; list-style:none; }
    .nav-link { padding:8px 12px; border-radius:8px; font-size:14px; font-weight:500; color:var(--gray-600); cursor:pointer; transition:all 0.2s; text-decoration:none; }
    .nav-link:hover, .nav-link.active { color:var(--blue); background:var(--blue-pale); }
    .nav-actions { display:flex; gap:10px; align-items:center; }
    .mobile-menu-btn { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:8px; background:none; border:none; }
    .mobile-menu-btn span { display:block; width:24px; height:2px; background:var(--navy); border-radius:2px; transition:all 0.3s; }
    @media(max-width:900px){ .nav-links { display:none; } .mobile-menu-btn { display:flex; } }
    .hero { min-height:100vh; background:linear-gradient(135deg,var(--navy) 0%,#0F2456 50%,#1A3A7A 100%); position:fixed; top:0; left:0; right:0; bottom:0; display:flex; align-items:center; overflow:hidden; width:100vw; }
    .hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 60% 50%,rgba(26,92,255,0.18) 0%,transparent 70%),radial-gradient(circle at 20% 80%,rgba(255,107,43,0.12) 0%,transparent 50%); }
    .hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px); background-size:60px 60px; }
    .hero-content { position:relative; z-index:2; display:grid; grid-template-columns:1fr 460px; gap:64px; align-items:center; max-width:1200px; margin:0 auto; padding:100px 24px 60px; width:100%; }
    .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(255,107,43,0.15); border:1px solid rgba(255,107,43,0.3); color:var(--orange-light); padding:8px 18px; border-radius:50px; font-size:13px; font-weight:600; font-family:var(--font-display); margin-bottom:24px; animation:fadeUp 0.6s ease both; }
    .hero-title { font-size:clamp(36px,5vw,62px); font-weight:800; color:white; margin-bottom:24px; animation:fadeUp 0.6s 0.1s ease both; line-height:1.05; }
    .hero-title .highlight { color:transparent; background:linear-gradient(135deg,#FF6B2B,#FF9F5C); -webkit-background-clip:text; background-clip:text; }
    .hero-desc { font-size:17px; color:rgba(255,255,255,0.72); margin-bottom:36px; line-height:1.75; animation:fadeUp 0.6s 0.2s ease both; }
    .hero-ctas { display:flex; gap:14px; flex-wrap:wrap; animation:fadeUp 0.6s 0.3s ease both; }
    .hero-stats { display:flex; gap:36px; margin-top:52px; animation:fadeUp 0.6s 0.4s ease both; flex-wrap:wrap; }
    .hero-stat-num { font-family:var(--font-display); font-size:30px; font-weight:800; color:white; }
    .hero-stat-label { font-size:13px; color:rgba(255,255,255,0.55); margin-top:2px; }
    .quote-card { background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12); border-radius:var(--radius-lg); padding:28px; backdrop-filter:blur(20px); animation:fadeUp 0.6s 0.2s ease both; }
    .quote-card-title { font-family:var(--font-display); font-size:19px; font-weight:700; color:white; margin-bottom:4px; }
    .quote-card-sub { font-size:13px; color:rgba(255,255,255,0.55); margin-bottom:20px; }
    .quote-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .quote-input { padding:12px 14px; border-radius:10px; border:1.5px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.08); color:white; font-family:var(--font-body); font-size:14px; outline:none; transition:all 0.2s; width:100%; }
    .quote-input::placeholder { color:rgba(255,255,255,0.35); }
    .quote-input:focus { border-color:var(--orange); background:rgba(255,255,255,0.12); }
    .quote-select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; }
    .quote-select option { background:var(--navy); color:white; }
    .quote-result { margin-top:18px; padding:16px 18px; background:rgba(255,107,43,0.12); border:1px solid rgba(255,107,43,0.25); border-radius:12px; animation:fadeUp 0.4s ease both; }
    .quote-result-label { font-size:11px; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:0.08em; font-weight:600; }
    .quote-result-price { font-family:var(--font-display); font-size:30px; font-weight:800; color:var(--orange-light); margin:4px 0; }
    .quote-result-note { font-size:11px; color:rgba(255,255,255,0.5); }
    .services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
    .service-card { padding:28px 24px; border-radius:var(--radius-lg); background:var(--white); border:1px solid var(--gray-200); transition:all 0.25s ease; cursor:pointer; position:relative; overflow:hidden; }
    .service-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--blue),var(--orange)); transform:scaleX(0); transition:transform 0.3s ease; transform-origin:left; }
    .service-card:hover { box-shadow:var(--shadow-lg); transform:translateY(-5px); border-color:rgba(26,92,255,0.2); }
    .service-card:hover::after { transform:scaleX(1); }
    .service-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; margin-bottom:18px; }
    .service-name { font-family:var(--font-display); font-size:18px; font-weight:700; margin-bottom:10px; color:var(--navy); }
    .service-desc { font-size:14px; color:var(--gray-600); line-height:1.7; }
    .service-feature { display:flex; align-items:center; gap:8px; font-size:13px; color:var(--gray-600); margin-top:8px; }
    .service-feature::before { content:'✓'; color:var(--blue); font-weight:700; font-size:11px; background:var(--blue-pale); width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .testimonials-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; }
    .testimonial-card { padding:28px; border-radius:var(--radius-lg); background:var(--white); border:1px solid var(--gray-200); box-shadow:var(--shadow-sm); }
    .testimonial-stars { color:#F59E0B; font-size:18px; margin-bottom:14px; letter-spacing:2px; }
    .testimonial-text { font-size:15px; color:var(--gray-600); line-height:1.75; margin-bottom:20px; font-style:italic; }
    .testimonial-author { display:flex; align-items:center; gap:12px; }
    .testimonial-avatar { width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--blue-light)); display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-weight:700; color:white; font-size:16px; flex-shrink:0; }
    .testimonial-name { font-family:var(--font-display); font-weight:700; font-size:15px; color:var(--navy); }
    .testimonial-loc { font-size:13px; color:var(--gray-400); }
    .features-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
    .feature-item { text-align:center; padding:32px 20px; }
    .feature-icon { font-size:40px; margin-bottom:16px; display:block; animation:float 3s ease-in-out infinite; }
    .feature-title { font-family:var(--font-display); font-size:17px; font-weight:700; margin-bottom:10px; }
    .feature-desc { font-size:14px; color:var(--gray-600); line-height:1.65; }
    .cta-banner { background:linear-gradient(135deg,var(--navy),#1A3A7A); border-radius:var(--radius-lg); padding:64px; text-align:center; position:relative; overflow:hidden; }
    .cta-banner::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 70% 80% at 50% 50%,rgba(26,92,255,0.2),transparent); }
    .tracking-steps { display:flex; flex-direction:column; gap:0; margin-top:32px; }
    .tracking-step { display:flex; gap:20px; position:relative; }
    .tracking-step:not(:last-child)::before { content:''; position:absolute; left:19px; top:40px; width:2px; height:100%; background:var(--gray-200); }
    .tracking-step.done::before { background:var(--blue); }
    .step-dot { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; z-index:1; background:var(--gray-100); border:2px solid var(--gray-200); }
    .tracking-step.done .step-dot { background:var(--blue); border-color:var(--blue); color:white; }
    .tracking-step.active .step-dot { background:var(--orange); border-color:var(--orange); color:white; animation:pulse-dot 1.5s ease infinite; }
    .step-info { padding:8px 0 28px; }
    .step-label { font-family:var(--font-display); font-weight:700; font-size:15px; color:var(--navy); }
    .step-meta { font-size:13px; color:var(--gray-400); margin-top:3px; }
    .step-meta.active-meta { color:var(--orange); font-weight:600; }
    .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; }
    .contact-icon { width:52px; height:52px; border-radius:14px; background:var(--blue-pale); display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; }
    .footer { background:var(--navy); color:rgba(255,255,255,0.65); padding:72px 0 32px; }
    .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; margin-bottom:48px; }
    .footer-heading { font-family:var(--font-display); font-weight:700; color:white; font-size:15px; margin-bottom:16px; }
    .footer-link { display:block; color:rgba(255,255,255,0.55); font-size:14px; margin-bottom:10px; cursor:pointer; transition:color 0.2s; text-decoration:none; }
    .footer-link:hover { color:var(--orange-light); }
    .footer-divider { border:none; border-top:1px solid rgba(255,255,255,0.08); margin-bottom:28px; }
    .footer-bottom { display:flex; justify-content:space-between; align-items:center; font-size:13px; flex-wrap:wrap; gap:12px; }
    .step-indicator { display:flex; align-items:center; margin-bottom:36px; }
    .step-num { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-size:14px; font-weight:700; transition:all 0.3s; }
    .step-num.active { background:var(--blue); color:white; }
    .step-num.done { background:#22C55E; color:white; }
    .step-num.inactive { background:var(--gray-200); color:var(--gray-400); }
    .step-line { flex:1; height:2px; background:var(--gray-200); margin:0 8px; }
    .step-line.done { background:#22C55E; }
    .toast { position:fixed; bottom:24px; right:24px; background:var(--navy); color:white; padding:16px 22px; border-radius:var(--radius); box-shadow:var(--shadow-lg); z-index:9999; display:flex; align-items:center; gap:12px; font-size:14px; font-weight:500; animation:fadeUp 0.4s ease both; max-width:340px; }
    .toast.success { border-left:4px solid #22C55E; }
    .toast.error { border-left:4px solid #EF4444; }
    .mobile-menu { position:fixed; inset:0; z-index:999; background:white; padding:80px 24px 24px; animation:fadeIn 0.3s ease both; }
    .progress-bar { position:fixed; top:0; left:0; height:3px; background:linear-gradient(90deg,var(--blue),var(--orange)); z-index:9999; transition:width 0.1s ease; }
    .whatsapp-float { position:fixed; bottom:24px; left:24px; z-index:1000; width:54px; height:54px; background:#25D366; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:26px; box-shadow:0 4px 20px rgba(37,211,102,0.4); cursor:pointer; transition:all 0.25s ease; animation:float 3s ease-in-out infinite; }
    .whatsapp-float:hover { transform:scale(1.12); }
    .gallery-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:24px; }
    .gallery-card { border-radius:16px; overflow:hidden; cursor:pointer; box-shadow:var(--shadow-md); transition:all 0.25s ease; }
    .gallery-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-lg); }
    .lightbox { position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:9999; display:flex; align-items:center; justify-content:center; padding:24px; animation:fadeIn 0.3s ease both; }
    @media(max-width:1024px){ .hero-content { grid-template-columns:1fr; } .services-grid { grid-template-columns:repeat(2,1fr); } .features-grid { grid-template-columns:repeat(2,1fr); } .footer-grid { grid-template-columns:1fr 1fr; } }
    @media(max-width:768px){ .section { padding:64px 0; } .hero-content { padding:90px 24px 48px; } .services-grid { grid-template-columns:1fr; } .cta-banner { padding:40px 24px; } .contact-grid { grid-template-columns:1fr; } .quote-form-grid { grid-template-columns:1fr; } .gallery-grid { grid-template-columns:1fr 1fr; } }
    @media(max-width:480px){ .features-grid { grid-template-columns:1fr; } .gallery-grid { grid-template-columns:1fr; } }
  `}</style>
);

const COMPANY = {
  name: "Rkoshi Packers & Movers",
  fullName: "Rkoshi Packers and Movers Pvt. Ltd.",
  tagline: "Jharkhand's Most Trusted Packers & Movers",
  phone: "+91 8825239623",
  whatsapp: "918825239623",
  email: "rkoshipackers@gmail.com",
  email2: "bookings@rkoshipackers.in",
  address: "Ranchi, Jharkhand – 834001",
  address2: "Registered: Darbhanga, Bihar",
};

const SERVICES = [
  { id:"household", icon:"🏠", name:"Household Shifting", desc:"Complete home relocation with professional packing, loading, transport and unpacking services.", color:"#EEF3FF", features:["Professional packing team","Safe loading & unloading","Door-to-door delivery","Insurance coverage"], price:"Starting ₹4,999" },
  { id:"office", icon:"🏢", name:"Office Relocation", desc:"Seamless office moves with minimal downtime. We handle IT equipment, furniture and documents.", color:"#FFF3ED", features:["IT equipment handling","Furniture disassembly","Minimal disruption","Weekend slots available"], price:"Starting ₹8,999" },
  { id:"furniture", icon:"🛋️", name:"Furniture Transport", desc:"Safe transportation of all types of furniture including antiques and delicate items.", color:"#F0FDF4", features:["Custom wrapping","Antique care","Assembly service","Zero damage guarantee"], price:"Starting ₹2,499" },
  { id:"intercity", icon:"🗺️", name:"Intercity Relocation", desc:"Long-distance moving across 500+ cities with GPS tracking and timely delivery.", color:"#FFF7ED", features:["GPS tracked vehicles","500+ cities covered","Transit insurance","Real-time updates"], price:"Starting ₹9,999" },
  { id:"warehouse", icon:"🏭", name:"Warehouse Storage", desc:"Secure, climate-controlled storage facilities for short-term and long-term requirements.", color:"#F5F3FF", features:["24/7 security","Climate controlled","Flexible duration","Easy retrieval"], price:"Starting ₹1,499/month" },
  { id:"packing", icon:"📦", name:"Packing & Unpacking", desc:"Expert packing with high-quality materials ensuring every item reaches safely.", color:"#FFF1F2", features:["Quality materials","Labeling system","Fragile item care","Unpacking service"], price:"Starting ₹1,999" },
];

const CITIES = ["Ranchi","Darbhanga","Patna","Delhi","Mumbai","Bangalore","Chennai","Hyderabad","Kolkata","Pune","Ahmedabad","Jaipur","Lucknow","Chandigarh","Bhopal","Nagpur","Dhanbad","Jamshedpur","Bokaro","Hazaribagh","Muzaffarpur","Bhagalpur","Gaya","Varanasi"];
const HOUSE_SIZES = ["1 RK","1 BHK","2 BHK","3 BHK","4 BHK","Villa / Bungalow","Office (Small)","Office (Large)"];
const BASE_PRICES = { "1 RK":3500,"1 BHK":5000,"2 BHK":7500,"3 BHK":10000,"4 BHK":14000,"Villa / Bungalow":20000,"Office (Small)":12000,"Office (Large)":25000 };

const TESTIMONIALS = [
  { name:"Amit Kumar", loc:"Ranchi → Patna", text:"Rkoshi Packers made our move completely stress-free. Very professional team, arrived on time and handled everything with great care!", rating:5, initials:"AK" },
  { name:"Sunita Devi", loc:"Darbhanga → Delhi", text:"Excellent service at very reasonable price. The WhatsApp updates were very helpful. Our furniture arrived in perfect condition.", rating:5, initials:"SD" },
  { name:"Rohit Singh", loc:"Ranchi → Mumbai", text:"Best packers and movers in Jharkhand! Very trustworthy and transparent pricing. No hidden charges at all. Highly recommended!", rating:5, initials:"RS" },
];

const GALLERY_ITEMS = [
  { id:1, category:"vehicles", title:"Our Moving Truck", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop", desc:"Well maintained trucks for safe transportation" },
  { id:2, category:"vehicles", title:"Loading Vehicle", img:"https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop", desc:"Professional loading and unloading" },
  { id:3, category:"team", title:"Our Expert Team", img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop", desc:"Trained and verified professionals" },
  { id:4, category:"team", title:"Packing Experts", img:"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop", desc:"Expert packing with quality materials" },
  { id:5, category:"work", title:"Safe Packing", img:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop", desc:"Every item packed with care" },
  { id:6, category:"work", title:"Furniture Moving", img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop", desc:"Safe handling of all furniture" },
  { id:7, category:"work", title:"Office Relocation", img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop", desc:"Professional office moving services" },
  { id:8, category:"work", title:"Home Shifting", img:"https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop", desc:"Complete household shifting" },
  { id:9, category:"vehicles", title:"Our Fleet", img:"https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&auto=format&fit=crop", desc:"Multiple vehicles for all move sizes" },
];

const MOCK_BOOKINGS = [
  { id:"RK-1001", customer:"Amit Kumar", phone:"9876543210", from:"Ranchi", to:"Patna", service:"Household", date:"2024-01-18", amount:8500, status:"delivered" },
  { id:"RK-1002", customer:"Sunita Devi", phone:"9845678901", from:"Darbhanga", to:"Delhi", service:"Office", date:"2024-01-19", amount:22000, status:"transit" },
  { id:"RK-1003", customer:"Rohit Singh", phone:"9898989898", from:"Ranchi", to:"Mumbai", service:"Furniture", date:"2024-01-20", amount:5200, status:"confirmed" },
  { id:"RK-1004", customer:"Priya Kumari", phone:"9712345678", from:"Bokaro", to:"Bangalore", service:"Intercity", date:"2024-01-21", amount:18000, status:"pending" },
];

function calculateQuote(fromCity, toCity, houseSize, floor, hasElevator, furnitureCount) {
  if (!fromCity || !toCity || !houseSize) return null;
  const base = BASE_PRICES[houseSize] || 7000;
  const distanceMultiplier = fromCity === toCity ? 0.5 : 1.3;
  const floorCharge = !hasElevator && floor > 0 ? floor * 300 : 0;
  const furnitureCharge = parseInt(furnitureCount || 0) * 150;
  const total = Math.round((base * distanceMultiplier + floorCharge + furnitureCharge) / 100) * 100;
  return { min: total, max: Math.round(total * 1.25 / 100) * 100 };
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, []);
  return <div className={`toast ${type}`}><span>{type === "success" ? "✅" : "❌"}</span><span>{msg}</span></div>;
}

function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label:"Home", key:"home" },
    { label:"Services", key:"services" },
    { label:"Gallery", key:"gallery" },
    { label:"Get Quote", key:"quote" },
    { label:"Track Move", key:"tracking" },
    { label:"Contact", key:"contact" },
  ];
  const isHero = page === "home" && !scrolled;
  return (
    <>
      <nav className={`navbar ${scrolled || page !== "home" ? "scrolled" : "transparent"}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => setPage("home")}>
            <img src="/logo.png" alt="Rkoshi Logo" style={{ width:75, height:75, borderRadius:10, objectFit:"contain"font-size:20px; font-weight:800; }} />
            <span style={{color:"var(--orange)"}}>Rkoshi</span><span style={{color:"var(--orange)"}}>Packers & Movers</span>
          </div>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.key}>
                <a className={`nav-link ${page === l.key ? "active" : ""}`} style={{ color: isHero ? "rgba(255,255,255,0.85)" : undefined }} onClick={() => setPage(l.key)}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button className="btn btn-primary" onClick={() => setPage("booking")}>Book Now 🚛</button>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
              <span style={{ background: isHero ? "white" : undefined }}></span>
              <span style={{ background: isHero ? "white" : undefined }}></span>
              <span style={{ background: isHero ? "white" : undefined }}></span>
            </button>
          </div>
        </div>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMobileOpen(false)} style={{ position:"absolute", top:20, right:20, background:"none", border:"none", fontSize:28, cursor:"pointer" }}>✕</button>
          {links.map(l => (
            <a key={l.key} style={{ display:"block", padding:"14px 0", borderBottom:"1px solid #eee", fontSize:17, cursor:"pointer", color:"var(--navy)", fontWeight:600 }} onClick={() => { setPage(l.key); setMobileOpen(false); }}>{l.label}</a>
          ))}
          <button className="btn btn-primary" style={{ marginTop:24, width:"100%", justifyContent:"center" }} onClick={() => { setPage("booking"); setMobileOpen(false); }}>Book Now 🚛</button>
        </div>
      )}
    </>
  );
}

function HomePage({ setPage }) {
  const [qForm, setQForm] = useState({ from:"", to:"", size:"", floor:"0", elevator:false, furniture:"5" });
  const [quote, setQuote] = useState(null);
  const handleQuote = () => {
    const q = calculateQuote(qForm.from, qForm.to, qForm.size, parseInt(qForm.floor), qForm.elevator, qForm.furniture);
    setQuote(q);
  };
  return (
    <>
      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div>
            <div className="hero-badge">🚛 {COMPANY.tagline}</div>
            <h1 className="hero-title">Move Anywhere<br />with <span className="highlight">Full Confidence</span></h1>
            <p className="hero-desc">Professional packers & movers based in Ranchi, serving all across Jharkhand, Bihar and India. Safe, affordable and on-time — every time.</p>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={() => setPage("quote")}>Get Free Quote ⚡</button>
              <button className="btn btn-ghost" onClick={() => window.open(`https://wa.me/${COMPANY.whatsapp}?text=Hello Rkoshi Packers! I need moving help.`, "_blank")}>💬 WhatsApp Us</button>
            </div>
            <div className="hero-stats">
              {[{ n:"2000+", l:"Happy Customers" },{ n:"50+", l:"Cities Covered" },{ n:"99%", l:"Safe Delivery" },{ n:"5+", l:"Years Experience" }].map((s,i) => (
                <div key={i}><div className="hero-stat-num">{s.n}</div><div className="hero-stat-label">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="quote-card">
            <div className="quote-card-title">⚡ Quick Price Estimator</div>
            <div className="quote-card-sub">Get instant estimate in 30 seconds</div>
            <div className="quote-form-grid">
              <select className="quote-input quote-select" value={qForm.from} onChange={e => setQForm({...qForm, from:e.target.value})}>
                <option value="">📍 From City</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="quote-input quote-select" value={qForm.to} onChange={e => setQForm({...qForm, to:e.target.value})}>
                <option value="">🎯 To City</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="quote-input quote-select" value={qForm.size} onChange={e => setQForm({...qForm, size:e.target.value})}>
                <option value="">🏠 House Size</option>
                {HOUSE_SIZES.map(s => <option key={s}>{s}</option>)}
              </select>
              <select className="quote-input quote-select" value={qForm.floor} onChange={e => setQForm({...qForm, floor:e.target.value})}>
                <option value="0">🏢 Ground Floor</option>
                {[1,2,3,4,5,6,7,8].map(f => <option key={f} value={f}>Floor {f}</option>)}
              </select>
            </div>
            <button className="btn btn-primary" style={{ width:"100%", justifyContent:"center", marginTop:14 }} onClick={handleQuote}>Calculate My Quote ⚡</button>
            {quote && (
              <div className="quote-result">
                <div className="quote-result-label">Estimated Moving Cost</div>
                <div className="quote-result-price">₹{quote.min.toLocaleString()} – ₹{quote.max.toLocaleString()}</div>
                <div className="quote-result-note">*Final price confirmed after free survey</div>
                <button className="btn btn-primary" style={{ marginTop:12, fontSize:13, padding:"10px 20px" }} onClick={() => setPage("booking")}>Book at This Price →</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--gray-50)" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div className="section-tag">Our Services</div>
            <h2 className="section-title">Everything You Need for a Smooth Move</h2>
            <p className="section-subtitle" style={{ margin:"0 auto" }}>From packing to delivery — we handle everything with care</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div key={s.id} className="service-card" onClick={() => setPage("services")}>
                <div className="service-icon" style={{ background:s.color }}>{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
                {s.features.slice(0,3).map(f => <div key={f} className="service-feature">{f}</div>)}
                <div style={{ marginTop:18, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:"var(--blue)", fontWeight:700, fontSize:14, fontFamily:"var(--font-display)" }}>{s.price}</span>
                  <span style={{ color:"var(--orange)", fontWeight:600, fontSize:13, cursor:"pointer" }}>Know more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div className="section-tag">Why Choose Us</div>
            <h2 className="section-title">The Rkoshi Promise</h2>
          </div>
          <div className="features-grid">
            {[
              { icon:"🛡️", title:"100% Insured Moves", desc:"Every shipment is fully insured against damage or loss during transit." },
              { icon:"📡", title:"Live GPS Tracking", desc:"Track your belongings in real-time on your phone." },
              { icon:"⭐", title:"Verified Professionals", desc:"Background-checked, trained staff with years of experience." },
              { icon:"💰", title:"No Hidden Charges", desc:"Transparent pricing always. The quote we give is exactly what you pay." },
            ].map((f,i) => (
              <div key={i} className="feature-item">
                <span className="feature-icon" style={{ animationDelay:`${i*0.3}s` }}>{f.icon}</span>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--gray-50)" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div className="section-tag">Customer Reviews</div>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{"★".repeat(t.rating)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-loc">📍 {t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <div style={{ position:"relative", zIndex:1 }}>
              <div className="section-tag" style={{ background:"rgba(255,107,43,0.2)", color:"var(--orange-light)" }}>Special Offer</div>
              <h2 className="section-title" style={{ color:"white", marginBottom:16 }}>Get 15% Off Your First Move!</h2>
              <p style={{ color:"rgba(255,255,255,0.7)", fontSize:17, marginBottom:32 }}>Use code <strong>RKOSHI15</strong> when booking. Valid for new customers only.</p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                <button className="btn btn-primary" onClick={() => setPage("quote")}>Get Free Quote Now</button>
                <button className="btn btn-ghost" onClick={() => setPage("contact")}>Talk to Our Team</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </>
  );
}

function GalleryPage({ setPage }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const filtered = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.category === filter);
  return (
    <>
      <div style={{ background:"linear-gradient(135deg,var(--navy),#1A3A7A)", padding:"120px 0 64px" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <div className="section-tag" style={{ background:"rgba(255,255,255,0.1)", color:"white" }}>📸 Our Work</div>
          <h1 className="section-title" style={{ color:"white" }}>Photo Gallery</h1>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:17 }}>See our team, vehicles and work in action</p>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:48, flexWrap:"wrap" }}>
            {[
              { key:"all", label:"All Photos" },
              { key:"vehicles", label:"🚛 Vehicles" },
              { key:"team", label:"👥 Team" },
              { key:"work", label:"📦 Our Work" },
            ].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{ padding:"10px 24px", borderRadius:50, border:"2px solid var(--blue)", background: filter === f.key ? "var(--blue)" : "transparent", color: filter === f.key ? "white" : "var(--blue)", fontFamily:"var(--font-display)", fontWeight:700, fontSize:14, cursor:"pointer", transition:"all 0.2s" }}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {filtered.map(photo => (
              <div key={photo.id} className="gallery-card" onClick={() => setSelected(photo)}>
                <img src={photo.img} alt={photo.title} style={{ width:"100%", height:220, objectFit:"cover", display:"block" }} onError={e => { e.target.src = "https://via.placeholder.com/600x400?text=Rkoshi+Packers"; }} />
                <div style={{ padding:"16px 18px", background:"white" }}>
                  <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:16, marginBottom:4 }}>{photo.title}</div>
                  <div style={{ fontSize:13, color:"var(--gray-400)" }}>{photo.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:48, textAlign:"center", padding:"32px", background:"var(--blue-pale)", borderRadius:16, border:"2px dashed var(--blue)" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📸</div>
            <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, marginBottom:8 }}>Add Your Real Photos</h3>
            <p style={{ color:"var(--gray-600)", marginBottom:16 }}>Send your work photos on WhatsApp and we will add them to your website!</p>
            <button className="btn btn-primary" onClick={() => window.open(`https://wa.me/${COMPANY.whatsapp}?text=Hello! I want to add photos to my website.`, "_blank")}>💬 Send Photos on WhatsApp</button>
          </div>
        </div>
      </div>
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth:700, width:"100%", background:"white", borderRadius:20, overflow:"hidden" }}>
            <img src={selected.img} alt={selected.title} style={{ width:"100%", height:400, objectFit:"cover" }} />
            <div style={{ padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:18 }}>{selected.title}</div>
                <div style={{ color:"var(--gray-400)", fontSize:14, marginTop:4 }}>{selected.desc}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background:"var(--gray-100)", border:"none", borderRadius:"50%", width:40, height:40, fontSize:20, cursor:"pointer" }}>✕</button>
            </div>
          </div>
        </div>
      )}
      <Footer setPage={setPage} />
    </>
  );
}

function ServicesPage({ setPage }) {
  return (
    <>
      <div style={{ background:"linear-gradient(135deg,var(--navy),#1A3A7A)", padding:"120px 0 64px" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <div className="section-tag" style={{ background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.9)" }}>Our Services</div>
          <h1 className="section-title" style={{ color:"white", fontSize:44 }}>Complete Moving Solutions</h1>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:17, maxWidth:520, margin:"0 auto" }}>From single rooms to entire offices — we have a service for every need.</p>
        </div>
      </div>
      <div className="container" style={{ paddingTop:64, paddingBottom:96 }}>
        {SERVICES.map((s,i) => (
          <div key={s.id} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", marginBottom:80 }}>
            <div style={{ order: i%2!==0 ? 2 : 1 }}>
              <div style={{ background:s.color, width:"100%", height:260, borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:90 }}>{s.icon}</div>
            </div>
            <div style={{ order: i%2!==0 ? 1 : 2 }}>
              <div className="section-tag">{s.price}</div>
              <h2 style={{ fontSize:30, fontWeight:800, fontFamily:"var(--font-display)", marginBottom:12 }}>{s.name}</h2>
              <p style={{ color:"var(--gray-600)", fontSize:16, lineHeight:1.75, marginBottom:22 }}>{s.desc}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 24px", marginBottom:28 }}>
                {s.features.map(f => <div key={f} className="service-feature">{f}</div>)}
              </div>
              <div style={{ display:"flex", gap:12 }}>
                <button className="btn btn-secondary" onClick={() => setPage("quote")}>Get Quote</button>
                <button className="btn btn-outline" onClick={() => setPage("booking")}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer setPage={setPage} />
    </>
  );
}

function QuotePage({ setPage }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", phone:"", email:"", from:"", to:"", size:"", floor:"0", elevator:false, moveDate:"", furniture:"", fragile:false });
  const [quote, setQuote] = useState(null);
  const [toast, setToast] = useState(null);
  const update = (k,v) => setForm(f => ({...f,[k]:v}));
  const steps = ["Your Info","Move Details","Your Quote"];
  return (
    <>
      <div style={{ background:"linear-gradient(135deg,var(--navy),#1A3A7A)", padding:"120px 0 64px" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <div className="section-tag" style={{ background:"rgba(255,255,255,0.1)", color:"white" }}>Free Estimate</div>
          <h1 className="section-title" style={{ color:"white" }}>Get Your Instant Moving Quote</h1>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:17 }}>100% free — no obligation</p>
        </div>
      </div>
      <div className="section-sm">
        <div className="container">
          <div style={{ maxWidth:680, margin:"0 auto" }}>
            <div className="step-indicator">
              {steps.map((s,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", flex: i<steps.length-1 ? "1" : "none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div className={`step-num ${step>i+1?"done":step===i+1?"active":"inactive"}`}>{step>i+1?"✓":i+1}</div>
                    <span style={{ fontSize:13, fontWeight:600, color:step===i+1?"var(--blue)":"var(--gray-400)", whiteSpace:"nowrap" }}>{s}</span>
                  </div>
                  {i<steps.length-1 && <div className={`step-line ${step>i+1?"done":""}`}></div>}
                </div>
              ))}
            </div>
            <div className="card" style={{ padding:"36px 32px" }}>
              {step===1 && (
                <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700 }}>Tell us about yourself</h3>
                  <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" placeholder="Your full name" value={form.name} onChange={e=>update("name",e.target.value)} /></div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div className="form-group"><label className="form-label">Phone *</label><input className="form-input" placeholder="+91 XXXXX XXXXX" type="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" placeholder="you@email.com" type="email" value={form.email} onChange={e=>update("email",e.target.value)} /></div>
                  </div>
                  <button className="btn btn-secondary" style={{ alignSelf:"flex-end", padding:"13px 32px" }} onClick={() => { if(!form.name||!form.phone){setToast({msg:"Please fill name and phone",type:"error"});return;} setStep(2); }}>Next →</button>
                </div>
              )}
              {step===2 && (
                <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700 }}>Your Moving Details</h3>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div className="form-group"><label className="form-label">From City *</label><select className="form-input form-select" value={form.from} onChange={e=>update("from",e.target.value)}><option value="">Select city</option>{CITIES.map(c=><option key={c}>{c}</option>)}</select></div>
                    <div className="form-group"><label className="form-label">To City *</label><select className="form-input form-select" value={form.to} onChange={e=>update("to",e.target.value)}><option value="">Select city</option>{CITIES.map(c=><option key={c}>{c}</option>)}</select></div>
                    <div className="form-group"><label className="form-label">Property Size *</label><select className="form-input form-select" value={form.size} onChange={e=>update("size",e.target.value)}><option value="">Select size</option>{HOUSE_SIZES.map(s=><option key={s}>{s}</option>)}</select></div>
                    <div className="form-group"><label className="form-label">Floor Number</label><select className="form-input form-select" value={form.floor} onChange={e=>update("floor",e.target.value)}><option value="0">Ground Floor</option>{[1,2,3,4,5,6,7,8].map(f=><option key={f} value={f}>Floor {f}</option>)}</select></div>
                    <div className="form-group"><label className="form-label">Move Date</label><input className="form-input" type="date" value={form.moveDate} onChange={e=>update("moveDate",e.target.value)} min={new Date().toISOString().split("T")[0]} /></div>
                    <div className="form-group"><label className="form-label">Furniture Count</label><input className="form-input" type="number" placeholder="e.g. 8" value={form.furniture} onChange={e=>update("furniture",e.target.value)} /></div>
                  </div>
                  <div style={{ display:"flex", gap:12, marginTop:8, justifyContent:"space-between" }}>
                    <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => { if(!form.from||!form.to||!form.size){setToast({msg:"Please fill all required fields",type:"error"});return;} const q=calculateQuote(form.from,form.to,form.size,parseInt(form.floor),form.elevator,form.furniture); if(q){setQuote(q);setStep(3);} }}>Get My Quote ⚡</button>
                  </div>
                </div>
              )}
              {step===3 && quote && (
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:24, fontWeight:800, marginBottom:8 }}>Your Quote is Ready!</h3>
                  <p style={{ color:"var(--gray-600)", marginBottom:28 }}>Based on {form.size} from {form.from} to {form.to}</p>
                  <div style={{ background:"linear-gradient(135deg,var(--blue-pale),#fff)", border:"2px solid var(--blue)", borderRadius:16, padding:"28px 36px", marginBottom:24 }}>
                    <div style={{ fontSize:13, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:700, color:"var(--gray-400)", marginBottom:8 }}>Estimated Cost</div>
                    <div style={{ fontFamily:"var(--font-display)", fontSize:44, fontWeight:800, color:"var(--blue)" }}>₹{quote.min.toLocaleString()} <span style={{ fontSize:24, color:"var(--gray-400)" }}>– ₹{quote.max.toLocaleString()}</span></div>
                    <div style={{ color:"var(--gray-400)", fontSize:13, marginTop:8 }}>*Includes packing, loading, transport & unloading</div>
                  </div>
                  <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                    <button className="btn btn-primary" style={{ fontSize:16, padding:"15px 32px" }} onClick={() => setPage("booking")}>Book Now →</button>
                    <button className="btn btn-outline" onClick={() => { setStep(1); setQuote(null); }}>Recalculate</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <Footer setPage={setPage} />
    </>
  );
}

function BookingPage({ setPage }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"household", from:"", to:"", size:"", floor:"0", moveDate:"", notes:"", coupon:"" });
  const [submitted, setSubmitted] = useState(false);
  const [bookingId] = useState("RK-" + Math.floor(1000 + Math.random()*9000));
  const [toast, setToast] = useState(null);
  const update = (k,v) => setForm(f => ({...f,[k]:v}));
  const handleSubmit = () => {
    if(!form.name||!form.phone||!form.from||!form.to){ setToast({msg:"Please fill all required fields",type:"error"}); return; }
    setSubmitted(true);
  };
  if(submitted) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--gray-50)", padding:24 }}>
      <div className="card" style={{ maxWidth:500, width:"100%", padding:48, textAlign:"center" }}>
        <div style={{ width:80, height:80, background:"linear-gradient(135deg,#22C55E,#16A34A)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 24px" }}>✓</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:800, marginBottom:12 }}>Booking Confirmed!</h2>
        <p style={{ color:"var(--gray-600)", marginBottom:28 }}>Our team will call you within 2 hours. Thank you for choosing {COMPANY.name}!</p>
        <div style={{ background:"var(--blue-pale)", border:"1px solid rgba(26,92,255,0.2)", borderRadius:12, padding:"20px 24px", marginBottom:28 }}>
          <div style={{ fontSize:13, color:"var(--gray-400)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>Your Booking ID</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:36, fontWeight:800, color:"var(--blue)", letterSpacing:"0.05em", marginTop:6 }}>{bookingId}</div>
          <div style={{ fontSize:13, color:"var(--gray-400)", marginTop:4 }}>Save this ID to track your move</div>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <button className="btn btn-secondary" onClick={() => setPage("tracking")}>Track My Move 📡</button>
          <button className="btn btn-outline" onClick={() => setPage("home")}>Back to Home</button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div style={{ background:"linear-gradient(135deg,var(--navy),#1A3A7A)", padding:"120px 0 64px" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <div className="section-tag" style={{ background:"rgba(255,255,255,0.1)", color:"white" }}>Book a Move</div>
          <h1 className="section-title" style={{ color:"white" }}>Schedule Your Move Today</h1>
        </div>
      </div>
      <div className="section-sm">
        <div className="container">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:32, maxWidth:980, margin:"0 auto", alignItems:"start" }}>
            <div className="card" style={{ padding:"32px 28px" }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, marginBottom:22 }}>Booking Details</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" placeholder="Your name" value={form.name} onChange={e=>update("name",e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Phone *</label><input className="form-input" placeholder="+91 XXXXX XXXXX" type="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} /></div>
                </div>
                <div className="form-group"><label className="form-label">Email</label><input className="form-input" placeholder="you@email.com" type="email" value={form.email} onChange={e=>update("email",e.target.value)} /></div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <div className="form-group"><label className="form-label">Service *</label><select className="form-input form-select" value={form.service} onChange={e=>update("service",e.target.value)}>{SERVICES.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Property Size</label><select className="form-input form-select" value={form.size} onChange={e=>update("size",e.target.value)}><option value="">Select</option>{HOUSE_SIZES.map(s=><option key={s}>{s}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">From City *</label><select className="form-input form-select" value={form.from} onChange={e=>update("from",e.target.value)}><option value="">Select city</option>{CITIES.map(c=><option key={c}>{c}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">To City *</label><select className="form-input form-select" value={form.to} onChange={e=>update("to",e.target.value)}><option value="">Select city</option>{CITIES.map(c=><option key={c}>{c}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Move Date</label><input className="form-input" type="date" value={form.moveDate} onChange={e=>update("moveDate",e.target.value)} min={new Date().toISOString().split("T")[0]} /></div>
                  <div className="form-group"><label className="form-label">Coupon Code</label><input className="form-input" placeholder="e.g. RKOSHI15" value={form.coupon} onChange={e=>update("coupon",e.target.value)} /></div>
                </div>
                <div className="form-group"><label className="form-label">Special Instructions</label><textarea className="form-input" placeholder="Fragile items, access details..." value={form.notes} onChange={e=>update("notes",e.target.value)} rows={3} style={{ resize:"vertical" }} /></div>
                <button className="btn btn-primary" style={{ justifyContent:"center", padding:15, fontSize:16 }} onClick={handleSubmit}>Confirm Booking Request 🚛</button>
              </div>
            </div>
            <div>
              <div className="card" style={{ padding:22, marginBottom:16 }}>
                <h4 style={{ fontFamily:"var(--font-display)", fontWeight:700, marginBottom:14, fontSize:16 }}>Booking Summary</h4>
                {[{ label:"Service", value:SERVICES.find(s=>s.id===form.service)?.name||"—" },{ label:"From", value:form.from||"—" },{ label:"To", value:form.to||"—" },{ label:"Size", value:form.size||"—" },{ label:"Date", value:form.moveDate||"—" }].map(r=>(
                  <div key={r.label} style={{ display:"flex", justifyContent:"space-between", paddingBottom:10, marginBottom:10, borderBottom:"1px solid var(--gray-100)", fontSize:14 }}>
                    <span style={{ color:"var(--gray-400)", fontWeight:500 }}>{r.label}</span>
                    <span style={{ fontWeight:600, color:"var(--navy)" }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding:22 }}>
                <h4 style={{ fontFamily:"var(--font-display)", fontWeight:700, marginBottom:12, fontSize:15 }}>✅ Included Free</h4>
                {["Professional packing","Loading & unloading","Door-to-door transport","Basic transit insurance","Dedicated move manager"].map(f=>(
                  <div key={f} className="service-feature" style={{ marginBottom:8 }}>{f}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <Footer setPage={setPage} />
    </>
  );
}

function TrackingPage({ setPage }) {
  const [trackId, setTrackId] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const MOCK_TRACKS = {
    "RK-1001":{ customer:"Amit Kumar", from:"Ranchi", to:"Patna", service:"Household Shifting", status:"delivered", date:"Jan 18, 2024", activeStep:4, vehicle:"JH 01 AB 1234" },
    "RK-1002":{ customer:"Sunita Devi", from:"Darbhanga", to:"Delhi", service:"Office Relocation", status:"transit", date:"Jan 19, 2024", activeStep:2, vehicle:"BR 01 CD 5678" },
    "RK-1003":{ customer:"Rohit Singh", from:"Ranchi", to:"Mumbai", service:"Furniture Moving", status:"confirmed", date:"Jan 20, 2024", activeStep:1, vehicle:"JH 05 EF 9012" },
  };
  const TRACK_STEPS = [
    { label:"Order Confirmed", icon:"✅", desc:"Booking received and confirmed" },
    { label:"Packing Started", icon:"📦", desc:"Team arrived and started packing" },
    { label:"In Transit", icon:"🚛", desc:"Your belongings are on the way" },
    { label:"Out for Delivery", icon:"📍", desc:"Vehicle is near your location" },
    { label:"Delivered", icon:"🏠", desc:"All items delivered successfully!" },
  ];
  const handleTrack = () => { const r=MOCK_TRACKS[trackId.toUpperCase()]; if(r){setResult(r);setNotFound(false);}else{setResult(null);setNotFound(true);} };
  return (
    <>
      <div style={{ background:"linear-gradient(135deg,var(--navy),#1A3A7A)", padding:"120px 0 64px" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <div className="section-tag" style={{ background:"rgba(255,255,255,0.1)", color:"white" }}>📡 Live Tracking</div>
          <h1 className="section-title" style={{ color:"white" }}>Track Your Shipment</h1>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:17 }}>Enter your booking ID to get live status updates</p>
        </div>
      </div>
      <div className="section-sm">
        <div className="container">
          <div style={{ maxWidth:640, margin:"0 auto" }}>
            <div className="card" style={{ padding:"32px 28px", marginBottom:24 }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:20, marginBottom:6 }}>Enter Your Booking ID</h3>
              <p style={{ color:"var(--gray-400)", fontSize:14, marginBottom:18 }}>Format: RK-XXXX (try RK-1002)</p>
              <div style={{ display:"flex", gap:12 }}>
                <input className="form-input" placeholder="Enter booking ID" value={trackId} onChange={e=>setTrackId(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleTrack()} style={{ flex:1 }} />
                <button className="btn btn-secondary" onClick={handleTrack}>🔍 Track</button>
              </div>
              <div style={{ marginTop:12, display:"flex", gap:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:13, color:"var(--gray-400)" }}>Try:</span>
                {Object.keys(MOCK_TRACKS).map(id=>(
                  <span key={id} onClick={()=>setTrackId(id)} style={{ fontSize:13, color:"var(--blue)", cursor:"pointer", fontWeight:600, background:"var(--blue-pale)", padding:"3px 10px", borderRadius:50 }}>{id}</span>
                ))}
              </div>
            </div>
            {notFound && (
              <div className="card" style={{ padding:32, textAlign:"center" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
                <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, marginBottom:8 }}>Booking ID Not Found</h3>
                <p style={{ color:"var(--gray-600)" }}>Please check and try again, or call us at {COMPANY.phone}</p>
              </div>
            )}
            {result && (
              <div className="card" style={{ padding:"28px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
                  <div>
                    <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:20 }}>{trackId.toUpperCase()}</div>
                    <div style={{ color:"var(--gray-400)", fontSize:14, marginTop:4 }}>{result.service} • {result.date}</div>
                    <div style={{ color:"var(--gray-600)", fontSize:14, marginTop:4 }}>🚛 {result.vehicle}</div>
                  </div>
                  <span style={{ background: result.status==="delivered"?"#D1FAE5":result.status==="transit"?"#F3E8FF":"#DBEAFE", color: result.status==="delivered"?"#059669":result.status==="transit"?"#7C3AED":"#2563EB", padding:"8px 18px", borderRadius:50, fontWeight:700, fontSize:13 }}>{result.status.charAt(0).toUpperCase()+result.status.slice(1)}</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:16, alignItems:"center", background:"var(--gray-50)", borderRadius:12, padding:"16px 20px", marginBottom:24 }}>
                  <div><div style={{ fontSize:12, color:"var(--gray-400)", fontWeight:600, textTransform:"uppercase" }}>From</div><div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:16, marginTop:4 }}>📍 {result.from}</div></div>
                  <div style={{ fontSize:24, animation:"truck-move 2s ease-in-out infinite" }}>🚛</div>
                  <div style={{ textAlign:"right" }}><div style={{ fontSize:12, color:"var(--gray-400)", fontWeight:600, textTransform:"uppercase" }}>To</div><div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:16, marginTop:4 }}>🏠 {result.to}</div></div>
                </div>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:15, marginBottom:18 }}>Delivery Progress</div>
                <div className="tracking-steps">
                  {TRACK_STEPS.map((s,i) => (
                    <div key={i} className={`tracking-step ${i<result.activeStep?"done":i===result.activeStep?"active":""}`}>
                      <div className="step-dot">{i<result.activeStep?"✓":s.icon}</div>
                      <div className="step-info">
                        <div className="step-label" style={{ color:i>result.activeStep?"var(--gray-400)":undefined }}>{s.label}</div>
                        <div className={`step-meta ${i===result.activeStep?"active-meta":""}`}>{i===result.activeStep?"In Progress...":i<result.activeStep?"Completed":"Upcoming"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer setPage={setPage} />
    </>
  );
}

function ContactPage({ setPage }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);
  const update = (k,v) => setForm(f => ({...f,[k]:v}));
  const handleSubmit = () => {
    if(!form.name||!form.phone){ setToast({msg:"Please fill name and phone",type:"error"}); return; }
    setSubmitted(true); setToast({msg:"Message sent! We'll call you soon.",type:"success"});
  };
  return (
    <>
      <div style={{ background:"linear-gradient(135deg,var(--navy),#1A3A7A)", padding:"120px 0 64px" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <div className="section-tag" style={{ background:"rgba(255,255,255,0.1)", color:"white" }}>Get in Touch</div>
          <h1 className="section-title" style={{ color:"white" }}>We're Here to Help</h1>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:17 }}>Call, WhatsApp or email — we respond within 1 hour</p>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:30, fontWeight:800, marginBottom:10 }}>Contact {COMPANY.name}</h2>
              <p style={{ color:"var(--gray-600)", fontSize:16, marginBottom:32 }}>Our team is available 7 days a week.</p>
              {[
                { icon:"📞", title:"Call Us", lines:[COMPANY.phone,"Available: 8 AM – 8 PM, 7 days"] },
                { icon:"💬", title:"WhatsApp", lines:["Quick response on WhatsApp","Send us your requirements"] },
                { icon:"✉️", title:"Email", lines:[COMPANY.email] },
                { icon:"📍", title:"Office Address", lines:[COMPANY.address, COMPANY.address2] },
              ].map((item,i) => (
                <div key={i} style={{ display:"flex", gap:16, marginBottom:28 }}>
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:16, marginBottom:6 }}>{item.title}</div>
                    {item.lines.map(l=><div key={l} style={{ fontSize:14.5, color:"var(--gray-600)" }}>{l}</div>)}
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <button className="btn btn-secondary" onClick={() => window.open(`https://wa.me/${COMPANY.whatsapp}`,"_blank")}>💬 WhatsApp Now</button>
                <button className="btn btn-outline" onClick={() => setPage("quote")}>Get Free Quote</button>
              </div>
            </div>
            <div className="card" style={{ padding:"32px 28px" }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, marginBottom:22 }}>Send Us a Message</h3>
              {submitted ? (
                <div style={{ textAlign:"center", padding:"40px 0" }}>
                  <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
                  <h4 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:20 }}>Message Received!</h4>
                  <p style={{ color:"var(--gray-600)", marginTop:8 }}>We will call you back within 1 hour.</p>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div className="form-group"><label className="form-label">Your Name *</label><input className="form-input" value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Full name" /></div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <div className="form-group"><label className="form-label">Phone *</label><input className="form-input" type="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="+91 XXXXX XXXXX" /></div>
                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@email.com" /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Service Needed</label><select className="form-input form-select" value={form.service} onChange={e=>update("service",e.target.value)}><option value="">Select service</option>{SERVICES.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={4} value={form.message} onChange={e=>update("message",e.target.value)} placeholder="Tell us your requirements..." style={{ resize:"vertical" }} /></div>
                  <button className="btn btn-primary" style={{ justifyContent:"center", padding:14 }} onClick={handleSubmit}>Send Message ✈️</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <Footer setPage={setPage} />
    </>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <img src="/logo.png" alt="Rkoshi Logo" style={{ width:36, height:36, borderRadius:8, objectFit:"contain" }} />
              <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:16, color:"white" }}>Rkoshi Packers & Movers</span>
            </div>
            <p style={{ fontSize:14, lineHeight:1.75, maxWidth:260 }}>{COMPANY.fullName}. Serving Ranchi, Darbhanga and across India with safe and affordable relocation.</p>
            <div style={{ marginTop:16 }}>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:4 }}>📞 {COMPANY.phone}</div>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:4 }}>✉️ {COMPANY.email}</div>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13 }}>📍 {COMPANY.address}</div>
            </div>
          </div>
          <div>
            <div className="footer-heading">Services</div>
            {SERVICES.map(s=><a key={s.id} className="footer-link" onClick={()=>setPage("services")}>{s.name}</a>)}
          </div>
          <div>
            <div className="footer-heading">Quick Links</div>
            {[{l:"Home",k:"home"},{l:"Services",k:"services"},{l:"Gallery",k:"gallery"},{l:"Get Quote",k:"quote"},{l:"Book a Move",k:"booking"},{l:"Track Shipment",k:"tracking"},{l:"Contact Us",k:"contact"}].map(i=><a key={i.k} className="footer-link" onClick={()=>setPage(i.k)}>{i.l}</a>)}
          </div>
          <div>
            <div className="footer-heading">We Serve</div>
            {["Ranchi","Darbhanga","Patna","Dhanbad","Jamshedpur","Bokaro","Muzaffarpur","Delhi","Mumbai","Bangalore"].map(c=><a key={c} className="footer-link">{c}</a>)}
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <span>© 2024 {COMPANY.fullName}. All rights reserved.</span>
          <div style={{ display:"flex", gap:20 }}>
            {["Privacy Policy","Terms of Service","Refund Policy"].map(l=><a key={l} className="footer-link" style={{ marginBottom:0, fontSize:13 }}>{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => { const h=document.documentElement.scrollHeight-window.innerHeight; if(h>0) setScrollProgress((window.scrollY/h)*100); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { window.scrollTo({top:0,behavior:"smooth"}); }, [page]);
  return (
    <>
      <GlobalStyles />
      <div className="progress-bar" style={{ width:scrollProgress+"%" }}></div>
      <Navbar page={page} setPage={setPage} />
      <main>
        {page==="home" && <HomePage setPage={setPage} />}
        {page==="services" && <ServicesPage setPage={setPage} />}
        {page==="gallery" && <GalleryPage setPage={setPage} />}
        {page==="quote" && <QuotePage setPage={setPage} />}
        {page==="booking" && <BookingPage setPage={setPage} />}
        {page==="tracking" && <TrackingPage setPage={setPage} />}
        {page==="contact" && <ContactPage setPage={setPage} />}
      </main>
      <div className="whatsapp-float" onClick={() => window.open(`https://wa.me/${COMPANY.whatsapp}?text=Hello Rkoshi Packers! I need help.`,"_blank")}>💬</div>
    </>
  );
}
