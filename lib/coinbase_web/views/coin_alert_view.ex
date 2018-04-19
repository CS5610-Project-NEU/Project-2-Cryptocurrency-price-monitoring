defmodule CoinbaseWeb.Coin_alertView do
  use CoinbaseWeb, :view
  alias CoinbaseWeb.Coin_alertView

  def render("index.json", %{coin_alert: coin_alert}) do
    %{data: render_many(coin_alert, Coin_alertView, "coin_alert.json")}
  end

  def render("show.json", %{coin_alert: coin_alert}) do
    %{data: render_one(coin_alert, Coin_alertView, "coin_alert.json")}
  end

  def render("coin_alert.json", %{coin_alert: coin_alert}) do
    %{id: coin_alert.id,
      user_id: coin_alert.user_id,
      coin_id: coin_alert.coin_id,
      amount: coin_alert.amount}
  end
end
