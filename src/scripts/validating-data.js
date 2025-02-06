export function getNameError(control) {
  let errorMessage
  if (control.validity.valueMissing) errorMessage = "This field is required"

  return errorMessage
}

export function getEmailError(control) {
  let errorMessage

  if (control.validity.valueMissing) errorMessage = "This field is required"
  else if (control.validity.typeMismatch) errorMessage = "Invalid format"

  return errorMessage
}

export function getPhoneError(control) {
  let errorMessage

  if (control.validity.valueMissing) errorMessage = "This field is required"
  else if (control.validity.patternMismatch) errorMessage = "Invalid format"

  return errorMessage
}