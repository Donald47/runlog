# == Schema Information
#
# Table name: atheletes
#
#  id              :uuid             not null, primary key
#  email           :string           not null
#  mass_in_kg      :decimal(, )      not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_atheletes_on_email  (email) UNIQUE
#  index_atheletes_on_id     (id) UNIQUE
#

class Athelete < ApplicationRecord
  has_secure_password
  has_many :runs, dependent: :destroy
end
