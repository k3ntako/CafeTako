class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :business_hours, :chain

  has_many :reviews
end
