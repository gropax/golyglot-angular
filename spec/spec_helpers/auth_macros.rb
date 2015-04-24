module AuthMacros
  def current_user(sym)
    let(:current_user) { FactoryGirl.create(sym) }
    let(sym) { current_user }
    before { authenticate current_user }
  end
end
