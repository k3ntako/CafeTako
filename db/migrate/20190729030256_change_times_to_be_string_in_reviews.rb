class ChangeTimesToBeStringInReviews < ActiveRecord::Migration[5.2]
  def up
    change_column :reviews, :start_time, :string
    change_column :reviews, :end_time, :string

    Review.find_each do |review|
      review.start_time = changeToString review.start_time
      review.end_time = changeToString review.end_time

      review.save!
    end
  end

  def down
    change_column :reviews, :start_time, 'integer USING CAST(start_time AS integer)'
    change_column :reviews, :end_time, 'integer USING CAST(end_time AS integer)'

    Review.find_each do |review|
      review.start_time = changeToInteger review.start_time
      review.end_time = changeToInteger review.end_time

      review.save!
    end
  end
end

def changeToString( time )
  return nil if (!time.is_a? Integer) && (!time.is_a? String)

  time_int = time.to_i

  return nil if time_int < 0 || time_int > 1440
  return "00:00" if time_int == 0 || time_int == 1440

  # sprintf '%02d', n --- returns the integer as a string with two digits
  hour = sprintf '%02d', (time_int / 60).floor
  minute = sprintf '%02d', (time_int % 60)

  "#{hour}:#{minute}"
end

def changeToInteger( time )
  if time.is_a? Integer
    return nil if time < 0 || time > 1440
    return time
  end

  return nil if !time.is_a? String

  hour_and_minute = time.split(":")

  hour_as_int = hour_and_minute[0].to_i
  min_as_int = hour_and_minute[1].to_i

  return nil if hour_as_int < 0 || hour_as_int > 23 || min_as_int < 0 || min_as_int > 59

  hour_as_int * 60 + min_as_int
end
