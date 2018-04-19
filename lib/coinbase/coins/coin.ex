defmodule Coinbase.Coins.Coin do
  use Ecto.Schema
  import Ecto.Changeset
  alias Coinbase.Coins.Coin_alert
  alias Coinbase.Coins.Coin_purchase


  schema "coins" do
    field :name, :string
    timestamps()
  end

  @doc false
  def changeset(coin, attrs) do
    coin
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
