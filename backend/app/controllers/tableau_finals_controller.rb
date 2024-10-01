class TableauFinalsController < ApplicationController
  before_action :set_tableau_final, only: %i[ show update destroy ]

  # GET /tableau_finals
  def index
    @tableau_finals = TableauFinal.all

    render json: @tableau_finals
  end

  # GET /tableau_finals/1
  def show
    render json: @tableau_final
  end

  # POST /tableau_finals
  def create
    @tableau_final = TableauFinal.new(tableau_final_params)

    if @tableau_final.save
      render json: @tableau_final, status: :created, location: @tableau_final
    else
      render json: @tableau_final.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tableau_finals/1
  def update
    if @tableau_final.update(tableau_final_params)
      render json: @tableau_final
    else
      render json: @tableau_final.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tableau_finals/1
  def destroy
    @tableau_final.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_tableau_final
    @tableau_final = TableauFinal.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def tableau_final_params
    params.require(:tableau_final).permit(:nom, :tournoi_id)
  end
end
