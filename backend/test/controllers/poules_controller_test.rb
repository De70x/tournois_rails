require "test_helper"

class PoulesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @poule = poules(:one)
  end

  test "should get index" do
    get poules_url, as: :json
    assert_response :success
  end

  test "should create poule" do
    assert_difference("Poule.count") do
      post poules_url, params: { poule: { nom: @poule.nom, tournoi_id: @poule.tournoi_id } }, as: :json
    end

    assert_response :created
  end

  test "should show poule" do
    get poule_url(@poule), as: :json
    assert_response :success
  end

  test "should update poule" do
    patch poule_url(@poule), params: { poule: { nom: @poule.nom, tournoi_id: @poule.tournoi_id } }, as: :json
    assert_response :success
  end

  test "should destroy poule" do
    assert_difference("Poule.count", -1) do
      delete poule_url(@poule), as: :json
    end

    assert_response :no_content
  end
end
