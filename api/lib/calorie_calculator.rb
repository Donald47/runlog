module CalorieCalculator

  def self.calculate(distance_in_meters, time_in_seconds, mass_in_kg)
    raise "invalid distance_in_meters" unless distance_in_meters.is_a?(Numeric)
    raise "invalid time_in_seconds" unless time_in_seconds.is_a?(Numeric)
    raise "invalid mass_in_kg" unless mass_in_kg.is_a?(Numeric)
    mps = (distance_in_meters / time_in_seconds)
    kph = (mps * 3.6)
    vo2 = (2.209 + 3.1633 * kph)
    kcal_minute = (4.86 * mass_in_kg * vo2 / 1000)
    return kcal_minute
  rescue StandardError => e
    Rails.logger.error(e)
    raise e
  end
end
