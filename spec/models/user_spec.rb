require 'rails_helper'

RSpec.describe User, :type => :model do

  let(:john) { FactoryGirl.create(:john) }
  let(:bob) { FactoryGirl.create(:bob) }

  it "has a valid factory" do
    expect(bob).to be_valid
  end

  describe "#name" do
    it "should not be blank" do
      bob.name = nil
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:name]).to include("Username is Required.")
    end

    it "should be unique" do
      bob.name = john.name
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:name]).to include("Username Already Exists.")
    end
  end

  describe "#email" do
    it "should not be blank" do
      bob.email = nil
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:email]).to include("Email Address is Required.")
    end

    it "should be unique" do
      bob.email = john.email
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:email]).to include("Email Address Already In Use.")
    end

    it "should have a valid email format" do
      bob.email = "bob$glob@bougle."
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:email]).to include("Invalid Email Address.")
    end
  end

  describe "#accept_terms" do
    it "should be true" do
      bob.accept_terms = false
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:accept_terms]).to include("Terms and Conditions Must Be Accepted.")
    end
  end

  describe "#password" do
    let(:bob) { FactoryGirl.build(:bob, password: 'auienrst') }

    it "should contain 8+ characters" do
      bob.password = 'auie'
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:password]).to include("Password Must Be Longer Than 8 Characters.")
    end

    it "should match #password_confirmation" do
      bob.password_confirmation = 'nrstauie'
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:password_confirmation]).to include("Password Confirmation Must Match Given Password.")
    end
  end

  describe "#lexicons" do
    let(:bob) { FactoryGirl.build(:bob) }

    it "may have many lexicons" do
      lexicons = FactoryGirl.create_list(:lexicon, 4, user: bob)
      expect(bob.lexicons).to match_array(lexicons)
    end
  end

  describe "#password_hash" do
    let(:bob) { FactoryGirl.build(:bob) }

    it "should be nil before save" do
      expect(bob.send(:password_hash)).to be_nil
    end

    it "should be generated and persisted on save" do
      bob.save
      expect(bob.send(:password_hash)).not_to be_nil
    end

    it "should be different from real password" do
      bob.save
      expect(bob.send(:password_hash)).not_to eq(bob.password)
    end
  end

  describe "#authenticate" do
    it "returns false if wrong password" do
      expect(bob.authenticate("wrongpwd")).to be false
    end

    it "returns true if correct password" do
      expect(bob.authenticate("bobbybou")).to be true
    end
  end
end
