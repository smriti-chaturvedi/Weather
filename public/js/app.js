const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    p1.textContent = 'Loading ...'
    p2.textContent = ''
    fetch("/weather?address="+ address).then((response) => {
        response.json().then((data) => {
            if(data.error){
                p1.textContent = error
                search.value = ''
            }else{
                p1.textContent = data.data
                p2.textContent = data.location
                search.value = ''
            }
        })
    })
})