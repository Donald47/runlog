module V1
  class V1Controller < ActionController::API
    before_action :require_auth

    private

    def require_auth
      response_json = { message: 'Not Authorised' };
      token = Tokeniser.decode(request.headers['Authorization'])
      @athelete = Athelete.find(token['id'])
      render json: response_json, status: :unauthorized unless @athelete.present?
    end
  end
end
