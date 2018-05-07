module V1
  class AuthenticationController < ApplicationController
    skip_before_action :require_auth

    def create
      athelete = Athelete.find_by(email: params[:email])
      render json: {}, status: :unauthorized if athelete.nil?
      render json: {}, status: :unauthorized if athelete.authenticate(params[:password]) == false
      token = Tokeniser.encode(athelete.id)
      render json: { auth_token: token }, status: :ok
    rescue StandardError => e
      Rails.logger.error(e)
      render json: {}, status: :internal_server_error
    end

    def destroy

    end
  end
end
