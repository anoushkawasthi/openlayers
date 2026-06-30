# Study notes: Map Projections in OpenLayers

## Projections for OpenLayers  
1. EPSG:4326 (WGS 84): is the global standard system that uses latitude and longitude to measure locations on the curved Earth. It is the coordinate system used by GPS and Google Earth.  
-> What it is: The unprojected, raw ellipsoidal coordinate system. It treats the Earth as a sphere and uses Latitude and Longitude in degrees as coordinates.  
-> Units: Degrees ($-180$ to $+180$ Longitude, $-90$ to $+90$ Latitude).  
-> Used for: GPS devices, storing data in databases (like PostGIS), and sharing files (like GeoJSON).  
-> The Look: If forced onto a flat screen, it looks blocky and squished at the poles.
2. EPSG:3857 (Web Mercator): is a flat, projected system that uses meters to measure coordinates. It is the standard for rendering web maps like Google Maps, OpenStreetMap, and Leaflet.  
-> What it is: The projected coordinate system used by virtually all major web mapping providers (Google Maps, OpenStreetMap, Bing Maps, and OpenLayers).  
-> Units: Meters ($X$ and $Y$ coordinates measuring distance from the intersection of the Equator and Prime Meridian).  
-> Used for: Rendering and displaying maps on a web screen.  

#### By default, OpenLayers view is set to EPSG:3857 (Web Mercator).  
OpenLayers provides built-in functions like fromLonLat and toLonLat to dynamically convert coordinates between these two projection types on the fly. 
````
import { fromLonLat } from 'ol/proj';
import Marker from 'ol/Feature';
import Point from 'ol/geom/Point';

// Your raw GPS data (EPSG:4326)
const nycGPS = [-74.0060, 40.7128]; // [Lon, Lat]

const markerFeature = new Marker({
  // OpenLayers transforms the degrees to meters (EPSG:3857) automatically here:
  geometry: new Point(fromLonLat(nycGPS)), 
});
````    
  
## Three Geometric Projections:  
#### 1) Cylindrical Projection:  
Wrapping a flat sheet of paper around the globe like a tube (cylinder), touching the Earth along a straight line (usually the Equator).  
Advantages:  
-> creates clean rectangular grid.  
Disadvantages: Creates Distortion near poles.  
#### 2) Conical Projection: 
Placing a cone over the top of the globes such that it touches the globe along one or two standard lattitudes.(Tangent or Secant Cone)  
Advantages:  
-> Offers accuracy with minimal distortion.  
Disadvantages:  
-> Cannot display entire world. The direction opposite to the cone's point is highly distorted.  
#### 3)Planar Projection:  
Maps a 3D object onto a 2D flat plane. 
Placing a flat sheet of paper so that it touches at a single point on the globe(usually one of the poles)  
Advantages:  
-> Accurate Direction from the Center Point.  
Disadvantages  
-> Distortion increases rapidly and exponentially in a circular pattern moving outward from the center point.