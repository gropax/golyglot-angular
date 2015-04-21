class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include BCrypt

  attr_accessor :password, :password_confirmation

  field :email, type: String
  field :password_hash, type: String
  field :accept_terms, type: Boolean

  has_many :lexicons

  validates_presence_of :email, message: "Email Address is Required."
  validates_uniqueness_of :email, message: "Email Address Already In Use."
  validates_format_of :email, :with => /\A[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}\z/i, message: "Invalid Email Address."
  validates_acceptance_of :accept_terms, allow_nil: false, accept: true, message: "Terms and Conditions Must Be Accepted."
  validates_length_of :password, :minimum => 8, message: "Password Must Be Longer Than 8 Characters."
  validates_confirmation_of :password, message: "Password Confirmation Must Match Given Password."

  before_save :encrypt_password

  def authenticate(password)
    Password.new(password_hash) == password
  end

  def self.find_by_email(email)
    self.find_by(email: email.downcase)
  rescue Mongoid::Errors::DocumentNotFound
    nil
  end

  protected

  def encrypt_password
    self.password_hash = Password.create(@password)
  end
end
