$(function() {
  function buildMessage(message) {
    var img = message.image ? `<img src= ${ message.image }>` : "";
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
                ${img}
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
    $('.messages').append(html)
    $('.form__submit').prop('disabled', false);
    $('form').get(0).reset();
    $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, 1500);
  })
  .fail(function(){
    alert('メッセージの送信に失敗しました');
  })
  })
　
  function ScrollToNewMessage(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }
});