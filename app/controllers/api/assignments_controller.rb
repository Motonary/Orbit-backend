class Api::AssignmentsController < ApplicationController
  before_action :authenticate_user
  before_action :set_current_project, only: [:fetch_revolving, :create]

  def set_current_project
    @current_project = Project.find(params[:project_id])
  end

  def fetch_revolving
    render json: @current_project.assignments.where(destroyed_flag: false)
  end

  def fetch_destroyed
    destroyed_assignments = Assignment.search_with_user(current_user).search_destroyed
    destroyed_sub_assignments = SubAssignment.search_with_user(current_user).search_destroyed
    @destroyed_all_assignments =
      (destroyed_assignments + destroyed_sub_assignments).sort_by(&:destroyed_at).reverse

    handlable_assignments = {}

    @destroyed_all_assignments.each do |assignment|
      year = assignment.destroyed_at.strftime('%Y')
      date = assignment.destroyed_at.strftime('%m/%d')
      if handlable_assignments[year]
        if handlable_assignments[year][date]
          handlable_assignments[year][date].push assignment
        else
          handlable_assignments[year][date] = [assignment]
        end
      else
        handlable_assignments[year] = { date => [assignment] }
      end
    end
    render json: handlable_assignments
  end

  def create
    new_assignment = @current_project.assignments.new(assignment_params)
    new_assignment.save! and render json: new_assignment
  end

  def destroy
    destroyed_assignment = Assignment.find(params[:id])
    destroyed_assignment.update_attributes(destroyed_flag: true, destroyed_at: Time.current) and head :ok
  end

  def restore
    restored_assignment = Assignment.find(params[:id])
    restored_assignment.update_attributes(destroyed_flag: false, destroyed_at: null) and head :ok
  end

  private

    def assignment_params
      params.require(:assignment).permit(:title, :detail, :deadline, :planet_type, :planet_size, :orbit_pos)
    end
end
