json.array!(@users) do |user|
  json.extract! user, :id, :name, :email, :password_digest, :token, :area, :department
  json.url user_url(user, format: :json)
end
