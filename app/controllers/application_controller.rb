﻿class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.



  protect_from_forgery with: :exception


  def current_user
    @current_user ||= User.find_by_token!(cookies[:token]) if cookies[:token]
  end

  def current_gongdan

    @current_gongdan = Gongdan.find(params[:id])
  end

  def true_user_it_login
    unless current_user
      flash.notice = "请登录 ！"
      redirect_to :it_login
    end
  end

  def true_user_car_login
    unless current_user
      flash.notice = "请登录 ！"
      redirect_to :car_login
    end
  end

  def current_number

    @current_number = current_user.number
  end
  def current_user_id
    @current_user_id = current_user.id
  end

  def current_department
    @current_departement = current_user.appoint_department
  end


  helper_method :current_user
  helper_method :current_gongdan
  helper_method :current_number
  helper_method :current_departement

end
