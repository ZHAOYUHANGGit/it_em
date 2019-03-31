class Gongdan < ActiveRecord::Base
  belongs_to :user
  serialize :helpers
  mount_uploader :image, ImageUploader
  mount_uploader :avatar, AvatarUploader
  mount_uploader :file, FileUploader
end
