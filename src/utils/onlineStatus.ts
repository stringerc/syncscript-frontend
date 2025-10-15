// Online Status Utility
// This utility handles online/offline status detection and management

interface OnlineStatus {
  isOnline: boolean;
  lastCheck: Date;
  connectionType: string;
  reliability: number;
}

class OnlineStatusManager {
  private status: OnlineStatus = {
    isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
    lastCheck: new Date(),
    connectionType: 'unknown',
    reliability: 1.0
  };

  private listeners: Array<(status: OnlineStatus) => void> = [];
  private checkInterval: NodeJS.Timeout | null = null;

  constructor() {
    // SSR protection - only initialize on client side
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    // SSR protection - only run on client side
    if (typeof window === 'undefined') return;
    
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // Start periodic checks
    this.startPeriodicCheck();
  }

  private handleOnline = () => {
    this.updateStatus(true);
  };

  private handleOffline = () => {
    this.updateStatus(false);
  };

  private async performConnectivityTest(): Promise<boolean> {
    try {
      // Try to fetch a small resource to test connectivity
      const response = await fetch('/favicon.ico', {
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000)
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  private async checkConnection(): Promise<void> {
    const isOnline = await this.performConnectivityTest();
    this.updateStatus(isOnline);
  }

  private updateStatus(isOnline: boolean) {
    const wasOnline = this.status.isOnline;
    this.status = {
      isOnline,
      lastCheck: new Date(),
      connectionType: this.getConnectionType(),
      reliability: this.calculateReliability(isOnline, wasOnline)
    };

    // Notify listeners
    this.listeners.forEach(listener => listener(this.status));
  }

  private getConnectionType(): string {
    // @ts-ignore - navigator.connection is not in all browsers
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      return connection.effectiveType || connection.type || 'unknown';
    }
    
    return 'unknown';
  }

  private calculateReliability(currentOnline: boolean, wasOnline: boolean): number {
    // Simple reliability calculation based on connection stability
    if (currentOnline && wasOnline) {
      return Math.min(this.status.reliability + 0.1, 1.0);
    } else if (!currentOnline && !wasOnline) {
      return Math.max(this.status.reliability - 0.1, 0.0);
    }
    
    return this.status.reliability;
  }

  private startPeriodicCheck() {
    this.checkInterval = setInterval(() => {
      this.checkConnection();
    }, 30000); // Check every 30 seconds
  }

  private stopPeriodicCheck() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  // Public API
  public getStatus(): OnlineStatus {
    return { ...this.status };
  }

  public isOnline(): boolean {
    return this.status.isOnline;
  }

  public addListener(listener: (status: OnlineStatus) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public async forceCheck(): Promise<OnlineStatus> {
    await this.checkConnection();
    return this.getStatus();
  }

  public destroy() {
    // SSR protection - only run on client side
    if (typeof window === 'undefined') return;
    
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    this.stopPeriodicCheck();
    this.listeners = [];
  }
}

// Create singleton instance
export const onlineStatusManager = new OnlineStatusManager();

// Convenience functions
export const checkOnlineStatus = (): boolean => {
  return onlineStatusManager.isOnline();
};

export const getOnlineStatus = (): OnlineStatus => {
  return onlineStatusManager.getStatus();
};

export const addOnlineStatusListener = (listener: (status: OnlineStatus) => void): (() => void) => {
  return onlineStatusManager.addListener(listener);
};

export const forceOnlineStatusCheck = (): Promise<OnlineStatus> => {
  return onlineStatusManager.forceCheck();
};

// Export types
export type { OnlineStatus };

// Export for testing
export const __test__ = {
  OnlineStatusManager,
  onlineStatusManager
};
