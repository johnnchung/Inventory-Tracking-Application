/**
 * Edit the object if the button is clicked
 * @param {Integer} index - Represents the inventory item's position 
 */
function clickButton(index) {
    fetch('/inventoryCollection/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        i: index
      })
    }).then(res => {
        return res
    }).then(data => {
      window.location.reload()
  })
}

/**
 * Undo the deletion of an object if the button is clicked
 * @param {string} button - Represents the properties of the button
 */
 function undoButton(button) {
  fetch('/inventoryCollection/undo', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: button.value
    })
  }).then(res => {
    if(res.ok) {
        return res
    }
  }).then(data => {
      window.location.reload()
  })
}

/**
 * Open comment section and allow user to enter deletion 
 * @param {Integer} index - Represents the item's position 
 */
 function openCButton(index) {
  fetch('/inventoryCollection/comment', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      i: index
    })
  }).then(res => {
    if(res.ok) {
        return res
    }
  }).then(data => {
      window.location.reload()
  })
}