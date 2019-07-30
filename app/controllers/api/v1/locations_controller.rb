class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    limit = index_param[:limit]
    if !limit.is_a? Numeric
      limit = 20
    end

    chain_id = index_param[:chain_id]

    if chain_id == "all"
      render json: Location.all.limit(limit)
    elsif chain_id.to_i.is_a? Numeric
      render json: Location.where({chain_id: chain_id}).limit(limit)
    else
      error_json = { okay: false, error: "Failed to fetch locations: invalid chain ID." }
      render json: error_json, status: 400
    end
  end

  def create
    new_location = Location.new(new_location_params)

    if new_location.save!
      render json: { okay: true, id: new_location.id, chain: new_location.chain }
    else
      render json: { okay: false, error: "Failed to create new location: #{new_location.errors.full_messages[0]}" }
    end
  end

  def show
    location = Location.find(id_param[:id])
    render json: location
  end

  private

  def index_param
    params.permit(:limit, :chain_id)
  end

  def id_param
    params.permit(:id)
  end

  def new_location_params
    params.permit(:name, :address, :chain_id)
  end
end
