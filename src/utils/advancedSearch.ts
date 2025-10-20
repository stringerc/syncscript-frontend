import { create } from 'zustand';

interface SearchFilter {
  id: string;
  type: 'text' | 'date' | 'category' | 'tag' | 'status' | 'priority';
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between' | 'in';
  value: any;
  label: string;
}

interface SearchQuery {
  id: string;
  name: string;
  query: string;
  filters: SearchFilter[];
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
  createdAt: Date;
  isDefault: boolean;
}

interface SearchStore {
  queries: SearchQuery[];
  currentQuery: SearchQuery | null;
  searchResults: any[];
  isSearching: boolean;
  addQuery: (query: Omit<SearchQuery, 'id' | 'createdAt'>) => void;
  updateQuery: (id: string, updates: Partial<SearchQuery>) => void;
  deleteQuery: (id: string) => void;
  executeSearch: (query: SearchQuery, data: any[]) => Promise<void>;
  saveCurrentQuery: (name: string) => void;
  loadQuery: (id: string) => void;
  clearResults: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  queries: [],
  currentQuery: null,
  searchResults: [],
  isSearching: false,

  addQuery: (queryData) => {
    const newQuery: SearchQuery = {
      ...queryData,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    set((state) => ({
      queries: [...state.queries, newQuery]
    }));
  },

  updateQuery: (id, updates) => {
    set((state) => ({
      queries: state.queries.map((query) =>
        query.id === id ? { ...query, ...updates } : query
      ),
      currentQuery: state.currentQuery?.id === id 
        ? { ...state.currentQuery, ...updates }
        : state.currentQuery
    }));
  },

  deleteQuery: (id) => {
    set((state) => ({
      queries: state.queries.filter((query) => query.id !== id),
      currentQuery: state.currentQuery?.id === id ? null : state.currentQuery
    }));
  },

  executeSearch: async (query, data) => {
    set({ isSearching: true });

    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 300));

      let results = [...data];

      // Apply text search
      if (query.query.trim()) {
        const searchTerms = query.query.toLowerCase().split(' ');
        results = results.filter(item => {
          const searchableText = JSON.stringify(item).toLowerCase();
          return searchTerms.every(term => searchableText.includes(term));
        });
      }

      // Apply filters
      query.filters.forEach(filter => {
        results = results.filter(item => {
          const fieldValue = getNestedValue(item, filter.field);
          return applyFilter(fieldValue, filter);
        });
      });

      // Apply sorting
      if (query.sortBy) {
        results.sort((a, b) => {
          const aValue = getNestedValue(a, query.sortBy!);
          const bValue = getNestedValue(b, query.sortBy!);
          
          if (query.sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      set({ 
        searchResults: results,
        isSearching: false,
        currentQuery: query
      });
    } catch (error) {
      console.error('Search error:', error);
      set({ 
        searchResults: [],
        isSearching: false
      });
    }
  },

  saveCurrentQuery: (name) => {
    const currentQuery = get().currentQuery;
    if (!currentQuery) return;

    const newQuery: SearchQuery = {
      ...currentQuery,
      id: Date.now().toString(),
      name,
      createdAt: new Date(),
      isDefault: false
    };

    set((state) => ({
      queries: [...state.queries, newQuery]
    }));
  },

  loadQuery: (id) => {
    const query = get().queries.find(q => q.id === id);
    if (query) {
      set({ currentQuery: query });
    }
  },

  clearResults: () => {
    set({ 
      searchResults: [],
      currentQuery: null
    });
  }
}));

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

const applyFilter = (fieldValue: any, filter: SearchFilter): boolean => {
  if (fieldValue === undefined || fieldValue === null) return false;

  switch (filter.operator) {
    case 'equals':
      return fieldValue === filter.value;
    case 'contains':
      return String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase());
    case 'startsWith':
      return String(fieldValue).toLowerCase().startsWith(String(filter.value).toLowerCase());
    case 'endsWith':
      return String(fieldValue).toLowerCase().endsWith(String(filter.value).toLowerCase());
    case 'greaterThan':
      return Number(fieldValue) > Number(filter.value);
    case 'lessThan':
      return Number(fieldValue) < Number(filter.value);
    case 'between':
      const [min, max] = filter.value;
      return Number(fieldValue) >= min && Number(fieldValue) <= max;
    case 'in':
      return Array.isArray(filter.value) && filter.value.includes(fieldValue);
    default:
      return true;
  }
};

export const createTextFilter = (field: string, value: string, operator: 'contains' | 'startsWith' | 'endsWith' = 'contains'): SearchFilter => {
  return {
    id: Date.now().toString(),
    type: 'text',
    field,
    operator,
    value,
    label: `${field} ${operator} "${value}"`
  };
};

export const createDateFilter = (field: string, value: Date | Date[], operator: 'equals' | 'greaterThan' | 'lessThan' | 'between' = 'equals'): SearchFilter => {
  return {
    id: Date.now().toString(),
    type: 'date',
    field,
    operator,
    value,
    label: `${field} ${operator} ${Array.isArray(value) ? `${value[0]} - ${value[1]}` : value}`
  };
};

export const createCategoryFilter = (field: string, value: string[]): SearchFilter => {
  return {
    id: Date.now().toString(),
    type: 'category',
    field,
    operator: 'in',
    value,
    label: `${field} in [${value.join(', ')}]`
  };
};

export const getSearchInsights = () => {
  const queries = useSearchStore.getState().queries;
  const results = useSearchStore.getState().searchResults;
  
  return {
    totalQueries: queries.length,
    defaultQueries: queries.filter(q => q.isDefault).length,
    customQueries: queries.filter(q => !q.isDefault).length,
    currentResults: results.length,
    lastSearch: queries.length > 0 ? Math.max(...queries.map(q => q.createdAt.getTime())) : null
  };
};
