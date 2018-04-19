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
end
