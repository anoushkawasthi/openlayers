## What is Raster Data?

Raster data represents the world as a grid of pixels (cells). Every pixel stores a value such as color, elevation, or temperature.

Think of it like a digital photograph—when you zoom in, you eventually start seeing individual pixels.

### Characteristics

- Made up of pixels (grid cells)
- Resolution depends on pixel size
- Loses quality when highly zoomed
- Best for continuous data  

# What is Vector Data?

Vector data represents geographic features using mathematical coordinates instead of pixels.  
Vector Data represents real-world objects using mathematical coordinates. It stores geometry.  


Instead of storing an image of a road or building, it stores the coordinates that define its shape.

### Characteristics

- Coordinate-based
- Resolution independent (does not become blurry)
- Easy to edit and style
- Ideal for interactive map features  
### Why do we use Vector data?  
1) It is seachable  
2) Editable  
3) Lightweight  
4) Can be styled differently  
5) Can store additional information  
   

### Types of Vector Data

### 1. Point

Represents a single location.
Examples:
- Marker
- Hospital
- Tree
- User location



### 2. Line

Represents connected points.

Examples:
- Roads
- Rivers
- Routes
- Railway tracks

### 3. Polygon

Represents a closed area.

Examples:
- Farm boundary
- Building
- Park
- State boundary  

  

### Use Raster Data when:

- Displaying satellite imagery
- Showing aerial photographs
- Working with temperature or rainfall maps
- Displaying terrain or elevation

### Use Vector Data when:

- Adding markers
- Drawing routes
- Displaying roads
- Showing farm boundaries
- Highlighting administrative regions
- Creating interactive maps  

  
    
### What is a Vector Source?  
Container or a database that stores vector features, it just stores not related to displaying or drawing.  
It stores the features.   
````
import VectorSource from "ol/source/vector"
const vector_Source= new VectorSource
vector_Source.addFeatures(frame1);
vector_Source.addFeatures(frame1);
 



## Every Vector feature has 2 parts ->  Geometry and properties  
Geometry decribes where the object is and what is the shape (point, line or polygon)  
Point -> single coordinate, represents single location  
Line -> array of coordinates , represents road, river, etc,  
Polygon -> array of coordinates but the first and the last coordinate form a closed shape, represent farm , forest , farm boundary, state, etc,  
  
  VectorSource has features(objects) -> features are made up of geometry and properties and Styling     

# OpenLayers Complete Hierarchy

```text
Application
│
└── Map
    │
    ├── View
    │   ├── Center
    │   ├── Zoom
    │   ├── Rotation
    │   └── Projection
    │
    ├── Layer 1 (Raster)
    │   │
    │   ├── Raster Source
    │   │   ├── Tile 1 (Pixels)
    │   │   ├── Tile 2 (Pixels)
    │   │   ├── Tile 3 (Pixels)
    │   │   └── Tile Cache
    │   │
    │   └── Style (optional)
    │
    ├── Layer 2 (Vector)
    │   │
    │   ├── Vector Source
    │   │   │
    │   │   ├── Feature
    │   │   │   ├── Geometry
    │   │   │   │   └── Point
    │   │   │   ├── Properties
    │   │   │   └── Style
    │   │   │
    │   │   ├── Feature
    │   │   │   ├── Geometry
    │   │   │   │   └── LineString
    │   │   │   ├── Properties
    │   │   │   └── Style
    │   │   │
    │   │   └── Feature
    │   │       ├── Geometry
    │   │       │   └── Polygon
    │   │       ├── Properties
    │   │       └── Style
    │   │
    │   └── Layer Style (optional)
    │
    ├── Layer 3 (Image Layer)
    │   └── Image Source
    │
    ├── Controls
    │   ├── Zoom Buttons
    │   ├── Scale Line
    │   └── Full Screen
    │
    ├── Interactions
    │   ├── Pan
    │   ├── Zoom
    │   ├── Draw
    │   ├── Modify
    │   └── Select
    │
    └── Overlays
        ├── Popup
        ├── Tooltip
        └── Custom HTML
```

## Hierarchy Explanation

### Application
Your React, Vue, Angular, or JavaScript application.

### Map
The root OpenLayers object. It manages everything displayed on the screen.

### View
Controls how the map is viewed.

- Center
- Zoom
- Rotation
- Projection - By Befault ESPG=3857

### Layers
Everything visible on the map is contained in a layer.

#### Raster Layer
Displays pixel-based imagery such as:

- OpenStreetMap
- Satellite imagery
- Terrain maps
- Drone images

Uses a **Raster Source**, which stores map tiles or images.

#### Vector Layer
Displays editable geographic data.

Uses a **Vector Source**, which stores **Features**.

Each Feature contains:

- Geometry
  - Point
  - LineString
  - Polygon
- Properties (metadata)
- Style (optional)

#### Image Layer
Displays a single large image, such as:

- GeoTIFF
- Weather map
- Historical map
- Drone orthomosaic

### Controls
Built-in UI components.

Examples:

- Zoom buttons
- Scale line
- Full-screen button

### Interactions
Handle user input.

Examples:

- Pan
- Zoom
- Draw
- Modify
- Select

### Overlays
HTML elements placed above the map.

Examples:

- Popups
- Tooltips
- Custom information panels
````

# Raster Dataset:
Raster is simply image made up of multiple pixels.  
[255,120,30] [20,180,90] [100,50,255] .....
[255,120,30] ....
[20,180,90] .... 
[100,50,255] .....   
Unlike Vector No objects here.  
Raster Source -> Raster Layer -> Map  
## Raster Source Types:
1) OSM Source  
````
new TileLayer ({
    source: new OSM()
}),
````
2) XYZ Source:  
Download tiles from a tile server.  
````
new TileLayer ({
    source: new XYZ({
        url: "dbjvbvk s.png"
    })
}),
````  
3) GeoTiff:  
For drone images.  


### Zooming: 
When you zoom it downloads tiles rather than enlarging a single image  
