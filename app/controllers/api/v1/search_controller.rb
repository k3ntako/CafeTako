class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def search
    user_lat = search_params[:lat]
    user_lng = search_params[:lng]

    distance_formula = "( 3959 * acos( cos( radians(#{user_lat}) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(#{user_lng}) ) + sin( radians(#{user_lat}) ) * sin( radians( lat ) ) ) )"

    close_locations = Location.select("*, #{distance_formula} AS distance").where("#{distance_formula} < 25").order(:distance)

    if search_params[:search] && search_params[:search].strip.length > 0
      search_results = close_locations.chain_location_search(search_params[:search].downcase).limit(24)
    else
      search_results = close_locations.limit(24);
    end

    puts "search_results #{search_results.inspect}"

    render json: search_results
  end

  private

  def search_params
    params.permit(:search, :lat, :lng)
  end

end
