json.array!(@works) do |work|
  json.extract! work, :id, :car_name, :car_number, :driver_name, :department, :start_k, :end_k, :tolls, :work_time, :remarks, :area
  json.url work_url(work, format: :json)
end
