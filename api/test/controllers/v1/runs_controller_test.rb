require 'test_helper'

module V1
  class RunsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @run = runs(:one)
    end

    test "should get index" do
      get v1_runs_url, as: :json
      assert_response :success
    end

    test "should create run" do
      assert_difference('Run.count') do
        post v1_runs_url, params: { run: {  } }, as: :json
      end
      assert_response 201
    end
  end
end
