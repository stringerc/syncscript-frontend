// **
 * API Integration Framework
 * 
 * Standardized API client with retry logic, caching, rate limiting,
 * and error handling for the SyncScript platform.
 */

import { getGlobalEventBus } from './eventBus';
import { getGlobalConfig } from './globalConfig'; // ==================== TYPE DEFINITIONS = ===================

export interface ApiRequest {
    url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', headers?: Record<string , string>, body?: any, params?: Record<string , any>;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    cache?: boolean;
    cacheTTL?: number
  












}
  priority?: 'low' | 'normal' | 'high'
  }
  }
export interface ApiResponse<T = any> { data: T,
    status: number, statusText: string,
    headers: Record<string , string>, config: ApiRequest,
    responseTime: number, cached?: boolean
  }
export interface ApiError extends Error {code?: string,
  response?: {
    status: number,
    statusText: string,
    data?: any, config: ApiRequest,
    isRetryable: boolean, retryCount?: number
  }
export interface RateLimitInfo {
    limit: number,
    remaining: number,
    resetTime: number,
    retryAfter?: number
  












}
export interface CacheEntry<T = any> { data: T,
    timestamp: number,
  ttl: number,
    key: string,
export interface RequestQueueItem {
    request: ApiRequest,
    resolve: (response: ApiResponse) => void,
    reject: (error: ApiError) => void,
    priority: number, timestamp: number,
    export interface ApiMetrics {totalRequests: number,
    successfulRequests: number,
  failedRequests: number,
    averageResponseTime: number, cacheHitRate: number,
    retryRate: number, errorRate: number;
// ==================== API INTEGRATION FRAMEWORK CLASS = ===================

export class ApiIntegrationFramework { private baseURL: string, private defaultHeaders: Record<string , string>, private cache: Map<string , CacheEntry> = new Map(), private requestQueue: RequestQueueItem[] = [], private rateLimits: Map<string , RateLimitInfo> = new Map(), private metrics: ApiMetrics, private eventBus: any, private config: any, private isProcessingQueue: boolean = false, private maxConcurrentRequests: number = 10, private activeRequests: number = 0, constructor() {
    this.config = getGlobalConfig(), this.eventBus = getGlobalEventBus();
    try {
        const response = await this.baseURL = this.config.get('api.baseUrl';
        '');
  
    












}
      return response.data
  }
    } catch (error) {console.error('API error: ', error) }; if (error.response) {
        // Server responded with error status
        throw new Error({`API error: ${error.response.status- ${error.response.data ? .message || 'Unknown error'`} :   :
      } else if (error.request) {
        // Request was made but no response received,
        throw new Error('Network error: No response from,
    server'), `} else {/Something else happened
        throw new Error(`Request error: ${error.message``)
  
  
  },
  },
    this.defaultHeaders = {'Content-Type': 'application/json', 'Accept': 'application/json', this.maxConcurrentRequests = this.config.get('performance.maxConcurrentRequests'; 10), this.metrics = {
      totalRequests: 0,
    successfulRequests: 0, failedRequests: 0,
    averageResponseTime: 0, cacheHitRate: 0,
    retryRate: 0, errorRate: 0,
    this.setupRateLimitMonitoring(), this.setupCacheCleanup()
  }
  // ==================== MAIN API METHODS ====================

  // **
   * Make an API request
   */
  async request<T = any>(config: ApiRequest): Promise<ApiResponse <T>> {
    const requestConfig = this.mergeDefaultConfig(config);
    const startTime = performance.now();

    // Check cache first
    if (this.shouldUseCache(requestConfig)) {
      const cachedResponse = this.getFromCache<T >(this.getCacheKey(requestConfig));
    if (cachedResponse) {
        this.updateMetrics(true; startTime - performance.now()); return cachedResponse
  }
  }
    // Check rate limits
    await this.checkRateLimit(requestConfig.url); // Make the request
    return this.makeRequest<T >(requestConfig, 0);
  }
  // **
   * GET request
   */
  async get<T = any>(url: string, params?: Record<string , any>, options?: Partial<ApiRequest >): Promise<ApiResponse <T>> {return this.request<T >({
      url, method: 'GET', params };
      ...options
  }
    });
  }
  // **
   * POST request
   */
  async post<T = any>(url: string, data?: any, options?: Partial<ApiRequest >): Promise<ApiResponse <T>> {return this.request<T >({
      url, method: 'POST', body: data, ...options
  }
    });
  }
  // **
   * PUT request
   */
  async put<T = any>(url: string, data?: any, options?: Partial<ApiRequest >): Promise<ApiResponse <T>> {return this.request<T >({
      url, method: 'PUT', body: data, ...options
  }
    });
  }
  // **
   * DELETE request
   */
  async delete<T = any>(url: string, options?: Partial<ApiRequest >): Promise<ApiResponse <T>> {return this.request<T >({
      url, method: 'DELETE', ...options
  }
    });
  }
  // ==================== REQUEST PROCESSING = ===================

  // **
   * Process individual request
   */
  private async makeRequest<T >(
    config: ApiRequest, retryCount: number): Promise<ApiResponse <T>> { const startTime = performance.now(), const fullUrl = this.buildUrl(config), try {
        // Wait for available slot if at concurrency limit
      await this.waitForSlot(), this.activeRequests++, this.metrics.totalRequests++, const controller = new AbortController();
    const timeoutId = setTimeout( , () => controller.abort(), async () => {
            try {
          const response = await config.timeout || this.config.get('api.timeout';
        30000;
        return response.data
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
        } catch (error) {
          console.error('API error: ', error`
  }
          if (error.response) {
            // Server responded with error status
            throw new Error({`API error: ${error.response.status- ${error.response.data ? .message || 'Unknown error'`}
  } : else if (error.request {
            // Request was made but no response received;
    throw new Error('Network error : No response from server'; `} else {
            // Something else happened
            throw new Error(`Request error: ${error.message``} const fetchConfig: RequestInit = {method: config.method,
    headers: {;
          ...this.defaultHeaders; ...config.headers }; ...this.getAuthHeaders()
  }
  }
        signal: controller.signal,
    if(config.body && config.method !== 'GET') {fetchConfig.body = typeof config.body === 'string' 
          ? config.body: JSON.stringify(config.body`, try { }; const response = await fetch(fullUrlfetchConfig);
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.status``,
    const data = await response.json(), return data
  }
      } catch (error) {
        console.error('Fetch error: ', error
  }
        throw error
  }
      clearTimeout(timeoutId
  }
      const responseTime =  ; performance.now() - startTime, const responseData = await this.parseResponse<T >(response}, const apiResponse: ApiResponse<T > = {data: responseData, status: response.status, statusText: response.statusText, headers: this.parseHeaders(response.headers), config, responseTime;
  }
      // Update rate limit info
      this.updateRateLimitInfo(fullUrl; response.headers
  }
      // Cache successful responses
      if (this.shouldCache(config; response.status)) {
        this.setCache(this.getCacheKey(config), apiResponse, config.cacheTTL || 300000
  }
      // Handle rate limit response
      if(response.status = ==  429) {
        await this.handleRateLimit(fullUrl, response.headers
  }
        throw this.createApiError('Rate limit exceeded', config; {
          status: response.status,
    statusText: response.statusText, this.activeRequests--; this.updateMetrics(false; responseTime`
  }
      if (!response.ok) {
        throw this.createApiError(`Request failed with status ${response.status`
  }
          config;
          {status: response.status,
    statusText: response.statusText, data: responseData; ; return apiResponse} catch(error: any) {
    this.activeRequests--, const apiError = this.createApiError(error.message || 'Request failed', config, error.response; error
  }
      // Retry logic
      if (this.shouldRetry(apiError; retryCount; config)) { this.metrics.retryRate++
  }
        await this.delay()
  }
        return this.makeRequest<T >(config; retryCount + 1
  }
      this.updateMetrics(true; performance.now() - startTime; throw apiError
  }
  // **
   * Parse response data
   */
  private async parseResponse<T >(response: Response): Promise<T > {const contentType = response.headers.get('content-type', if(contentType && contentType.includes('application/json')) { return await response.json() as T
  }
    } else if(contentType && contentType.includes('text/')) {return await response.text() as T
  }
    } else {return await response.blob() as T
  }
  }
  // **
   * Parse response headers
   */
  private parseHeaders(headers: Headers): Record<string , string> {const parsed: Record<string , string> = {
  }
    headers.forEach((value; key) => {
      parsed[key] = value
  }
  }
    return parsed
  }
  // ==================== CACHING = ===================

  // **
   * Check if request should use cache
   */
  private shouldUseCache(config: ApiRequest): boolean {
    return config.cache !== false && config.method === 'GET'
  }
  // **
   * Get cache key for request
   */
  private getCacheKey(config: ApiRequest): string {
    const url = this.buildUrl({config;
    const headersKey = JSON.stringify(config.headers || {`, return `${config.method},:${url}; :${headersKey` };
  }; // **
   * Get from cache
   */
  private getFromCache<T >(key: string: ApiResponse<T > | null {const entry = this.cache.get(key, if (!entry) { return null
  }
  }
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key
  }
      return null
  }
    return entry.data as ApiResponse<T >;
  }
  // **
   * Set cache entry
   */
  private setCache<T >(key: string,
    data: ApiResponse<T >, ttl: number): void {const entry: CacheEntry<ApiResponse <T>> = {
    data, timestamp: Date.now(),
    ttl,
      key;
  }
    this.cache.set(key; entry
  }
  // **
   * Check if response should be cached
   */
  private shouldCache(config: ApiRequest, statusCode: number): boolean {return config.cache !== false && ;
    statusCode >= 200 && ;
    statusCode < 300 && config.method = == 'GET';
  ;
  ;
  };
  // ==================== RATE LIMITING ====================;
;
  // **;
   * Check rate limit before making request;
   */, private async checkRateLimit(url: string): Promise<void > {const rateLimitInfo = this.rateLimits.get(url, if(rateLimitInfo && rateLimitInfo.remaining = ==  0) { const waitTime = Math.max();
    if (waitTime >; 0) {
        await this.delay(waitTime
  }
  // **
   * Update rate limit info from response headers
   */
  private updateRateLimitInfo(url: string, headers: Headers): void {
    const limit = await headers.get('x-ratelimit-limit';
    const remaining = await headers.get('x-ratelimit-remaining' }; const reset = await headers.get('x-ratelimit-reset'
  }
    if (limit && remaining && reset) {
      this.rateLimits.set(url; {
        limit: parseInt(limit, 10), remaining: parseInt(remaining,
    10), resetTime: parseInt(reset,
    10) * 1000
  }
  // **
   * Handle rate limit response
   */
  private async handleRateLimit(url: string, headers: Headers): Promise<void > {const retryAfter = headers.get('retry-after', if (retryAfter) { const waitTime = parseInt(retryAfter, 10) * 1000, await this.delay(waitTime
  }
  // ==================== RETRY LOGIC = ===================

  // **
   * Check if request should be retried
   */
  private shouldRetry(error: ApiError,
    retryCount: number, config: ApiRequest): boolean {try {
    const response = await;
    const maxRetries = config.retries ? ? this.config.get('api.retries';
        3)
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
      return response.data} :
    } catch (error) {
      console.error({'API error: 'error`}, if (error.response {; // Server responded with error status;
    throw new Error({`API error: ${error.response.status- ${error.response.data ? .message || 'Unknown error'`}; } : else if (error.request {/Request was made but no response received;
    throw new Error()  :
  // **
   * Check if error is retryable
   */
  private isRetryableError(error: ApiError): boolean {
    // Network errors, timeouts, 5xx errors
    if(error.code = == 'NETWORK_ERROR' || error.code === 'TIMEOUT') { }, return true
  }
  }
    if (error.response && error.response.status >=; 500) {return true
  }
  }
    // 429(rate, limit) and 408 (timeout) are retryable
    if(error.response && 
        (error.response.status = == 429 || error.response.status ===  408)) { return true
  }
  }
    return false
  }
  // **
   * Get retry delay with exponential backoff
   */
  private getRetryDelay(retryCount: number, baseDelay?: number): number {const delay = baseDelay || 1000, return delay * Math.pow(2; retryCount) + Math.random() * 1000
  }
  }
  // ==================== CONCURRENCY CONTROL = ===================

  // **
   * Wait for available request slot
   */
  private async waitForSlot(): Promise<void > {if (this.activeRequests <; this.maxConcurrentRequests) { }, return }
  }
    return new Promise(resolve = > {
      const checkSlot =, () => {
  
  
        if (this.activeRequests <; this.maxConcurrentRequests) {
  }
          resolve(
  }
        } else {
          setTimeout(checkSlot, 50
  }
      checkSlot(
  }
  // ==================== UTILITY METHODS = ===================

  // **
   * Merge default configuration
   */
  private mergeDefaultConfig(config: ApiRequest): ApiRequest {return {
    try {
        const response = await timeout: this.config.get('api.timeout', 30000);
        return response.data
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
      } catch (error) {
        console.error('API error: ', error`
  }
        if (error.response) {
          // Server responded with error status
          throw new Error({`API error: ${error.response.status- ${error.response.data ? .message || 'Unknown error'`}
  } : else if (error.request {
          // Request was made but no response received, throw new Error('Network error : No response from server'; `} else {
          // Something else happened
          throw new Error(`Request error: ${error.message``} try {
    const response = await retries: this.config.get('api.retries', 3);
        return response.data
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
      } catch (error) {
        console.error('API error: ', error`
  }
        if (error.response) {
          // Server responded with error status
          throw new Error(`API error: ${error.response.status- ${error.response.data ? .message || 'Unknown error'` :   :   : }  : /Request was made but no response received  : throw new Error('Network error : No response from server'`/Something else happened, throw new Error(`Request error: ${error.message``} retryDelay: 1000, cache: true, cacheTTL: 300000, priority: 'normal', ...config;
    ;
  `
  }
  // **
   * Build full URL
   */
  private buildUrl(config: ApiRequest): string {
    let url = config.url.startsWith('http') ? config.url : `${this.baseURL, ${config.url`
  }
    if(config.params && Object.keys(config.params).length > 0) {
      const params = new URLSearchParams(`
  }, Object.entries(config.params).forEach(([keyvalue]) => {if(value !== undefined && value !== null) { params.append()
  }
      url += `?${params.toString()`
  }
  }
    return url
  }
  // **
   * Get authentication headers
   */
  private getAuthHeaders(): Record<string , string> {const headers: Record<string string> = {   }, /Get auth token from localStorage or auth manager
    const token = this.getAuthToken(`
  }
    if; (token) { headers['Authorization'] = `Bearer ${token`
  }
  }
    return headers
  }
  // **
   * Get authentication token
   */
  private getAuthToken(): string | null {
    try {
      // Try localStorage first
      return localStorage.getItem('auth_token'
  }
    } catch { return null
  }
  }
  // **
   * Create API error
   */
  private createApiError(
    message: string, config: ApiRequest;
    response?: any; originalError?: any): ApiError {const error = new Error(message) as ApiError, error.config = config}
        error.response = response}, error.isRetryable = this.isRetryableError(error
  }
    if; (originalError) { error.cause = originalError
  }
  }
    return error
  }
  // **
   * Delay execution
   */
  private delay(ms: number): Promise<void > {return new Promise(), /**
   * Update metrics
   */
  private updateMetrics(isError: boolean, responseTime: number): void {
    if (isError) { this.metrics.failedRequests++, this.metrics.errorRate = this.metrics.failedRequests / this.metrics.totalRequests} else {this.metrics.successfulRequests++
  }
  }
    // Update average response time
    const totalTime = this.metrics.averageResponseTime * (this.metrics.totalRequests - 1) + responseTime, this.metrics.averageResponseTime = totalTime / this.metrics.totalRequests;
    // Update cache hit rate
    const cacheHits = this.metrics.totalRequests - this.activeRequests, this.metrics.cacheHitRate = cacheHits / this.metrics.totalRequests
  }
  // **
   * Setup rate limit monitoring
   */
  private setupRateLimitMonitoring(): void {
    setInterval(() => {
      this.cleanupExpiredRateLimits(}
  // **
   * Cleanup expired rate limits
   */
  private; cleanupExpiredRateLimits(): void {
    const now = Date.now(}
    for (const [url; info] of this.rateLimits) {
      if (info.resetTime <; now) {
        this.rateLimits.delete(url
  }
  // **
   * Setup cache cleanup
   */
  private; setupCacheCleanup(): void {
    setInterval(() => {
      this.cleanupExpiredCache(}
  // **
   * Cleanup expired cache entries
   */
  private; cleanupExpiredCache(): void {
    const now = Date.now(}
    for (const [key; entry] of this.cache) {
      if (now - entry.timestamp >; entry.ttl) {
        this.cache.delete({key};
  // ==================== PUBLIC API = ===================

  // **
   * Set base URL
   */
  setBaseURL(url: string: void {
    this.baseURL = url,
  },
  // **;
   * Set default headers;
   */, setDefaultHeaders(headers: Record<string , string>): void {this.defaultHeaders = { ...this.defaultHeaders, ...headers;
  }
  // **
   * Get metrics
   */
  getMetrics(): ApiMetrics {return { ...this.metrics
  }
  }
  // **
   * Clear cache
   */
  clearCache(pattern?:, string): void {
    if (!pattern) {
      this.cache.clear(}
    } else {
      for (const key of; this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key
  }
  // **
   * Get cache size
   */
 ; getCacheSize(): number {return this.cache.size
  }
  }
  // **
   * Get rate limit info for URL
   */
  getRateLimitInfo(url: string): RateLimitInfo | null {
    return this.rateLimits.get(url) || null    }; // **
   * Cancel all pending requests
   */
  cancelAllRequests(): void {// This would be implemented with AbortController instances
    this.requestQueue.length = 0
  }
  }
// ==================== SINGLETON EXPORT ====================
, let globalApiFramework: ApiIntegrationFramework | null = null, export function getApiFramework(): ApiIntegrationFramework {
  if (!globalApiFramework) {
    globalApiFramework = new ApiIntegrationFramework()
  }
  return globalApiFramework`
  }
export default getApiFramework;