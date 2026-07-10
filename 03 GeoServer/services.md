# GeoServer Services -- Complete Study Notes

# Table of Contents

1.  Introduction
2.  What is a Service?
3.  OGC Standards
4.  WMS (Web Map Service)
5.  WFS (Web Feature Service)
6.  WMTS (Web Map Tile Service)
7.  WCS (Web Coverage Service)
8.  Service Comparison
9.  Which Service Should I Use?
10. Architecture
11. Interview Questions

------------------------------------------------------------------------

# 1. Introduction

GeoServer is a **GIS application server**. It exposes geographic
information through standardized web services.

    OpenLayers
          │
    HTTP Request
          │
    GeoServer
          │
    PostGIS / Shapefile / GeoTIFF

Unlike a normal REST API, GeoServer exposes **map services**.

------------------------------------------------------------------------

# 2. What is a Service?

A service is a standardized HTTP interface for requesting geographic
information.

Analogy:

    Customer
       ↓
    Waiter (Service)
       ↓
    Kitchen (GeoServer)

The browser never talks directly to the database.

------------------------------------------------------------------------

# 3. OGC Standards

OGC = Open Geospatial Consortium

It defines interoperable GIS standards used by:

-   GeoServer
-   QGIS
-   ArcGIS
-   OpenLayers
-   MapServer

Because every software understands the same protocols.

------------------------------------------------------------------------

# 4. WMS --- Web Map Service

## Purpose

Return **rendered map images**.

    Database
        ↓
    GeoServer
        ↓
    Render Map
        ↓
    PNG / JPEG

## Characteristics

-   Returns images
-   Cannot edit geometry
-   Fast
-   Ideal for visualization

## Major Operations

### GetCapabilities

Returns:

-   Available Layers
-   Supported CRS
-   Formats
-   Styles
-   Bounding Boxes

Think of it as:

> "Tell me everything you can provide."

------------------------------------------------------------------------

### GetMap

Returns a rendered image.

Example parameters:

-   Layer
-   Bounding Box
-   Width
-   Height
-   CRS
-   Image Format

------------------------------------------------------------------------

### GetFeatureInfo

Although WMS sends images, GeoServer can identify the feature beneath a
clicked pixel.

Useful for:

-   Popups
-   Farm information
-   Road details

------------------------------------------------------------------------

## Advantages

-   Fast rendering
-   Good for huge datasets
-   Server-side styling

## Limitations

-   No editing
-   No actual geometry transferred

------------------------------------------------------------------------

# 5. WFS --- Web Feature Service

Returns actual vector features.

    Database
         ↓
    GeoServer
         ↓
    GeoJSON / GML
         ↓
    Browser

## Returns

-   Points
-   Lines
-   Polygons
-   Attributes

Example

``` json
{
  "type":"Feature",
  "properties":{
      "crop":"Sugarcane"
  }
}
```

------------------------------------------------------------------------

## Operations

### GetCapabilities

Lists supported feature layers.

### DescribeFeatureType

Returns schema.

Similar to:

    DESCRIBE TABLE farms;

### GetFeature

Equivalent to:

    SELECT * FROM farms;

Returns vector data.

------------------------------------------------------------------------

## WFS-T

Transactional WFS.

Supports:

-   Insert
-   Update
-   Delete

Workflow

    OpenLayers
          ↓
    Transaction
          ↓
    GeoServer
          ↓
    PostGIS

------------------------------------------------------------------------

## Advantages

-   Editable
-   Feature selection
-   Measurements
-   Filtering

## Limitations

Large datasets become heavy.

------------------------------------------------------------------------

# 6. WMTS --- Web Map Tile Service

Returns cached map tiles.

    GeoServer

    ↓

    256 × 256 tiles

    ↓

    Browser

Instead of generating maps every request.

Usually powered by GeoWebCache.

------------------------------------------------------------------------

## Tile Pyramid

    Zoom 0

    □

    Zoom 1

    □□□□

    Zoom 2

    16 Tiles

Each zoom level divides the world into more tiles.

------------------------------------------------------------------------

## Advantages

-   Extremely fast
-   Ideal for basemaps
-   Cached

## Limitations

Usually read-only.

------------------------------------------------------------------------

# 7. WCS --- Web Coverage Service

Coverage = Continuous raster.

Examples

-   DEM
-   Satellite imagery
-   NDVI
-   Temperature
-   Rainfall

Unlike WMS,

WCS returns **actual raster values**, not pictures.

Useful for scientific analysis.

------------------------------------------------------------------------

# 8. Comparison

  Service   Returns         Editable   Typical Format     Best For
  --------- --------------- ---------- ------------------ ------------------
  WMS       Image           No         PNG/JPEG           Viewing
  WFS       Features        Yes        GeoJSON/GML        Editing
  WMTS      Tiles           No         Cached Tiles       High Performance
  WCS       Raster Values   Depends    GeoTIFF/Coverage   Analysis

------------------------------------------------------------------------

# 9. Which Service Should I Use?

## View Millions of Farms

Use **WMS**

------------------------------------------------------------------------

## Edit Boundaries

Use **WFS-T**

------------------------------------------------------------------------

## Satellite Basemap

Use **WMTS**

------------------------------------------------------------------------

## NDVI Analysis

Use **WCS**

------------------------------------------------------------------------

# 10. Overall Architecture

    React

    ↓

    OpenLayers

    ↓

    WMS / WFS / WMTS / WCS

    ↓

    GeoServer

    ↓

    PostGIS / Shapefile / GeoTIFF

------------------------------------------------------------------------

# 11. Interview Questions

## Basic

1.  Why does WMS return images instead of geometry?
2.  Why is WFS heavier than WMS?
3.  What is GetCapabilities?
4.  What is GetFeatureInfo?
5.  Why can't you edit WMS layers?

## Intermediate

6.  Difference between WMS and WMTS?
7.  Difference between WMS and WFS?
8.  Why does WMTS use 256×256 tiles?
9.  Why is WFS-T called transactional?
10. What is DescribeFeatureType?

## Advanced

1.  Why would a national map use WMS instead of WFS?
2.  How would you build a farm editing application?
3.  Which GeoServer service would BharatRohan use for:
    -   Drone imagery?
    -   Farm boundaries?
    -   Editing fields?
    -   NDVI analysis?
4.  Why are OGC standards important?
5.  Explain the request flow from OpenLayers to PostGIS.

------------------------------------------------------------------------

# Quick Cheat Sheet

  Need                         Service
  ---------------------------- ---------
  Display map                  WMS
  Click & edit features        WFS
  Fast cached maps             WMTS
  Scientific raster analysis   WCS

------------------------------------------------------------------------

# Key Takeaways

-   WMS = Images
-   WFS = Features
-   WMTS = Tiles
-   WCS = Raster Values
-   WFS-T = Editing
-   GetCapabilities = Service metadata
-   GetMap = Render image
-   GetFeature = Return vectors
-   GetFeatureInfo = Query clicked pixel
-   DescribeFeatureType = Feature schema
