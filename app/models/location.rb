class Location < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true, uniqueness: true
  validates :business_hours, null: false

  has_many :reviews
  belongs_to :chain
end
