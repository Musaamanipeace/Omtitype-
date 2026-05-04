import { useState, useEffect } from 'react';
import { Bluetooth, BluetoothOff, Keyboard as KeyboardIcon, Activity, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { hardwareService, ConnectionStatus } from '../services/HardwareService';

export default function KeyboardPanel() {
  const [status, setStatus] = useState<ConnectionStatus>(hardwareService.getStatus());
  const [lastKey, setLastKey] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = hardwareService.subscribe(setStatus);
    return unsubscribe;
  }, []);

  const handleConnect = () => {
    hardwareService.connect();
  };

  const handleDisconnect = () => {
    hardwareService.disconnect();
  };

  const simulateKeyPress = (key: string, usageId: number) => {
    setLastKey(key);
    hardwareService.sendKeyEvent(usageId);
    setTimeout(() => setLastKey(null), 200);
  };

  const keys = [
    { label: 'ESC', id: 0x29 },
    { label: 'TAB', id: 0x2B },
    { label: 'SPACE', id: 0x2C },
    { label: 'ENTER', id: 0x28 },
    { label: 'CMD', id: 0xE3 },
    { label: 'OPT', id: 0xE2 },
  ];

  return (
    <div className="flex-1 bg-[#111214] p-8 flex flex-col gap-8 h-full">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest">Input Interface</h2>
          <h1 className="text-white text-2xl font-bold tracking-tight mt-1">HID Controller</h1>
          <p className="text-zinc-500 text-sm mt-2 max-w-md">
            Connect your device to act as a virtual HID keyboard. 
            Native bridge latency: <span className="text-indigo-400 font-mono">1.2ms</span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-6 bg-[#151619] px-4 py-2 rounded-full border border-gray-800">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                status === ConnectionStatus.CONNECTED ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' :
                status === ConnectionStatus.CONNECTING ? 'bg-yellow-500 animate-pulse' :
                'bg-zinc-700'
              }`} />
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">{status}</span>
            </div>
          </div>

          {status === ConnectionStatus.CONNECTED ? (
            <button 
              onClick={handleDisconnect}
              className="px-6 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
            >
              <BluetoothOff className="w-3 h-3" />
              Terminate
            </button>
          ) : (
            <button 
              onClick={handleConnect}
              disabled={status === ConnectionStatus.CONNECTING}
              className="px-6 py-2 bg-indigo-500 text-white text-[10px] font-bold uppercase rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Bluetooth className="w-3 h-3" />
              Initialize HID
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 h-full">
        {/* Key Matrix */}
        <div className="col-span-8 bg-[#151619] border border-gray-800 rounded-2xl p-5 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-indigo-400">
            <KeyboardIcon className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Emulator Matrix</span>
          </div>

          <div className="grid grid-cols-3 gap-3 flex-1">
            {keys.map((key) => (
              <motion.button
                key={key.label}
                whileTap={{ scale: 0.95 }}
                onClick={() => simulateKeyPress(key.label, key.id)}
                disabled={status !== ConnectionStatus.CONNECTED}
                className={`rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  lastKey === key.label 
                    ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/40' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-indigo-500/50 hover:text-indigo-400'
                } disabled:opacity-10`}
              >
                <span className="text-[9px] font-mono opacity-50">0x{key.id.toString(16).toUpperCase()}</span>
                <span className="text-sm font-bold uppercase tracking-tight">{key.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Status / Log Bento */}
        <div className="col-span-4 flex flex-col gap-4">
          <div className="flex-1 bg-[#151619] rounded-2xl border border-gray-800 p-5 flex flex-col">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">HID Event Log</span>
            <div className="flex-1 overflow-hidden space-y-1">
              <div className="text-[9px] font-mono text-gray-500 border-l border-indigo-500/30 pl-2">{"[STATUS] -> IDLE_STATE"}</div>
              {lastKey && (
                <>
                  <div className="text-[9px] font-mono text-white border-l-2 border-indigo-500 pl-2">
                    {"[EVENT] -> KEY_DOWN"} ({lastKey})
                  </div>
                  <div className="text-[9px] font-mono text-gray-400 border-l border-indigo-500/50 pl-2">
                    {"[EVENT] -> PKT_SENT"}: 0x{keys.find(k => k.label === lastKey)?.id.toString(16).toUpperCase()}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/40 to-transparent rounded-2xl border border-indigo-500/20 p-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider">Bridge Target</div>
              <div className="text-sm text-white font-medium">OMNI_VIRT_HID</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
