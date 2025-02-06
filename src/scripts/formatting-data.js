export function formatPhone(input) {
  let normalizedInput
  let digits = input.replace(/\D/g, '')
  
  if (!digits) return ""
  if (digits.length > 10) digits = digits.slice(0, 10)
  
  if (digits.length <= 3) {
      normalizedInput = `(${digits}`
  } else if (digits.length <= 6) {
      normalizedInput = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
      normalizedInput = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return normalizedInput
}

