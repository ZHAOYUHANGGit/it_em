require 'test_helper'

class MaintainsControllerTest < ActionController::TestCase
  setup do
    @maintain = maintains(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:maintains)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create maintain" do
    assert_difference('Maintain.count') do
      post :create, maintain: {  }
    end

    assert_redirected_to maintain_path(assigns(:maintain))
  end

  test "should show maintain" do
    get :show, id: @maintain
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @maintain
    assert_response :success
  end

  test "should update maintain" do
    patch :update, id: @maintain, maintain: {  }
    assert_redirected_to maintain_path(assigns(:maintain))
  end

  test "should destroy maintain" do
    assert_difference('Maintain.count', -1) do
      delete :destroy, id: @maintain
    end

    assert_redirected_to maintains_path
  end
end
