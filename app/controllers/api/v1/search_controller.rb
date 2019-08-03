class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def search
    location_table = Location.arel_table
    location_results = Location.where(location_table[:name].matches("%#{search_params[:search].downcase}%"))
    chain_table = Location.arel_table
    chain_results = Location.where(chain_table[:name].matches("%#{search_params[:search].downcase}%"))

    search_results = chain_results + location_results

    render json: search_results
  end

  private

  def search_params
    params.permit(:search)
  end

end
