  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  namespace :v1 do
    post 'sign_in', to: 'authentication#create'
    resources :runs
  end
end
