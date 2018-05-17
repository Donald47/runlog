# == Schema Information
#
# Table name: runs
#
#  id                 :uuid             not null, primary key
#  distance_in_meters :decimal(, )      not null
#  kcal_minute        :decimal(, )      not null
#  time_in_seconds    :decimal(, )      not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  athelete_id        :uuid             not null
#
# Indexes
#
#  index_runs_on_athelete_id  (athelete_id)
#  index_runs_on_id           (id) UNIQUE
#

require 'test_helper'

class RunTest < ActiveSupport::TestCase

  setup do
    @athelete = atheletes(:one)
  end

  test "should validate distance time and athelete" do
    run = Run.new
    assert_not run.valid?
    assert_equal [:athelete, :distance_in_meters, :time_in_seconds], run.errors.keys
  end

  test "should auto populate kcal_minute" do
    run = Run.create!(distance_in_meters: 100, time_in_seconds: 10.18,  athelete: @athelete)
    assert run.errors.empty?
    assert run.kcal_minute.present?
  end
end
