class AddFileToGongdans < ActiveRecord::Migration
  def change
      add_column :gongdans, :file, :string
  end
end
