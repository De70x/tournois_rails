class MatchsTournoisController < ApplicationController
  before_action :set_matchs_tournoi, only: %i[ show update destroy ]

  # GET /matchs_tournois
  def index
    @matchs_tournois = MatchsTournoi.all

    render json: @matchs_tournois
  end

  # GET /matchs_tournois/1
  def show
    render json: @matchs_tournoi
  end

  # POST /matchs_tournois
  def create
    @matchs_tournoi = MatchsTournoi.new(matchs_tournoi_params)

    if @matchs_tournoi.save
      render json: @matchs_tournoi, status: :created, location: @matchs_tournoi
    else
      render json: @matchs_tournoi.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /matchs_tournois/1
  def update
    if @matchs_tournoi.update(matchs_tournoi_params)
      render json: @matchs_tournoi
    else
      render json: @matchs_tournoi.errors, status: :unprocessable_entity
    end
  end

  # DELETE /matchs_tournois/1
  def destroy
    @matchs_tournoi.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_matchs_tournoi
      @matchs_tournoi = MatchsTournoi.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def matchs_tournoi_params
      params.require(:matchs_tournoi).permit(:joueur1_id, :joueur2_id, :score_1, :score_2, :statut, :stade_id, :phase, :indice)
    end
end
