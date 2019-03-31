class AddSTimeToWorks < ActiveRecord::Migration
  def change
    add_column :works, :s_time, :datetime
    add_column :works, :e_time, :datetime
  end
end
