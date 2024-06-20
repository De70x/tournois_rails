require "test_helper"

class MatchsTournoisControllerTest < ActionDispatch::IntegrationTest
  setup do
    @matchs_tournoi = matchs_tournois(:one)
  end

  test "should get index" do
    get matchs_tournois_url, as: :json
    assert_response :success
  end

  test "should create matchs_tournoi" do
    assert_difference("MatchsTournoi.count") do
      post matchs_tournois_url, params: { matchs_tournoi: { indice: @matchs_tournoi.indice, joueur_1_id: @matchs_tournoi.joueur_1_id, joueur_2_id: @matchs_tournoi.joueur_2_id, phase: @matchs_tournoi.phase, score_1: @matchs_tournoi.score_1, score_2: @matchs_tournoi.score_2, stade_id: @matchs_tournoi.stade_id, statut: @matchs_tournoi.statut } }, as: :json
    end

    assert_response :created
  end

  test "should show matchs_tournoi" do
    get matchs_tournoi_url(@matchs_tournoi), as: :json
    assert_response :success
  end

  test "should update matchs_tournoi" do
    patch matchs_tournoi_url(@matchs_tournoi), params: { matchs_tournoi: { indice: @matchs_tournoi.indice, joueur_1_id: @matchs_tournoi.joueur_1_id, joueur_2_id: @matchs_tournoi.joueur_2_id, phase: @matchs_tournoi.phase, score_1: @matchs_tournoi.score_1, score_2: @matchs_tournoi.score_2, stade_id: @matchs_tournoi.stade_id, statut: @matchs_tournoi.statut } }, as: :json
    assert_response :success
  end

  test "should destroy matchs_tournoi" do
    assert_difference("MatchsTournoi.count", -1) do
      delete matchs_tournoi_url(@matchs_tournoi), as: :json
    end

    assert_response :no_content
  end
end
