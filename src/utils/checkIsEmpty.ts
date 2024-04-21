export const checkArrayObjectIsEmpty = (inputData): boolean => {
  let isEmpty = false;

  switch (inputData) {
    case undefined:
      isEmpty = true;
      break;
    case null:
      isEmpty = true;
      break;
  }

  if (Array.isArray(inputData) && inputData.length > 0) {
    inputData.forEach((input) => {
      if (!Object.keys(input) || Object.keys(input)?.length === 0)
        isEmpty = true;
    });
  } else {
    isEmpty = true;
  }

  return isEmpty;
};
