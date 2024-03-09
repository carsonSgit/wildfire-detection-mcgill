# :earth_americas: Google Earth Engine Fire Detection and Analysis

Welcome to the Google Earth Engine Wildfire Detection and Analysis repository! This repository contains code implemented in Google Earth Engine (GEE) for fire detection and analysis, inspired by the methodology presented by [Flavie Pelletier](https://www.linkedin.com/in/flavie-pelletier-199074bb/?originalSubdomain=ca), a PhD graduate at McGill University.

## 📋 Instructions

**Two Paths to Run the Code:**

1. **Using My Google Earth Engine Project:**
   - Navigate to my Google Earth Engine [project](https://code.earthengine.google.com/4a1aaec3de523c2255c597c8bcd49451).
   - Tweak parameters like dates, regions of interest, or visualization settings as necessary.
   - Execute the script.

2. **Directly via Google Earth Engine:**
   - Access Google Earth Engine [here](https://earthengine.google.com/).
   - Paste the provided JavaScript code into the Earth Engine Code Editor.
   - Customize parameters such as dates, regions of interest, or visualization settings if required.
   - Run the script.

> Remember to adjust the parameters according to your analysis needs. 🛠️

## 📊 Code Overview

### 📦 Data Collection

The script initiates by filtering Sentinel-2 satellite imagery for the designated time frame (May to July 2023) with a cloud cover threshold set at 20%. This refined dataset serves as the foundation for analyses.

### 🎨 Visualization

Various layers are added to the map for improved visualizing; RGB mean, median, and mosaic representations of the filtered dataset.

### 📈 Index Calculation

Normalized Burn Ratio (NBR) is computed using Sentinel-2 bands B8 (NIR) and B12 (SWIR). The script demonstrates two methodologies for NBR calculation. Furthermore, a mapping function is delineated to integrate NBR as a new band into each image within the dataset.

## ⚙️ Dependencies

- A Google Earth Engine account with access to its JavaScript API.
- Availability of Sentinel-2 satellite imagery within Google Earth Engine.
