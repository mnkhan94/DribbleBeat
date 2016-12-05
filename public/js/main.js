$("input[name='location']").geocomplete();

var del = $('.delete-this')

del.on('click', function () {
  id = $(this).parent().parent().data("id").replace(/\"/g, "")
  console.log(id)
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': id
    })
  }).then(function (response) {
    window.location.reload()
  })
})