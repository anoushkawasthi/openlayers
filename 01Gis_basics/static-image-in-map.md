# Static Image in a MAP (Image Layer)

Instead of Downloading tiles and stuff you have a single static image  

farm.png  
↓
ImageStatic Source  
↓
Image Layer  
↓
Map  
  
````
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";

const imageLayer = new ImageLayer({
  source: new Static({
    url: "farm.png",
    imageExtent: [
      xmin,
      ymin,
      xmax,
      ymax
    ]
  })
});  
````  
  
Image Extent tells where the image should be placed in the map   
### In Memory:
ImageSource stores -> Image URL -> the Extent array  
 