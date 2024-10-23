// Store JWT token in localStorage
export const storeToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };
  
  // Get token from localStorage
  export const getToken = () => {
    return localStorage.getItem('jwtToken');
  };
  
  // Remove token (for logout)
  export const removeToken = () => {
    localStorage.removeItem('jwtToken');
  };
  