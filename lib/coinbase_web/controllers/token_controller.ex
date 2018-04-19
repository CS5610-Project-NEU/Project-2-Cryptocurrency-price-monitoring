defmodule CoinbaseWeb.TokenController do
  use CoinbaseWeb, :controller
  alias Coinbase.Users.User

  action_fallback CoinbaseWeb.FallbackController

  def create(conn, %{"email" => email, "pass" => pass}) do
    with {:ok, %User{} = user} <- Coinbase.Users.get_and_auth_user(email, pass) do
        token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end

  def connect(conn, %{"token" => token}) do
    case Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      {:ok, user_id} ->
        user =  Coinbase.Users.get_user!(user_id)
        conn
        |> render("token.json", user: user, token: token)
    end 
  end
end
