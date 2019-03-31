class GongdansController < ApplicationController
  before_action :set_gongdan, only: [:show, :edit, :update, :destroy]

  # GET /gongdans
  # GET /gongdans.json
  def index
    @gongdans = Gongdan.all
  end

  # GET /gongdans/1
  # GET /gongdans/1.json
  def show
    if not current_user
      redirect_to :login
      flash[:notice] = "没有执行此操作的权限，请先登陆"
      return
    end
    @gongdan.experience_base = "no"
  end

  # GET /gongdans/new
  def new
    if not current_user
      redirect_to :login
      flash[:notice] = "没有执行此操作的权限，请先登陆"
      return
    else
      @gongdan = Gongdan.new(:user_id => current_user.id)
      @gongdan.creator = current_user.name
      @gongdan.area = current_user.area
      @gongdan.dispatch_time = nil
      @gongdan.dispatch_time_second = nil
      @gongdan.finish_time = nil
      @gongdan.accept_time = nil
      @gongdan.transfer_time = nil
      @gongdan.transger_reson = nil
      @gongdan.appoint_department = nil
      @gongdan.appoint_worker = nil
      @gongdan.appoint_department_again = nil
      @gongdan.helpers = nil
      @gongdan.state = "未指派"
      @gongdan.evaluate = nil
      @gongdan.flag = 1
      @gongdan.number = nil
      @gongdan.e_timeliness = nil
      @gongdan.e_attitude = nil
      @gongdan.e_quality = nil
      @gongdan.e_improvement = nil
      @gongdan.processing_procedure = nil
      @gongdan.experience_base = nil
      @gongdan.file_time = nil
      @gongdan.appoint_worker_again = nil
      @gongdan.department = current_user.department
      @gongdan.build_way = "正常新建"

    end
  end

  def additional
    if not current_user
      redirect_to :login
      flash[:notice] = "没有执行此操作的权限，请先登陆"
      return
    else
      @gongdan = Gongdan.find(params[:id])
      @gongdan.creator = current_user.name
      @gongdan.area = current_user.area
      @gongdan.state = "完成处理"
      gongdanid = (current_gongdan.id).to_s
      gongdantime = (current_gongdan.created_at.localtime).to_date.to_s
      @gongdan.number = gongdantime +'-'+ gongdanid
      @gongdan.appoint_worker = current_user.name
      @gongdan.appoint_department = current_user.appoint_department
      @gongdan.flag = 1
      @gongdan.build_way = "补录"
    end
  end

  # GET /gongdans/1/edit
  def edit

  end

  # GET /gongdans/I/manager_edit
  def manager_edit
    if not current_user
      redirect_to :login
      flash[:notice] = "没有执行此操作的权限，请先登陆"
      return
    else
      @gongdan = Gongdan.find(params[:id])
      @gongdan.dispatch_time = Time.now
      @gongdan.dispatch_time_second = Time.now
      gongdanid = (current_gongdan.id).to_s
      gongdantime = (current_gongdan.created_at).to_date.to_s
      @gongdan.number = gongdantime +'-'+ gongdanid
    end
  end
  
  # GET /gongdans/I/worker_edit
  def worker_edit
    if not current_user
      redirect_to :login
      flash[:notice] = "没有执行此操作的权限，请先登陆"
      return
    else
      @gongdan = Gongdan.find(params[:id])
      @gongdan.finish_time = Time.now
      a = Time.now
      puts a
    end
  end
  def worker_transfer
    @gongdan = Gongdan.find(params[:id])
    @gongdan.state = "移交"
    @gongdan.finish_time = nil
    @gongdan.transfer_time = Time.now
  end
  # GET /gongdans/I/user_edit
  def user_edit
    if not current_user
      redirect_to :login
      flash[:notice] = "没有执行此操作的权限，请先登陆"
      return
    else
      @gongdan = Gongdan.find(params[:id])
      @gongdan.flag = 2
      @gongdan.file_time = Time.now
    end
  end

  #GET /gongdans/I/experience_edit
  def experience_edit
    @gongdan = Gongdan.find(params[:id])

  end

  #worker accept gongdan
  def worker_accept
    @gongdan = Gongdan.find(params[:id])
    @gongdan.accept_time = Time.now
    @gongdan.state = "已受理"
  end


  # POST /gongdans
  # POST /gongdans.json

  def create
    @gongdan = Gongdan.new(gongdan_params)
    respond_to do |format|
      if @gongdan.save
        if  @gongdan.title == nil
          format.html { redirect_to additional_path(@gongdan.id)}
        else
          format.html { redirect_to list_path , notice: '工单创建成功！' }
          format.json { render :show, status: :ok, location: @gongdan }
        end
      else
        format.html { render :new }
        format.json { render json: @gongdan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /gongdans/1
  # PATCH/PUT /gongdans/1.json
  def update
    respond_to do |format|
      if @gongdan.update(gongdan_params)
        format.html { redirect_to list_path, notice: '工单编辑成功！' }
        format.json { render :list, status: :ok, location: @gongdan }
      else
        format.html { render :edit }
        format.json { render json: @gongdan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /gongdans/1
  # DELETE /gongdans/1.json
  def destroy
    if not current_user
      redirect_to :login
      flash[:notice] = "没有执行此操作的权限，请先登陆"
      return
    else
      @gongdan.destroy
      respond_to do |format|
        format.html { redirect_to list_path, notice: '成功删除工单！' }
        format.json { head :no_content }
      end
    end
  end

  def destroy_experience
    @gongdan = Gongdan.find(params[:id])
    @gongdan.experience_base = "no"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gongdan
      @gongdan = Gongdan.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def gongdan_params
      params.require(:gongdan).permit(:number, :title, :creator, :department, :area, :demander, :emergent, :file_time, :appoint_worker_again, :image, :avatar,
                                      :description, :appoint_worker, :state, :evaluate, :user_id, :e_timeliness, :e_attitude,:accept_time,
                                      :dispatch_time, :dispatch_time_second, :transfer_time, :e_quality, :e_improvement, :experience_base, :file,
                                      :finish_time, :transger_reson, :appoint_worker_again, :flag, :build_way, :appoint_department,:category, :processing_procedure,
                                      :helpers => [] )

    end
end
