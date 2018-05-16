require 'test_helper'

module V1
  class RunsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @athelete = atheletes(:one)
      @other_athelete = atheletes(:two)
      @token = Tokeniser.encode(id: @athelete.id)
    end

    test "get runs should fail without a token" do
      get v1_runs_url, as: :json
      assert_response :unauthorized
      assert_equal json_response['message'], 'Not Authorised'
    end

    test "should get runs for one athelete but not another" do
      get v1_runs_url, as: :json, headers: { authorization: @token }
      assert_equal response.body, ActiveSupport::JSON.encode(@athelete.runs.order(created_at: :desc))
      assert_not_equal response.body, ActiveSupport::JSON.encode(@other_athelete.runs.order(created_at: :desc))
    end

    test "create run without a token should fail" do
      assert_no_changes('Run.count') do
        post v1_runs_url, params: { run: { distance_in_meters: 100, time_in_seconds: 15 } }, as: :json
      end
      assert_response :unauthorized
      assert_equal json_response['message'], 'Not Authorised'
    end

    test "create run with invalid distance should fail" do
      assert_no_changes('Run.count') do
        post v1_runs_url, params: { run: { distance_in_meters: -1, time_in_seconds: 15 } }, as: :json, headers: { authorization: @token }
      end
      assert_response :unprocessable_entity
      assert json_response['distance_in_meters'].present?
    end

    test "create run with invalid time should fail" do
      assert_no_changes('Run.count') do
        post v1_runs_url, params: { run: { distance_in_meters: 100, time_in_seconds: -1 } }, as: :json, headers: { authorization: @token }
      end
      assert_response :unprocessable_entity
      assert json_response['time_in_seconds'].present?
    end

    test "create run with valid details should create run" do
      assert_difference('Run.count', +1) do
        post v1_runs_url, params: { run: { distance_in_meters: 100, time_in_seconds: 15 } }, as: :json, headers: { authorization: @token }
      end
      assert_response :created
      assert_equal response.body, ActiveSupport::JSON.encode(@athelete.runs.order(created_at: :desc))
      assert_not_equal response.body, ActiveSupport::JSON.encode(@other_athelete.runs.order(created_at: :desc))
    end

  end
end
