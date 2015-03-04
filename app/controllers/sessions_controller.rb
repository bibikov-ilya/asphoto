class SessionsController < Devise::SessionsController
  def create
    super
    redirect_to admin_galleries_path
  end
end
