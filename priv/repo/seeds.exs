# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Coinbase.Repo.insert!(%Coinbase.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


defmodule Seeds do
  alias Coinbase.Repo
  alias Coinbase.Coins.Coin_alert
  alias Coinbase.Coins.Coin_purchase

  alias Coinbase.Users.User
  alias Coinbase.Coins.Coin

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)

    d = Repo.insert!(%User{ name: "Vip", email: "vipulsharma018@gmail.com", password_hash: p, money: 10000.0,})

    Repo.delete_all(Coin)
    coin1 =  Repo.insert!(%Coin{ name: "bitcoin"}) # 1
    coin2 = Repo.insert!(%Coin{ name: "litcoin"}) # 2
    coin3 = Repo.insert!(%Coin{ name: "ethereum"}) # 3
    coin4 = Repo.insert!(%Coin{ name: "cash"}) # 4

    Repo.delete_all(Coin_alert)

    Repo.insert!(%Coin_alert{ user_id: d.id,coin_id: coin4.id, amount: 700.0, above: 1})

    end
end

Seeds.run
