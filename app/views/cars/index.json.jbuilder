json.array!(@cars) do |car|
  json.extract! car, :id, :name, :number, :driver_name, :fuel, :area, :oil_wear, :buy_time, :state
  json.url car_url(car, format: :json)
end
