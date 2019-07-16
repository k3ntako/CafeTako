class Location < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true, uniqueness: true
  validates :hours, presence: true

  has_many :reviews
end
