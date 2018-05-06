require 'test_helper'

class AtheletesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @athelete = atheletes(:one)
  end

  test "should get index" do
    get atheletes_url, as: :json
    assert_response :success
  end

  test "should create athelete" do
    assert_difference('Athelete.count') do
      post atheletes_url, params: { athelete: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show athelete" do
    get athelete_url(@athelete), as: :json
    assert_response :success
  end

  test "should update athelete" do
    patch athelete_url(@athelete), params: { athelete: {  } }, as: :json
    assert_response 200
  end

  test "should destroy athelete" do
    assert_difference('Athelete.count', -1) do
      delete athelete_url(@athelete), as: :json
    end

    assert_response 204
  end
end
