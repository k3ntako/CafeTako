Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :create]
      resources :reviews, only: [:index]
    end
  end

  get '/locations/new', to: 'home#index'
end
