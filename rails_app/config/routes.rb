Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/mapQuestPoints/', to: 'telemetry#parse_data'

  get '/getForm/', to: 'telemetry#get_form'


end
