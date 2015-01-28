class GalleriesController < ApplicationController

  def index
    @photos = Photo.all
  end

end