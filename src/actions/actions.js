import store from '../store/store';

export const addUser = (email, username, password, confirmPassword) => {
  return {
    type: 'ADD_USER',
    email,
    username,
    password,
    confirmPassword
  }
};

export const logUserIn = ({ username, email, token }) => {
  let currentData = localStorage.getItem('cgData') || '{}';
  currentData = JSON.parse(currentData);
  currentData.username = username;
  currentData.email = email;
  currentData.token = token;
  localStorage.setItem('cgData', JSON.stringify(currentData));
  return {
    type: 'LOG_USER_IN',
    username,
    email,
    token
  };
};

export const logUserOut = () => {
  localStorage.removeItem('cgData');
  return {
    type: 'LOG_USER_OUT'
  };
}

export const addCard = (cardType, name) => {
  return {
    type: 'ADD_CARD',
    cardType,
    name
  }
};

export const removeNotification = ({key}) => {
  return {
    type: 'REMOVE_NOTIFICATION',
    key
  };
};

export const addNotification = ({ key, severity, message, ttl = 7500 }) => {
  let uniqueKey = `${key}-${Date.now()}`;
  setTimeout(() => {
    store.dispatch(removeNotification({ key: uniqueKey }));
  }, ttl);
  return {
    type: 'ADD_NOTIFICATION',
    key: uniqueKey,
    severity,
    message,
    ttl
  };
};
