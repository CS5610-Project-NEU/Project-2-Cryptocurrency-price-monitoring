defmodule CoinbaseWeb.Coin_alertController do
  use CoinbaseWeb, :controller

  alias Coinbase.Coins
  alias Coinbase.Coins.Coin_alert

  action_fallback CoinbaseWeb.FallbackController

  def index(conn, _params) do
    coin_alert = Coins.list_coin_alert()
    render(conn, "index.json", coin_alert: coin_alert)
  end

  def create(conn, %{"coin_alert" => coin_alert_params}) do
    with {:ok, %Coin_alert{} = coin_alert} <- Coins.create_coin_alert(coin_alert_params) do
      conn
      |> put_status(:created)
    #  |> put_resp_header("location", coin_alert_path(conn, :show, coin_alert))
      |> render("show.json", coin_alert: coin_alert)
    end
  end

  def show(conn, %{"id" => id}) do
    coin_alert = Coins.get_coin_alert!(id)
    render(conn, "show.json", coin_alert: coin_alert)
  end

  def update(conn, %{"id" => id, "coin_alert" => coin_alert_params}) do
    coin_alert = Coins.get_coin_alert!(id)

    with {:ok, %Coin_alert{} = coin_alert} <- Coins.update_coin_alert(coin_alert, coin_alert_params) do
      render(conn, "show.json", coin_alert: coin_alert)
    end
  end

  def delete(conn, %{"id" => id}) do
    coin_alert = Coins.get_coin_alert!(id)
    with {:ok, %Coin_alert{}} <- Coins.delete_coin_alert(coin_alert) do
      send_resp(conn, :no_content, "")
    end
  end
end
