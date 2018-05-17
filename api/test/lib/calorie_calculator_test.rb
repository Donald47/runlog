require 'test_helper'

class CalorieCalculatorTest < ActiveSupport::TestCase

  test 'throws useful errors with invalid input' do
    assert_raise ArgumentError do
      CalorieCalculator.calculate(1, 1)
    end
    assert_raise ZeroDivisionError do
      CalorieCalculator.calculate(0, 0, 0)
    end
    assert_raise RuntimeError do
      CalorieCalculator.calculate(0, '0', 0)
    end
    assert_raise RuntimeError do
      CalorieCalculator.calculate({ number: 0 }, 0, 0)
    end
  end

  test 'Gives the right result with valid input' do
    assert_nothing_raised do
      @kcal_minute = CalorieCalculator.calculate(1, 1, 1)
    end
    assert_equal @kcal_minute, 0.0660808368
  end
end
