# GeoServer Layers

In GeoServer, a "Layer" is the bridge between your raw data (like a database table or a shapefile) and the web map the user sees. Here is a breakdown of the core concepts you need to know.

## 1. Layer Lifecycle

A layer doesn't just magically appear in GeoServer; it follows a strict lifecycle:

1. **Data Creation:** You have raw data (e.g., a Shapefile or a PostGIS database table).
2. **Store Creation:** You tell GeoServer where this data lives by creating a **Store**. The Store is just the connection to the hard drive or database.
3. **Publishing:** You select a dataset from that Store and click "Publish."
4. **Configuration:** You assign the layer a name, define its coordinates, and give it a default SLD style. **This is when it officially becomes a "Layer."**
5. **Serving:** GeoServer serves the layer via WMS (as an image) or WFS (as raw data).

## 2. Layer Configuration

The Layer Configuration page is the control center for your data. It is divided into tabs:

- **Data:** Where you define the name, title, bounding boxes, and coordinate systems.
- **Publishing:** Where you assign SLD styles, WMS/WFS settings, and security.
- **Dimensions:** Used for data that changes over time or elevation (e.g., weather maps).
- **Tile Caching:** Where you configure how GeoWebCache pre-renders the layer for performance.

## 3. Native CRS vs. Declared CRS

As we discussed earlier, CRS stands for Coordinate Reference System.

- **Native CRS:** This is the spatial math that is *actually written inside your raw data file*. GeoServer reads this directly from the shapefile's `.prj` file or the database's spatial index.
- **Declared CRS:** This is what GeoServer *publishes* to the outside world. It is the label GeoServer puts on the data when a web map asks for it.

## 4. Projection Policy

What happens if your Native CRS is missing, broken, or you just want to change it? You use the Projection Policy to tell GeoServer how to bridge the gap between Native and Declared CRS. There are three options:

1. **Force Declared:** GeoServer completely ignores the Native CRS and blindly trusts the Declared CRS. (Use this if your shapefile is missing its projection file, but you know what it's supposed to be).
2. **Reproject Native to Declared:** The data stays in its Native CRS on the hard drive, but GeoServer mathematically recalculates the coordinates into the Declared CRS on-the-fly before sending it to the user. (Use this to standardize weird local projections into standard web projections).
3. **Keep Native:** GeoServer ignores the Declared CRS and just uses the Native one.

## 5. Bounding Boxes (Recap)

The Bounding Box is the minimum bounding rectangle that completely encloses your data.

- **Native Bounding Box:** The boundaries measured in the units of your Native CRS (e.g., meters).
- **Lat/Lon Bounding Box:** The exact same boundaries, but mathematically translated into standard GPS coordinates (EPSG:4326). This is required for spatial indexing and telling web maps exactly where to zoom.

## 6. Layer Groups

A Layer Group allows you to take multiple individual layers (e.g., "Roads", "Rivers", "Cities") and bundle them together into one single WMS layer.

- **The Benefit:** Instead of a web browser making three separate WMS requests to the server and stacking them, it makes **one request** for the Layer Group. GeoServer flattens the three layers into a single PNG image on the backend. This drastically improves loading speeds for complex base maps.

## 7. Queryable (WMS Feature Info)

This is a simple checkbox in the configuration.

- If checked, the layer supports WMS `GetFeatureInfo` requests. This means if a user clicks on the WMS PNG image on their web map, the map can ask GeoServer, *"What data attributes exist at the exact pixel the user just clicked?"* GeoServer will return a popup with the database info.
- If unchecked, the layer acts as a "dumb" picture. Clicking it does nothing.

## 8. Advertised

This checkbox controls visibility in the `GetCapabilities` document. The `GetCapabilities` document is the master list of every layer a GeoServer has available.

- If **Advertised is checked** (default), anyone scanning your server can see the layer exists.
- If **Advertised is unchecked**, it acts like a "secret menu item." It won't show up in public searches, but if a developer knows the exact layer name, they can still request it. This is often used for raw sub-layers that are only meant to be viewed as part of a larger Layer Group.

## 9. Metadata

This is "data about your data." It includes fields for the Layer Title, Abstract (a paragraph explaining what the data is), Keywords, and Attribution (who made the data).

- **Why it matters:** Good metadata ensures that when people load your WMS into desktop software like QGIS, they can read the abstract to understand exactly what they are looking at, what year the data is from, and who owns the copyright.

