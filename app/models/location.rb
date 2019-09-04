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
  validates :business_hours, null: false
  validate :validate_address

  def validate_address
    ["address_part_1", "city", "state", "zipcode", "country"].each do |key|
      return errors.add(key.to_sym, "cannot be nil") if !address[key]
      return errors.add(key.to_sym, "has to be an instance of a String") if !address[key].is_a?(String)

      val = address[key].strip
      return errors.add(key.to_sym, "cannot be blank") if val.length == 0
    end

    return errors.add(:zipcode, "has to be a five character long string of digits") if !/^[\d+]{5}$/.match(address["zipcode"]) #matches string with only digits
    is_zipcode_valid = address["zipcode"].to_i > 0 && address["zipcode"].to_i < 100000
    return errors.add(:zipcode, "has to be between 00000 and 100000") if !is_zipcode_valid

    if address["address_part_2"] && !address["zipcode"].is_a?(String)
      return errors.add(:address_part_2, "has to be an instance of a String")
    end

    if address["address_part_3"] && !address["zipcode"].is_a?(String)
      return errors.add(:address_part_3, "has to be an instance of a String")
    end
  end

  has_many :reviews
  belongs_to :chain
end
