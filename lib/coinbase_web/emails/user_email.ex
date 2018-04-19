defmodule CoinbaseWeb.UserEmail do
  use Phoenix.Swoosh, view: CoinbaseWeb.Email.UserView, layout: {CoinbaseWeb.LayoutView, :email}

  def welcome(email_address,body) do
    new
    |> from("alert@webcoin.organizedchaos.me")
    |> to(email_address)
    |> subject("Welocome to WebCoin!")
    |> text_body(body)
  end
end
