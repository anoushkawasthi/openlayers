import { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";

import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import { fromLonLat, toLonLat } from "ol/proj";

import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector"

import Feature from "ol/Feature";
import { Polygon } from "ol/geom";

import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";

import Overlay from "ol/Overlay";

const polyCoords = [
  [77.15, 28.6],
  [77.25, 28.6],
  [77.25, 28.7],
  [77.15, 28.7],
  [77.15, 28.6],
];
//1
console.log(polyCoords);
const convertedCoords= polyCoords.map(coord => fromLonLat(coord));
//2
console.log(convertedCoords);
const polyGeometry= new Polygon([convertedCoords,]);
//3
console.log(polyGeometry);
const polyFeature= new Feature({
  geometry: polyGeometry,
})
//4
console.log(polyFeature);
const vectorPoly= new VectorSource();
vectorPoly.addFeature(polyFeature);
//5
console.log(vectorPoly);
const vectorLayerPoly = new VectorLayer({
  source: vectorPoly,
});

vectorLayerPoly.setStyle(
  new Style({
    fill: new Fill({
      color: "rgba(25,44,179,0.3)",
    }),
    stroke: new Stroke({
      color: "rgba(0,0,0,0.5)",
      width: 3,
    }),
  })
);


function App() {
  const mapElementRef = useRef(null);

  const mapRef = useRef(null);

  const popupRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new Map({
      target: mapElementRef.current,

      layers: [
        new TileLayer({
          source: new OSM(),
        }),vectorLayerPoly,
      ],

      view: new View({
        center: fromLonLat([77.15,28.6]),
        zoom: 10,
      }),
    });
    const popupOverlay=new Overlay({
      element: popupRef.current,
      positioning: "botton-center",
      stopEvent: false,
      offset:[0,-15],
    });
    mapRef.current.addOverlay(popupOverlay);

    const select = new Select({
      condition: click,
    });

    mapRef.current.addInteraction(select);

    select.on("select", (event)=>{
      const feature = event.selected[0];

      if(!feature){
        popupOverlay.setPosition(undefined);
        return;
      }

      const geometry=feature.getGeometry();
      const coordinates= geometry.getCoordinates();
      const convCoords= coordinates[0].map((coord)=> 
        toLonLat(coord)
      );

      popupRef.current.innerHTML = `
      <h3>Polygon Coordinates</h3>
      ${convCoords
        .map(
          (coord) =>
            `<div>
          ${coord[0].toFixed(5)},
          ${coord[1].toFixed(5)}
          </div>`
        )
        .join("")}
        <hr>
        <button id="deletePolygon"> Delete Polygon </button>
        `;

        const deleteButton= popupRef.current.querySelector("#deletePolygon");

        deleteButton.addEventListener("click",() => {
          vectorPoly.removeFeature(feature);
          popupOverlay.setPosition(undefined);
        });

        const center =geometry.getInteriorPoint().getCoordinates();
        popupOverlay.setPosition(center);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current=null;  
      }
    };
  }, []);

  return (
    <>
      <div ref={mapElementRef} className="map"></div>
  
      <div
        ref={popupRef}
        style={{
          background: "white",
          padding: "10px",
          border: "1px solid black",
          borderRadius: "5px",
          minWidth: "220px",
        }}
      ></div>
    </>
  );

}

export default App;