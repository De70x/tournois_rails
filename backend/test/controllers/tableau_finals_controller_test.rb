require "test_helper"

class TableauFinalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tableau_final = tableau_finals(:one)
  end

  test "should get index" do
    get tableau_finals_url, as: :json
    assert_response :success
  end

  test "should create tableau_final" do
    assert_difference("TableauFinal.count") do
      post tableau_finals_url, params: { tableau_final: { nom: @tableau_final.nom, tournoi_id: @tableau_final.tournoi_id } }, as: :json
    end

    assert_response :created
  end

  test "should show tableau_final" do
    get tableau_final_url(@tableau_final), as: :json
    assert_response :success
  end

  test "should update tableau_final" do
    patch tableau_final_url(@tableau_final), params: { tableau_final: { nom: @tableau_final.nom, tournoi_id: @tableau_final.tournoi_id } }, as: :json
    assert_response :success
  end

  test "should destroy tableau_final" do
    assert_difference("TableauFinal.count", -1) do
      delete tableau_final_url(@tableau_final), as: :json
    end

    assert_response :no_content
  end
end
