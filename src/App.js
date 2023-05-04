import "./App.css";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function App() {
  const [marker, setMarker] = useState([[19.4100819, -99.1630388]]);

  const Search = (props) => {
    const map = useMap();
    const { provider } = props;
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider,
      });

      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [props]);

    return null;
  };

  const addMarker = (e) => {
    console.log(e);
    // setMarker(e.latlng);
  };

  return (
    <div className="App">
      <MapContainer
        center={[40.505, -100.09]}
        // onClick={(e = addMarker(e))}
        zoom={5}
      >
        <Search provider={new OpenStreetMapProvider()} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[40.505, -100.09]}
          eventHandlers={{
            click: (e) => {
              console.log("marker clicked", e);
            },
          }}
        >
          <Popup>I am a pop-up!</Popup>
        </Marker>
      </MapContainer>
      <div style={{ backgroundColor: 'red', width: 100, height: 100 }}>{JSON.stringify(new Date().toISOString().split('T')[0])}</div>
    </div>
  );
}

export default App;
