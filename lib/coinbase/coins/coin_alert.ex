defmodule Coinbase.Coins.Coin_alert do
  use Ecto.Schema
  import Ecto.Changeset
  alias Coinbase.Users.User
  alias Coinbase.Coins.Coin



  schema "coin_alert" do
    field :amount, :float
#    field :user_id, :id
#    field :coin_id, :id
    belongs_to :user, User
    belongs_to :coin, Coin

    timestamps()
  end

  @doc false
  def changeset(coin_alert, attrs) do
    coin_alert
    |> cast(attrs, [:user_id,:coin_id,:amount])
    |> validate_required([:user_id,:coin_id,:amount])
  end
end
