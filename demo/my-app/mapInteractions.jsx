import React, { useEffect, useRef, useState } from 'react';
import { Draw, Modify } from 'ol/interaction';

export default function MapInteractions({ mapRef }) {
  const [drawType, setDrawType] = useState('None');
  const drawInteractionRef = useRef(null);
  const modifyInteractionRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const layers = map.getLayers().getArray();
    const targetLayer = layers.find(layer => layer.get('name') === 'drawLayer');

    if (!targetLayer) {
      console.warn("Could not find a layer named 'drawLayer' to attach interactions.");
      return;
    }

    const source = targetLayer.getSource();

    // 1. Setup Modify Interaction (so shapes are always editable)
    if (!modifyInteractionRef.current) {
      const modify = new Modify({ source: source });
      modify.on('modifyend', (event) => {
        console.log("Shape edited:", event.features.getArray());
      });
      map.addInteraction(modify);
      modifyInteractionRef.current = modify;
    }

    // 2. Cleanup old draw interaction if it exists
    if (drawInteractionRef.current) {
      map.removeInteraction(drawInteractionRef.current);
      drawInteractionRef.current = null;
    }

    // 3. Setup new Draw Interaction if a tool is selected
    if (drawType !== 'None') {
      const draw = new Draw({
        source: source,
        type: drawType,
      });

      draw.on('drawend', (event) => {
        console.log(`You drew a ${event.feature.getGeometry().getType()}`);
      });

      map.addInteraction(draw);
      drawInteractionRef.current = draw;
    }

    // Cleanup when the component unmounts
    return () => {
      if (drawInteractionRef.current) map.removeInteraction(drawInteractionRef.current);
      if (modifyInteractionRef.current) map.removeInteraction(modifyInteractionRef.current);
    };
  }, [mapRef, drawType]); // Re-run if the map loads or the user changes the dropdown

  return (
    <div style={{ position: 'absolute', top: 60, left: 50, zIndex: 10, background: 'white', padding: 10, borderRadius: 4, boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
      <label style={{ marginRight: 10 }}><b>Draw Tool: </b></label>
      <select value={drawType} onChange={(e) => setDrawType(e.target.value)}>
        <option value="None">Off (Navigate)</option>
        <option value="LineString">Route (Line)</option>
        <option value="Polygon">Zone (Polygon)</option>
      </select>
    </div>
  );
}