import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, CalendarDays, Check, ChevronDown, Clock3, ExternalLink,
  Facebook, Instagram, MapPin, Menu as MenuIcon, Minus, Phone, Plus,
  Search, ShoppingBag, Star, Utensils, X
} from "lucide-react";
import "./styles.css";

type Category = "Breakfast" | "Starters" | "Main Course" | "Breads" | "Rice & Biryani" | "Desserts" | "Beverages";
type MenuItem = { id: number; name: string; category: Category; price: number; description: string; vegetarian: boolean; image: string; };

const CONFIG = {
  name: "VIMA",
  cuisine: "Indian",
  address: "ABC Street, Sikar, Rajasthan, India",
  phone: "9780400240",
  displayPhone: "97804 00240",
  open: "5:30 AM",
  close: "10:00 PM",
  mapQuery: "ABC Street, Sikar, Rajasthan, India",
  demo: true
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85",
  interior: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",

  // Dish-specific images. Each menu item uses its own matching image.
  aloo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/ALOO_PARATHA.jpg",
  chai: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Masala_Chai.jpg",
  paneer: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Paneer_tikka.jpg",
  dal: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Creamy_Lentils_%28Dal_Makhani%29_%282239000538%29.jpg",
  shahi: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Shahi_paneer.jpg",
  naan: "https://upload.wikimedia.org/wikipedia/commons/7/79/Butter_Naan.jpg",
  biryani: "https://upload.wikimedia.org/wikipedia/commons/3/30/Vegetable_Biryani.JPG",
  gulab: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Gulab_jamun.jpg",
  tandoori: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Tandoori_platter.jpg",
  jeera: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Jeera_Rice.jpg"
};

const MENU: MenuItem[] = [
  { id:1, name:"Aloo Paratha", category:"Breakfast", price:90, description:"Crisp wheat paratha with spiced potato filling, served with curd.", vegetarian:true, image:IMG.aloo },
  { id:2, name:"Masala Chai", category:"Beverages", price:40, description:"Fragrant Indian tea simmered with milk and warming spices.", vegetarian:true, image:IMG.chai },
  { id:3, name:"Paneer Tikka", category:"Starters", price:240, description:"Char-grilled paneer, peppers and onion with smoky tandoori spices.", vegetarian:true, image:IMG.paneer },
  { id:4, name:"Dal Makhani", category:"Main Course", price:220, description:"Slow-cooked black lentils finished with butter and cream.", vegetarian:true, image:IMG.dal },
  { id:5, name:"Shahi Paneer", category:"Main Course", price:260, description:"Paneer in a rich, mildly spiced tomato and cashew gravy.", vegetarian:true, image:IMG.shahi },
  { id:6, name:"Butter Naan", category:"Breads", price:60, description:"Soft tandoor-baked naan brushed with butter.", vegetarian:true, image:IMG.naan },
  { id:7, name:"Veg Biryani", category:"Rice & Biryani", price:200, description:"Aromatic basmati rice layered with seasonal vegetables and herbs.", vegetarian:true, image:IMG.biryani },
  { id:8, name:"Gulab Jamun", category:"Desserts", price:80, description:"Warm milk dumplings soaked in fragrant cardamom syrup.", vegetarian:true, image:IMG.gulab },
  { id:9, name:"Tandoori Platter", category:"Starters", price:420, description:"Illustrative mixed vegetarian tandoor selection for the demo menu.", vegetarian:true, image:IMG.tandoori },
  { id:10, name:"Jeera Rice", category:"Rice & Biryani", price:150, description:"Basmati rice tempered with cumin and whole spices.", vegetarian:true, image:IMG.jeera }
];

const CATS = ["All", "Breakfast", "Starters", "Main Course", "Breads", "Rice & Biryani", "Desserts", "Beverages"] as const;

function whatsapp(message: string) {
  window.open(`https://wa.me/91${CONFIG.phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}
function maps() {
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapQuery)}`, "_blank", "noopener,noreferrer");
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [category, setCategory] = useState<(typeof CATS)[number]>("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = useMemo(() => MENU.filter(i =>
    (category === "All" || i.category === category) &&
    `${i.name} ${i.description}`.toLowerCase().includes(search.toLowerCase())
  ), [category, search]);

  const cartItems = MENU.filter(i => cart[i.id]).map(i => ({...i, qty: cart[i.id]}));
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  function add(id: number) { setCart(c => ({...c, [id]: (c[id] || 0) + 1})); }
  function remove(id: number) {
    setCart(c => { const n = {...c}; if ((n[id] || 0) <= 1) delete n[id]; else n[id]--; return n; });
  }
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setMobileOpen(false);
  }

  return (
    <div>
      <div className="demo-bar">DEMO WEBSITE • Sample content, prices, reviews, location and transactions are illustrative only.</div>

      <header className="nav">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="VIMA home">
          <span className="brand-mark">V</span><span><b>VIMA</b><small>INDIAN DINING</small></span>
        </button>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X/> : <MenuIcon/>}
        </button>
        <nav className={mobileOpen ? "nav-links open" : "nav-links"}>
          {["home","about","menu","gallery","reviews","contact"].map(x =>
            <button key={x} onClick={() => scrollTo(x)}>{x === "home" ? "Home" : x[0].toUpperCase()+x.slice(1)}</button>
          )}
          <button className="nav-cta" onClick={() => scrollTo("reservation")}><CalendarDays size={16}/> Reserve</button>
          <button className="nav-cart" onClick={() => setCartOpen(true)}><ShoppingBag size={16}/> Cart ({Object.values(cart).reduce((a,b)=>a+b,0)})</button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <img src={IMG.hero} alt="Illustrative warm Indian restaurant interior for the VIMA demo" />
          <div className="hero-overlay"/>
          <div className="hero-content">
            <span className="eyebrow">VIMA • INDIAN RESTAURANT DEMO</span>
            <h1>Where Indian Tradition Meets <em>Memorable Dining</em></h1>
            <p>A polished demonstration of a traditional Indian dining experience in Sikar, Rajasthan.</p>
            <div className="actions">
              <button className="btn gold" onClick={() => scrollTo("menu")}>Explore Menu <ArrowRight size={17}/></button>
              <button className="btn outline" onClick={() => scrollTo("reservation")}>Reserve a Table</button>
              <button className="btn whatsapp" onClick={() => whatsapp("Hello VIMA, I would like to make a demo enquiry.")}>WhatsApp Booking</button>
            </div>
          </div>
          <div className="hero-hours"><Clock3 size={17}/> Open daily demo hours: {CONFIG.open} — {CONFIG.close}</div>
        </section>

        <section className="notice">
          <strong>DEMO NOTICE:</strong> This website uses sample restaurant details, sample menu prices, sample testimonials and an illustrative location. Replace them before production launch.
        </section>

        <section id="about" className="section split">
          <div className="photo-card"><img src={IMG.interior} alt="Illustrative traditional Indian restaurant interior" /></div>
          <div>
            <span className="eyebrow dark">ABOUT VIMA</span>
            <h2>A warm table for timeless Indian flavours.</h2>
            <p>This is sample demo copy created to demonstrate how VIMA could present its dining story. No owner, founding date, heritage claim or real-world history is being asserted.</p>
            <p>The visual language combines warm ivory surfaces, deep maroon, royal gold, arches and subtle jaali-inspired patterns.</p>
            <div className="feature-row"><div><Utensils/><b>Indian Cuisine</b><span>Demo menu experience</span></div><div><Clock3/><b>5:30 AM — 10 PM</b><span>Configurable hours</span></div></div>
          </div>
        </section>

        <section id="menu" className="section menu-section">
          <div className="section-heading"><div><span className="eyebrow dark">THE MENU</span><h2>Flavours worth gathering around.</h2></div><button className="btn dark-btn" onClick={() => setCartOpen(true)}>View Cart <ShoppingBag size={17}/></button></div>
          <div className="menu-tools">
            <div className="search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search dishes..." aria-label="Search dishes"/></div>
            <div className="filters">{CATS.map(c => <button className={category===c?"active":""} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          </div>
          <p className="demo-label">ALL DISHES AND PRICES BELOW ARE ILLUSTRATIVE DEMO CONTENT.</p>
          <div className="menu-grid">
            {filtered.map(item => <article className="menu-card" key={item.id}>
              <img src={item.image} loading="lazy" alt={`${item.name} illustrative demo food image`} />
              <div className="menu-body"><div className="tag">{item.category}</div><h3>{item.name}</h3><p>{item.description}</p><div className="menu-bottom"><strong>₹{item.price}</strong><button onClick={()=>add(item.id)}><Plus size={16}/> Add</button></div></div>
            </article>)}
          </div>
          {!filtered.length && <div className="empty">No demo dishes match your search. Try another category or keyword.</div>}
        </section>

        <section className="feature-banner">
          <div><span className="eyebrow">DEMO ONLINE ORDERING</span><h2>Order for delivery or takeaway.</h2><p>Add dishes to your cart, choose a service type, and review a mock checkout.</p></div>
          <button className="btn gold" onClick={()=>setCartOpen(true)}>Start an Order <ArrowRight size={17}/></button>
        </section>

        <section id="reservation" className="section reservation">
          <div><span className="eyebrow dark">TABLE RESERVATIONS</span><h2>Plan your next gathering.</h2><p className="muted">This form creates a demo request. It does not check live availability or confirm a real table.</p>
          <Reservation onWhatsApp={whatsapp}/></div>
        </section>

        <section id="gallery" className="section">
          <div className="section-heading"><div><span className="eyebrow dark">GALLERY</span><h2>Illustrative VIMA moments.</h2></div></div>
          <div className="gallery">
            {[IMG.interior, IMG.aloo, IMG.paneer, IMG.biryani, IMG.gulab, IMG.hero].map((src,i)=>
              <button key={src+i} onClick={()=>setLightbox(src)} className={`gallery-item g${i}`}><img src={src} loading="lazy" alt="Illustrative AI-style restaurant or Indian food demo visual"/><span>Demo visual</span></button>
            )}
          </div>
        </section>

        <section id="reviews" className="section reviews">
          <span className="eyebrow dark">CUSTOMER REVIEWS</span><h2>DEMO REVIEWS — NOT REAL CUSTOMER TESTIMONIALS</h2>
          <div className="review-grid">
            {[
              ["“A beautifully presented demo dining experience.”","Sample Guest"],
              ["“The menu layout makes browsing simple and inviting.”","Demo Customer"],
              ["“Warm colours and clear ordering flow.”","Illustrative Reviewer"]
            ].map(([q,n])=><article key={n}><div className="stars">{[1,2,3,4,5].map(x=><Star key={x} fill="currentColor" size={15}/>)}</div><p>{q}</p><small>{n} • DEMO</small></article>)}
          </div>
          <a className="google-link" href="https://www.google.com/maps/search/?api=1&query=VIMA+Sikar+Rajasthan" target="_blank" rel="noreferrer">View on Google Maps search <ExternalLink size={15}/></a>
          <p className="tiny">The link above is a search link, not a verified VIMA business listing or review URL.</p>
        </section>

        <section id="contact" className="section contact-grid">
          <div><span className="eyebrow dark">LOCATION & CONTACT</span><h2>Find your way to VIMA.</h2><p>This is a demo destination and may not identify actual restaurant premises.</p>
          <div className="contact-list"><div><MapPin/><span><b>Address</b>{CONFIG.address}</span></div><div><Phone/><span><b>Phone</b>{CONFIG.displayPhone}</span></div><div><Clock3/><span><b>Hours</b>{CONFIG.open} — {CONFIG.close}</span></div></div>
          <div className="actions"><a className="btn dark-btn" href={`tel:+91${CONFIG.phone}`}>Call Now</a><button className="btn whatsapp" onClick={()=>whatsapp("Hello VIMA, I have a general enquiry.")}>WhatsApp</button><button className="btn light-btn" onClick={maps}>Get Directions</button></div></div>
          <div className="map-card"><div className="map-placeholder"><MapPin size={40}/><b>DEMO LOCATION</b><span>{CONFIG.address}</span><button onClick={maps}>Open Google Maps Search <ExternalLink size={14}/></button></div></div>
        </section>
      </main>

      <footer><div className="footer-brand"><span className="brand-mark">V</span><div><b>VIMA</b><small>INDIAN DINING • DEMO</small></div></div><div><b>Quick Links</b><button onClick={()=>scrollTo("menu")}>Menu</button><button onClick={()=>scrollTo("reservation")}>Reservations</button><button onClick={()=>scrollTo("contact")}>Contact</button></div><div><b>Social</b><span className="social"><Instagram/><Facebook/></span><small>Demo placeholders</small></div><div><b>Hours</b><span>{CONFIG.open} — {CONFIG.close}</span><span>Weekly closing day: not specified</span></div><p className="copyright">© {new Date().getFullYear()} VIMA Demo. Replace demo details before launch.</p></footer>

      <button className="floating-wa" onClick={()=>whatsapp("Hello VIMA, I would like a general enquiry.")} aria-label="WhatsApp VIMA">WA</button>

      {cartOpen && <Cart items={cartItems} subtotal={subtotal} onAdd={add} onRemove={remove} onClose={()=>setCartOpen(false)} onCheckout={()=>{setCartOpen(false);setCheckoutOpen(true)}}/>}
      {checkoutOpen && <Checkout items={cartItems} subtotal={subtotal} onClose={()=>setCheckoutOpen(false)} onWhatsApp={whatsapp}/>}
      {lightbox && <div className="lightbox" onClick={()=>setLightbox(null)}><button aria-label="Close"><X/></button><img src={lightbox} alt="Enlarged illustrative demo visual"/></div>}
    </div>
  );
}

function Reservation({onWhatsApp}:{onWhatsApp:(s:string)=>void}) {
  const [done,setDone]=useState(false);
  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); const f=new FormData(e.currentTarget);
    const msg=`Hello VIMA, I want a demo table booking request.%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0ADate: ${f.get("date")}%0ATime: ${f.get("time")}%0AGuests: ${f.get("guests")}%0ARequests: ${f.get("requests")||"None"}`;
    onWhatsApp(decodeURIComponent(msg)); setDone(true);
  }
  return <form className="form-card" onSubmit={submit}>{done && <div className="success"><Check/> Demo request prepared. WhatsApp will open after your click; no reservation is confirmed.</div>}
    <div className="form-grid"><label>Name<input name="name" required placeholder="Your name"/></label><label>Phone<input name="phone" required inputMode="tel" placeholder="10-digit phone"/></label><label>Date<input name="date" required type="date"/></label><label>Time<input name="time" required type="time" min="05:30" max="22:00"/></label><label>Guests<select name="guests" defaultValue="2">{[1,2,3,4,5,6,7,8,9,10].map(x=><option key={x}>{x}</option>)}</select></label><label>Special requests<input name="requests" placeholder="Optional"/></label></div>
    <button className="btn gold" type="submit">Prepare WhatsApp Demo Request <ArrowRight size={17}/></button>
  </form>;
}

function Cart({items,subtotal,onAdd,onRemove,onClose,onCheckout}:{items:(MenuItem&{qty:number})[],subtotal:number,onAdd:(n:number)=>void,onRemove:(n:number)=>void,onClose:()=>void,onCheckout:()=>void}) {
  return <div className="drawer-backdrop" onClick={onClose}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h2>Your Demo Cart</h2><button onClick={onClose}><X/></button></div><p className="demo-label">DEMO CART — NO REAL ORDER IS PLACED.</p>{!items.length?<div className="empty">Your cart is empty. Add a dish from the menu.</div>:<>{items.map(i=><div className="cart-row" key={i.id}><img src={i.image} alt=""/><div><b>{i.name}</b><small>₹{i.price} each</small><div className="qty"><button onClick={()=>onRemove(i.id)}><Minus/></button><span>{i.qty}</span><button onClick={()=>onAdd(i.id)}><Plus/></button></div></div><strong>₹{i.price*i.qty}</strong></div>)}<div className="total"><span>Subtotal</span><b>₹{subtotal}</b></div><button className="btn gold full" onClick={onCheckout}>Continue to Demo Checkout</button></>}</aside></div>;
}

function Checkout({items,subtotal,onClose,onWhatsApp}:{items:(MenuItem&{qty:number})[],subtotal:number,onClose:()=>void,onWhatsApp:(s:string)=>void}) {
  const [mode,setMode]=useState<"delivery"|"takeaway">("delivery");
  const [state,setState]=useState<"idle"|"pending"|"success">("idle");
  function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault(); setState("pending"); setTimeout(()=>setState("success"),900);}
  if(state==="success") return <div className="modal-backdrop"><div className="modal"><Check className="success-icon"/><h2>Demo payment successful</h2><p>No real payment was processed. No card details were collected.</p><button className="btn gold full" onClick={onClose}>Close Demo Checkout</button></div></div>;
  return <div className="modal-backdrop"><div className="modal wide"><button className="modal-close" onClick={onClose}><X/></button><span className="eyebrow dark">DEMO / TEST PAYMENT</span><h2>Checkout</h2><div className="payment-warning">NO REAL MONEY WILL BE CHARGED. This demo uses a simulated payment response.</div>
    <div className="service-toggle"><button className={mode==="delivery"?"active":""} onClick={()=>setMode("delivery")}>Delivery</button><button className={mode==="takeaway"?"active":""} onClick={()=>setMode("takeaway")}>Takeaway</button></div>
    <form onSubmit={submit} className="checkout-form"><label>Name<input required placeholder="Customer name"/></label><label>Phone<input required inputMode="tel" placeholder="10-digit phone"/></label>{mode==="delivery"&&<label>Delivery address<textarea required rows={3} placeholder="Demo delivery address"/></label>}<label>Special instructions<textarea rows={2} placeholder="Optional"/></label>
      <div className="summary"><span>Subtotal</span><b>₹{subtotal}</b><small>Taxes and delivery charges are not added because no production rates were supplied.</small></div>
      <button disabled={state==="pending"} className="btn gold full" type="submit">{state==="pending"?"Processing demo payment…":"Pay ₹"+subtotal+" (Demo)"}</button>
      <button type="button" className="btn light-btn full" onClick={()=>onWhatsApp(`Hello VIMA, I want to place a demo ${mode} order. Subtotal: ₹${subtotal}.`)}>Prepare WhatsApp Demo Order</button>
    </form>
  </div></div>;
}

createRoot(document.getElementById("root")!).render(<App />);
