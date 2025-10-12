/**
 * Component Standards & Patterns
 * Standardized interfaces for consistent component APIs
 */

// Standard component base props
export interface BaseComponentProps {
  className?: string
  id?: string
  'aria-label'?: string
  'aria-describedby'?: string
  testId?: string
}

// Standard modal props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

// Standard form field props
export interface FormFieldProps extends BaseComponentProps {
  label: string
  name: string
  value: string | number
  onChange: (value: string | number) => void
  error?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
}

// Standard button props
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

// Standard card props
export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  onClick?: () => void
  hoverable?: boolean
  selected?: boolean
}

// Standard list item props
export interface ListItemProps extends BaseComponentProps {
  title: string
  description?: string
  icon?: React.ReactNode
  avatar?: string
  onClick?: () => void
  selected?: boolean
  disabled?: boolean
  actions?: React.ReactNode
}

// Standard data states
export type DataState = 'idle' | 'loading' | 'success' | 'error'

export interface DataStateProps {
  state: DataState
  error?: string
  onRetry?: () => void
}

// Standard pagination props
export interface PaginationProps extends BaseComponentProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

// Standard filter props
export interface FilterProps<T> extends BaseComponentProps {
  items: T[]
  onFilter: (filtered: T[]) => void
  filterFn?: (item: T, query: string) => boolean
}

// Standard sort props
export interface SortProps<T> extends BaseComponentProps {
  items: T[]
  onSort: (sorted: T[]) => void
  sortOptions: Array<{
    key: string
    label: string
    direction: 'asc' | 'desc'
  }>
  defaultSort?: string
}

// Event handler standards
export type ChangeHandler<T = string> = (value: T) => void
export type ClickHandler = () => void
export type SubmitHandler = (data: Record<string, unknown>) => void | Promise<void>
export type ErrorHandler = (error: Error | string) => void

// Validation patterns
export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom'
  value?: number | string | RegExp
  message: string
  validator?: (value: unknown) => boolean
}

export interface FieldValidation {
  rules: ValidationRule[]
  validateOn?: 'change' | 'blur' | 'submit'
}

// Helper to standardize component className merging
export function mergeClassNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Helper to generate consistent IDs
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

