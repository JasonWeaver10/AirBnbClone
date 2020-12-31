module Api
  class PropertiesController < ApplicationController
    before_action :current_user
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties
      render 'api/properties/index', status: :ok
    end
    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property
      render 'api/properties/show', status: :ok
    end

    def update 
      @property = Property.find_by(id: params[:id])
    
      if @property.update(property_params)
        render status: :ok
      else 
        render json: { success: false }, status: :bad_request
      end
    end

    def create 
      @property = Property.new(property_params)
      if @property.save
        render 'api/properties/create', status: :ok
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def destroy
      @property = Property.find_by(id: params[:id])
      @property.destroy
    end

    def userProperties
      user =  @current_user
      @properties = Property.where("user_id = ?", user)
      return render json: { error: 'not_found' }, status: :not_found if !@properties
      render  status: :ok
    end

    private 

    def property_params
      params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :user_id, :image_url, images: [])
    end

  end

end