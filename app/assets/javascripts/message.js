$(function(){
  function buildMessage(message){
    var html =`<p class="lower-message__content">
                  ${message.text}
                </p>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new formData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.message').append(html)
      $('#message_content').val('')
  })
    .fail(function(){
      alart('エラー')
    })
  })
});