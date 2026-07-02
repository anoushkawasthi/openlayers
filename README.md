# OpenLayers Learning

Personal study notes for building web maps with [OpenLayers](https://openlayers.org/) and the React concepts needed to use it effectively.

## Repository structure

```
openlayers_learning/
├── 01Gis_basics/          # GIS fundamentals and OpenLayers concepts
└── 02 React Hooks/        # React hooks (prerequisite for ol + React)
```

## 01 — GIS basics

| Topic | File |
|-------|------|
| What is GIS? | [gis-mapping-coordinates.md](01Gis_basics/gis-mapping-coordinates.md) |
| Map projections (EPSG:4326, EPSG:3857) | [map-projections.md](01Gis_basics/map-projections.md) |
| Vector vs raster data | [vector-raster data.md](01Gis_basics/vector-raster%20data.md) |
| Layer types (Tile, Vector, Image, …) | [layers.md](01Gis_basics/layers.md) |
| OpenLayers + `useRef` example | [useref.md](01Gis_basics/useref.md) |

## 02 — React hooks

| Topic | File |
|-------|------|
| Why hooks exist & overview | [reacthooks.md](02%20React%20Hooks/reacthooks.md) |
| How React works under the hood | [How react works.md](02%20React%20Hooks/How%20react%20works.md) |
| `useState` | [uestate_hook.md](02%20React%20Hooks/uestate_hook.md) |
| `useRef` | [useRef.md](02%20React%20Hooks/useRef.md) |

## Suggested reading order

1. **GIS foundations** — coordinates, projections, vector/raster data, layers
2. **React fundamentals** — how React works, then `useState` and `useRef`
3. **OpenLayers in React** — [useref.md](01Gis_basics/useref.md) ties hooks to map initialization

## Tech stack

- [OpenLayers](https://openlayers.org/) — web mapping library
- [React](https://react.dev/) — UI library (hooks for state and DOM refs)
- Coordinate systems: EPSG:4326 (WGS 84) and EPSG:3857 (Web Mercator)
