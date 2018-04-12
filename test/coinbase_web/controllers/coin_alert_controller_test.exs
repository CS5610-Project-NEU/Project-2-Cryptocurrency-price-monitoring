defmodule CoinbaseWeb.Coin_alertControllerTest do
  use CoinbaseWeb.ConnCase

  alias Coinbase.Coins
  alias Coinbase.Coins.Coin_alert

  @create_attrs %{amount: 120.5}
  @update_attrs %{amount: 456.7}
  @invalid_attrs %{amount: nil}

  def fixture(:coin_alert) do
    {:ok, coin_alert} = Coins.create_coin_alert(@create_attrs)
    coin_alert
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all coin_alert", %{conn: conn} do
      conn = get conn, coin_alert_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create coin_alert" do
    test "renders coin_alert when data is valid", %{conn: conn} do
      conn = post conn, coin_alert_path(conn, :create), coin_alert: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, coin_alert_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 120.5}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, coin_alert_path(conn, :create), coin_alert: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update coin_alert" do
    setup [:create_coin_alert]

    test "renders coin_alert when data is valid", %{conn: conn, coin_alert: %Coin_alert{id: id} = coin_alert} do
      conn = put conn, coin_alert_path(conn, :update, coin_alert), coin_alert: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, coin_alert_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 456.7}
    end

    test "renders errors when data is invalid", %{conn: conn, coin_alert: coin_alert} do
      conn = put conn, coin_alert_path(conn, :update, coin_alert), coin_alert: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete coin_alert" do
    setup [:create_coin_alert]

    test "deletes chosen coin_alert", %{conn: conn, coin_alert: coin_alert} do
      conn = delete conn, coin_alert_path(conn, :delete, coin_alert)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, coin_alert_path(conn, :show, coin_alert)
      end
    end
  end

  defp create_coin_alert(_) do
    coin_alert = fixture(:coin_alert)
    {:ok, coin_alert: coin_alert}
  end
end
