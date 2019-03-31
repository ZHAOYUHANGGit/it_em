class MaintainsController < ApplicationController
  before_action :true_user_car_login
  before_action :set_maintain, only: [:show, :edit, :update, :destroy]

  # GET /maintains
  # GET /maintains.json
  def index
      t = params[:reservation]
      if !t.blank?
        startdate = params[:reservation][0,10]
        enddate = params[:reservation][-10,10]
        time_range = startdate..enddate
      end
      a= params[:area]
      b= params[:car_name]
      #不选条件
      if  t.blank? and a.blank? and b.blank?
        @maintains = Maintain.all.order(created_at: :desc).page(params[:page]).per(10)
      elsif !t.blank? and a.blank? and b.blank?
        @maintains = Maintain.where(fix_time:time_range).order(created_at: :desc).page(params[:page]).per(10)
      elsif t.blank? and !a.blank? and b.blank?
        @maintains = Maintain.where( area:a).order(created_at: :desc).page(params[:page]).per(10)
      elsif t.blank? and a.blank? and !b.blank?
        @maintains = Maintain.where(car_name:b ).order(created_at: :desc).page(params[:page]).per(10)
      elsif !t.blank? and !a.blank? and b.blank?
        @maintains = Maintain.where(fix_time:time_range,area:a).order(created_at: :desc).page(params[:page]).per(10)
      elsif t.blank? and !a.blank? and !b.blank?
        @maintains = Maintain.where(area:a,car_name:b).order(created_at: :desc).page(params[:page]).per(10)
      elsif !t.blank? and a.blank? and !b.blank?
        @maintains = Maintain.where(fix_time:time_range,car_name:b).order(created_at: :desc).page(params[:page]).per(10)
      else !t.blank? and !a.blank? and !b.blank?
      @maintains = Maintain.where(fix_time:time_range,area:a,car_name:b).order(created_at: :desc).page(params[:page]).per(10)
      end
  end

  # GET /maintains/1
  # GET /maintains/1.json
  def show
  end

  # GET /maintains/new
  def new
    @maintain = Maintain.new
    @maintain.area = current_user.area
  end

  # GET /maintains/1/edit
  def edit
  end

  # POST /maintains
  # POST /maintains.json
  def create
    @maintain = Maintain.new(maintain_params)

    respond_to do |format|
      if @maintain.save
        format.html { redirect_to @maintain, notice: '新建成功!' }
        format.json { render :show, status: :created, location: @maintain }
      else
        format.html { render :new }
        format.json { render json: @maintain.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /maintains/1
  # PATCH/PUT /maintains/1.json
  def update
    respond_to do |format|
      if @maintain.update(maintain_params)
        format.html { redirect_to @maintain, notice: '修改成功!' }
        format.json { render :show, status: :ok, location: @maintain }
      else
        format.html { render :edit }
        format.json { render json: @maintain.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /maintains/1
  # DELETE /maintains/1.json
  def destroy
    @maintain.destroy
    respond_to do |format|
      format.html { redirect_to maintains_url, notice: '删除成功!' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_maintain
      @maintain = Maintain.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def maintain_params
      params.require(:maintain).permit(:car_name, :car_number, :fix_detail, :fix_time, :cost, :area)
    end
end
