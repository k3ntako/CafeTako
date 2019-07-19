class Review < ApplicationRecord
  validates :title, presence: true
  validates :score, presence: true
  validates_inclusion_of :score, :in => 1..5
  validates :score, presence: true
  validates :music, inclusion: { in: [true, false, nil] }

  # Enum https://www.sitepoint.com/enumerated-types-with-activerecord-and-postgresql/
  # Enum has to be unique between enums
  # Cannot have two mediums
  enum seating_count: {
    none: 0,
    very_small: 1,
    small: 2,
    medium: 3,
    large: 4,
    very_large: 5
  }, _prefix: :seating

  enum bathroom_count: {
    none: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five_seven: 5,
    eight_ten: 6,
    elevent_fifteen: 7,
    sixteen_twenty: 8,
    twenty_one_plus: 9
  }, _prefix: :bathroom

  enum noise_level: {
    silent: 0,
    quiet: 1,
    medium: 2,
    loud: 3,
    very_loud: 4
  }, _prefix: :noise

  enum wifi_speed: {
    none: 0,
    slow: 1,
    average: 2,
    fast: 3
  }, _prefix: :wifi

  belongs_to :location
  belongs_to :user
end
