json.array!(@permissions) do |permission|
  json.extract! permission, :id, :action, :subject, :description
  json.url permission_url(permission, format: :json)
end
