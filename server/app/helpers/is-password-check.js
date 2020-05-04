export default password => {
    var re = /^[,\.\\]{1,}$/
    return re.test(password)
}