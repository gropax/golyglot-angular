require 'rails_helper'

RSpec.describe Sentence, :type => :model do

  let(:john) { FactoryGirl.create(:john) }
  let(:bob) { FactoryGirl.create(:bob) }

  describe "#email" do
    it "should be unique" do
      bob.email = john.email
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:email]).to include("Email Address Already In Use.")
    end

    it "should exist" do
      bob.email = nil
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:email]).to include("Email Address is Required.")
    end

    it "should have a valid format" do
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
    it "should contain 8+ characters" do
      bob = FactoryGirl.build(:bob, {password: "bob"})
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:password]).to include("Password Must Be Longer Than 8 Characters.")
    end

    it "should match #password_confirmation" do
      bob = FactoryGirl.build(:bob, {password: "bouboubou", password_confirmation: "bouboubuo"})
      expect(bob).not_to be_valid
      expect(bob.errors.messages[:password_confirmation]).to include("Password Confirmation Must Match Given Password.")
    end
  end

  describe "#password_hash" do
    before(:each) do
      @boby = FactoryGirl.build(:bob)
    end

    it "should be nil before save" do
      expect(@boby.send(:password_hash)).to be_nil
    end

    it "should be generated and persisted on save" do
      @boby.save
      expect(@boby.send(:password_hash)).not_to be_nil
    end

    it "should be different from real password" do
      @boby.save
      expect(@boby.send(:password_hash)).not_to eq(@boby.password)
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

  describe "#lexicons" do
    before(:each) do
      @bob = FactoryGirl.build(:bob)
    end

    it "may have many lexicons" do
      lexicons = FactoryGirl.create_list(:lexicon, 4, user: @bob)
      expect(@bob.lexicons).to match_array(lexicons)
    end
  end
end
