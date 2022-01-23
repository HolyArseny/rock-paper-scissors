export const checkIsObject = (value) => {
  if(value) {
    const isArray = Array.isArray(value);
    const isObject = (typeof value) === 'object' && (value !== null);
    return !isArray && isObject;
  }
  return false;
};

export const doesObjectHaveKey = (object, key) => {
  const isObject = checkIsObject(object);
  if(!isObject) return false;
  const isObjectKey = key in object;
  return isObjectKey;
};
export const getRandomNumber = (max) => {
  const randomNumber = parseInt(Math.random() * max);
  return randomNumber;
};