class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    limit = limit_param[:limit]
    if !limit.is_a? Numeric
      limit = 20
    end
    
    render json: Location.all.limit(limit)
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

  def limit_param
    params.permit(:limit)
  end

  def location_params
    params.permit(:name, :address, :hours)
  end
end
