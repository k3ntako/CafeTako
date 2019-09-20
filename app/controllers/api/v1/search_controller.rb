class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def search
    user_lat = search_params[:lat]
    user_lng = search_params[:lng]

    distance_formula = "( 3959 * acos( cos( radians(#{user_lat}) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(#{user_lng}) ) + sin( radians(#{user_lat}) ) * sin( radians( lat ) ) ) )"

    close_locations = Location.select("*, #{distance_formula} AS distance").where("#{distance_formula} < 25").order(:distance)

    if search_params[:search] && search_params[:search].strip.length > 0
      # if there is a search string
      search_results = close_locations.chain_location_search(search_params[:search].downcase)
    else
      # if not, return the 24 closest cafes
      search_results = close_locations
    end

    # last_modified = search_results.maximum(:updated_at)
    locations = search_results.limit(20)
    render json: {
      locations: ActiveModel::Serializer::ArraySerializer.new(locations)
    }
  end

  private

  def search_params
    params.permit(:search, :lat, :lng, :last_modified)
  end

end
