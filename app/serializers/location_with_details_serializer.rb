class LocationWithDetailsSerializer < LocationSerializer
  attributes :id, :name, :address, :business_hours, :lat, :lng, :distance
  has_many :reviews

  def business_hours
    business_hours_with_times = {}
    object[:business_hours].each do |key, value|
      if value.is_a? Numeric
        business_hours_with_times[key] = BusinessHour.find(value)
      else
        business_hours_with_times[key] = nil
      end
    end
    business_hours_with_times
  end
end
