class Location < ApplicationRecord
  include PgSearch::Model
  pg_search_scope :chain_location_search,
    against: :name,
    associated_against: {
      chain: :name,
    },
    using: {
      tsearch: {
        any_word: true,
        prefix: true,
      }
    }

  validates :name, presence: true
  validates :address, presence: true, uniqueness: true
  validates :business_hours, null: false

  has_many :reviews
  belongs_to :chain
end
