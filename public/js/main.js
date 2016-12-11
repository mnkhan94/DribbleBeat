$("input[name='location']").geocomplete();

$("input[name='minimum']").on("change", function(){
  $("input[name='maximum']").val($(this).val());
  $("input[name='maximum']").attr("min", $(this).val());
})

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