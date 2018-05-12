module V1
  class RunsController < V1Controller
    before_action :set_run, only: [:show, :update, :destroy]

    # GET /runs
    def index
      @runs = @athelete.runs
      render json: @runs
    end

    # GET /runs/1
    def show
      render json: @run
    end

    # POST /runs
    def create
      run_params['distance_in_meters']
      @run = Run.new({
        athelete_id: @athelete.id,
        distance_in_meters: run_params['distance_in_meters'],
        time_in_seconds: run_params['time_in_seconds'],
      })
      if @run.save
        @runs = @athelete.runs
        render json: @runs, status: :created
      else
        render json: @run.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /runs/1
    def update
      if @run.update(run_params)
        render json: @run
      else
        render json: @run.errors, status: :unprocessable_entity
      end
    end

    # DELETE /runs/1
    def destroy
      @run.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_run
        @run = Run.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def run_params
        params.fetch(:run, {}).permit(:distance_in_meters, :time_in_seconds)
      end
  end
end
