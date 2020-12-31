class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login 
    render 'login'
  end

  def addProperty
    render 'addProperty'
  end

  def myProperties
    render 'myProperties'
  end

  def propertyBookings
    render 'propertyBookings'
  end

  def myBookings
    render 'myBookings'
  end

  def paymentSuccess
    render 'paymentSuccess'
  end

  def logout
    render 'logout'
  end
end
