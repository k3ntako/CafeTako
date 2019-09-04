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
  address: {
    address_part_1: "1 Main St.",
    address_part_2: nil,
    address_part_3: nil,
    city: "Brooklyn",
    state: "NY",
    zipcode: 11217,
    country: "US",
  },
  chain: chain,
  lat: 40.753741,
  lng: -74.002029,
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
  start_time: "10:00",
  end_time: "13:20",
  location_id: 1,
  user_id: 1,
})
