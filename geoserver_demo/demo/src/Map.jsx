import { useEffect, useRef } from "react";

import "ol/ol.css";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import { fromLonLat } from "ol/proj";

export default function MapComponent() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // OpenStreetMap Base Layer
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    // GeoServer WMS Layer
    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: "http://localhost:8080/geoserver/wms",
        params: {
          LAYERS: "Bharatrohan:India_State_Boundary", 
          TILED: true,
        },
        serverType: "geoserver",
      }),
    });

    // Create Map
    const map = new Map({
      target: mapRef.current,

      layers: [osmLayer, wmsLayer],

      view: new View({
        center: fromLonLat([78.9629, 22.5937]), // India
        zoom: 5,
      }),
    });

    mapInstance.current = map;

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100vh",
      }}
    />
  );
}