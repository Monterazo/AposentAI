import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateCPF(cpf: string): boolean {
  // Remove pontos e traços
  const cleanCPF = cpf.replace(/[^\d]/g, '')
  
  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false
  
  // Valida primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i]) * (10 - i)
  }
  let firstDigit = 11 - (sum % 11)
  if (firstDigit >= 10) firstDigit = 0
  
  if (firstDigit !== parseInt(cleanCPF[9])) return false
  
  // Valida segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i]) * (11 - i)
  }
  let secondDigit = 11 - (sum % 11)
  if (secondDigit >= 10) secondDigit = 0
  
  return secondDigit === parseInt(cleanCPF[10])
}

export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/[^\d]/g, '')
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// Security utility functions
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254 // RFC limit
}

export function isValidOAB(oab: string): boolean {
  const cleanOAB = oab.replace(/[^\d]/g, '')
  return cleanOAB.length >= 4 && cleanOAB.length <= 10 && /^\d+$/.test(cleanOAB)
}

export function encryptLocalData(data: string): string {
  // Simple base64 encoding for basic obfuscation
  // Note: This is not real encryption, just obfuscation
  try {
    return btoa(encodeURIComponent(data))
  } catch {
    return data
  }
}

export function decryptLocalData(encryptedData: string): string {
  try {
    return decodeURIComponent(atob(encryptedData))
  } catch {
    return encryptedData
  }
}

export function secureLocalStorage(key: string, value?: string): string | null {
  if (typeof window === 'undefined') return null
  
  try {
    if (value !== undefined) {
      // Store encrypted data
      localStorage.setItem(key, encryptLocalData(value))
      return value
    } else {
      // Retrieve and decrypt data
      const encrypted = localStorage.getItem(key)
      return encrypted ? decryptLocalData(encrypted) : null
    }
  } catch (error) {
    console.warn('LocalStorage operation failed:', error)
    return null
  }
}
