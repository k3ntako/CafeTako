class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :business_hours, :chain_id

  has_many :reviews
end
