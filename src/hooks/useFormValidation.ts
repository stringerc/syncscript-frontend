/**
 * Form Validation Hook (M9)
 * Validates on blur instead of change for better UX
 */

import { useState, useCallback } from 'react'

export interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'custom'
  value?: number | string | RegExp
  message: string
  validator?: (value: string) => boolean
}

export interface FieldConfig {
  name: string
  label: string
  rules: ValidationRule[]
  validateOn?: 'blur' | 'change' | 'submit'
}

export interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isValid: boolean
  isSubmitting: boolean
}

export function useFormValidation<T extends Record<string, unknown>>(
  initialValues: T,
  fields: FieldConfig[]
) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isValid: true,
    isSubmitting: false
  })

  const validateField = useCallback((fieldName: string, value: unknown): string | null => {
    const field = fields.find(f => f.name === fieldName)
    if (!field) return null

    for (const rule of field.rules) {
      let isInvalid = false

      switch (rule.type) {
        case 'required':
          isInvalid = !value || (typeof value === 'string' && !value.trim())
          break
        
        case 'email':
          isInvalid = typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          break
        
        case 'minLength':
          isInvalid = typeof value === 'string' && value.length < (rule.value as number)
          break
        
        case 'maxLength':
          isInvalid = typeof value === 'string' && value.length > (rule.value as number)
          break
        
        case 'min':
          isInvalid = Number(value) < (rule.value as number)
          break
        
        case 'max':
          isInvalid = Number(value) > (rule.value as number)
          break
        
        case 'pattern':
          isInvalid = typeof value !== 'string' || !(rule.value as RegExp).test(value)
          break
        
        case 'custom':
          isInvalid = rule.validator ? !rule.validator(String(value ?? '')) : false
          break
      }

      if (isInvalid) {
        return rule.message
      }
    }

    return null
  }, [fields])

  const validateAll = useCallback((): boolean => {
    const errors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    fields.forEach(field => {
      const error = validateField(field.name, formState.values[field.name as keyof T])
      if (error) {
        errors[field.name as keyof T] = error
        isValid = false
      }
    })

    setFormState(prev => ({ ...prev, errors, isValid }))
    return isValid
  }, [fields, formState.values, validateField])

  const handleChange = useCallback((name: keyof T, value: unknown) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value }
    }))

    // Only validate on change if explicitly configured
    const field = fields.find(f => f.name === name)
    if (field?.validateOn === 'change' && formState.touched[name]) {
      const error = validateField(String(name), value)
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [name]: error || undefined }
      }))
    }
  }, [fields, formState.touched, validateField])

  const handleBlur = useCallback((name: keyof T) => {
    // Mark field as touched
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true }
    }))

    // Validate on blur (default behavior)
    const field = fields.find(f => f.name === name)
    if (!field || field.validateOn !== 'submit') {
      const error = validateField(String(name), formState.values[name])
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [name]: error || undefined },
        isValid: Object.values({ ...prev.errors, [name]: error }).every(e => !e)
      }))
    }
  }, [fields, formState.values, validateField])

  const handleSubmit = useCallback(async (onSubmit: (values: T) => void | Promise<void>) => {
    // Validate all fields
    const isValid = validateAll()

    if (!isValid) {
      return false
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }))

    try {
      await onSubmit(formState.values)
      return true
    } catch (error) {
      console.error('Form submission error:', error)
      return false
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }))
    }
  }, [formState.values, validateAll])

  const reset = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: true,
      isSubmitting: false
    })
  }, [initialValues])

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isValid: formState.isValid,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue: handleChange,
    setFieldError: (name: keyof T, error: string) => {
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [name]: error }
      }))
    }
  }
}

