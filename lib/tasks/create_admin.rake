desc "Create admin user"
task :create_admin => :environment do
  Admin.create(email: 'admin@example.com', password: 'password')
end
