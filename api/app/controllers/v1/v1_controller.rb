module V1
  class V1Controller < ActionController::API
    before_action :require_auth

    private

    def require_auth
      response_json = { message: 'Not Authorised' };
      token = Tokeniser.decode(request.headers['Authorization'])
      @athelete = Athelete.find(token['id'])
      throw 'Athelete not present' unless @athelete.present?
    rescue StandardError => e
      Rails.logger.error(e)
      render json: response_json, status: :unauthorized
    end
  end
end
