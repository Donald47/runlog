# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Athelete.destroy_all
Run.destroy_all

athlete = Athelete.create(email: "hello@test.com", password: "password")
Run.create!(calories_burned: 0, distance_in_meters: 0, time_in_seconds: 0,  athelete_id: athlete.id)
