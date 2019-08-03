class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def search
    search_results = Location.chain_location_search(search_params[:search].downcase)

    render json: search_results
  end

  private

  def search_params
    params.permit(:search)
  end

end
