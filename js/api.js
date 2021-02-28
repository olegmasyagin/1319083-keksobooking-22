const getServerData = (onSuccess, onError) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError);
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
    .catch(() => {
      onError();
    });
};

export { getServerData, sendUserData };
