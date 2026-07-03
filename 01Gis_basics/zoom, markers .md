# Zoom  
zoom tells how far or close enough the user is looking the map.  
Controlled by View (current location, current zoom, current rotation )  
Higher zoom = closer view
zoom =14 -> streets might be visible and zoom = 2 -> earth  
  
# Markers  
Marker a point feature with a custom icon or style.   
Internally there is no special marker in openlayers, they can be created using a feature with point geometry.  
  
````
//create a marker  
  

import Feature from "ol/Feature";
import Point from "ol/geom/Point";

const marker = new Feature({
    geometry=new Point({
        78.123,28.362
    }),
});  
  
// add it to the map  
vector_Source.addFeature(marker);
 
  
// adding style  
import Style from "ol/style/Style"
import Icon from "ol/style/Icon"

marker.setStyle(
    newStyle({
        image=new Icon({
            src: marker.png,scale: 0.1
        }),
    })
);
  
````
