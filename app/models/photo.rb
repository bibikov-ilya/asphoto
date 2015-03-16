require 'paperclip'

class Photo < ActiveRecord::Base	
  
  has_attached_file :image, styles: { medium: '300x300', thumb: '100x100' }

  # validates_attachment_presence :image
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  belongs_to :gallery
end