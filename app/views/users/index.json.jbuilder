json.array! @users do |user|
  # binding.pry
  json.id user.id
  json.name user.name
end