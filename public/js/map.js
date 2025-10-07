document.addEventListener('DOMContentLoaded', () => {
  const jsonEl = document.getElementById('cafes-for-map');
  if (!jsonEl) return;

  const data = JSON.parse(jsonEl.textContent || '[]');

  const k = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const COORDS = {
    "italie":[41.8719,12.5674],"colombie":[4.5709,-74.2973],"ethiopie":[9.145,40.4897],
    "bresil":[-14.235,-51.9253],"guatemala":[15.7835,-90.2308],"kenya":[-0.0236,37.9062],
    "indonesie":[-0.7893,113.9213],"costa rica":[9.7489,-83.7534],"vietnam":[14.0583,108.2772],
    "tanzanie":[-6.369,34.8888],"jamaique":[18.1096,-77.2975],"rwanda":[-1.9403,29.8739],
    "panama":[8.538,-80.7821],"perou":[-9.19,-75.0152],"hawai":[19.8968,-155.5828],
    "nicaragua":[12.8654,-85.2072]
  };

  const map = L.map('map', {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 19,
    maxBounds: [[-85,-180],[85,180]],
    maxBoundsViscosity: 1.0
  });

  const baseMaps = {
    "Classique": L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, minZoom:2, noWrap:true }),
    "Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
    "Noir & Blanc": L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', { subdomains:'abcd', maxZoom:19, minZoom:2, noWrap:true })
  };

  baseMaps["Classique"].addTo(map);
  L.control.layers(baseMaps).addTo(map);

  L.Marker.prototype.options.icon = L.icon({
    iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize:[25,41], iconAnchor:[12,41], popupAnchor:[1,-34], shadowSize:[41,41]
  });

  data.forEach(c => {
    const pos = COORDS[k(c.pays_nom)];
    if (!pos) return; 
    L.marker(pos).addTo(map).bindPopup(
      `<strong>${c.nom}</strong><br><a href="/catalog/${c.id}">En savoir plus…</a>`
    );
  });
});
