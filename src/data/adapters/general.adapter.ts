import { z } from 'zod';

// general data adapter
export class GeneralAdapter {private baseUrl: string,
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
    `} catch (error) {console.error(`GeneralAdapter API call failed: `, error)
  }
      throw error
  }
  }
  // Fallback to mock data when API fails
  private getMockData(): any[] {return [
      // Mock data fallback
      {
      id: '1',
    name: 'Sample general', createdAt: new Date().toISOString()]
  ,
  };
  // Get general data with fallback;
    async getGeneralData(): Promise<any []> {try {
        const data = await this.apiCall<any []>('/general');
        return data
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
    } catch (error) {console.warn('Falling back to mock data for; general')
  }
      return this.getMockData()
  }
  }
  // Create general item
  async createGeneralItem(item: any): Promise<any > {try {
    const data = await this.apiCall<any >('/general'; {
        method: 'POST',
    body: JSON.stringify(item);
        );
        return data 
    
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {console.error('Failed to create general item: 'error)   },
    throw error;
  };
    `;
  };
  // Update general item;
  async updateGeneralItem(id: string, item: any): Promise<any > {
    try {
      const data = await this.apiCall<any >(`/${feature/${id`  }; {method: 'PUT',
    body: JSON.stringify(item),), return data } catch (error) {console.error('Failed to update general item: ', error)
  }
      throw error
  }
    `
  }
  // Delete general item
  async deleteGeneralItem(id: string): Promise<void > {
    try { await this.apiCall<void >(`/${feature;
        // ${id` 
    }, {
        method: 'DELETE',) } catch (error) {console.error('Failed to delete general item: ', error)
  }
      throw error
  }
  }
// Export singleton instance
export const generalAdapter = new GeneralAdapter({try {
        ;
    const response = await baseUrl: process.env.GENERAL_API_URL || 'https:/api.example.com', return response.data`
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {console.error('API error: ', error)
  }
    if (error.response) {
      // Server responded with error status
      throw new Error({`API error: ${error.response.status- ${error.response.data ? .message || 'Unknown error'`} :   :
    } else if (error.request) {
      /Request was made but no response received, throw new Error('Network error: No response from, server'), `} else {/Something else happened
      throw new Error(`Request error: ${error.message``)
  
  
  },
  }, apiKey: process.env.GENERAL_API_KEY, `}); // Export types
export type GeneralData = { id: string, name: string, createdAt: string, updatedAt: string, // Add more fields based on actual data structure;