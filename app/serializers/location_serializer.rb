class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :lat, :lng, :distance

  belongs_to :chain

  def deg_to_rad(d)
    d * Math::PI / 180
  end

  # formula found on Google's documenation:
  # https://developers.google.com/maps/solutions/store-locator/clothing-store-locator#finding-locations-with-mysql
  def distance
    if object.respond_to? :distance
      return object[:distance]
    end

    #commented out because currently, front-end does not pass through their location except for search

    # user_lat = instance_options[:search_params][:lat].to_f
    # user_lng = instance_options[:search_params][:lng].to_f
    #
    # user_lat_rad = deg_to_rad( user_lat )
    # cafe_lat_rad = deg_to_rad( object.lat )
    # user_lat_cos = Math.cos( user_lat_rad )
    # cafe_lat_cos = Math.cos( cafe_lat_rad )
    #
    # user_lng_rad = deg_to_rad( user_lng )
    # cafe_lng_rad = deg_to_rad( object.lng )
    # diff_lng_cos = Math.cos( cafe_lng_rad - user_lng_rad )
    #
    # user_lat_sin = Math.sin( user_lat_rad )
    # cafe_lat_sin = Math.sin( cafe_lat_rad )
    #
    # 3959 * Math.acos( user_lat_cos * cafe_lat_cos * diff_lng_cos + user_lat_sin * cafe_lat_sin )

    nil
  end
end
