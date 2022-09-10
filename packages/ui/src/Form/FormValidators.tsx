export const phoneNumberPattern = /^\(\d{3}\)\s\d{3}-\d{4}( Ext\. [0-9]{3,5}){0,1}$/;
export const emailPattern = /.+@.+/;

export const validatePhoneNumber = (value: string) =>
  phoneNumberPattern.test(value) || 'Please enter a valid phone-number.';
