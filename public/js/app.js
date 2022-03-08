const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const message1 = document.querySelector('#m1')
const message2 = document.querySelector('#m2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = input.value
    m1.textContent = 'Loading...'
    m2.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=> {
    res.json().then((data)=> {
        if(data.error){
            console.log(data.error)
            error.textContent = data.error
        } else {
            m1.textContent = data.location
            m2.textContent = data.forecast
            
            console.log(data.location)
            console.log(data.forecast)
        }
        
    })
})
})