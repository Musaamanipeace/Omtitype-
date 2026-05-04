import { Lock, Fingerprint, Eye, EyeOff, Plus, Search } from 'lucide-react';
import { useState } from 'react';

export default function VaultPanel() {
  const [showSensitive, setShowSensitive] = useState(false);

  const secrets = [
    { id: 1, name: 'Root SSH Key', type: 'Private Key', created: '2024-03-10' },
    { id: 2, name: 'Cloud Provider Secret', type: 'OAuth Token', created: '2024-02-15' },
    { id: 3, name: 'Database Encryption Key', type: 'AES-256', created: '2024-01-22' },
  ];

  return (
    <div className="flex-1 bg-[#111214] p-8 flex flex-col gap-8 h-full">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest">Security / Storage</h2>
          <h1 className="text-white text-2xl font-bold tracking-tight mt-1">Encrypted Vault</h1>
          <p className="text-zinc-500 text-sm mt-2 max-w-md">
            Secure storage for hardware-bound secrets.
            <span className="block mt-1 text-emerald-500/80 font-mono text-[10px]">VERIFIED // AES-256-GCM</span>
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase rounded-lg hover:bg-zinc-700 transition-all flex items-center gap-2 border border-zinc-700">
            <Search className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-indigo-500 text-white text-[10px] font-bold uppercase rounded-lg hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            New Secret
          </button>
        </div>
      </div>

      <div className="flex-1 border border-gray-800 rounded-2xl bg-[#151619] overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-4 px-6 py-4 bg-black/20 border-b border-gray-800">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Identifier</span>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Protocol</span>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Deployment</span>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest text-right">Actions</span>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto">
          {secrets.map((secret) => (
            <div key={secret.id} className="grid grid-cols-4 px-6 py-4 border-b border-gray-800/50 hover:bg-zinc-800/20 transition-colors items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Lock className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-sm text-zinc-200 font-medium">{secret.name}</span>
              </div>
              <span className="text-[11px] font-mono text-gray-500">{secret.type}</span>
              <span className="text-[11px] font-mono text-gray-500">{secret.created}</span>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setShowSensitive(!showSensitive)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showSensitive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                  <Fingerprint className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/20 border-t border-gray-800 flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vault Synchronized</span>
          </div>
          <span className="text-[10px] font-mono text-gray-600 uppercase tracking-tighter">3 / 50 SLOTS</span>
        </div>
      </div>
    </div>
  );
}
