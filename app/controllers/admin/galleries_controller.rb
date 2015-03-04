class Admin::GalleriesController < Admin::AdminController
  def index
    @galleries = Gallery.all
  end
end