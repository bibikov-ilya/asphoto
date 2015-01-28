class CreatePhoto < ActiveRecord::Migration
  def up
    create_table :photos do |t|
      t.has_attached_file :image
    end
  end

  def down
  	drop_table :photos
  end
end
