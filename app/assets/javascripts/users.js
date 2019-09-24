$(document).on('turbolinks:load',function() {
  var search_list = $("#user-search-result");
  var member_list = $("#member-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
                search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
                search_list.append(html);
  }

  function appendMembers(name,user_id) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`;
              member_list.append(html);
  }

  $(".chat-group-form__search").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();
    var userIDs = []
    $('.chat-group-users .chat-group-user').each(function(user){
      userIDs.push($(user).attr('id'))
    })

    $.ajax({
      url: '/users',
      type: 'GET',
      data: {keyword: input,
              user_ids: userIDs},
      dataType: 'json'
    })

    .done(function(users) {
      if (input.length !== 0){
        $('#user-search-result').empty();
        users.forEach(function(user){
            appendUser(user)
        });
      }
      else {
        $('#user-search-result').empty();
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました')
    });
  });

  $(document).on('click','.user-search-add', function() {
    var user_id = $(this).data('user-id');
    var name = $(this).data('user-name');
    $(this).parent().remove();
    appendMembers(name, user_id);

  });

  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });
});