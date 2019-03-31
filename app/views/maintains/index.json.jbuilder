json.array!(@maintains) do |maintain|
  json.extract! maintain, :id, :car_name, :car_nubmer, :fix_detail, :fix_time, :cost
  json.url maintain_url(maintain, format: :json)
end
