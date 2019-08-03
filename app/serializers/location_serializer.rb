class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :business_hours, :chain, :lat, :lng, :distance

  has_many :reviews
end
