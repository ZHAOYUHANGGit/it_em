Rails.application.routes.draw do




  #users
  resources :users
  get "it_login" => "users#it_login", :as => "it_login"
  post "create_it_login_session" => "users#create_it_login_session"
  get "car_login" => "users#car_login", :as => "car_login"
  post "create_car_login_session" => "users#create_car_login_session"
  delete "logout" => "users#logout", :as => "logout"
  get 'drivers_list' => "users#drivers_list", :as => "drivers_list"
  get 'add_driver' => "users#add_driver", :as => "add_driver"
  # IT服务平台所有路由
  get 'list/index' => 'list#index', :as => 'list'
  resources :gongdans
  # 补录工单
  get 'gongdans/:id/additional' => "gongdans#additional", :as => "additional"
  resources :permissions
  # edit three roles
  get 'gongdans/:id/manager_edit' => "gongdans#manager_edit", :as => "manager_edit"
  get 'gongdans/:id/worker_edit' => "gongdans#worker_edit", :as => "worker_edit"
  get 'gongdans/:id/worker_accept' => "gongdans#worker_accept", :as => "worker_accept"
  get 'gongdans/:id/worker_transfer' => "gongdans#worker_transfer", :as => "worker_transfer"
  get 'gongdans/:id/user_edit' => "gongdans#user_edit", :as => "user_edit"
  get 'gongdans/:id/experience_edit' => "gongdans#experience_edit", :as => "experience_edit"
  get 'gongdans/:id/history_show' => "gongdans#history_show", :as => "history_show"
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'total#index', :as => 'total'

  # the list of finished gongdan
  get 'list/history_index' => "list#history_index", :as => "history"
  # the list of experience_base of gongdan
  get 'list/experience_base' => "list#experience_base", :as => "experience_base"
  # the list of echarts
  get 'list/report' => "list#report", :as => "report"
  get 'list/evaluation' => "list#evaluation", :as => "evaluation"
  get 'list/attribute' => "list#attribute", :as => "attribute"
  get 'list/analysis' => "list#analysis", :as => "analysis"
  # 报表中心
  get 'exports' => 'list#exports', :as => "exports" # IT维修服务表页面
  get 'exports/:id' => 'list#exports', :as => "export" #IT维修服务表导出
  get 'evaluates' => 'list#evaluate', :as => "evaluates" #满意度调查表页面
  get 'evaluates/:id' => 'list#evaluate', :as => "evaluate" #满意度调查表导出



  #车辆管理系统所有路由!
  get 'm_cars/index' => "m_cars#index", :as => 'm_cars'
  get 'm_cars/use_cost' => "m_cars#use_cost", :as => 'use_cost'
  get 'm_cars/drive' => 'm_cars#drive', :as => 'drive'
  get 'm_cars/travel' => 'm_cars#travel', :as => 'travel'
  get 'm_cars/maintain_fix' => 'm_cars#maintain_fix', :as => 'maintain_fix'
  get 'm_cars/educe' => 'm_cars#educe', :as => 'educe'
   #新建加油列表
  get 'works/oils_list' => 'works#oils_list', :as => 'oils_list'
  get 'works/:id/add_oil' => 'works#add_oil', :as => 'add_oil'
  get 'works/:id/edit_oil' => 'works#edit_oil', :as => 'edit_oil'


  resources :works
  resources :maintains
  resources :cars
  resources :oil_cards
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
