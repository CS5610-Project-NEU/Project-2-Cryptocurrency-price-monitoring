defmodule CoinbaseWeb.TokenView do
  use CoinbaseWeb, :view

  alias Coinbase.Coins
  def render("token.json", %{user: user, token: token}) do

    coins = Coins.list_coin_purchase_by_user(user.id)
    alerts = Coins.list_alert_by_user(user.id)
    IO.inspect coins
    %{
      user_id: user.id,
      user_name: user.name,
      email: user.email,
      money: user.money,
      token: token,
      coins: coins,
      alerts: alerts ,
    }
  end
end
