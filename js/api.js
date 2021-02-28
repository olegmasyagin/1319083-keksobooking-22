const getServerData = (onSuccess, onError) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError('Данные от сервера не получены. Обновите страницу'));
};

const sendUserData = (onSuccess, onError, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      onError();
    })
};

export { getServerData, sendUserData };
