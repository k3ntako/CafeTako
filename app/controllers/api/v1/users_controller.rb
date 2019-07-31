class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: User.all
  end

  def create
    new_user = User.new(new_user_params)

    if new_user.save!
      render json: { okay: true, id: new_user.id }
    else
      render json: { okay: false, error: "Failed to create new location: #{new_user.errors.full_messages[0]}" }
    end
  end

  def login
    user = User.find_by_email(login_params[:email])
    if !user
      render json: {okay: false, error: "User not found"}, status: 400
    elsif user && user.authenticate(login_params[:password])
      render json: {okay: true}
    else
      render json: {okay: false, error: "Email and password did not match"}, status: 401
    end

  end

  private

  def new_user_params
    params.permit(:email, :first_name, :last_name, :birthday, :password)
  end

  def login_params
    params.permit(:email, :password)
  end

end
