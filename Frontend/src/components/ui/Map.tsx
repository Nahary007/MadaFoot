import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Link } from 'react-router-dom';
import { Field } from '../../types';

interface MapProps {
  fields: Field[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

const Map: React.FC<MapProps> = ({ 
  fields, 
  center = [-18.9105, 47.5214],  // Default center on Antananarivo
  zoom = 12,
  height = '500px' 
}) => {
  // Custom marker icon
  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden shadow-md z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {fields.map((field) => (
          <Marker 
            key={field.id} 
            position={field.coordinates}
            icon={customIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-primary-700">{field.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{field.address}</p>
                <Link 
                  to={`/field/${field.id}`}
                  className="text-xs btn-primary py-1 px-2 inline-block"
                >
                  Voir détails
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;