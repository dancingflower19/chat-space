$(function() {
  function buildMessage(message) {
    var html =`<div class="message" data-message_id=“${message.id}”>
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.user_name}
    </div>
    <div class="upper-message__date">
    ${message.date}
    </div>
    </div>
    <div class="lower-message">
    <p class="lower-message__content">
    ${message.content}
    </p>
    </div>
    </div>`
return html;
}

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
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
    $('.form__submit').prop('disabled', false);
    $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, 1500);
  })
  .fail(function(){
    alart('メッセージの送信に失敗しました');
  })
  })

  function ScrollToNewMessage(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

});