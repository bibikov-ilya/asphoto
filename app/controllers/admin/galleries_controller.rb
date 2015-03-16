class Admin::GalleriesController < Admin::AdminController
  def index
    @galleries = Gallery.joins('LEFT JOIN photos ON galleries.id = photos.gallery_id')
  end

  def new
    @gallery = Gallery.new
  end

  def create
    gallery = Gallery.new gallery_params
    if gallery.save
      flash[:success] = 'Gallery successful create'
    else
      glash[:error] = ''
    end
  end

private
  def gallery_params
    params.require(:gallery).permit(:name)
  end
end