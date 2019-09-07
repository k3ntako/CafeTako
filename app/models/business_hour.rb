class BusinessHour < ApplicationRecord
  validates_inclusion_of :open_time, :allow_nil => true, :in => 0..1439
  validates_inclusion_of :close_time, :allow_nil => true, :in => 0..1439
end
