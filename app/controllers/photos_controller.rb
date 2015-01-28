class PhotosController < ApplicationController

  def new
  	@photo = Photo.new
  end

  def create
    @photo = Photo.create photo_params  	
    unless @photo
  	  redirect_to action: :new
  	end
  end

  def show
  	@photo = Photo.find params[:id]
  end

  private

  def photo_params
  	params.require(:photo).permit(:image)
  end

end