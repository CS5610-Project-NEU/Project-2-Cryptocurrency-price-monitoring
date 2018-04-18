defmodule CoinbaseWeb.PageController do
  use CoinbaseWeb, :controller
  alias Coinbase.SendgridMailer
  alias CoinbaseWeb.UserEmail


  @default_to "vipulsharma018@gmail.com"

  @mailers %{
    "sendgrid" => SendgridMailer,
  }

  plug :scrub_params, "email" when action in [:send]

  def index(conn, _params) do
    render conn, "index.html"
  end


  def send(conn, %{"email" => %{"provider" => provider}} = params) do
    to = params["email"]["to"] || @default_to
    UserEmail.welcome(to)
    |> @mailers[provider].deliver
    |> case do
      {:ok, _result} ->
        conn
        |> put_flash(:info, "Email sent successfully")
        |> redirect(to: page_path(conn, :index))
      {:error, _reason} ->
        conn
        |> put_flash(:error, "There was an error while sending the email")
        |> redirect(to: page_path(conn, :index))
    end
  end
end
