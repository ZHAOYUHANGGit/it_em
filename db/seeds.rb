# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if User.first.nil?
	user = User.new
 user.name = 'manage'
user.email = 'manage@jimbshoes.com'
user.password = '123456'
user.number = '1'
user.department = 'IT中心'
user.area = '青海区'
user.save!
else
	user = User.first
end

 user = User.new
 user.name = '关志军'
 user.email = 'guanzhijun@jimbshoes.com'
 user.password = '654321'
 user.number = '11'
 user.area = '青海区'
 user.flag = 1
 user.save!

if Permission.first.nil?
  permission = Permission.new
  permission.action = "subscriber"
  permission.subject = "gongdan"
  permission.description = "用户"
  permission.save!
else
  permission = Permission.first
end
 

  permission = Permission.new
  permission.action = "worker"
  permission.subject = "gongdan"
  permission.description = "维护人员"
  permission.save!

  permission = Permission.new
  permission.action = "director"
  permission.subject = "gongdan"
  permission.description = "主管"
  permission.save!





