defmodule Coinbase.Coins.Coin_purchase do
  use Ecto.Schema
  import Ecto.Changeset
  alias Coinbase.Users.User
  alias Coinbase.Coins.Coin


  schema "coin_purchase" do
    field :amount, :float
#    field :user_id, :id
#    field :coin_id, :id
    belongs_to :user, User
    belongs_to :coin, Coin

    timestamps()
  end

  @doc false
  def changeset(coin_purchase, attrs) do
    coin_purchase
    |> cast(attrs, [:user_id,:coin_id,:amount])
    |> validate_required([:user_id,:coin_id,:amount])
  end
end
