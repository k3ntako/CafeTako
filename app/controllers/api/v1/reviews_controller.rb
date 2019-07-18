class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Review.all
  end

  def create
    params = new_review_params
    params["user_id"] = 1
    
    new_review = Review.new(params)

    if new_review.save!
      render json: { okay: true }
    else
      render json: { okay: false, error: "Failed to save new review: #{new_review.errors.full_messages[0]}" }
    end
  end

  private

  def new_review_params
    params.permit(:title, :score, :music, :review, :seating_count, :bathroom_count,
      :noise_level, :wifi_speed, :start_time, :end_time, :location_id)
  end
end
