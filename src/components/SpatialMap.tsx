import { motion } from 'motion/react';
import { Crosshair, Cpu, Radio, Zap } from 'lucide-react';

export default function SpatialMap() {
  return (
    <div className="flex-1 bg-[#111214] relative overflow-hidden flex flex-col group border border-gray-800 rounded-3xl m-6" id="spatial-map">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#312e81 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Header Info */}
      <div className="p-6 flex justify-between items-start z-10">
        <div>
          <h2 className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest">Environment / Engine</h2>
          <h1 className="text-white text-2xl font-bold tracking-tight mt-1">Spatial Mapping</h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span className="text-[11px] font-mono text-indigo-300">SPATIAL_MAP_ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-12 z-10">
        <div className="relative w-full h-full border border-indigo-500/20 rounded-3xl overflow-hidden bg-[#151619]/30 backdrop-blur-sm">
          {/* Centered Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-px h-full bg-indigo-500/50" />
            <div className="h-px w-full bg-indigo-500/50 absolute" />
          </div>

          {/* Simulated Map Objects */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[500px] h-[300px] border border-indigo-500/30 rounded-full flex items-center justify-center">
              <div className="w-[300px] h-[180px] border border-indigo-500/20 rounded-full"></div>
              
              {/* Circular Radar Sweep */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0% 80%, rgba(99, 102, 241, 0.05) 100%)'
                }}
              />

              {/* Data Nodes */}
              <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff]"></div>
              <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-indigo-400 rounded-full"></div>
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-indigo-400 rounded-full"></div>
            </div>
          </motion.div>

          {/* Coordinates Overlay */}
          <div className="absolute bottom-6 left-6 text-indigo-500/40 text-[10px] font-mono">
            AZIMUTH: 182.4° // PITCH: 12.1°
          </div>
        </div>
      </div>

      {/* Footer Info Lines */}
      <div className="p-6 border-t border-zinc-900 grid grid-cols-4 gap-8">
        {[
          { label: 'Delta V', value: '45.1 m/s' },
          { label: 'Flux Density', value: '0.88' },
          { label: 'Packet Integrity', value: '99.9%' },
          { label: 'Signal SNR', value: '+32dB' },
        ].map((stat, i) => (
          <div key={i}>
            <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-tighter">{stat.label}</p>
            <p className="text-zinc-400 font-mono text-xs">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
