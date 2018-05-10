module V1
  class AuthenticationController < ApplicationController
    skip_before_action :require_auth

    def create
      error_json = { message: 'Invalid Details' }
      athelete = Athelete.find_by(email: params[:email])
      return render json: error_json, status: :unauthorized if athelete.nil?
      return render json: error_json, status: :unauthorized if athelete.authenticate(params[:password]) == false
      token = Tokeniser.encode(athelete.id)
      render json: { auth_token: token }, status: :ok
    rescue StandardError => e
      Rails.logger.error(e)
      render json: error_json, status: :internal_server_error
    end

    def destroy
      
    end
  end
end
