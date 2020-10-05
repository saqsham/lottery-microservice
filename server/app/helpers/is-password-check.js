export default password => {
  let re = /^[,\.\\]{1,}$/
  return re.test(password)
}