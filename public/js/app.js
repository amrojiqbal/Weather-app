console.log('Javascript is loaded ')


const formSelector=document.querySelector('form')
const input=document.querySelector('input')

const msg_1=document.querySelector('#para_1')
const msg_2=document.querySelector('#para_2')

formSelector.addEventListener('submit',(e) => {

    e.preventDefault()
    const address=input.value
    msg_1.textContent='Loading...'
    msg_2.textContent=''

    fetch('/weather?search=' + address).then((response) => {
    response.json().then((body) => {
        // console.log(body)

        if(body.error)
        {
            msg_1.textContent=body.error
            // console.log(body.error)
        }
        else{
            msg_1.textContent=body.Location
            msg_2.textContent=body.Forecast
        }
    })
})

})