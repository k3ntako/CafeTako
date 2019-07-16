class User < ApplicationRecord
  validates :email, presence: true
  validates :first_name, presence: true, uniqueness: true
  validates :last_name, presence: true
  validates :birthday, presence: true

  has_many :reviews
end
