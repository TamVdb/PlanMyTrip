import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Correctif Leaflet + bundler (Vite, Webpack...) : par défaut, Leaflet résout
// les images de son marqueur via des chemins qui ne survivent pas au bundling
// (bug connu, indépendant de la version de React/Vite). On réimporte les 3
// images et on les réassigne explicitement à l'icône par défaut.
// Importé une seule fois (effet de bord) par tout composant qui affiche une
// carte Leaflet avec un marqueur - voir TripAddForm.jsx et TripUpdateForm.jsx.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: markerIcon2x,
   iconUrl: markerIcon,
   shadowUrl: markerShadow,
});
