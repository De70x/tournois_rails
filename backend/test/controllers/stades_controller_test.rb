require "test_helper"

class StadesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @stade = stades(:one)
  end

  test "should get index" do
    get stades_url, as: :json
    assert_response :success
  end

  test "should create stade" do
    assert_difference("Stade.count") do
      post stades_url, params: { stade: { nom: @stade.nom, tournoi_id: @stade.tournoi_id } }, as: :json
    end

    assert_response :created
  end

  test "should show stade" do
    get stade_url(@stade), as: :json
    assert_response :success
  end

  test "should update stade" do
    patch stade_url(@stade), params: { stade: { nom: @stade.nom, tournoi_id: @stade.tournoi_id } }, as: :json
    assert_response :success
  end

  test "should destroy stade" do
    assert_difference("Stade.count", -1) do
      delete stade_url(@stade), as: :json
    end

    assert_response :no_content
  end
end
