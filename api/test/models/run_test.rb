# == Schema Information
#
# Table name: runs
#
#  id                 :uuid             not null, primary key
#  calories_burned    :decimal(, )      not null
#  distance_in_meters :decimal(, )      not null
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
  # test "the truth" do
  #   assert true
  # end
end
