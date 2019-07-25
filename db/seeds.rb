# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({
  email: "example@example.com",
  first_name: "K3ntako",
  last_name: "Kaneki",
  birthday: Date.new(1995,5,27),
})

chain = Chain.create({
  name: "Kentaro's Cafe",
})

Location.create({
  name: "Kentaro's Cafe",
  address: "1 Main St. Brooklyn, NY 11217",
  chain: chain,
})

Review.create({
  title: "Amazing!",
  score: 5,
  music: false,
  review: "One of the best places to study. Clean bathroom and there are always seats available.",
  seating_count: "medium",
  bathroom_count: "two",
  noise_level: "quiet",
  wifi_speed: "average",
  start_time: 420,
  end_time: 1320,
  location_id: 1,
  user_id: 1,
})
