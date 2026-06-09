import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function TaskMap({ tasks = [], center = [23.0225, 72.5714] }) {
  return (
    <MapContainer center={center} zoom={12} className="h-80 rounded-lg" scrollWheelZoom={false}>
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {tasks.map((task) => (
        <Marker key={task._id} position={[task.latitude, task.longitude]}>
          <Popup>
            <strong>{task.title}</strong>
            <br />
            {task.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
