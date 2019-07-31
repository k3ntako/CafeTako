class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :business_hours, :chain, :lat, :lng

  has_many :reviews
end
