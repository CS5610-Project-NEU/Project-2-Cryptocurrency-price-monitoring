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
    a = Repo.insert!(%User{ name: "alice", email: "alice@a.com", password_hash: p, money: 10000.0,})
    b = Repo.insert!(%User{ name: "bob", email: "bob@b.com", password_hash: p , money: 10000.0,})
    c = Repo.insert!(%User{ name: "carol", email: "carol@c.com", password_hash: p, money: 10000.0,})
    d = Repo.insert!(%User{ name: "dave", email: "dave@d.com", password_hash: p, money: 10000.0,})

    Repo.delete_all(Coin)
    coin1 =  Repo.insert!(%Coin{ name: "bitcoin"})
    coin2 = Repo.insert!(%Coin{ name: "litcoin"})
    coin3 = Repo.insert!(%Coin{ name: "ethereum"})
    coin4 = Repo.insert!(%Coin{ name: "cash"})

    Repo.delete_all(Coin_alert)
    Repo.insert!(%Coin_alert{ user_id: a.id,coin_id: coin1.id, amount: 100.0, above: 1})
    Repo.insert!(%Coin_alert{ user_id: a.id,coin_id: coin2.id, amount: 0.0, above: 1})
    Repo.insert!(%Coin_alert{ user_id: a.id,coin_id: coin3.id, amount: 1000.0, above: 1})
    Repo.insert!(%Coin_alert{ user_id: a.id,coin_id: coin4.id, amount: 10000.0, above: 1})

    end
end

Seeds.run
