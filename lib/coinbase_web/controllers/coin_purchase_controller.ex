defmodule CoinbaseWeb.Coin_purchaseController do
  use CoinbaseWeb, :controller

  alias Coinbase.Coins
  alias Coinbase.Coins.Coin_purchase

  action_fallback CoinbaseWeb.FallbackController

  def index(conn, _params) do
    coin_purchase = Coins.list_coin_purchase()
    render(conn, "index.json", coin_purchase: coin_purchase)
  end

  def create(conn, %{"coin_purchase" => coin_purchase_params}) do
    with {:ok, %Coin_purchase{} = coin_purchase} <- Coins.create_coin_purchase(coin_purchase_params) do
      conn
      |> put_status(:created)
      |> render("show.json", coin_purchase: coin_purchase)
    end
  end

  def show(conn, %{"id" => id}) do
    coin_purchase = Coins.get_coin_purchase!(id)
    render(conn, "show.json", coin_purchase: coin_purchase)
  end

  def create(conn, %{"coin_trans" => coin_trans}) do
    coin_purchase = Coins.get_coin_purchase(coin_trans["user_id"], coin_trans["coin_id"])
    if coin_purchase do
      with {:ok, %Coin_purchase{} = coin_purchase} <- Coins.update_coin_amount(coin_purchase, coin_trans["amount"]) do
        conn
        |> put_status(:created)
        |> render("show.json", coin_purchase: coin_purchase)
      end
    else
      with {:ok, %Coin_purchase{} = coin_purchase} <- Coins.create_coin_purchase(coin_trans) do
        conn
        |> put_status(:created)
        |> render("show.json", coin_purchase: coin_purchase)
      end
    end
  end

  def update(conn, %{"id" => id, "coin_purchase" => coin_purchase_params}) do
    coin_purchase = Coins.get_coin_purchase!(id)

    with {:ok, %Coin_purchase{} = coin_purchase} <- Coins.update_coin_purchase(coin_purchase, coin_purchase_params) do
      render(conn, "show.json", coin_purchase: coin_purchase)
    end
  end

  def delete(conn, %{"id" => id}) do
    coin_purchase = Coins.get_coin_purchase!(id)
    with {:ok, %Coin_purchase{}} <- Coins.delete_coin_purchase(coin_purchase) do
      send_resp(conn, :no_content, "")
    end
  end
end
