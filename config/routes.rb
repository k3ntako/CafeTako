Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :chains, only: [:index, :create, :show] do
        resources :locations, only: [:index, :create, :show] do
          resources :reviews, only: [:index, :create]
        end

        resources :users, only: [:index, :create]
      end

      match 'users/login', to: 'users#login', via: :post
      match 'users/signup', to: 'users#sign_up', via: :post
      match 'users/logout', to: 'users#logout', via: :post
      match 'users/currentUser', to: 'users#currentUser', via: :post
    end
  end

  get '/locations/new', to: 'home#index'
  get '/chains/:chain_id/locations/:id', to: 'home#index'
  get '/chains/:chain_id/locations/:id/review', to: 'home#index'
end
