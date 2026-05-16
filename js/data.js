// Interior Planet — Product Catalogue Data
// Core Services: Ceilings · Cupboards · Paintings · Lighting
const PRODUCTS = [
  // ===== CEILINGS =====
  { id:1, name:"Classic POP False Ceiling", category:"pop-ceiling", room:"ceilings", price:85, originalPrice:110, description:"Elegant Plaster of Paris false ceiling design per sq ft. Smooth matte finish with concealed lighting channels. Perfect for living rooms and bedrooms.", dimensions:"Per Sq Ft", colors:["Pure White","Warm White","Ivory"], stock:"in-stock", badge:"Bestseller", gradient:["#E8E0D6","#F5F0EB"], material:"Plaster of Paris", style:"Classic" },
  { id:2, name:"Gypsum Board Ceiling Panel", category:"gypsum-ceiling", room:"ceilings", price:95, originalPrice:null, description:"Premium gypsum board false ceiling with moisture-resistant treatment. Ideal for kitchens, bathrooms and humid climates.", dimensions:"Per Sq Ft", colors:["White","Off-White"], stock:"in-stock", badge:"", gradient:["#D4BFA0","#E8E0D6"], material:"Gypsum Board", style:"Modern" },
  { id:3, name:"Wooden Strip Ceiling Design", category:"wooden-ceiling", room:"ceilings", price:220, originalPrice:275, description:"Natural wood strip false ceiling with warm teak or walnut finish. Creates a luxurious and cosy ambiance.", dimensions:"Per Sq Ft", colors:["Natural Teak","Dark Walnut","Light Oak"], stock:"in-stock", badge:"Premium", gradient:["#8B6B3D","#C4A882"], material:"Solid Wood Strips", style:"Rustic Luxury" },
  { id:4, name:"Coffered Ceiling Design", category:"pop-ceiling", room:"ceilings", price:150, originalPrice:null, description:"Elegant coffered ceiling pattern with deep recessed panels. Adds architectural grandeur to any room.", dimensions:"Per Sq Ft", colors:["White","Cream","Custom"], stock:"in-stock", badge:"Exclusive", gradient:["#B8956A","#D4BFA0"], material:"POP & MDF", style:"Heritage" },
  { id:5, name:"Stretch Ceiling — Glossy", category:"stretch-ceiling", room:"ceilings", price:180, originalPrice:210, description:"High-gloss PVC stretch ceiling with mirror-like finish. Creates an illusion of spaciousness and height.", dimensions:"Per Sq Ft", colors:["Glossy White","Glossy Black","Sky Blue","Custom Print"], stock:"in-stock", badge:"Trending", gradient:["#4A4545","#8B8178"], material:"PVC Stretch Film", style:"Ultra Modern" },
  { id:6, name:"LED Cove Ceiling with Profile Lights", category:"pop-ceiling", room:"ceilings", price:130, originalPrice:null, description:"False ceiling with built-in LED cove lighting profiles. Warm and cool white options with dimmer support.", dimensions:"Per Sq Ft", colors:["Warm White Glow","Cool White Glow","RGB"], stock:"in-stock", badge:"", gradient:["#1E1E1E","#B8956A"], material:"POP + LED Profiles", style:"Contemporary" },
  { id:7, name:"Grid / T-Bar Commercial Ceiling", category:"grid-ceiling", room:"ceilings", price:65, originalPrice:85, description:"Modular grid ceiling system ideal for offices, showrooms and commercial spaces. Easy to install and maintain.", dimensions:"Per Sq Ft", colors:["White","Grey"], stock:"in-stock", badge:"Sale", gradient:["#E8E0D6","#C8D4C8"], material:"Mineral Fibre Tiles", style:"Commercial" },
  { id:8, name:"Cloud Ceiling — Floating Panels", category:"pop-ceiling", room:"ceilings", price:195, originalPrice:null, description:"Floating cloud-style ceiling panels suspended at varying heights. Creates a dramatic, modern statement.", dimensions:"Per Sq Ft", colors:["Matte White","Matte Grey"], stock:"low-stock", badge:"New", gradient:["#F5F0EB","#B8956A"], material:"POP & Metal Frame", style:"Designer" },

  // ===== CUPBOARDS / WARDROBES =====
  { id:9, name:"Sliding Door Wardrobe — Laminate", category:"sliding-wardrobe", room:"cupboards", price:45000, originalPrice:55000, description:"Full-height sliding door wardrobe with laminate finish. Includes adjustable shelves, hanging rods, and internal drawers.", dimensions:"W 180 × D 60 × H 240 cm", colors:["Walnut Brown","White & Grey","Teak & Ivory"], stock:"in-stock", badge:"Bestseller", gradient:["#6B4226","#A67B5B"], material:"Plywood + Laminate", style:"Modern" },
  { id:10, name:"Walk-in Closet System", category:"walk-in-closet", room:"cupboards", price:125000, originalPrice:null, description:"Fully customizable walk-in closet with open shelving, shoe racks, accessory drawers and mirror panels.", dimensions:"Custom — Starts from 80 Sq Ft", colors:["White Gloss","Dark Oak","Grey Matte"], stock:"in-stock", badge:"Premium", gradient:["#4A4545","#8B8178"], material:"MDF + Acrylic/Veneer", style:"Luxury" },
  { id:11, name:"Hinged Door Wardrobe — Classic", category:"hinged-wardrobe", room:"cupboards", price:35000, originalPrice:42000, description:"Traditional hinged-door wardrobe with locker, full-length mirror, and internal compartments.", dimensions:"W 150 × D 55 × H 210 cm", colors:["Honey Teak","Rosewood","White"], stock:"in-stock", badge:"Sale", gradient:["#C4A882","#8B6B3D"], material:"Solid Wood + Plywood", style:"Classic" },
  { id:12, name:"Modular Kitchen Cabinet Set", category:"kitchen-cabinet", room:"cupboards", price:85000, originalPrice:110000, description:"Complete modular kitchen cabinet set — upper and lower units with soft-close hinges, pull-out baskets, and granite-ready countertop.", dimensions:"For 80-100 Sq Ft Kitchen", colors:["White & Wood","All White","Grey & Walnut","Navy & Gold"], stock:"in-stock", badge:"Trending", gradient:["#1E1E1E","#B8956A"], material:"Marine Plywood + Laminate", style:"Modular" },
  { id:13, name:"TV Unit cum Storage Cabinet", category:"tv-unit", room:"cupboards", price:28000, originalPrice:null, description:"Entertainment unit with wall-mounted upper cabinets, LED backlight panel, and cable management system.", dimensions:"W 240 × D 40 × H 180 cm (wall unit)", colors:["White & Walnut","Charcoal & Oak","All White"], stock:"in-stock", badge:"New", gradient:["#4A4545","#C4A882"], material:"MDF + Veneer", style:"Contemporary" },
  { id:14, name:"Shoe Rack Cabinet — Foldable", category:"shoe-rack", room:"cupboards", price:12000, originalPrice:15000, description:"Slim profile shoe rack with fold-down compartments for 24 pairs. Space-saving design for entryways.", dimensions:"W 90 × D 24 × H 120 cm", colors:["White","Natural Wood","Grey"], stock:"in-stock", badge:"", gradient:["#E8E0D6","#D4BFA0"], material:"Engineered Wood", style:"Minimalist" },
  { id:15, name:"Children's Wardrobe — Colourful", category:"hinged-wardrobe", room:"cupboards", price:22000, originalPrice:null, description:"Fun and functional children's wardrobe with coloured panels, low hanging rod, toy shelf and soft-close doors.", dimensions:"W 120 × D 50 × H 180 cm", colors:["Blue & White","Pink & White","Green & White"], stock:"in-stock", badge:"", gradient:["#5A6A7A","#C8D4C8"], material:"MDF + PU Paint", style:"Kids" },
  { id:16, name:"Crockery Unit / Display Cabinet", category:"display-cabinet", room:"cupboards", price:32000, originalPrice:38000, description:"Elegant display cabinet with glass doors, LED interior lighting, and solid wood frame. Perfect for dining rooms.", dimensions:"W 120 × D 40 × H 200 cm", colors:["Dark Walnut","Honey Oak","White"], stock:"in-stock", badge:"", gradient:["#5A3825","#8B6B3D"], material:"Solid Wood + Glass", style:"Classic" },

  // ===== PAINTINGS / WALL ART =====
  { id:17, name:"Abstract Gold Leaf Canvas (Set of 3)", category:"abstract", room:"paintings", price:8999, originalPrice:12999, description:"Hand-painted abstract art with real gold leaf accents on premium cotton canvas. Set of 3 coordinated panels.", dimensions:"Each: 60 × 90 cm", colors:["Gold & Black","Gold & Navy","Gold & Burgundy"], stock:"in-stock", badge:"Bestseller", gradient:["#B8956A","#1E1E1E"], material:"Acrylic on Canvas", style:"Abstract" },
  { id:18, name:"Landscape Oil Painting — Countryside", category:"landscape", room:"paintings", price:14999, originalPrice:null, description:"Original oil painting of Indian countryside with vibrant sunset hues. Gallery-wrapped on wooden stretcher bars.", dimensions:"120 × 80 cm", colors:["Warm Sunset","Cool Morning","Monsoon Green"], stock:"in-stock", badge:"Handmade", gradient:["#7A5A3D","#C4A882"], material:"Oil on Canvas", style:"Realism" },
  { id:19, name:"Modern Geometric Wall Art Panel", category:"modern-art", room:"paintings", price:5999, originalPrice:7999, description:"Laser-cut metal geometric wall art in powder-coated finish. Creates beautiful shadow play with ambient light.", dimensions:"90 × 60 cm", colors:["Matte Black","Antique Gold","Rose Gold"], stock:"in-stock", badge:"Trending", gradient:["#1E1E1E","#4A4545"], material:"Laser-Cut Metal", style:"Geometric Modern" },
  { id:20, name:"Traditional Tanjore Painting", category:"traditional", room:"paintings", price:24999, originalPrice:null, description:"Authentic Tanjore painting with 24K gold foil and semi-precious stone embellishments. Handcrafted by master artisans.", dimensions:"60 × 75 cm (framed)", colors:["Gold & Red","Gold & Green","Gold & Blue"], stock:"low-stock", badge:"Exclusive", gradient:["#B8956A","#8B6B3D"], material:"22K Gold Foil on Board", style:"Traditional Indian" },
  { id:21, name:"Floral Canvas Print Set (4 Panels)", category:"floral", room:"paintings", price:4499, originalPrice:5999, description:"High-resolution botanical floral prints on premium canvas with UV-resistant inks. Ready to hang.", dimensions:"Each: 40 × 60 cm", colors:["Pastel Blooms","Vintage Roses","Tropical Leaves"], stock:"in-stock", badge:"Sale", gradient:["#C8D4C8","#7A8E7A"], material:"Giclee Print on Canvas", style:"Botanical" },
  { id:22, name:"Mandala Wooden Wall Art", category:"traditional", room:"paintings", price:7999, originalPrice:null, description:"Intricate mandala design laser-cut in MDF wood with multi-layer depth. Available in natural or painted finish.", dimensions:"Dia 80 cm", colors:["Natural Wood","White","Black & Gold"], stock:"in-stock", badge:"", gradient:["#C4A882","#E8E0D6"], material:"MDF Wood", style:"Mandala" },
  { id:23, name:"Portrait Commission — Custom", category:"portrait", room:"paintings", price:18000, originalPrice:null, description:"Custom hand-painted portrait from your photo. Realistic oil painting on premium canvas. Allow 3–4 weeks.", dimensions:"60 × 75 cm", colors:["Classic Style","Pop Art Style","Pencil Sketch"], stock:"in-stock", badge:"Custom", gradient:["#8B8178","#4A4545"], material:"Oil/Acrylic on Canvas", style:"Custom Portrait" },
  { id:24, name:"3D Wall Mural — Nature Theme", category:"murals", room:"paintings", price:350, originalPrice:420, description:"Custom-printed 3D wall mural with nature themes. Peel-and-stick or paste application. Price per sq ft.", dimensions:"Per Sq Ft (Min 50 Sq Ft)", colors:["Forest","Waterfall","Mountain","Beach"], stock:"in-stock", badge:"New", gradient:["#2D5A3D","#5A8A6A"], material:"Premium Vinyl / Fabric", style:"3D Mural" },

  // ===== LIGHTING =====
  { id:25, name:"Crystal Chandelier — 12 Light", category:"chandeliers", room:"lighting", price:28999, originalPrice:35999, description:"Stunning K9 crystal chandelier with 12 E14 bulb holders. Chrome finish frame with draped crystal strings.", dimensions:"Dia 65 × H 55 cm + Chain", colors:["Chrome & Clear Crystal","Gold & Amber Crystal"], stock:"in-stock", badge:"Bestseller", gradient:["#D4BFA0","#B8956A"], material:"K9 Crystal & Chrome", style:"Classic Luxury" },
  { id:26, name:"Modern LED Pendant Light — Ring", category:"pendant-lights", room:"lighting", price:12999, originalPrice:null, description:"Minimalist LED ring pendant with warm white light. Dimmable with included remote control. Energy-efficient.", dimensions:"Dia 60 cm, 45W LED", colors:["Matte Black","Brushed Gold","White"], stock:"in-stock", badge:"Trending", gradient:["#1E1E1E","#B8956A"], material:"Aluminium & Acrylic", style:"Modern Minimal" },
  { id:27, name:"Cluster Pendant — 7 Globe", category:"pendant-lights", room:"lighting", price:9999, originalPrice:12999, description:"Cluster of 7 glass globe pendants at varying heights. Creates a stunning focal point over dining tables.", dimensions:"Each Globe Dia 15 cm, Drop 80-150 cm", colors:["Clear Glass & Gold","Smoke Glass & Black","Amber Glass & Brass"], stock:"in-stock", badge:"Sale", gradient:["#8B6B3D","#D4BFA0"], material:"Glass & Metal", style:"Contemporary" },
  { id:28, name:"LED Panel Light — 2×2 ft", category:"panel-lights", room:"lighting", price:1499, originalPrice:1999, description:"Ultra-slim LED panel light for false ceilings. Uniform light distribution, flicker-free. ISI certified.", dimensions:"60 × 60 cm, 40W", colors:["Cool White 6500K","Neutral White 4000K","Warm White 3000K"], stock:"in-stock", badge:"", gradient:["#E8E0D6","#F5F0EB"], material:"Aluminium & Acrylic Diffuser", style:"Commercial" },
  { id:29, name:"LED Strip Light — 5 Meter Roll", category:"strip-lights", room:"lighting", price:799, originalPrice:1199, description:"Flexible LED strip with adhesive backing for cove lighting. Cuttable every 3 LEDs. Includes driver.", dimensions:"5m Roll, 60 LEDs/m", colors:["Warm White","Cool White","RGB Colour","Warm + Cool (Tunable)"], stock:"in-stock", badge:"Sale", gradient:["#B8956A","#4A4545"], material:"SMD 2835 LEDs", style:"Accent Lighting" },
  { id:30, name:"Wall Wash Light — Recessed", category:"wall-lights", room:"lighting", price:2499, originalPrice:null, description:"Recessed wall wash LED light for accent walls and art highlighting. Narrow beam angle for dramatic effect.", dimensions:"W 20 × H 8 cm, 12W", colors:["Warm White","Cool White"], stock:"in-stock", badge:"", gradient:["#4A4545","#1E1E1E"], material:"Die-Cast Aluminium", style:"Architectural" },
  { id:31, name:"Decorative Table Lamp — Ceramic", category:"table-lamps", room:"lighting", price:4999, originalPrice:null, description:"Hand-glazed ceramic base table lamp with fabric shade. Available in multiple artisan-finished colours.", dimensions:"Dia 30 × H 55 cm", colors:["Teal Crackle","Terracotta","Grey Speckle","White Marble Effect"], stock:"in-stock", badge:"Artisan", gradient:["#3D5A5A","#7A8E7A"], material:"Ceramic & Fabric", style:"Artisan" },
  { id:32, name:"Smart LED Downlight Set (6 Nos)", category:"downlights", room:"lighting", price:5999, originalPrice:7499, description:"Set of 6 recessed LED downlights with adjustable colour temperature via app or switch. False ceiling cutout ready.", dimensions:"Each: Dia 11 cm, 9W", colors:["3-in-1 (Warm/Neutral/Cool)","Single Warm White","Single Cool White"], stock:"in-stock", badge:"New", gradient:["#E8E0D6","#B8956A"], material:"Aluminium & Polycarbonate", style:"Smart Home" },
];

// Category metadata
const CATEGORIES = {
  ceilings: [
    { id:"pop-ceiling", name:"POP Ceilings", description:"Classic plaster designs", icon:"🏛" },
    { id:"gypsum-ceiling", name:"Gypsum Ceilings", description:"Moisture-resistant boards", icon:"◻" },
    { id:"wooden-ceiling", name:"Wooden Ceilings", description:"Warm natural finishes", icon:"🪵" },
    { id:"stretch-ceiling", name:"Stretch Ceilings", description:"Glossy modern finishes", icon:"✨" },
    { id:"grid-ceiling", name:"Grid Ceilings", description:"Commercial & office", icon:"▦" },
  ],
  cupboards: [
    { id:"sliding-wardrobe", name:"Sliding Wardrobes", description:"Space-saving designs", icon:"🚪" },
    { id:"hinged-wardrobe", name:"Hinged Wardrobes", description:"Traditional & sturdy", icon:"🗄" },
    { id:"walk-in-closet", name:"Walk-in Closets", description:"Luxury dressing rooms", icon:"👔" },
    { id:"kitchen-cabinet", name:"Kitchen Cabinets", description:"Modular kitchens", icon:"🍳" },
    { id:"tv-unit", name:"TV & Media Units", description:"Entertainment walls", icon:"📺" },
    { id:"display-cabinet", name:"Display Cabinets", description:"Crockery & showcase", icon:"🏺" },
    { id:"shoe-rack", name:"Shoe Racks", description:"Entry organisation", icon:"👟" },
  ],
  paintings: [
    { id:"abstract", name:"Abstract Art", description:"Modern expressions", icon:"🎨" },
    { id:"landscape", name:"Landscapes", description:"Nature & scenery", icon:"🌄" },
    { id:"modern-art", name:"Modern & Geometric", description:"Metal & laser-cut art", icon:"◆" },
    { id:"traditional", name:"Traditional Art", description:"Tanjore, Mandala & more", icon:"🕉" },
    { id:"floral", name:"Floral & Botanical", description:"Nature-inspired prints", icon:"🌸" },
    { id:"portrait", name:"Custom Portraits", description:"Made from your photo", icon:"🖌" },
    { id:"murals", name:"Wall Murals", description:"Full-wall 3D murals", icon:"🏔" },
  ],
  lighting: [
    { id:"chandeliers", name:"Chandeliers", description:"Statement ceiling lights", icon:"💎" },
    { id:"pendant-lights", name:"Pendant Lights", description:"Hanging focal points", icon:"💡" },
    { id:"panel-lights", name:"Panel Lights", description:"Ceiling panel lights", icon:"◻" },
    { id:"strip-lights", name:"LED Strips", description:"Cove & accent lighting", icon:"〰" },
    { id:"downlights", name:"Downlights", description:"Recessed spot lights", icon:"🔅" },
    { id:"wall-lights", name:"Wall Lights", description:"Wash & accent lights", icon:"🔆" },
    { id:"table-lamps", name:"Table Lamps", description:"Decorative desk lamps", icon:"🪔" },
  ]
};

// Helper functions
function getProductsByRoom(room) { return PRODUCTS.filter(p => p.room === room); }
function getProductsByCategory(category) { return PRODUCTS.filter(p => p.category === category); }
function getProductById(id) { return PRODUCTS.find(p => p.id === parseInt(id)); }
function getStockLabel(stock) { return stock === 'in-stock' ? 'In Stock' : stock === 'low-stock' ? 'Only Few Left' : 'Out of Stock'; }
function getStockClass(stock) { return stock === 'in-stock' ? 'stock-in' : stock === 'low-stock' ? 'stock-low' : 'stock-out'; }
function formatPrice(price) { return '₹' + price.toLocaleString('en-IN'); }
function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.material.toLowerCase().includes(q) || p.style.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.room.toLowerCase().includes(q));
}
