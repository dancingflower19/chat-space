$(function(){

  function buildMessage(message) {
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
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
          });
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data('message_id');
      console.log(last_message_id);
      $.ajax({
        url: "api/messages",
        type: 'GET',
        data: { last_message_id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages) {
        if (messages.length > 0){
            var insertHTML = '';
            messages.forEach(function(message){
              insertHTML = buildHTML(message);
              $('.messages').append(insertHTML);
              ScrollToNewMessage();
          })
            $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, 1500);
          }})
      .fail(function() {
            alert('自動更新に失敗しました');
          });
        }
      };
      setInterval(reloadMessages, 10000);
});