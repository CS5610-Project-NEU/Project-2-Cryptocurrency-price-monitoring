defmodule CoinbaseWeb.PageController do
  use CoinbaseWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
