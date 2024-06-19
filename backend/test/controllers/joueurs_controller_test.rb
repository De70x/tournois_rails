require "test_helper"

class JoueursControllerTest < ActionDispatch::IntegrationTest
  setup do
    @joueur = joueurs(:one)
  end

  test "should get index" do
    get joueurs_url, as: :json
    assert_response :success
  end

  test "should create joueur" do
    assert_difference("Joueur.count") do
      post joueurs_url, params: { joueur: { nom: @joueur.nom, poule_id: @joueur.poule_id, type_joueur: @joueur.type_joueur } }, as: :json
    end

    assert_response :created
  end

  test "should show joueur" do
    get joueur_url(@joueur), as: :json
    assert_response :success
  end

  test "should update joueur" do
    patch joueur_url(@joueur), params: { joueur: { nom: @joueur.nom, poule_id: @joueur.poule_id, type_joueur: @joueur.type_joueur } }, as: :json
    assert_response :success
  end

  test "should destroy joueur" do
    assert_difference("Joueur.count", -1) do
      delete joueur_url(@joueur), as: :json
    end

    assert_response :no_content
  end
end
