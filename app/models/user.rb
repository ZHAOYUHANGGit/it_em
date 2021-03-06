class User < ActiveRecord::Base

  has_secure_password
  has_many :gongdans
  before_create { generate_token(:token) }

  has_and_belongs_to_many :permissions
  validates :name,  :password_digest,:number, :presence => true
  validates :name,  :uniqueness => true

  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
