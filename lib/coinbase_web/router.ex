defmodule CoinbaseWeb.Router do
  use CoinbaseWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :assign_current_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CoinbaseWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/signin", PageController, :index
    get "/signup", PageController, :index
    get "/charts", PageController, :index
    post "/send", PageController, :send
    get "/users", PageController, :index
    get "/dashboard", PageController, :index
    resources "/users", UserController
  end

  scope "/auth", CoinbaseWeb do
    pipe_through :browser # Use the default browser stack

    get "/:provider", AuthController, :index
    get "/:provider/callback", AuthController, :callback
    delete "/logout", AuthController, :delete

  end

  defp assign_current_user(conn, _) do
    assign(conn, :current_user, get_session(conn, :current_user))
  end

  if Mix.env == :dev do
    scope "/dev" do
      pipe_through [:browser]

      forward "/mailbox", Plug.Swoosh.MailboxPreview, [base_path: "/dev/mailbox"]
    end
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", CoinbaseWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/coins", CoinController, except: [:new, :edit]
    resources "/purs", Coin_purchaseController, except: [:new, :edit]
    resources "/alerts", Coin_alertController, except: [:new, :edit]
    post "/token", TokenController, :create
    post "/token_user", TokenController, :connect
  end
end
