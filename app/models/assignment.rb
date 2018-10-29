# == Schema Information
#
# Table name: assignments
#
#  id             :integer          not null, primary key
#  title          :string
#  detail         :text
#  deadline       :datetime
#  planet_type    :integer
#  planet_size    :integer
#  orbit_pos      :integer
#  project_id     :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  done_flag      :boolean          default(FALSE)
#  destroyed_flag :boolean          default(FALSE)
#  destroyed_at   :datetime
#

class Assignment < ApplicationRecord
  belongs_to :project
  has_many :sub_assignments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 50 }
  validates :detail, length: { maximum: 140 }
  validates :planet_type, presence: true
  validates :planet_size, presence: true
  validates :orbit_pos,   presence: true
  validates :project_id,  presence: true

  enum planet_type: [:Uranus, :Mercury, :Pluto, :Saturn, :Earth, :Moon, :Love, :Mars,
                     :Neptune, :Jupiter, :Sun, :Venus, :Takoyaki, :Ball, :Egg]
  enum planet_size: [:small, :medium, :large]
  enum orbit_pos:   [:inside, :center, :outside]
end
