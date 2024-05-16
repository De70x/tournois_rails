Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions' }
  devise_scope :user do
    get 'users/current', to: 'sessions#show'
  end
  get 'member-data', to: 'members#show'
end
