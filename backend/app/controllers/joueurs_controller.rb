class JoueursController < ApplicationController
  before_action :set_joueur, only: %i[ show update destroy ]

  # GET /joueurs
  def index
    @joueurs = Joueur.all

    render json: @joueurs
  end

  # GET /joueurs/1
  def show
    render json: @joueur
  end

  # POST /joueurs
  def create
    @joueur = Joueur.new(joueur_params)

    if @joueur.save
      render json: @joueur, status: :created, location: @joueur
    else
      render json: @joueur.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /joueurs/1
  def update
    if @joueur.update(joueur_params)
      render json: @joueur
    else
      render json: @joueur.errors, status: :unprocessable_entity
    end
  end

  # DELETE /joueurs/1
  def destroy
    @joueur.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_joueur
      @joueur = Joueur.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def joueur_params
      params.require(:joueur).permit(:nom, :type_joueur, :poule_id, :tournoi_id)
    end
end
