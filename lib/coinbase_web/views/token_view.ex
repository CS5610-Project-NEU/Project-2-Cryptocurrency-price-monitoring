defmodule CoinbaseWeb.TokenView do
  use CoinbaseWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      user_name: user.name,
      email: user.email,
      money: user.money,
      token: token,
    }
  end
end
