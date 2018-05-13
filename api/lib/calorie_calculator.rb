module CalorieCalculator

  def self.calculate(distance_in_meters, time_in_seconds, mass_in_kg)
    mps = (distance_in_meters / time_in_seconds)
    kph = (mps * 3.6)
    vo2 = (2.209 + 3.1633 * kph)
    kcal_minute = (4.86 * mass_in_kg * vo2 / 1000)
    return kcal_minute
  end
end
