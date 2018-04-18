defmodule CoinbaseWeb.UserEmail do
  use Phoenix.Swoosh, view: CoinbaseWeb.Email.UserView, layout: {CoinbaseWeb.LayoutView, :email}

  def welcome(email_address) do
    new
    |> from("alert@webcoin.organizedchaos.me")
    |> to(email_address)
    |> subject("Welocome to WebCoin!")
    |> render_body(:welcome)
  end
end
