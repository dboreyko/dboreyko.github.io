interface SystemDiagramProps {
  phase: 'sensing' | 'stabilization' | 'navigation' | 'integration';
}

export function SystemDiagram({ phase }: SystemDiagramProps) {
  const diagrams = {
    sensing: (
      <svg viewBox="0 0 800 300" className="w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-steel)" />
          </marker>
        </defs>
        
        {/* Camera Input */}
        <rect x="50" y="120" width="120" height="60" fill="none" stroke="var(--gray-400)" strokeWidth="1.5" />
        <text x="110" y="155" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">CAMERA</text>
        
        {/* Arrow */}
        <line x1="170" y1="150" x2="240" y2="150" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="205" y="140" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">VIDEO</text>
        
        {/* Raspberry Pi 5 + AI HAT */}
        <rect x="240" y="100" width="160" height="100" fill="none" stroke="var(--accent-steel)" strokeWidth="2.5" />
        <text x="320" y="125" textAnchor="middle" fill="var(--gray-200)" fontSize="13" fontFamily="var(--font-mono)" fontWeight="500">RASPBERRY PI 5</text>
        <text x="320" y="145" textAnchor="middle" fill="var(--gray-400)" fontSize="10" fontFamily="var(--font-mono)">AI HAT+</text>
        <text x="320" y="165" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Human Detection</text>
        <text x="320" y="180" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Bounding Box</text>
        
        {/* Arrow */}
        <line x1="400" y1="150" x2="470" y2="150" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="435" y="140" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">OUTPUT</text>
        
        {/* Laptop Display */}
        <rect x="470" y="120" width="130" height="60" fill="none" stroke="var(--gray-400)" strokeWidth="1.5" />
        <text x="535" y="145" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">LAPTOP</text>
        <text x="535" y="160" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">DISPLAY</text>
      </svg>
    ),
    
    stabilization: (
      <svg viewBox="0 0 800 300" className="w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-steel)" />
          </marker>
        </defs>
        
        {/* Camera */}
        <rect x="50" y="80" width="100" height="50" fill="none" stroke="var(--gray-400)" strokeWidth="1.5" />
        <text x="100" y="110" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">CAMERA</text>
        
        {/* Arrow to Pi */}
        <line x1="150" y1="105" x2="210" y2="135" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* Raspberry Pi */}
        <rect x="210" y="120" width="140" height="70" fill="none" stroke="var(--accent-steel)" strokeWidth="2" />
        <text x="280" y="145" textAnchor="middle" fill="var(--gray-200)" fontSize="12" fontFamily="var(--font-mono)" fontWeight="500">RASPBERRY PI 5</text>
        <text x="280" y="165" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Error Vector</text>
        <text x="280" y="180" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Servo Control</text>
        
        {/* Arrow to Gimbal */}
        <line x1="350" y1="155" x2="410" y2="155" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="380" y="145" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">PWM</text>
        
        {/* Two-Axis Gimbal */}
        <rect x="410" y="100" width="150" height="110" fill="none" stroke="var(--accent-steel)" strokeWidth="2" />
        <text x="485" y="125" textAnchor="middle" fill="var(--gray-200)" fontSize="12" fontFamily="var(--font-mono)" fontWeight="500">2-AXIS GIMBAL</text>
        <text x="485" y="150" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Pan Servo</text>
        <text x="485" y="165" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Tilt Servo</text>
        <text x="485" y="185" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">+ LiDAR Mounted</text>
        <text x="485" y="200" textAnchor="middle" fill="var(--gray-600)" fontSize="8" fontFamily="var(--font-mono)">Distance Sensor</text>
        
        {/* Feedback arrow */}
        <path d="M 485 210 L 485 235 L 100 235 L 100 130" fill="none" stroke="var(--gray-500)" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arrowhead)" />
        <text x="290" y="250" textAnchor="middle" fill="var(--gray-600)" fontSize="8" fontFamily="var(--font-mono)">POSITION FEEDBACK</text>
      </svg>
    ),
    
    navigation: (
      <svg viewBox="0 0 800 320" className="w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-steel)" />
          </marker>
        </defs>
        
        {/* GPS */}
        <rect x="50" y="115" width="100" height="50" fill="none" stroke="var(--gray-400)" strokeWidth="1.5" />
        <text x="100" y="135" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">GPS</text>
        <text x="100" y="150" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">MODULE</text>
        
        {/* Onboard Sensors */}
        <rect x="50" y="185" width="100" height="50" fill="none" stroke="var(--gray-400)" strokeWidth="1.5" />
        <text x="100" y="205" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">IMU / BARO</text>
        <text x="100" y="220" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">SENSORS</text>
        
        {/* Arrows to Cube */}
        <line x1="150" y1="140" x2="240" y2="160" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="150" y1="210" x2="240" y2="180" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* Cube Orange+ Flight Computer */}
        <rect x="240" y="110" width="200" height="120" fill="none" stroke="var(--accent-steel)" strokeWidth="2.5" />
        <text x="340" y="140" textAnchor="middle" fill="var(--gray-200)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="500">CUBE ORANGE+</text>
        <text x="340" y="160" textAnchor="middle" fill="var(--gray-400)" fontSize="11" fontFamily="var(--font-mono)">Flight Computer</text>
        <text x="340" y="180" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Autopilot (PX4)</text>
        <text x="340" y="195" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Waypoint Navigation</text>
        <text x="340" y="210" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Stabilization</text>
        
        {/* Arrow to Motors */}
        <line x1="440" y1="170" x2="520" y2="170" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="480" y="160" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">ESC SIGNALS</text>
        
        {/* Motors */}
        <rect x="520" y="130" width="140" height="80" fill="none" stroke="var(--gray-400)" strokeWidth="1.5" />
        <text x="590" y="160" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">MOTORS +</text>
        <text x="590" y="180" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">PROPELLERS</text>
        <text x="590" y="198" textAnchor="middle" fill="var(--gray-600)" fontSize="8" fontFamily="var(--font-mono)">Autonomous Flight</text>
        
        {/* Safety note */}
        <rect x="240" y="250" width="200" height="30" fill="none" stroke="var(--gray-600)" strokeWidth="1" strokeDasharray="3,3" />
        <text x="340" y="270" textAnchor="middle" fill="var(--gray-600)" fontSize="9" fontFamily="var(--font-mono)">No Pi Control at This Stage</text>
      </svg>
    ),
    
    integration: (
      <svg viewBox="0 0 800 380" className="w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-steel)" />
          </marker>
        </defs>
        
        {/* Camera + LiDAR on Gimbal */}
        <rect x="50" y="140" width="100" height="80" fill="none" stroke="var(--gray-400)" strokeWidth="1.5" />
        <text x="100" y="165" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">CAMERA +</text>
        <text x="100" y="185" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">LiDAR</text>
        <text x="100" y="200" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">(on Gimbal)</text>
        <text x="100" y="215" textAnchor="middle" fill="var(--gray-600)" fontSize="8" fontFamily="var(--font-mono)">Distance Data</text>
        
        {/* Arrow to Pi */}
        <line x1="150" y1="180" x2="220" y2="180" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* Raspberry Pi */}
        <rect x="220" y="120" width="150" height="120" fill="none" stroke="var(--accent-steel)" strokeWidth="2.5" />
        <text x="295" y="145" textAnchor="middle" fill="var(--gray-200)" fontSize="13" fontFamily="var(--font-mono)" fontWeight="500">RASPBERRY PI 5</text>
        <text x="295" y="165" textAnchor="middle" fill="var(--gray-400)" fontSize="10" fontFamily="var(--font-mono)">AI HAT+</text>
        <text x="295" y="185" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Vision Tracking</text>
        <text x="295" y="200" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">LiDAR Distance</text>
        <text x="295" y="215" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Velocity Commands</text>
        <text x="295" y="230" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Gimbal Control</text>
        
        {/* Bidirectional MAVLink arrow to Cube */}
        <line x1="370" y1="170" x2="430" y2="170" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="430" y1="190" x2="370" y2="190" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="400" y="160" textAnchor="middle" fill="var(--gray-500)" fontSize="8" fontFamily="var(--font-mono)">MAVLink / UART</text>
        <text x="400" y="205" textAnchor="middle" fill="var(--gray-600)" fontSize="8" fontFamily="var(--font-mono)">Telemetry</text>
        
        {/* Cube Flight Computer */}
        <rect x="430" y="120" width="160" height="120" fill="none" stroke="var(--accent-steel)" strokeWidth="2.5" />
        <text x="510" y="145" textAnchor="middle" fill="var(--gray-200)" fontSize="13" fontFamily="var(--font-mono)" fontWeight="500">CUBE ORANGE+</text>
        <text x="510" y="165" textAnchor="middle" fill="var(--gray-400)" fontSize="11" fontFamily="var(--font-mono)">Flight Computer</text>
        <text x="510" y="185" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Receives Velocity</text>
        <text x="510" y="200" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Position Commands</text>
        <text x="510" y="215" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Flight Execution</text>
        <text x="510" y="230" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Safety Logic</text>
        
        {/* Arrow to Motors */}
        <line x1="590" y1="180" x2="650" y2="180" stroke="var(--accent-steel)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* Motors */}
        <rect x="650" y="150" width="100" height="60" fill="none" stroke="var(--gray-400)" strokeWidth="1.5" />
        <text x="700" y="175" textAnchor="middle" fill="var(--gray-300)" fontSize="11" fontFamily="var(--font-mono)">MOTORS</text>
        <text x="700" y="195" textAnchor="middle" fill="var(--gray-500)" fontSize="9" fontFamily="var(--font-mono)">Propulsion</text>
        
        {/* Laptop monitoring */}
        <rect x="240" y="280" width="130" height="70" fill="none" stroke="var(--gray-500)" strokeWidth="1.5" strokeDasharray="4,4" />
        <text x="305" y="305" textAnchor="middle" fill="var(--gray-400)" fontSize="11" fontFamily="var(--font-mono)">LAPTOP</text>
        <text x="305" y="325" textAnchor="middle" fill="var(--gray-600)" fontSize="9" fontFamily="var(--font-mono)">Live Monitoring</text>
        <text x="305" y="340" textAnchor="middle" fill="var(--gray-600)" fontSize="9" fontFamily="var(--font-mono)">Target Tracking</text>
        
        {/* Connection lines to laptop */}
        <line x1="295" y1="240" x2="280" y2="280" stroke="var(--gray-600)" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="510" y1="240" x2="350" y2="280" stroke="var(--gray-600)" strokeWidth="1" strokeDasharray="3,3" />
      </svg>
    ),
  };

  return (
    <div className="w-full bg-[var(--bg-lab)] p-8 rounded-sm overflow-x-auto">
      <style>{`
        svg text {
          user-select: none;
        }
      `}</style>
      {diagrams[phase]}
    </div>
  );
}
