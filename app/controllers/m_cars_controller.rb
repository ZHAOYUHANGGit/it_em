class MCarsController < ApplicationController

  before_action :true_user_car_login

  def index
  end


  def use_cost
    t = params[:reservation]
    b= params[:keyword]
    if !t.blank?
      startdate = params[:reservation][0,10]
      enddate = params[:reservation][-10,10]
      time_range = startdate..enddate
    end
    if t.blank? and b.blank?
      d = Time.now.day
      s = Time.now - d.day
      e = Time.now
      r = s..e
      @works = Work.where(flag: nil,created_at: r).order(created_at: :desc)
    elsif !t.blank? and b.blank?
      @works = Work.where(flag: nil,work_time:time_range).order(created_at: :desc)
    elsif t.blank? and !b.blank?
      a = Work.where(flag: nil)
      @works = a.where("(area LIKE :p) OR (department LIKE :p) ", p:"%#{params[:keyword]}%").order(created_at: :desc).page(params[:page]).per(10)
    elsif !t.blank? and !b.blank?
      a = Work.where(flag: nil,work_time:time_range)
      @works = a.where("( area LIKE :p) OR (department LIKE :p) ", p:"%#{params[:keyword]}%").order(created_at: :desc)
    end
      @works_groups = @works.group_by{|s| s.department}
  end


  def drive
    t = params[:reservation]
    if !t.blank?
      startdate = params[:reservation][0,10]
      enddate = params[:reservation][-10,10]
      time_range = startdate..enddate
    end
    a= params[:area]
    b= Work.where(flag: nil)
    if t.blank? and a.blank?
      d = Time.now.day
      s = Time.now - d.day
      e = Time.now
      r = s..e
      @works = Work.where(flag: nil,created_at: r)
    elsif !t.blank? and a.blank?
      @works = b.where(work_time:time_range).order(end_k: :asc)
    elsif t.blank? and !a.blank?
      @works = b.where(area: a).order(end_k: :asc)
    else
      @works = b.where(work_time:time_range, area: a).order(end_k: :asc)
    end
    @works_groups = @works.group_by{|d| d.driver_name}
  end


  def travel
    number_range = 0..9999
    o = Work.where(oils_amount: number_range)
    t = params[:reservation]
    if !t.blank?
      startdate = params[:reservation][0,10]
      enddate = params[:reservation][-10,10]
      time_range = startdate..enddate
    end
    a= params[:area]
    b= params[:car_number]
    #不选条件
    if  t.blank? and a.blank? and b.blank?
      d = Time.now.day
      s = Time.now - d.day
      e = Time.now
      r = s..e
      @works = o.where(created_at: r)
    elsif !t.blank? and a.blank? and b.blank?
      @works = o.where(work_time:time_range).order(end_k: :asc)
    elsif t.blank? and !a.blank? and b.blank?
      @works = o.where( area:a).order(end_k: :asc)
    elsif t.blank? and a.blank? and !b.blank?
      @works = o.where(car_number:b ).order(end_k: :asc)
    elsif !t.blank? and !a.blank? and b.blank?
      @works = o.where(work_time:time_range,area:a).order(end_k: :asc)
    elsif t.blank? and !a.blank? and !b.blank?
      @works = o.where(area:a,car_number:b).order(end_k: :asc)
    elsif !t.blank? and a.blank? and !b.blank?
      @works = o.where(work_time:time_range,car_number:b).order(end_k: :asc)
    else !t.blank? and !a.blank? and !b.blank?
      @works = o.where(work_time:time_range,area:a,car_number:b).order(end_k: :asc)
    end
      @works_groups = @works.group_by{|n| n.car_number}
    if t.blank?
      @oil_card_l = OilCard.all.order(created_at: :asc).last
      @oil_cards = OilCard.all.order(created_at: :asc)
    else
      @oil_card_l = OilCard.where(recharge_time: time_range).order(created_at: :asc).last
      @oil_cards = OilCard.where(recharge_time: time_range).order(created_at: :asc)
    end
  end


  def maintain_fix
    t = params[:reservation]
    if !t.blank?
      startdate = params[:reservation][0,10]
      enddate = params[:reservation][-10,10]
      time_range = startdate..enddate
    end
    a= params[:area]
    b= params[:car_number]
    #不选条件
    if  t.blank? and a.blank? and b.blank?
      d = Time.now.day
      s = Time.now - d.day
      e = Time.now
      r = s..e
      @maintains = Maintain.where(created_at: r).order(created_at: :desc)
    elsif !t.blank? and a.blank? and b.blank?
      @maintains = Maintain.where(fix_time:time_range).order(created_at: :desc)
    elsif t.blank? and !a.blank? and b.blank?
      @maintains = Maintain.where( area:a).order(created_at: :desc)
    elsif t.blank? and a.blank? and !b.blank?
      @maintains = Maintain.where(car_number:b ).order(created_at: :desc)
    elsif !t.blank? and !a.blank? and b.blank?
      @maintains = Maintain.where(fix_time:time_range,area:a).order(created_at: :desc)
    elsif t.blank? and !a.blank? and !b.blank?
      @maintains = Maintain.where(area:a,car_number:b).order(created_at: :desc)
    elsif !t.blank? and a.blank? and !b.blank?
      @maintains = Maintain.where(fix_time:time_range,car_number:b).order(created_at: :desc)
    else !t.blank? and !a.blank? and !b.blank?
    @maintains = Maintain.where(fix_time:time_range,area:a,car_number:b).order(created_at: :desc)
    end
    @maintains_groups = @maintains.group_by{|c| c.car_number}
  end

  def educe

  @works = Work.all.order(created_at: :desc)

    respond_to do |format|
      format.html
      format.xlsx {render xlsx: 'educe', filename: "车辆工作表-#{current_user.name}-#{Time.now.to_date}.xlsx"}
    end
  end


end
