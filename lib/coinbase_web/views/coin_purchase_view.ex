defmodule CoinbaseWeb.Coin_purchaseView do
  use CoinbaseWeb, :view
  alias CoinbaseWeb.Coin_purchaseView

  def render("index.json", %{coin_purchase: coin_purchase}) do
    %{data: render_many(coin_purchase, Coin_purchaseView, "coin_purchase.json")}
  end

  def render("show.json", %{coin_purchase: coin_purchase}) do
    %{data: render_one(coin_purchase, Coin_purchaseView, "coin_purchase.json")}
  end

  def render("coin_purchase.json", %{coin_purchase: coin_purchase}) do
    %{id: coin_purchase.id,
      amount: coin_purchase.amount}
  end
end
