class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
def index
  if current_number == 1
    a = params[:q]
    if a === '' || a == nil
      @users = User.where(:flag => nil).page(params[:page]).per(10)
    else
      @users = User.where("name LIKE :p OR  department LIKE :p OR area LIKE :p", p:"%#{params[:q]}%").order(created_at: :desc).page(params[:page]).per(10)
    end
  else
    @users = User.where(:id => current_user.id)
  end
end

  def drivers_list
    if current_user.name == "关志军"
      @users = User.where(flag: 1).page(params[:page]).per(10)
    else
      @users = User.where(name: current_user.name)
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
    if current_number == 11
      @user.flag= 1
      @user.number = 11
    end
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
   end

def it_login

  end

  def create_it_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      if params[:remember_me]
        cookies.permanent[:token] = user.token
      else
        cookies[:token] = user.token
      end
        redirect_to :list
    else
      redirect_to :total
    end
  end

  def car_login

  end

  def create_car_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      if params[:remember_me]
        cookies.permanent[:token] = user.token
      else
        cookies[:token] = user.token
      end
      redirect_to :works
    else
      redirect_to :total
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to :total
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        if current_user.flag != 1
           format.html { redirect_to users_path, notice: '修改成功!' }
        else
           format.html {redirect_to drivers_list_path, notice: '修改成功!'}
        end
        format.json { render :index, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: '删除成功!' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit!
    end
end
