require 'test_helper'

module V1
  class AuthenticationControllerTest < ActionDispatch::IntegrationTest
    setup do
    end

    test "should get a token with valid credentials" do
      post v1_sign_in_url, params: { email: 'one@test.com', password: 'password' }, as: :json
      assert_response :success
      assert json_response['auth_token'].blank? === false
    end

    test "should get rejected with invalid email" do
      post v1_sign_in_url, params: { email: 'invalid.com', password: 'password' }, as: :json
      assert_response :unauthorized
      assert json_response['message'] === 'Invalid Details'
    end

    test "should get rejected with invalid password" do
      post v1_sign_in_url, params: { email: 'one@test.com', password: 'not_password' }, as: :json
      assert_response :unauthorized
      assert json_response['message'] === 'Invalid Details'
    end
  end
end
