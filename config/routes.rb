Rails.application.routes.draw do
  devise_for :users
  get 'messages' => 'message#index'
end
