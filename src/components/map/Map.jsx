import React, { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl, LayerGroup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
// import L from "leaflet"

import features from "../../data/data.json";
import counties from "../../data/newcounties.json";

const Map = () => {
	const center = [-1.2921, 36.8219]
	const mapref = useRef()

	// counties stylr 
	const countyStyle = {
		weight: 1,
		color: "black",
		fillOpacity: 0,
		zoom: 0
	}

	// featuress style

	const featuressStyle = {
		fillColor: "white",
		weight: 1,
		color: "green",
		fillOpacity: 1,
		zIndex: 1
	}

	const onEachFeature = (country, layer) => {
		layer.options.fillColor = country.properties.color;
		const Area_Name = country.properties.AREANAME;
		const Perimeter = country.properties.PERIMETER;
		const Size = country.properties.SIZE;
		const Year_Est = country.properties.YEAR;
		const Longitude = country.properties.LON;
		const Latitude = country.properties.LAT;
		const Country_Name = country.properties.CNTRYNAME;
		const Type = country.properties.DESIGNATE;
		const Area = country.properties.AREA;

		layer.bindPopup(`
			Area_Name: ${Area_Name} <br />
			Perimeter: ${Perimeter} <br />
			Size: ${Size} <br />
			Year_Est: ${Year_Est} <br />
			Longitude: ${Longitude} <br />
			Latitude: ${Latitude} <br />
			Country_Name: ${Country_Name} <br />
			Type: ${Type} <br />
			Area: ${Area} <br />
			`)

	}

	const Icon = new L.Icon({
		iconUrl: require("../../images/markerIcons.png"),
		iconSize: [30, 40],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowAnchor: [12, 41]
	})

	return (
		<div>
			<h4>Kenya Protected Areas</h4>
			<MapContainer
				style={{ height: "600px", margin: "20px" }}
				zoom={7}
				center={center}
				ref={mapref}
			>
				<LayersControl>
					<LayersControl.Overlay checked name='openstreetmap'>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>

					</LayersControl.Overlay>

					<LayersControl.Overlay name='Google satellite'>
						<LayerGroup>
							<TileLayer
								url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
								attribution="&copy; <a href='https://www.google.com/maps'>Google</a>"
							/>
							<TileLayer
								url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}" // Labels overlay
							/>
						</LayerGroup>
					</LayersControl.Overlay>
				</LayersControl>

				<Marker
					position={center}
					icon={Icon}
				>
					<Popup>
						<h6>Nairobi</h6>
						<h6>Lat: -1.2921</h6>
						<h6>Lng: 36.8219</h6>
					</Popup>
				</Marker>

				<GeoJSON data={counties} style={countyStyle} />
				<GeoJSON data={features} style={featuressStyle} onEachFeature={onEachFeature} />
			</MapContainer>
		</div>
	)
}

export default Map