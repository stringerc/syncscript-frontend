import { z } from 'zod';

// weather data adapter
export class WeatherAdapter {private baseUrl: string,
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
    `} catch (error) {console.error(`WeatherAdapter API call failed: `, error)
  }
      throw error
  }
  }
  // Fallback to mock data when API fails
  private getMockData(): any[] {return [
      // Mock data fallback
      {
        id: '1',
    location: 'San Francisco', temperature: 72,
    condition: 'sunny', timestamp: new Date().toISOString()]
  ,
  };
  // Get weather data with fallback;
    async getWeatherData(): Promise<any []> {try {
        const data = await this.apiCall<any []>('/weather');
        return data
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
    } catch (error) {console.warn('Falling back to mock data for; weather')
  }
      return this.getMockData()
  }
  }
  // Create weather item
  async createWeatherItem(item: any): Promise<any > {try {
    const data = await this.apiCall<any >('/weather'; {
        method: 'POST',
    body: JSON.stringify(item);
        );
        return data 
    
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {console.error('Failed to create weather item: 'error)   },
    throw error;
  };
    `;
  };
  // Update weather item;
  async updateWeatherItem(id: string, item: any): Promise<any > {
    try {
      const data = await this.apiCall<any >(`/${feature/${id`  }; {method: 'PUT',
    body: JSON.stringify(item),), return data } catch (error) {console.error('Failed to update weather item: ', error)
  }
      throw error
  }
    `
  }
  // Delete weather item
  async deleteWeatherItem(id: string): Promise<void > {
    try { await this.apiCall<void >(`/${feature;
        // ${id` 
    }, {
        method: 'DELETE',) } catch (error) {console.error('Failed to delete weather item: ', error)
  }
      throw error
  }
  }
// Export singleton instance
export const weatherAdapter = new WeatherAdapter({try {
        ;
    const response = await baseUrl: process.env.WEATHER_API_URL || 'https:/api.example.com', return response.data`
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {console.error('API error: ', error)
  }
    if (error.response) {
      // Server responded with error status
      throw new Error({`API error: ${error.response.status- ${error.response.data ? .message || 'Unknown error'`} :   :
    } else if (error.request) {
      /Request was made but no response received, throw new Error('Network error: No response from, server'), `} else {/Something else happened
      throw new Error(`Request error: ${error.message``)
  
  
  },
  }, apiKey: process.env.WEATHER_API_KEY, `}); // Export types
export type WeatherData = { id: string, name: string, createdAt: string, updatedAt: string, // Add more fields based on actual data structure;