class Api::V1::ChainsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    limit = limit_param[:limit]
    if !limit.is_a? Numeric
      limit = 20
    end

    render json: Chain.all.limit(limit)
  end

  def create
    new_chain = Chain.new(new_chain_params)

    if new_chain.save!
      render json: new_chain
    else
      error_json = { okay: false, error: "Failed to create new chain: #{new_chain.errors.full_messages[0]}" }
      render json: error_json, status: 400
    end
  end

  def show
    location = Chain.find(id_param[:id])
    render json: location
  end

  private

  def limit_param
    params.permit(:limit)
  end

  def new_chain_params
    params.permit(:name)
  end

  def id_param
    params.permit(:id)
  end

end
