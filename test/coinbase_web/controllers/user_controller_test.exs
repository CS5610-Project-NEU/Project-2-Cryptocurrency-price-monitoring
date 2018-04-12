defmodule CoinbaseWeb.UserControllerTest do
  use CoinbaseWeb.ConnCase

  alias Coinbase.Users
  alias Coinbase.Users.User

  @create_attrs %{email: "some email", money: 120.5, name: "some name", password_hash: "some password_hash", pw_last_try: "2010-04-17 14:00:00.000000Z", pw_tries: 42}
  @update_attrs %{email: "some updated email", money: 456.7, name: "some updated name", password_hash: "some updated password_hash", pw_last_try: "2011-05-18 15:01:01.000000Z", pw_tries: 43}
  @invalid_attrs %{email: nil, money: nil, name: nil, password_hash: nil, pw_last_try: nil, pw_tries: nil}

  def fixture(:user) do
    {:ok, user} = Users.create_user(@create_attrs)
    user
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all users", %{conn: conn} do
      conn = get conn, user_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post conn, user_path(conn, :create), user: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, user_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "email" => "some email",
        "money" => 120.5,
        "name" => "some name",
        "password_hash" => "some password_hash",
        "pw_last_try" => "2010-04-17 14:00:00.000000Z",
        "pw_tries" => 42}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, user_path(conn, :create), user: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update user" do
    setup [:create_user]

    test "renders user when data is valid", %{conn: conn, user: %User{id: id} = user} do
      conn = put conn, user_path(conn, :update, user), user: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, user_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "email" => "some updated email",
        "money" => 456.7,
        "name" => "some updated name",
        "password_hash" => "some updated password_hash",
        "pw_last_try" => "2011-05-18 15:01:01.000000Z",
        "pw_tries" => 43}
    end

    test "renders errors when data is invalid", %{conn: conn, user: user} do
      conn = put conn, user_path(conn, :update, user), user: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete user" do
    setup [:create_user]

    test "deletes chosen user", %{conn: conn, user: user} do
      conn = delete conn, user_path(conn, :delete, user)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, user_path(conn, :show, user)
      end
    end
  end

  defp create_user(_) do
    user = fixture(:user)
    {:ok, user: user}
  end
end
