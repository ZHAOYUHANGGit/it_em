require 'test_helper'

class OilCardsControllerTest < ActionController::TestCase
  setup do
    @oil_card = oil_cards(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:oil_cards)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create oil_card" do
    assert_difference('OilCard.count') do
      post :create, oil_card: {  }
    end

    assert_redirected_to oil_card_path(assigns(:oil_card))
  end

  test "should show oil_card" do
    get :show, id: @oil_card
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @oil_card
    assert_response :success
  end

  test "should update oil_card" do
    patch :update, id: @oil_card, oil_card: {  }
    assert_redirected_to oil_card_path(assigns(:oil_card))
  end

  test "should destroy oil_card" do
    assert_difference('OilCard.count', -1) do
      delete :destroy, id: @oil_card
    end

    assert_redirected_to oil_cards_path
  end
end
