defmodule CoinbaseWeb.Coin_purchaseControllerTest do
  use CoinbaseWeb.ConnCase

  alias Coinbase.Coins
  alias Coinbase.Coins.Coin_purchase

  @create_attrs %{amount: 42}
  @update_attrs %{amount: 43}
  @invalid_attrs %{amount: nil}

  def fixture(:coin_purchase) do
    {:ok, coin_purchase} = Coins.create_coin_purchase(@create_attrs)
    coin_purchase
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all coin_purchase", %{conn: conn} do
      conn = get conn, coin_purchase_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create coin_purchase" do
    test "renders coin_purchase when data is valid", %{conn: conn} do
      conn = post conn, coin_purchase_path(conn, :create), coin_purchase: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, coin_purchase_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 42}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, coin_purchase_path(conn, :create), coin_purchase: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update coin_purchase" do
    setup [:create_coin_purchase]

    test "renders coin_purchase when data is valid", %{conn: conn, coin_purchase: %Coin_purchase{id: id} = coin_purchase} do
      conn = put conn, coin_purchase_path(conn, :update, coin_purchase), coin_purchase: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, coin_purchase_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 43}
    end

    test "renders errors when data is invalid", %{conn: conn, coin_purchase: coin_purchase} do
      conn = put conn, coin_purchase_path(conn, :update, coin_purchase), coin_purchase: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete coin_purchase" do
    setup [:create_coin_purchase]

    test "deletes chosen coin_purchase", %{conn: conn, coin_purchase: coin_purchase} do
      conn = delete conn, coin_purchase_path(conn, :delete, coin_purchase)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, coin_purchase_path(conn, :show, coin_purchase)
      end
    end
  end

  defp create_coin_purchase(_) do
    coin_purchase = fixture(:coin_purchase)
    {:ok, coin_purchase: coin_purchase}
  end
end
