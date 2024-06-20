Rails.application.routes.draw do
  resources :matchs_tournois
  resources :stades
  resources :joueurs
  resources :poules
  resources :tournois
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }
  resource :user, only: [] do
    get 'permissions', on: :collection
  end
  get 'member-data', to: 'members#show'
end
