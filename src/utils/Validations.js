export const isEmptyOrNull = input => {
  return input === null || input === undefined || input === '';
};

// validation for password
export const isValidPassword = password => {
  if (password === '' || password === undefined || password === null) {
    return false;
  }
  if (password.length < 8 || password.length > 20) {
    return false;
  }
  var regularExpression = /^(?=.*[0-9])/;
  return regularExpression.test(String(password));
};

// validation for email
export const isValidEmail = email => {
  if (email.length > 320) {
    return false;
  }

  // eslint-disable-next-line no-useless-escape
  let expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return expression.test(String(email).toLowerCase());
};


// get file extension
export const getExtention = fileName => {
  return fileName.split('.').pop();
};

export const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
export const passwordRegex = /^(?=.*[0-9])/;
