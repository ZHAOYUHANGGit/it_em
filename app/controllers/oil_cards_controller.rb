class OilCardsController < ApplicationController
  before_action :true_user_car_login
  before_action :set_oil_card, only: [:show, :edit, :update, :destroy]

  # GET /oil_cards
  # GET /oil_cards.json
  def index
    if current_user.name == "关志军"
      @oil_cards = OilCard.all.order(created_at: :desc).page(params[:page]).per(10)
    else
      @oil_cards = OilCard.where(area: current_user.area).order(created_at: :desc).page(params[:page]).per(10)
    end
  end


  # GET /oil_cards/1
  # GET /oil_cards/1.json
  def show
  end

  # GET /oil_cards/new
  def new
    if OilCard.where(area: current_user.area).first.nil?
      a = 0
    else
      a = OilCard.where(area: current_user.area).last.l_balance + OilCard.where(area: current_user.area).last.recharge - OilCard.where(area: current_user.area).last.spend
    end
    @oil_card = OilCard.new
    @oil_card.recharge = 0
    @oil_card.spend = 0
    @oil_card.l_balance = a
    @oil_card.area = current_user.area
  end

  # GET /oil_cards/1/edit
  def edit
  end

  # POST /oil_cards
  # POST /oil_cards.json
  def create
    @oil_card = OilCard.new(oil_card_params)

    respond_to do |format|
      if @oil_card.save
        format.html { redirect_to @oil_card, notice: 'Oil card was successfully created.' }
        format.json { render :show, status: :created, location: @oil_card }
      else
        format.html { render :new }
        format.json { render json: @oil_card.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /oil_cards/1
  # PATCH/PUT /oil_cards/1.json
  def update
    respond_to do |format|
      if @oil_card.update(oil_card_params)
        format.html { redirect_to @oil_card, notice: 'Oil card was successfully updated.' }
        format.json { render :show, status: :ok, location: @oil_card }
      else
        format.html { render :edit }
        format.json { render json: @oil_card.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /oil_cards/1
  # DELETE /oil_cards/1.json
  def destroy
    @oil_card.destroy
    respond_to do |format|
      format.html { redirect_to oil_cards_url, notice: 'Oil card was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_oil_card
      @oil_card = OilCard.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def oil_card_params
      params[:oil_card].permit(:l_balance, :recharge, :spend, :n_balance, :recharge_time, :area)
    end
end
