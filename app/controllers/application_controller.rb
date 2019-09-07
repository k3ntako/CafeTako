class ApplicationController < ActionController::Base
  def parse_business_hours( raw_business_hours )
    parsed_business_hours = {}
    raw_business_hours.each do | day_hash |
      day_of_week = day_hash[0]
      open_time = day_hash[1]["open_time"]
      close_time = day_hash[1]["close_time"]

      bh = BusinessHour.find_by open_time: open_time, close_time: close_time

      if bh
        parsed_business_hours[day_of_week] = bh.id
        next
      end

      new_bh = BusinessHour.new
      new_bh.open_time = open_time
      new_bh.close_time = close_time
      new_bh.save!

      parsed_business_hours[day_of_week] = new_bh.id
    end

    parsed_business_hours
  end
end
