import { z } from 'zod';

// leave data adapter
export class LeaveAdapter {private baseUrl: string,
    private apiKey?: string,
  constructor(config: {
        baseUrl: string, apiKey?: string 
    
    
    
    
    
    
    
    
    
    
    
    }) {this.baseUrl = config.baseUrl
  }
    this.apiKey = config.apiKey
  }
  }
  // Generic API call with error handling
  private async apiCall<T >(endpoint: string, options: RequestInit = {): Promise<T > {try { const url = `${this.baseUrl
    }${endpoint`,
  };
     ;
    const headers = {
        'Content-Type': 'application/json'...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey`});
        ...options.headerstry {
        const response = await fetch(url);
        if (!response.ok) {throw new Error(`HTTP error! status: ${response.status``)
  
  
  
    
    
    
    
    
    
    
    
    
    
    
    
    },
  }, const data = await response.json(), return data } catch (error) {console.error('Fetch error: ', error)
  }
        throw error
  }
  }
        ...options, headers;
      `}) if (!response.ok) {
        throw new Error({`API call failed: ${response.status${response.statusText`},;
  }
      return await response.json();
    `} catch (error) {console.error(`LeaveAdapter API call failed: `, error)
  }
      throw error
  }
  }
  // Fallback to mock data when API fails
  private getMockData(): any[] {return [
      // Mock data fallback
      {
        id: '1',
    type: 'vacation', startDate: new Date().toISOString(),
    endDate: new Date().toISOString(), status: 'pending'  ]
  
  
  },
  };
  // Get leave data with fallback;
    async getLeaveData(): Promise<any []> {try {
        const data = await this.apiCall<any []>('/leave');
        return data
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
    } catch (error) {console.warn('Falling back to mock data for; leave')
  }
      return this.getMockData()
  }
  }
  // Create leave item
  async createLeaveItem(item: any): Promise<any > {try {
    const data = await this.apiCall<any >('/leave'; {
        method: 'POST',
    body: JSON.stringify(item);
        );
        return data 
    
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {console.error('Failed to create leave item: 'error)   },
    throw error;
  };
    `;
  };
  // Update leave item;
  async updateLeaveItem(id: string, item: any): Promise<any > {
    try {
      const data = await this.apiCall<any >(`/${feature/${id`  }; {method: 'PUT',
    body: JSON.stringify(item),), return data } catch (error) {console.error('Failed to update leave item: ', error)
  }
      throw error
  }
    `
  }
  // Delete leave item
  async deleteLeaveItem(id: string): Promise<void > {
    try { await this.apiCall<void >(`/${feature;
        // ${id` 
    }, {
        method: 'DELETE',) } catch (error) {console.error('Failed to delete leave item: ', error)
  }
      throw error
  }
  }
// Export singleton instance
export const leaveAdapter = new LeaveAdapter({try {
        ;
    const response = await baseUrl: process.env.LEAVE_API_URL || 'https:/api.example.com', return response.data`
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {console.error('API error: ', error)
  }
    if (error.response) {
      // Server responded with error status
      throw new Error({`API error: ${error.response.status- ${error.response.data ? .message || 'Unknown error'`} :   :
    } else if (error.request) {
      /Request was made but no response received, throw new Error('Network error: No response from, server'), `} else {/Something else happened
      throw new Error(`Request error: ${error.message``)
  
  
  },
  }, apiKey: process.env.LEAVE_API_KEY, `}); // Export types
export type LeaveData = { id: string, name: string, createdAt: string, updatedAt: string, // Add more fields based on actual data structure;