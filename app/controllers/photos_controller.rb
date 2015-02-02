class PhotosController < ApplicationController

  def index
    @photos = Photo.all
  end

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

  def destroy
    Photo.find(params[:id]).destroy
    redirect_to action: :index
  end

  private

  def photo_params
  	params.require(:photo).permit(:image)
  end

end