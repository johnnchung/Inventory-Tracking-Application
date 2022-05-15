/**
 * Edit the object if the button is clicked
 * @param {Integer} index - Represents the inventory item's id
 */
function editButton(id) {
    const encodedId = encodeURIComponent(id);
    fetch(`/inventoryCollection/edit/${encodedId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        return res
    }).then(data => {
      window.location.reload()
  })
}

/**
 * Undo the deletion of an object if the button is clicked
 * @param {string} id - Represents the id of the button
 */
 function undoButton(id) {
  const encodedId = encodeURIComponent(id);
  fetch(`/inventoryCollection/undo/${encodedId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
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
 * @param {Integer} id - Represents the item's position 
 */
 function openCButton(id) {
  const encodedId = encodeURIComponent(id);
  fetch(`/inventoryCollection/comment/${encodedId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => {
    if(res.ok) {
        return res
    }
  }).then(data => {
      window.location.reload()
  })
}

/**
 * Cancel the object if the button is clicked
 * @param {Integer} id - Represents the inventory item's id
 */
 function cancelButton(id) {
  const encodedId = encodeURIComponent(id);
  fetch(`/inventoryCollection/cancel/${encodedId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => {
      return res
  }).then(data => {
    window.location.reload()
})
}