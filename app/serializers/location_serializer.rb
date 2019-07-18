class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :business_hours

  has_many :reviews
end
