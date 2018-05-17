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

class Run < ApplicationRecord

  belongs_to :athelete, inverse_of: :runs, required: true

  validates :distance_in_meters, :numericality => { :greater_than => 0 }
  validates :time_in_seconds, :numericality => { :greater_than => 0 }

  before_save :compute_calories, on: :create

  def compute_calories
    athelete = Athelete.find(self.athelete_id) # Use id fetch because we are pre-save
    self.kcal_minute = CalorieCalculator.calculate(self.distance_in_meters, self.time_in_seconds, athelete.mass_in_kg)
    self.save unless self.new_record? # Autosave unless we've not been saved before.
  end
end
