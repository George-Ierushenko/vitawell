export const validateEmail = (email) => {
  // RFC 5322 Standard Email Validation
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email) {
    return { isValid: false, error: 'email.errors.required' }
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'email.errors.invalid' }
  }

  return { isValid: true, error: null }
}
