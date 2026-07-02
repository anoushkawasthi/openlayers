# OpenLayers core Mental Model:  


                    User
                      │
                      ▼
                  ┌─────────┐
                  │   Map   │
                  └─────────┘
                       │
      ┌────────────────┼─────────────────┐
      ▼                ▼                 ▼
 ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ OSM Layer│     │VectorLayer│     │ImageLayer│
 └──────────┘     └──────────┘     └──────────┘
       │                 │
       │          Vector Source
       │                 │
       │      ┌──────┬───────┬────────┐
       │      ▼      ▼       ▼
       │    Point   Line   Polygon
       │
       ▼
 Raster Tiles

                ▲
                │
            View Object
        (Center, Zoom, Rotation)  
          
In openlayers a map is a collection of layers that display data through a view.  
  
Everything revolves around these 5 Objects:
1) Map 
2) View  
3) Layer  
4) Source  
5) Features  


## Map:
Map is like a canvas. Its job is to display the layers 
````
When we write  
const map=new Map({
    target="map"
});

which means where the div id is map dispaly map over there;
````

## View:
It is like the camera, decides where you are looking, how zoomed in or out you are, whether the map is rotated
````
new View({
    center:[0,0],
    zoom=5
})
````
  
Lets take the example of google maps:->  
The View stores ->  
current location  
current zoom  
current Rotation   
  
    
      
## Layers:
Everything visible on a map is a layer.  
Openlayers stacks all these layers such the top layer covers the bottom layer.  
There are different types of layer:
1) Tile Layer -> Used for maps
2) Vector Layer -> Used to store objects
3) Image Layer -> Displays one big image  


## Source  
The layers they do not contain any data, the data comes from the source. 
````
const vectorSource= new vectorSource();
vectorSource.addFeatures(feature);
````


## Features:
Features are actual objects on the map like a hospital, road, river, house, etc  
hospital= point feature   
river= line feature   
farm= polygon feature  
  
    

