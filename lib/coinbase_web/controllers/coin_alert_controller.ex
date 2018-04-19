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
    if (coin_alert_params["above"] == -1) do
      res = Coins.delete_alert(coin_alert_params["user_id"], coin_alert_params["coin_id"])
    end

    coin_alert = Coins.get_coin_alert_by_params(coin_alert_params)
    if coin_alert do
      with {:ok, %Coin_alert{} = coin_alert} <- Coins.update_coin_alert(coin_alert, coin_alert_params) do
        render(conn, "show.json", coin_alert: coin_alert)
      end
    else
      with {:ok, %Coin_alert{} = coin_alert} <- Coins.create_coin_alert(coin_alert_params) do
        conn
        |> put_status(:created)
        |> render("show.json", coin_alert: coin_alert)
      end
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
