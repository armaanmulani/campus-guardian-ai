import React, { useState } from 'react';

const CAMPUS_MAP_NODES = {
  "LibraryBasement": { id: "LibraryBasement", name: "Library Basement", x: 20, y: 80 },
  "MainGate": { id: "MainGate", name: "Main Gate", x: 50, y: 10 },
  "BlockA": { id: "BlockA", name: "Block A - Lab", x: 80, y: 50 },
  "BlockB": { id: "BlockB", name: "Block B", x: 60, y: 70 }
};

export default function MultiBluetoothTracker() {
  // Array to hold connected device objects: { id, name, node }
  const [activeDevices, setActiveDevices] = useState([]);
  const [status, setStatus] = useState("Ready to pair beacons (Max 4).");

  const connectNextBeacon = async () => {
    if (activeDevices.length >= 4) {
      setStatus("Maximum limit of 4 devices reached!");
      return;
    }

    try {
      setStatus(`Scanning for device #${activeDevices.length + 1}...`);

      // 1. Request Bluetooth Device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      });

      // 2. Prevent duplicate connections
      if (activeDevices.some(d => d.id === device.id)) {
        setStatus(`Device "${device.name}" is already connected.`);
        return;
      }

      // 3. Extract location identifier from device name
      // Expected format: "CampusBeacon-LibraryBasement"
      const deviceName = device.name || "Unknown";
      const nameParts = deviceName.split('-');
      const locationId = nameParts.length > 1 ? nameParts[1] : null;
      const matchedNode = locationId ? CAMPUS_MAP_NODES[locationId] : null;

      const newDeviceEntry = {
        id: device.id,
        name: deviceName,
        node: matchedNode // Contains { x, y, name } if matched
      };

      setActiveDevices((prev) => [...prev, newDeviceEntry]);

      if (matchedNode) {
        setStatus(`Connected to ${matchedNode.name}! (${activeDevices.length + 1}/4)`);
      } else {
        setStatus(`Connected to "${deviceName}", but location is not on map. (${activeDevices.length + 1}/4)`);
      }

    } catch (error) {
      console.error(error);
      setStatus("Pairing cancelled or Bluetooth unavailable.");
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Campus Guardian AI</h2>
      <p style={{ color: '#666' }}>Multi-Device Indoor Tracker (Max 4)</p>

      <button 
        onClick={connectNextBeacon} 
        disabled={activeDevices.length >= 4}
        style={{
          padding: '12px 24px',
          background: activeDevices.length >= 4 ? '#9ca3af' : '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: activeDevices.length >= 4 ? 'not-allowed' : 'pointer',
          width: '100%',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        📍 Connect Beacon ({activeDevices.length}/4)
      </button>

      <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#374151' }}>
        {status}
      </p>

      {/* Campus Map Container */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '400px', 
        background: '#e5e7eb', 
        border: '2px solid #ccc', 
        marginTop: '20px', 
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', color: '#9ca3af', fontWeight: 'bold' }}>Campus Map</div>

        {/* Static Map Nodes */}
        {Object.values(CAMPUS_MAP_NODES).map(node => (
          <div key={node.id} style={{
            position: 'absolute',
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ width: '12px', height: '12px', background: '#9ca3af', borderRadius: '50%', margin: '0 auto' }}></div>
            <span style={{ fontSize: '11px', color: '#4b5563' }}>{node.name}</span>
          </div>
        ))}

        {/* Render Active Device Dots */}
        {activeDevices.map((dev, index) => {
          if (!dev.node) return null; // Skip if no location mapping

          // Colors for up to 4 devices to distinguish them
          const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
          const color = colors[index % colors.length];

          return (
            <div key={dev.id} style={{
              position: 'absolute',
              left: `${dev.node.x}%`,
              top: `${dev.node.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.5s ease-in-out'
            }}>
              <div style={{ 
                width: '18px', 
                height: '18px', 
                background: color, 
                borderRadius: '50%', 
                boxShadow: `0 0 12px ${color}`,
                border: '2px solid white'
              }}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}