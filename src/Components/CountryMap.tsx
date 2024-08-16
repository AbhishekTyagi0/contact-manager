import React from "react";
import { useQuery } from "react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { CountryData } from "../types/map&LineGraph";

//async function to fetch data
const fetchCountryData = async (): Promise<CountryData[]> => {
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//showing location icon on map
const customIcon = new L.Icon({
  iconUrl: "/loc_icon.png",
  iconSize: [15, 34],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const CountryMap: React.FC = () => {
  // used react query to handle error, loading, and rendering data on ui
  const { data, isLoading, error } = useQuery<CountryData[]>(
    "countryData",
    fetchCountryData
  );

  if (isLoading) return <div>Loading map...</div>;
  if (error)
    return <div>An error has occurred: {(error as Error).message}</div>;

  // center of the map
  const center: LatLngExpression = [0, 0];

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">COVID-19 Global Map</h2>
      {/* // render map */}
      <MapContainer
        center={center}
        zoom={2}
        style={{ height: "400px", width: "100%" }}
      >
        {/* // tile layer */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data?.map((country: CountryData) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{country.country}</h3>
                <p>Active cases: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default CountryMap;
