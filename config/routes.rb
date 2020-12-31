Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/addProperty' => 'static_pages#addProperty'
  get '/myProperties' => 'static_pages#myProperties'
  get '/propertyBookings/:id' => 'static_pages#propertyBookings'
  get '/myBookings' => 'static_pages#myBookings'
  get '/editProperty/:id' => 'static_pages#editProperty'
  get '/booking/:id/success' => 'static_pages#paymentSuccess'
  get '/logout' => 'static_pages#logout'
  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create, :update, :destroy]
    resources :charges, only: [:create] 
    resources :bookings, only: [:create, :show]

    get '/myProperties' => 'properties#userProperties'
    get '/authenticated' => 'sessions#authenticated'
    get '/paymentSuccess/:id' => 'bookings#paymentSuccess'
    get '/propertyBookings/:id' => 'bookings#propertyBookings'
    get '/userBookings' => 'bookings#userBookings'
    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end

end
