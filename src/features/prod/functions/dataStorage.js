function createDataStore() {
  const userData = {
    date: null,
    time: null,
    alignment: null,
    email: null,
    optionalReflection: null,
  }

  function setAlignment(chosenOption) {
    userData.alignment = chosenOption
  }

  function setDateAndTime(date, time) {
    userData.date = date
    userData.time = time
  }

  function setEmail(email) {
    userData.email = email
  }

  function setReflection(reflection) {
    userData.optionalReflection = reflection
  }

  function getData() {
    return { ...userData }
  }

  return {
    setAlignment,
    setDateAndTime,
    setEmail,
    setReflection,
    getData,
  }
}

export default createDataStore
