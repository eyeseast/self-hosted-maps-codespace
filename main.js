import maplibregl from "maplibre-gl";
import * as pmtiles from "pmtiles";
import layers from "protomaps-themes-base";

const protocol = new pmtiles.Protocol();

maplibregl.addProtocol("pmtiles", protocol.tile);

const style = {
  version: 8,
  glyphs: "./fonts/{fontstack}/{range}.pbf",
  sources: {
    protomaps: {
      type: "vector",
      url: "pmtiles://" + "baltimore.pmtiles",
      attribution:
        '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
    },

    // load our tree data
    trees: {
      type: "vector",
      url: "pmtiles://" + "trees.pmtiles",
    },
  },

  // this builds a set of layers matching the OpenMapTiles schema, using "protomaps" as a source ID
  layers: layers("protomaps", "light"),
};

const map = new maplibregl.Map({
  container: "map",
  style,
  maxBounds: [-76.861861, 39.096181, -76.360388, 39.454149],
  hash: true,
  center: [-76.6055754, 39.2835701],
  zoom: 13,
});

map.once("load", (e) => {
  const firstSymbolLayer = map
    .getStyle()
    .layers.find((layer) => layer.type === "symbol");

  // add our tree layer here
  map.addLayer(
    {
      id: "trees",
      type: "circle",
      source: "trees",
      "source-layer": "trees",
      paint: {
        "circle-color": "green",
        "circle-opacity": 0.5,
        "circle-radius": 3,
      },
    },
    firstSymbolLayer.id
  );
});

window.map = map;
