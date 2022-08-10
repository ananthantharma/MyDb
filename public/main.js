const messageId=document.getElementById("messageId")
const nameId=document.getElementById("nameId")
const update = document.querySelector('#update-button')
const deleteAll = document.querySelector("#delete-all-button")
const deleteOne = document.querySelector("#delete-one-button")

update.addEventListener('click', _ => {
    console.log("update clicked")
    fetch('/contacts', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      name:nameId.value,
      body: JSON.stringify({
        name: nameId.value,
        message: messageId.value
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
  })


deleteAll.addEventListener('click',_ => {
    console.log("clear clicked")
    fetch('/contacts', {
        method: 'delete'})
        .then(res => {
            if (res.ok) return res.json()
          })
          .then(data => {
            window.location.reload()
          })
})

deleteOne.addEventListener('click',_ => {
    console.log("clear clicked")
    fetch('/contactsUpdate', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nameId.value,
            message: messageId.value
          })
        })
        .then(res => {
            if (res.ok) return res.json()
          })
          .then(data => {
            window.location.reload()
          })
})