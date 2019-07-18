Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :create, :show] do
        resources :reviews, only: [:index, :create]
      end

      resources :users, only: [:index]
    end
  end

  get '/locations/new', to: 'home#index'
  get '/locations/:id', to: 'home#index'
end
