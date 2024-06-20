require "test_helper"

class TournoisControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tournoi = tournois(:one)
  end

  test "should get index" do
    get tournois_url, as: :json
    assert_response :success
  end

  test "should create tournoi" do
    assert_difference("Tournoi.count") do
      post tournois_url, params: { tournoi: { actif: @tournoi.actif, annee: @tournoi.annee, nom: @tournoi.nom } }, as: :json
    end

    assert_response :created
  end

  test "should show tournoi" do
    get tournoi_url(@tournoi), as: :json
    assert_response :success
  end

  test "should update tournoi" do
    patch tournoi_url(@tournoi), params: { tournoi: { actif: @tournoi.actif, annee: @tournoi.annee, nom: @tournoi.nom } }, as: :json
    assert_response :success
  end

  test "should destroy tournoi" do
    assert_difference("Tournoi.count", -1) do
      delete tournoi_url(@tournoi), as: :json
    end

    assert_response :no_content
  end
end
