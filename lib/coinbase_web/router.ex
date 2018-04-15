defmodule CoinbaseWeb.Router do
  use CoinbaseWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CoinbaseWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/signin", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", CoinbaseWeb do
  #   pipe_through :api
  # end
end
