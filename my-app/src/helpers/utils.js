export const addElementToEachObjectInArr = (arr, newElement) => {
  return arr.map((obj) => {
    return { ...obj, ...newElement };
  });
};

export const findObjFromArr = (arrOfAllMembers, namesOfMembers) => {
  console.log("arrOfAllMembers: ", { ...arrOfAllMembers });
  return namesOfMembers.map((name) => {
    return arrOfAllMembers.find((memberObj) => memberObj.fullName === name);
  });
};

export const getSomeFieldsOfObjects = (arrOfObjects, arrayOfWantedFields) => {
  let newObj = {};
  const desiredObj = arrOfObjects.map((obj) => {
    arrayOfWantedFields.forEach((field) => {
      let temp = {};
      temp[field] = obj[field] || obj.email;
      newObj = { ...newObj, ...temp };
    });
    console.log('newObj : ', newObj);
    return newObj;
  });
  return desiredObj;
};
