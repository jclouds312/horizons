const CATEGORY_ORDER = [
  { name: "Electrónica & computación", slug: "electronica-computacion" },
  { name: "Moda & calzado", slug: "moda-calzado" },
  { name: "Hogar & cocina", slug: "hogar-cocina" },
  { name: "Belleza & cuidado personal", slug: "belleza-cuidado-personal" },
  { name: "Deportes & aire libre", slug: "deportes-aire-libre" },
  { name: "Juguetes, bebés & niños", slug: "juguetes-bebes-ninos" },
  { name: "Automotriz & motos", slug: "automotriz-motos" },
  { name: "Construcción & servicios", slug: "construccion-servicios" },
  { name: "Jardinería & exterior", slug: "jardineria-exterior" },
  { name: "Herramientas & máquinas", slug: "herramientas-maquinas" },
];

const KEYWORDS = {
  "electronica-computacion": [
    "smartphone","telefono","iphone","android","tablet","notebook","laptop","pc","aio",
    "monitor","impresora","scanner","ssd","hdd","router","wi fi","wifi",
    "teclado","mouse","auricular","parlante","consola","gaming","cargador","cable","usb"
  ],
  "moda-calzado": [
    "remera","camisa","jean","pantalon","abrigo","vestido","pollera","zapatilla","bota",
    "sandalia","cartera","mochila","cinturon","gorra"
  ],
  "hogar-cocina": [
    "licuadora","cafetera","microondas","horno","aspiradora","organizador","estante",
    "almohada","sabana","lampara","vela","vajilla","decoracion","deco"
  ],
  "belleza-cuidado-personal": [
    "maquillaje","base","labial","serum","crema","shampoo","acondicionador",
    "fragancia","perfume","secador","planchita","barbero","afeitadora"
  ],
  "deportes-aire-libre": [
    "pesas","mancuerna","bici","bicicleta","casco","carpa","bolsa de dormir",
    "snorkel","balon","pelota","raqueta","running","trekking","banda elastica"
  ],
  "juguetes-bebes-ninos": [
    "juguete","didactico","lego","bloque","muneco","peluche","patinete","patin",
    "cochecito","butaca","biberon","panal","juego de mesa","rompecabezas"
  ],
  "automotriz-motos": [
    "auto","automotor","moto","repuesto","filtro","bujia","pastilla de freno",
    "amortiguador","llanta","neumatico","aceite","multimedia","estereo"
  ],
  "construccion-servicios": [
    "cemento","arena","yeso","placa","durlock","pintura","esmalte","cable","disyuntor",
    "cano","llave inglesa","servicio de albanil","servicio de electricista","servicio de plomero",
    "servicio de pintor","montaje","ferreteria"
  ],
  "jardineria-exterior": [
    "planta","maceta","sustrato","semilla","manguera","riego","aspersor","parrilla",
    "bbq","reposera","pergola","piscina","inflable","huerta"
  ],
  "herramientas-maquinas": [
    "taladro","amoladora","atornillador","caladora","soldadora","compresor","neumatica",
    "multimetro","nivel laser","banco de trabajo","sierra","lijadora"
  ],
};

const norm = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function productText(p) {
  const parts = [];
  parts.push(p.name || "");
  if (p.description) parts.push(p.description);
  if (p.brand) parts.push(p.brand);
  if (p.attributes) {
    for (const [k, v] of Object.entries(p.attributes)) {
      parts.push(String(k), String(v));
    }
  }
  return norm(parts.join(" "));
}

function scoreForCategory(nText, slug) {
  const kws = KEYWORDS[slug] || [];
  if (!kws.length) return 0;
  let matches = 0;
  for (const kw of kws) {
    const needle = kw.replace(/\s+/g, " ").trim();
    if (needle && nText.includes(needle)) matches++;
  }
  return matches / Math.min(kws.length, 20);
}

function classify(p) {
  const text = productText(p);
  let best = null;

  for (const { slug } of CATEGORY_ORDER) {
    const score = scoreForCategory(text, slug);
    if (score > 0 && (!best || score > best.score)) {
      best = { slug, score };
    }
  }

  if (!best) {
    const tech = ["cable","usb","hdmi","bluetooth","adaptador","cargador","fuente"];
    const anyTech = tech.some(t => text.includes(t));
    if (anyTech) {
      return {
        name: "Electrónica & computación",
        slug: "electronica-computacion",
        relevanceScore: 0.1,
      };
    }
    return null;
  }

  const cat = CATEGORY_ORDER.find(c => c.slug === best.slug);
  return { name: cat.name, slug: cat.slug, relevanceScore: +best.score.toFixed(4) };
}

function cmpItems(a, b) {
  if (a.relevanceScore !== b.relevanceScore) return b.relevanceScore - a.relevanceScore;
  const sa = a.soldCount ?? 0, sb = b.soldCount ?? 0;
  if (sa !== sb) return sb - sa;
  const ra = a.rating ?? 0, rb = b.rating ?? 0;
  if (ra !== rb) return rb - ra;
  const pa = a.price ?? Number.POSITIVE_INFINITY;
  const pb = b.price ?? Number.POSITIVE_INFINITY;
  if (pa !== pb) return pa - pb;
  return 0;
}

export default function categorizeProducts(products) {
  const blocks = {};
  for (const c of CATEGORY_ORDER) {
    blocks[c.slug] = { name: c.name, slug: c.slug, count: 0, items: [] };
  }

  const uncategorized = [];
  const byCategoryCount = {};
  CATEGORY_ORDER.forEach(c => (byCategoryCount[c.slug] = 0));

  for (const p of products) {
    const cat = classify(p);
    if (!cat) {
      uncategorized.push({ id: p.id, reason: "no_match" });
      continue;
    }
    const item = {
      id: p.id,
      title: p.name,
      price: p.price,
      rating: p.rating,
      soldCount: p.sold_count,
      category: cat.name,
      categorySlug: cat.slug,
      relevanceScore: cat.relevanceScore,
      image: p.image
    };
    blocks[cat.slug].items.push(item);
    byCategoryCount[cat.slug] += 1;
  }

  for (const c of CATEGORY_ORDER) {
    const block = blocks[c.slug];
    block.items.sort(cmpItems);
    block.count = block.items.length;
  }

  const categories = CATEGORY_ORDER.map(c => blocks[c.slug]);

  const totals = {
    all: products.length,
    byCategory: byCategoryCount,
  };

  return { categories, uncategorized, totals };
}