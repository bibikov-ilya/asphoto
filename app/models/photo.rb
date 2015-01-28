require 'paperclip'

class Photo < ActiveRecord::Base	
  
  has_attached_file :image

  # validates_attachment_presence :image
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
end