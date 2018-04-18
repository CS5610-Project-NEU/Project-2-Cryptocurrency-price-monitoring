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
<<<<<<< HEAD
    get "/users", PageController, :index
=======
<<<<<<< HEAD
    post "/send", PageController, :send
=======
>>>>>>> 61523db9174cc9b5f507ceb7aeb830a428705e81
    get "/dashboard", PageController, :index
>>>>>>> 359a58371749da87c6c312f880c91eeff8405643
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
    post "/token", TokenController, :create
  end
end
