require 'test_helper'

class GongdansControllerTest < ActionController::TestCase
  setup do
    @gongdan = gongdans(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gongdans)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create gongdan" do
    assert_difference('Gongdan.count') do
      post :create, gongdan: { area: @gongdan.area, creator: @gongdan.creator, demander: @gongdan.demander, department: @gongdan.department, emergent: @gongdan.emergent, file: @gongdan.file, number: @gongdan.number, title: @gongdan.title }
    end

    assert_redirected_to gongdan_path(assigns(:gongdan))
  end

  test "should show gongdan" do
    get :show, id: @gongdan
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @gongdan
    assert_response :success
  end

  test "should update gongdan" do
    patch :update, id: @gongdan, gongdan: { area: @gongdan.area, creator: @gongdan.creator, demander: @gongdan.demander, department: @gongdan.department, emergent: @gongdan.emergent, file: @gongdan.file, number: @gongdan.number, title: @gongdan.title }
    assert_redirected_to gongdan_path(assigns(:gongdan))
  end

  test "should destroy gongdan" do
    assert_difference('Gongdan.count', -1) do
      delete :destroy, id: @gongdan
    end

    assert_redirected_to gongdans_path
  end
end
