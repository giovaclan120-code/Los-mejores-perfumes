import React, { useMemo, useState } from 'react'
import { Search, Menu, X, ArrowUpRight, Sparkles, Droplets, Sun, Wind, BookOpen, ChevronDown } from 'lucide-react'
import { perfumes, brands, articles } from './data'

const photo = (id, w=900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

function Header() {
  const [open,setOpen] = useState(false)
  const links = [['Inicio','#inicio'],['Verano 2026','#top10'],['Perfumería','#universo'],['Marcas','#marcas'],['Guía','#guia']]
  return <header className="header">
    <a className="logo" href="#inicio"><span className="logo-mark">W</span><span>THE WORLD <i>OF PERFUMES</i></span></a>
    <button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-label="Abrir menú">{open?<X/>:<Menu/>}</button>
    <nav className={open?'nav open':'nav'}>{links.map(([t,h])=><a key={h} href={h} onClick={()=>setOpen(false)}>{t}</a>)}</nav>
    <a className="header-cta" href="#top10">Explorar <ArrowUpRight size={15}/></a>
  </header>
}

function Hero() {
  return <section className="hero" id="inicio">
    <div className="hero-image" />
    <div className="hero-content">
      <div className="eyebrow"><span/> UNA MIRADA AL ARTE DE LA PERFUMERÍA</div>
      <h1>El aroma<br/>también <em>cuenta</em><br/>una historia.</h1>
      <p>Un espacio para descubrir fragancias, explorar sus notas y encontrar aromas que acompañen cada momento.</p>
      <a className="gold-button" href="#top10">Descubrir selección <ArrowUpRight size={17}/></a>
      <div className="hero-foot"><span>01 — 05</span><span className="line"/><span>FRAGANCIAS · CULTURA · ESTILO</span></div>
    </div>
    <div className="hero-caption">SCENT IS A FORM OF MEMORY</div>
  </section>
}

function SectionHeading({kicker,title,desc}) {
  return <div className="section-heading"><div className="eyebrow">{kicker}</div><h2>{title}</h2>{desc&&<p>{desc}</p>}</div>
}

function TopTen() {
  const [query,setQuery] = useState('')
  const [filter,setFilter] = useState('Todos')
  const shown = useMemo(()=>perfumes.filter(p=>(`${p.name} ${p.brand} ${p.family}`.toLowerCase().includes(query.toLowerCase()))&&(filter==='Todos'||p.family.toLowerCase().includes(filter.toLowerCase()))),[query,filter])
  return <section className="section top-section" id="top10">
    <div className="section-topline"><span>SELECCIÓN EDITORIAL / 2026</span><span>02 — THE SUMMER EDIT</span></div>
    <SectionHeading kicker="EL ESPECIAL DE TEMPORADA" title={<>10 fragancias para<br/><em>los días de sol.</em></>} desc="Una selección de perfiles frescos, cítricos, acuáticos y versátiles para acompañar el calor. El orden es editorial, no un ranking oficial."/>
    <div className="filters">
      <label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar perfume o marca..."/></label>
      <div className="filter-buttons">{['Todos','Cítrico','Acuático','Amaderado'].map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div>
    </div>
    <div className="perfume-grid">
      {shown.map(p=><article className="perfume-card" key={p.rank}>
        <div className="perfume-image"><img src={photo(p.image,700)} alt={`Imagen ilustrativa de ${p.name}`} loading="lazy"/><span className="rank">Nº {String(p.rank).padStart(2,'0')}</span><span className="image-tag">SUMMER EDIT</span></div>
        <div className="perfume-info"><div className="brand-name">{p.brand}</div><h3>{p.name}</h3><div className="family">{p.family}</div><p>{p.why}</p>
          <div className="note-row"><span>NOTAS</span><b>{p.notes}</b></div>
          <div className="specs"><div><small>DURACIÓN</small><strong>{p.lasting}</strong></div><div><small>CARÁCTER</small><strong>{p.vibe}</strong></div></div>
        </div>
      </article>)}
    </div>
    {shown.length===0&&<div className="empty">No encontramos fragancias con esa búsqueda. Prueba con otro nombre o filtro.</div>}
    <p className="disclaimer">Las sensaciones y el rendimiento pueden variar según la piel, el clima y la cantidad aplicada. Las imágenes son ilustrativas.</p>
  </section>
}

function Universe() {
  return <section className="universe section" id="universo">
    <div className="universe-photo"><img src={photo('photo-1595425970377-c9703cf48b6d',1200)} alt="Frasco de perfume en una composición editorial" loading="lazy"/><div className="photo-note">THE ART OF SCENT <span>EST. 2026</span></div></div>
    <div className="universe-copy"><div className="eyebrow">MÁS QUE UN AROMA</div><h2>Un universo<br/>en cada <em>frasco.</em></h2><p>La perfumería combina arte, ciencia y memoria. Cada composición se construye con materias primas que evolucionan sobre la piel y crean una experiencia personal.</p>
      <div className="universe-points"><div><Droplets/><span><b>Composición</b><small>El equilibrio entre materias primas.</small></span></div><div><Wind/><span><b>Evolución</b><small>Un aroma que cambia con el tiempo.</small></span></div><div><Sparkles/><span><b>Identidad</b><small>Una firma olfativa para cada persona.</small></span></div></div>
    </div>
  </section>
}

function Brands() {
  return <section className="section brands-section" id="marcas">
    <SectionHeading kicker="CASAS DE PERFUMERÍA" title={<>Nombres que dejan<br/><em>huella.</em></>} desc="Un recorrido por algunas casas y marcas que forman parte de la conversación perfumista."/>
    <div className="brand-grid">{brands.map(([name,desc,examples],i)=><article className="brand-card" key={name}><span className="brand-number">0{i+1}</span><div className="brand-symbol">{name.slice(0,1)}</div><h3>{name}</h3><p>{desc}</p><small>FRAGANCIAS DESTACADAS</small><b>{examples}</b></article>)}</div>
  </section>
}

function Guide() {
  const [active,setActive]=useState(0)
  return <section className="guide section" id="guia">
    <div className="guide-intro"><div className="eyebrow">CONOCE LO QUE LLEVAS</div><h2>La guía del<br/><em>perfume.</em></h2><p>Entender una fragancia hace que elegirla sea mucho más interesante. Estas son algunas claves para empezar.</p><a href="#faq" className="text-link">Explorar conceptos <ArrowUpRight size={16}/></a></div>
    <div className="guide-list">{articles.map(([title,body],i)=><div className={active===i?'guide-item expanded':'guide-item'} key={title}><button onClick={()=>setActive(active===i?-1:i)}><span>0{i+1}</span><b>{title}</b><ChevronDown size={18}/></button>{active===i&&<p>{body}</p>}</div>)}</div>
  </section>
}

function Footer() {
  return <footer className="footer" id="faq"><div className="footer-top"><a className="logo" href="#inicio"><span className="logo-mark">W</span><span>THE WORLD <i>OF PERFUMES</i></span></a><p>Explora el arte de encontrar tu aroma.</p><a href="#inicio" className="back-top">VOLVER ARRIBA ↑</a></div><div className="footer-bottom"><span>© 2026 THE WORLD OF PERFUMES</span><span>UNA REVISTA DIGITAL DE FRAGANCIAS</span><span>HECHO PARA LOS AMANTES DEL AROMA</span></div></footer>
}

export default function App() {
  return <><Header/><main><Hero/><TopTen/><Universe/><Brands/><Guide/><section className="quote"><span>“</span><p>El perfume es la forma más intensa<br/>del recuerdo.</p><small>THE WORLD OF PERFUMES</small></section></main><Footer/></>
}