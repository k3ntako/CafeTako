class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def search
    t = Location.arel_table
    search_results = Location.where(t[:name].matches("%#{search_params[:search].downcase}%"))

    render json: search_results
  end

  private

  def search_params
    params.permit(:search)
  end

end
