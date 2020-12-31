class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private 

  def current_user
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)
    @current_user = session.user_id
  end
end
