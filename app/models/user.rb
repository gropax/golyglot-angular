class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include BCrypt

  attr_accessor :password, :password_confirmation

  field :email, type: String
  field :password_hash, type: String
  field :accept_terms, type: Boolean

  validates_presence_of :email, message: "Email Address is Required."
  validates_uniqueness_of :email, message: "Email Address Already In Use."
  validates_format_of :email, :with => /\A[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}\z/i, message: "Invalid Email Address."
  validates_acceptance_of :accept_terms, allow_nil: false, accept: true, message: "Terms and Conditions Must Be Accepted."
  validates_length_of :password, :minimum => 8, message: "Password Must Be Longer Than 8 Characters."
  validates_confirmation_of :password, message: "Password Confirmation Must Match Given Password."

  before_save :encrypt_password

  def self.find_by_email(email)
    self.where(email: email).first
  end

  def self.authenticate(email, password)
    user = User.find_by_email(email)
    if user
      user_password = Password.new(user.password_hash)
      user_password == password
    else
      false
    end
  end

  protected

  def encrypt_password
    self.password_hash = Password.create(@password)
  end
end
