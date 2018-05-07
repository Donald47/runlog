module V1
  class AtheletesController < ApplicationController
    before_action :set_athelete, only: [:show, :update, :destroy]

    # GET /atheletes
    def index
      @atheletes = Athelete.all

      render json: @atheletes
    end

    # GET /atheletes/1
    def show
      render json: @athelete
    end

    # POST /atheletes
    def create
      @athelete = Athelete.new(athelete_params)

      if @athelete.save
        render json: @athelete, status: :created, location: @athelete
      else
        render json: @athelete.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /atheletes/1
    def update
      if @athelete.update(athelete_params)
        render json: @athelete
      else
        render json: @athelete.errors, status: :unprocessable_entity
      end
    end

    # DELETE /atheletes/1
    def destroy
      @athelete.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_athelete
        @athelete = Athelete.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def athelete_params
        params.fetch(:athelete, {})
      end
  end
end
