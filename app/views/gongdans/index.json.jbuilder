json.array!(@gongdans) do |gongdan|
  json.extract! gongdan, :id, :title, :creator, :department, :area, :demander, :emergent, :description, :appoint_department, :appoint_worker, :state, :evaluate, :dispatch_time, :dispatch_time_second, :transfer_time, :finish_time, :transger_reson, :number, :appoint_department_again, :flag, :e_timeliness, :e_attitude, :e_quality, :e_improvement, :helpers, :processing_procedure, :experience_base, :file_time, :appoint_worker_again
  json.url gongdan_url(gongdan, format: :json)
end
