class BusinessHour < ApplicationRecord
  validates_inclusion_of :open_time, :in => 0..1439
  validates_inclusion_of :close_time, :in => 0..1439
end
