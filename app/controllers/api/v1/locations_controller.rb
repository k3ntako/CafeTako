class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Location.all
  end

  def create
    new_location = Location.new(location_params)

    if new_location.save
      render json: { okay: true }
    else
      render json: { okay: false, error: "Failed to create new location: #{new_location.errors.full_messages[0]}" }
    end
  end

  private

  def location_params
    params.permit(:name, :address, :hours)
  end
end
