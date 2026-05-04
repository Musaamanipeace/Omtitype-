/**
 * HardwareService.ts
 * Equivalent to the "Kotlin Bridge" / MethodChannel.
 * Implements Web Bluetooth logic for HID-like communication.
 */

export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error'
}

export interface HIDEvent {
  usage: number;
  value: number;
  timestamp: number;
}

class HardwareService {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private status: ConnectionStatus = ConnectionStatus.DISCONNECTED;
  private listeners: ((status: ConnectionStatus) => void)[] = [];

  public getStatus(): ConnectionStatus {
    return this.status;
  }

  public subscribe(callback: (status: ConnectionStatus) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private setStatus(newStatus: ConnectionStatus) {
    this.status = newStatus;
    this.listeners.forEach(l => l(newStatus));
  }

  /**
   * Request a Bluetooth HID device.
   * Note: Browsers have strict security on HID reports via Web Bluetooth.
   */
  public async connect() {
    try {
      this.setStatus(ConnectionStatus.CONNECTING);
      
      if (!navigator.bluetooth) {
        throw new Error('Web Bluetooth is not supported in this browser.');
      }

      // We look for HID-capable devices
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['human_interface_device'] }],
        optionalServices: ['battery_service', 'device_information']
      });

      if (!this.device) {
        throw new Error('No device selected');
      }

      this.device.addEventListener('gattserverdisconnected', () => {
        this.setStatus(ConnectionStatus.DISCONNECTED);
      });

      this.server = await this.device.gatt?.connect() || null;
      
      if (this.server) {
        this.setStatus(ConnectionStatus.CONNECTED);
      } else {
        throw new Error('Failed to connect to GATT server');
      }
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
      this.setStatus(ConnectionStatus.ERROR);
    }
  }

  public async disconnect() {
    if (this.device && this.device.gatt?.connected) {
      this.device.gatt.disconnect();
    }
    this.setStatus(ConnectionStatus.DISCONNECTED);
  }

  /**
   * Simulates sending a raw HID key event.
   * In a real HID implementation, we would write to the HID Control Point or Report characteristic.
   */
  public async sendKeyEvent(usageId: number) {
    if (this.status !== ConnectionStatus.CONNECTED) {
      console.warn('Cannot send event: Not connected');
      return;
    }
    
    console.log(`Sending HID Key Event: Usage ID ${usageId}`);
    // implementation details would go here for real hardware
  }
}

export const hardwareService = new HardwareService();
