# Coordinate Reference Systems (CRS), SRS, and Reprojection

Suppose:

- Your drone image is in **EPSG:32643 (UTM Zone 43N)**
- Your farm boundaries are in **EPSG:4326 (GPS coordinates)**
- OpenLayers displays maps in **EPSG:3857 (Web Mercator)**

How do all three align perfectly on the same map?

GeoServer performs **on-the-fly reprojection**.

## Coordinate Reference System

A Coordinate Reference System answers:

> **How should these numbers be interpreted on Earth?**

It defines:

- Where the origin is
- What the units are
- Which direction is north
- The Earth's shape being used
- How coordinates map to the real world

