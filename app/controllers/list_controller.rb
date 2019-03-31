class ListController < ApplicationController

  before_action :true_user_it_login
  def index
    a = params[:q]
    if a.blank?
      if current_number == 1 || current_number == 2
        @gongdans = Gongdan.where(:flag =>1).order(created_at: :desc)
      elsif current_number == 3
        a = Gongdan.where(:appoint_worker => current_user.name,:flag =>1).order(created_at: :desc)
        b = Gongdan.where(:creator => current_user.name,:flag =>1).order(created_at: :desc)
        @gongdans = a || b
      else
        @gongdans = Gongdan.where(:department => current_user.department, :flag =>1).order(created_at: :desc)
      end
    else
      @gongdans = Gongdan.where("(flag = 1 AND appoint_worker = :p) OR (flag = 1 AND department = :p)", p:params[:q]).order(created_at: :desc)
    end
  end


  def history_index
    a = params[:q]
    if a === '' || a == nil
      if current_number == 1 || current_number == 2
        @gongdans = Gongdan.where(:flag =>2).order(created_at: :desc).page(params[:page]).per(10)
      elsif current_number == 3
        @gongdans = Gongdan.where(:appoint_worker => current_user.name, :flag =>2).order(created_at: :desc).page(params[:page]).per(10)
      else
         @gongdans = Gongdan.where(:department => current_user.department, :flag =>2).order(created_at: :desc).page(params[:page]).per(10)
     end
    else
      @gongdans = Gongdan.where("(flag = 2 AND title LIKE :p) OR (flag = 2 AND appoint_worker LIKE :p) OR (flag = 2 AND department LIKE :p)OR (flag = 2 AND area LIKE :p)OR
      (flag = 2 AND category LIKE :p)", p:"%#{params[:q]}%").order(created_at: :desc).page(params[:page]).per(10)
    end
  end

  def experience_base
    a = params[:q]
    if a.blank?
      @gongdans = Gongdan.where(:experience_base => 'yes' ).order(created_at: :desc).page(params[:page]).per(10)
    else
      @gongdans = Gongdan.where("(experience_base = 'yes' AND title LIKE :p) OR (experience_base = 'yes' AND department LIKE :p)
      OR (experience_base = 'yes' AND area LIKE :p) OR (experience_base = 'yes' AND category LIKE :p) OR (experience_base = 'yes'
      AND description LIKE :p) OR (experience_base = 'yes' AND processing_procedure LIKE :p)", p:"%#{params[:q]}%").order(created_at: :desc).page(params[:page]).per(10)
    end
  end
  def exports
    t = params[:reservation]
    d = Time.now.day
    s = Time.now - d.day
    e = Time.now
    r = s..e 
    if !t.blank?
      startdate = params[:reservation][0,10]
      enddate = params[:reservation][-10,10]
      time_range = startdate..enddate
    end
    a= params[:area]
    b= params[:team]
    if params[:id]
      puts params[:id]
      gongdans = params[:id]
      gongdan = gongdans.split('/')
      @gongdans = Array.new
      gongdan.each  {|a| @gongdans << Gongdan.find(a)}

    elsif current_number == 1 || current_number == 2
      
      if  t.blank? and a.blank? and b.blank?
        @gongdans = Gongdan.where(flag:2, created_at:r ).order(created_at: :desc).page(params[:page]).per(1000)
      elsif !t.blank? and a.blank? and b.blank?
        @gongdans = Gongdan.where(created_at:time_range, flag:2).order(created_at: :desc).page(params[:page]).per(1000)
      elsif t.blank? and !a.blank? and b.blank?
        @gongdans = Gongdan.where(flag:2, area:a).order(created_at: :desc).page(params[:page]).per(1000)
      elsif t.blank? and a.blank? and !b.blank?
        @gongdans = Gongdan.where(flag:2,appoint_department:b ).order(created_at: :desc).page(params[:page]).per(1000)
      elsif !t.blank? and !a.blank? and b.blank?
        @gongdans = Gongdan.where(flag:2,created_at:time_range,area:a).order(created_at: :desc).page(params[:page]).per(1000)
      elsif t.blank? and !a.blank? and !b.blank?
        @gongdans = Gongdan.where(flag:2,area:a,appoint_department:b).order(created_at: :desc).page(params[:page]).per(1000)
      elsif !t.blank? and a.blank? and !b.blank?
        @gongdans = Gongdan.where(flag:2,created_at:time_range,appoint_department:b).order(created_at: :desc).page(params[:page]).per(1000)
      else !t.blank? and !a.blank? and !b.blank?
      @gongdans = Gongdan.where(flag:2,created_at:time_range,area:a,appoint_department:b).order(created_at: :desc).page(params[:page]).per(1000)
      end
    elsif    current_number == 4
      if t.blank?
      @gongdans = Gongdan.where(appoint_department: current_user.department, flag: 2, created_at:r).order(created_at: :desc).page(params[:page]).per(1000)
      else
        @gongdans = Gongdan.where(flag:2,appoint_department: current_user.department,updated_at:time_range).order(created_at: :desc).page(params[:page]).per(1000)
      end
    else  current_number == 3
      if t.blank?
        @gongdans = Gongdan.where(appoint_worker: current_user.name, flag: 2, created_at:r).order(created_at: :desc).page(params[:page]).per(1000)
      else
        @gongdans =Gongdan.where(flag:2,appoint_worker: current_user,updated_at:time_range).page(params[:page]).per(1000)
      end
    end
    respond_to do |format|
      format.html
      format.xlsx {render xlsx: 'exports', filename: "IT维修服务表-#{current_user.name}-#{Time.now.to_date}.xlsx"}
    end
  end

  def evaluate

    t = params[:reservation]
    d = Time.now.day
    s = Time.now - d.day
    e = Time.now
    r = s..e 
    if !t.blank?
      startdate = params[:reservation][0,10]
      enddate = params[:reservation][-10,10]
      time_range = startdate..enddate
    end
    a= params[:area]
    b= params[:team]
    if params[:id]
      puts params[:id]
      gongdans = params[:id]
      gongdan = gongdans.split('/')
      @gongdans = Array.new
      gongdan.each  {|a| @gongdans << Gongdan.find(a)}

    elsif current_number == 1 || current_number == 2

      if  t.blank? and a.blank? and b.blank?
        @gongdans = Gongdan.where(:flag =>2, created_at:r).order(created_at: :desc)
      elsif !t.blank? and a.blank? and b.blank?
        @gongdans = Gongdan.where(created_at:time_range, flag:2).order(created_at: :desc)
      elsif t.blank? and !a.blank? and b.blank?
        @gongdans = Gongdan.where(flag:2, area:a).order(created_at: :desc)
      elsif t.blank? and a.blank? and !b.blank?
        @gongdans = Gongdan.where(flag:2,appoint_department:b ).order(created_at: :desc)
      elsif !t.blank? and !a.blank? and b.blank?
        @gongdans = Gongdan.where(flag:2,created_at:time_range,area:a).order(created_at: :desc)
      elsif t.blank? and !a.blank? and !b.blank?
        @gongdans = Gongdan.where(flag:2,area:a,appoint_department:b).order(created_at: :desc)
      elsif !t.blank? and a.blank? and !b.blank?
        @gongdans = Gongdan.where(flag:2,created_at:time_range,appoint_department:b).order(created_at: :desc)
      else !t.blank? and !a.blank? and !b.blank?
      @gongdans = Gongdan.where(flag:2,created_at:time_range,area:a,appoint_department:b).order(created_at: :desc)
      end
    elsif    current_number == 4
      if t.blank?
        @gongdans = Gongdan.where(appoint_department: current_user.department, flag: 2, created_at:r).order(created_at: :desc)
      else
        @gongdans = Gongdan.where(flag:2,appoint_department: current_user.department,updated_at:time_range).order(created_at: :desc)
      end
    else  current_number == 3
      if t.blank?
        @gongdans = Gongdan.where(appoint_worker: current_user.name, flag: 2, created_at:r).order(created_at: :desc)
      else
        @gongdans =Gongdan.where(flag:2,appoint_worker: current_user,updated_at:time_range)
      end
    end

      respond_to do |format|
        format.html
        format.xlsx {render xlsx: 'evaluate', filename: "满意度调查表Excel导出-#{current_user.name}-#{Time.now.to_date}.xlsx"}
      end

  end


  def report
    t = params[:reservation]

    if !t.blank?
      startdate = params[:reservation][0,10]
      enddate = params[:reservation][-10,10]
      time_range = startdate..enddate
    end

    a= params[:keyword]

    #不选条件
    if  t.blank? and a.blank?
      d = Time.now.day
      s = Time.now - d.day
      e = Time.now
      r = s..e
      @gongdans = Gongdan.where(flag: 2,finish_time: r).order(created_at: :desc)
    elsif !t.blank? and a.blank?
      @gongdans = Gongdan.where(finish_time:time_range, flag:2).order(created_at: :desc)
    elsif t.blank? and !a.blank?
      @gongdans = Gongdan.where("(flag = 2 AND area LIKE :p) OR (flag = 2 AND appoint_department LIKE :p)
      OR (flag = 2 AND appoint_worker LIKE :p)",p:"%#{params[:keyword]}%").order(created_at: :desc)
    else !t.blank? and !a.blank?
      g = Gongdan.where(finish_time:time_range, flag:2)
      @gongdans = g.where("( flag = 2 AND area LIKE :p) OR (flag = 2 AND appoint_department LIKE :p)
      OR (flag = 2 AND appoint_worker LIKE :p)",p:"%#{params[:keyword]}%",).order(created_at: :desc)
    end
      @gongdans_groups = @gongdans.group_by{|s| s.department}


  end

  def evaluation
          t = params[:reservation]

    if !t.blank?
      startdate = params[:reservation][0,10]
      enddate = params[:reservation][-10,10]
      time_range = startdate..enddate
    end

    a= params[:keyword]

    #不选条件
    if  t.blank? and a.blank?
      d = Time.now.day
      s = Time.now - d.day
      e = Time.now
      r = s..e
      @gongdans = Gongdan.where(flag: 2,finish_time: r)
    elsif !t.blank? and a.blank?
      @gongdans = Gongdan.where(finish_time:time_range, flag:2)
    elsif t.blank? and !a.blank?
      @gongdans = Gongdan.where("(flag = 2 AND area LIKE :p) OR (flag = 2 AND appoint_department LIKE :p)
      OR (flag = 2 AND appoint_worker LIKE :p)",p:"%#{params[:keyword]}%")
    else !t.blank? and !a.blank?
      g = Gongdan.where(finish_time:time_range, flag:2)
      @gongdans = g.where("( flag = 2 AND area LIKE :p) OR (flag = 2 AND appoint_department LIKE :p)
      OR (flag = 2 AND appoint_worker LIKE :p)",p:"%#{params[:keyword]}%",)
    end
    @gongdans_timeliness = @gongdans.order(e_timeliness: :desc).group_by{|t| t.e_timeliness}
    @gongdans_attitude = @gongdans.order(e_attitude: :desc).group_by{|a| a.e_attitude}
    @gongdans_quality = @gongdans.order(e_quality: :desc).group_by{|q| q.e_quality}
    @gongdans_member = @gongdans.order(e_quality: :desc).group_by{|m| m.appoint_worker}
  end

  def attribute
        t = params[:reservation]

    if !t.blank?
      startdate = params[:reservation][0,10]
      enddate = params[:reservation][-10,10]
      time_range = startdate..enddate
    end

    a= params[:keyword]

    #不选条件
    if  t.blank? and a.blank?
      d = Time.now.day
      s = Time.now - d.day
      e = Time.now
      r = s..e
      @gongdans = Gongdan.where(flag: 2,finish_time: r).order(created_at: :desc)
    elsif !t.blank? and a.blank?
      @gongdans = Gongdan.where(finish_time:time_range, flag:2).order(created_at: :desc)
    elsif t.blank? and !a.blank?
      @gongdans = Gongdan.where("(flag = 2 AND area LIKE :p) OR (flag = 2 AND appoint_department LIKE :p)
      OR (flag = 2 AND appoint_worker LIKE :p)",p:"%#{params[:keyword]}%").order(created_at: :desc)
    else !t.blank? and !a.blank?
      g = Gongdan.where(finish_time:time_range, flag:2)
      @gongdans = g.where("( flag = 2 AND area LIKE :p) OR (flag = 2 AND appoint_department LIKE :p)
      OR (flag = 2 AND appoint_worker LIKE :p)",p:"%#{params[:keyword]}%",).order(created_at: :desc)
    end
    @gongdans_groups = @gongdans.group_by{|s| s.appoint_worker}
  end

  def analysis


    #当月数据
    d = Time.now.day
    s = Time.now - d.day
    e = Time.now
    r = s..e
    @gongdans_n = Gongdan.where(created_at:r, flag:2).order(category: :desc)
    @gongdans_category_n = @gongdans_n.group_by{|n| n.category}

    #上月数据
    s_l = Time.now - 1.month - d.day
    e_l = Time.now - 1.month
    r_l = s_l..e_l
    @gongdans_l = Gongdan.where(created_at:r_l, flag:2).order(category: :desc)
    @gongdans_category_l = @gongdans_l.group_by{|l| l.category}
  end

end
