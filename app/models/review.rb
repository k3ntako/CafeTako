class Review < ApplicationRecord
  validates :title, presence: true
  validates :score, presence: true
  validates_inclusion_of :score, :in => 1..5
  validates :score, presence: true
  validates :music, inclusion: { in: [true, false] }

  # Enum https://www.sitepoint.com/enumerated-types-with-activerecord-and-postgresql/
  # Enum has to be unique between enums
  # Cannot have two mediums
  enum seating: {
    seating_none: 0,
    seating_very_small: 1,
    seating_small: 2,
    seating_medium: 3,
    seating_large: 4,
    seating_very_large: 5,
  }

  enum bathrom_count: {
    bathroom_none: 0,
    bathroom_one: 1,
    bathroom_two: 2,
    bathroom_three: 3,
    bathroom_four: 4,
    bathroom_five_seven: 5,
    bathroom_eight_ten: 6,
    bathroom_elevent_fifteen: 7,
    bathroom_sixteen_twenty: 8,
    bathroom_twenty_one_plus: 9
  }

  enum noise_levels: {
    noise_silent: 0,
    noise_quiet: 1,
    noise_medium: 2,
    noise_loud: 3,
    noise_very_loud: 4,
  }

  enum wifi_speed: {
    wifi_none: 0,
    wifi_slow: 1,
    wifi_medium: 2,
    wifi_fast: 3,
  }

  belongs_to :location
  belongs_to :user
end
