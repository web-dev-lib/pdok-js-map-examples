import 'ol/ol.css'
import stylefunction from 'ol-mapbox-style'
import { Map, View } from 'ol'
import WMTSSource from 'ol/source/WMTS'
import TileLayer from 'ol/layer/Tile.js'
import WMTSTileGrid from 'ol/tilegrid/WMTS.js'
import { get as getProjection, fromLonLat } from 'ol/proj'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import { getTopLeft, getWidth } from 'ol/extent.js'
import { applyStyle } from 'ol-mapbox-style'
import styleDoc from './style.json'

const BRTA_ATTRIBUTION = 'Kaartgegevens: © <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a><span class="printhide">-auteurs (<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>).</span>'

const mvtLayer = new VectorTileLayer({
    declutter: true,
    source: new VectorTileSource({
        type: "vector",
        attributions: BRTA_ATTRIBUTION,
        format: new MVT(),
        url: `https://geodata.nationaalgeoregister.nl/beta/topotiles/{z}/{x}/{y}.pbf`,
        maxZoom: 14
    })
})

let sourceName = Object.keys(styleDoc.sources)[0]

applyStyle(mvtLayer, styleDoc, sourceName).then(function () {
    let styleFunction = mvtLayer.getStyle()
    mvtLayer.setStyle(function (feature, resolution) {
        return styleFunction(feature, resolution)
    })
})

const map = new Map({
    layers: [
        mvtLayer
    ],
    target: 'map',
    view: new View({
        center: fromLonLat([5.43, 52.18]),
        zoom: 8
    })
})


