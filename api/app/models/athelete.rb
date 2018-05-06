# == Schema Information
#
# Table name: atheletes
#
#  id                 :uuid             not null, primary key
#  email              :string           not null
#  encrypted_password :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_atheletes_on_email  (email) UNIQUE
#  index_atheletes_on_id     (id) UNIQUE
#

class Athelete < ApplicationRecord
  has_secure_password
  
end
