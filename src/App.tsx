/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import SpatialMap from './components/SpatialMap';
import KeyboardPanel from './components/KeyboardPanel';
import VaultPanel from './components/VaultPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="flex h-screen w-screen bg-[#0a0b0d] text-gray-200 overflow-hidden font-sans select-none" id="omnitype-root">
      {/* Vertical Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {activeTab === 'map' && <SpatialMap />}
        {activeTab === 'keyboard' && <KeyboardPanel />}
        {activeTab === 'vault' && <VaultPanel />}

        {/* Global Floating Status Bar */}
        <div className="fixed bottom-6 left-28 pointer-events-none">
          <div className="flex items-center gap-6 bg-[#151619]/90 px-4 py-2 rounded-full border border-gray-800 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">System Ready</span>
            </div>
            <div className="h-4 w-px bg-gray-800"></div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Kotlin Bridge: 1.2ms Latency</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

