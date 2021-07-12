const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messege1 = document.querySelector('#message-1')
const messege2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messege1.textContent = ''
    messege2.textContent = 'Loading Weather'


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messege1.textContent = data.error
                messege2.textContent = ''
            } else {
                messege1.textContent = data.location
                messege2.textContent = data.forecast
            }
        })
    })
})