class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    limit = index_param[:limit]
    if !limit.is_a? Numeric
      limit = 24
    end

    chain_id = index_param[:chain_id]

    if chain_id == "all"
      render json: Location.all.limit(limit)
    elsif chain_id.to_i.is_a? Numeric
      render json: Location.where({chain_id: chain_id}).limit(limit)
    else
      error_json = { okay: false, error: "Failed to fetch locations: invalid chain ID." }
      render json: error_json, status: 400
    end
  end

  def create
    new_location = Location.new(new_location_params)

    if new_location.save!
      render json: { okay: true, id: new_location.id, chain: new_location.chain }
    else
      render json: { okay: false, error: "Failed to create new location: #{new_location.errors.full_messages[0]}" }
    end
  end

  def show
    location = Location.find(id_param[:id])
    render json: location
  end

  def csv_upload
    count = {
      added: 0,
      skipped: 0,
    }

    chain_id = nil
    if csv_upload_params.has_key? :chain_id
      chain_id = csv_upload_params[:chain_id]
    else
      new_chain = Chain.new
      new_chain.name = csv_upload_params[:new_chain_name]
      new_chain.save!
      chain_id = new_chain.id
    end

    locations = csv_upload_params[:csv].split("\n")
    locations.each do |location|
      location_info = location.split("+")

      address_hash = JSON.parse( location_info[2] )

      query_string = "address->>'address_part_1' = ? AND address->>'zipcode' = ? AND address->>'country' = ?"
      existing_locations = Location.where(
        query_string,
        address_hash["address_part_1"],
        address_hash["zipcode"],
        address_hash["country"],
      )

      if existing_locations.length > 0
        puts existing_locations
        count[:skipped] = count[:skipped] + 1
        next
      end

      new_location = Location.new
      new_location.name = location_info[1]
      new_location.address = address_hash
      new_location.lat = location_info[3]
      new_location.lng = location_info[4]
      new_location.business_hours = self.parse_business_hours(JSON.parse(location_info[5]))
      new_location.chain_id = chain_id

      new_location.save!
      count[:added] = count[:added] + 1
    end

    puts "#{count[:added]} location(s) added, and #{count[:skipped]} location(s) skipped."
    render json: {okay: true}
  end

  private

  def index_param
    params.permit(:limit, :chain_id)
  end

  def id_param
    params.permit(:id)
  end

  def new_location_params
    params.permit( :name, :chain_id, :lat, :lng, :address => [ :address_part_1, :address_part_2, :address_part_3, :city, :state, :zipcode, :country ] )
  end

  def csv_upload_params
    params.permit(:csv, :chain_id, :new_chain_name)
  end
end
