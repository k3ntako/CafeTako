class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :score, :music, :review, :seating_count, :bathroom_count,
    :noise_level, :wifi_speed, :start_time, :end_time
end
