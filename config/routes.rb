Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :chains, only: [:index, :create, :show] do
        resources :locations, only: [:index, :create, :show] do
          resources :reviews, only: [:index, :create]
        end

        resources :users, only: [:index]
      end
    end
  end

  get '/locations/new', to: 'home#index'
  get '/chains/:chain_id/locations/:id', to: 'home#index'
  get '/chains/:chain_id/locations/:id/review', to: 'home#index'
end
