function createDataStore() {
  const userData = {
    date: null,
    time: null,
    alignment: null,
    email: null,
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

  function getData() {
    return { ...userData }
  }

  return {
    setAlignment,
    setDateAndTime,
    setEmail,
    getData,
  }
}

export default createDataStore
