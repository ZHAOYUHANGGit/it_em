class WorksController < ApplicationController

  before_action :true_user_car_login
  before_action :set_work, only: [:show, :edit, :update, :destroy]

  # GET /works
  # GET /works.json
  def index
      a = params[:q]
    if current_user.name == "关志军"
      b = Work.where(flag: nil)
    else
      b = Work.where(flag: nil, driver_name: current_user.name)
    end

    if a.blank?
     @works = b.order(created_at: :desc).page(params[:page]).per(10)
    else
    @works = b.where("( driver_name = :p) OR (department = :p) OR( area = :p)", p:params[:q]).order(created_at: :desc).page(params[:page]).per(10)
    end
  end

  # GET /works/1
  # GET /works/1.json
  def show
  end

  # GET /works/new
  def new
    @work = Work.new
    @work.oils_amount = 0
    @work.start_k = 0
    @work.end_k = 0
    @work.tolls = 0
    @work.parking_fees = 0
    @work.area = current_user.area
    @work.driver_name = current_user.name
    if current_user.area == "成都区"
      @work.car_number = "川A.H6079"
    end
    @work.start_address = "公司" 
  end

  # GET /works/1/edit
  def edit

  end


  # 加油!
  def oils_list
    number_range = 1..9999
    a = params[:q]
    if current_user.name == "关志军"
      b = Work.where(oils_amount:number_range)
    else
      b = Work.where(oils_amount:number_range, driver_name: current_user.name)
    end

    if a.blank?
      @works = b.page(params[:page]).per(10)
    else
      @works = b.where("( driver_name = :p) OR (area = :p) OR( car_number = :p)", p:params[:q]).order(created_at: :desc).page(params[:page]).per(10)
    end
  end

  def add_oil
    @work = Work.find(params[:id])
    @work.flag = 1
  end

  def show_oil
    @work = Work.find(params[:id])
  end

  def edit_oil
    @work = Work.find(params[:id])
  end





  # POST /works
  # POST /works.json
  def create
    @work = Work.new(work_params)

    respond_to do |format|
      if @work.save
        if  @work.start_address == nil
          format.html { redirect_to add_oil_path(@work.id)}
        else
        format.html { redirect_to @work, notice: '新建成功!' }
        format.json { render :show, status: :created, location: @work }
        end
      else
        format.html { render :new }
        format.json { render json: @work.errors, status: :unprocessable_entity }
      end
    end
  end


  # PATCH/PUT /works/1
  # PATCH/PUT /works/1.json
  def update
    respond_to do |format|
      if @work.update(work_params)
        format.html { redirect_to @work, notice: '修改成功!' }
        format.json { render :show, status: :ok, location: @work }
      else
        format.html { render :edit }
        format.json { render json: @work.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /works/1
  # DELETE /works/1.json
  def destroy
    @work.destroy
    respond_to do |format|
      format.html { redirect_to works_url, notice: '删除成功!' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_work
      @work = Work.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def work_params
      params.require(:work).permit(:car_name, :car_number, :driver_name, :department, :start_k, :end_k, :tolls, :work_time,
                                   :remarks, :area, :oils_amount, :flag, :start_address, :end_address, :parking_fees, :s_time,
                                   :e_time)
    end
end
