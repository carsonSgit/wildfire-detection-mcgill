/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED"),
    fire = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-122.14585693359376, 57.739540282751676],
          [-122.14585693359376, 57.42444455036817],
          [-121.26832397460939, 57.42444455036817],
          [-121.26832397460939, 57.739540282751676]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/*
  Done in accordance of demo given by Flavie Pelletier, McGill researcher
*/

var dataset2023 = s2
                  .filterDate("2023-05-01", "2023-07-30")
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))

// var visualization = {
//   min: 0,
//   max: 3000,
//   band: ['B4', 'B3', 'B2']
// }
var vis = {
   min: 0,
   max: 3000,
   band: ['B12', 'B8', 'B4']
}

Map.setCenter(-121.83, 57.57, 10)

Map.addLayer(dataset2023.mean(), vis, 'RGB Mean')
Map.addLayer(dataset2023.median(), vis, 'RGB Median')
Map.addLayer(dataset2023.mosaic(), vis, 'RGB Mosaic')

//PART 1: Calculate indecies
//normalize burn ratio

var fireMosaic = dataset2023.mosaic()
var nir = fireMosaic.select('B8')
var swir = fireMosaic.select('B12')
var nbr2023 = nir.subtract(swir).divide(nir.add(swir))

Map.addLayer(nbr2023, {min:-0.5, max:1}, 'NBR')

var nbr2023 = fireMosaic.normalizedDifference(['B8', 'B12'])
Map.addLayer(nbr2023, {min:-0.5, max:1}, 'NBR2')

//Part 1.4 Mapping Functions
function addNBR(image){
  var nbr = image.normalizedDifference(['B8', 'B12'])
      nbr = nbr.rename('nbr');
    return(image.addBands(nbr))
}

dataset2023 = dataset2023.map(addNBR)

//Part 1.5: Change Detection
var dataset2022 = s2
                  .filterDate("2022-05-01", "2022-07-30")
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(addNBR)

var nbr2023 = dataset2023.mosaic().select('nbr')
var nbr2022 = dataset2022.mosaic().select('nbr')

var dnbr = nbr2022.subtract(nbr2023)

Map.addLayer(nbr2022, {min: -1, max: 1}, '2022 nbr')
Map.addLayer(nbr2023, {min: -1, max: 1}, '2023 nbr')
Map.addLayer(dnbr, {min: -1, max: 1}, 'dnbr')

var burnedPixels = dnbr.gt(0.5);
Map.addLayer(burnedPixels, {min:0, max:1}, 'Burned pixels')

var burnedDNBR = dnbr.updateMask(burnedPixels)
Map.addLayer(burnedDNBR, {palette: 'red'}, 'Only Burned pixels')

var meanBurnedDNBR = burnedDNBR.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: fire,
  scale: 10,
  maxPixels: 1e10
}).getNumber('nbr');

print('Mean dNBR of the fire:', meanBurnedDNBR);


// Part 1.6, Calculate Statistics over a region
  // .... follow along with rest of slides