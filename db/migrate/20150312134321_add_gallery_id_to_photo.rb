class AddGalleryIdToPhoto < ActiveRecord::Migration
  def change
    change_table :photos do |t|
      t.belongs_to :gallery, index: true
    end
  end
end
