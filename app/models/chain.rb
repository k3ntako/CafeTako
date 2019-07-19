class Chain < ApplicationRecord
  validates :name, presence: true

  has_many :locations
end
