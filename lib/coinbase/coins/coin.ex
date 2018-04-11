defmodule Coinbase.Coins.Coin do
  use Ecto.Schema
  import Ecto.Changeset


  schema "coins" do
    field :name, :string

    has_many :coin_alert,Coin_alert, foreign_key: :coin_id
    has_many :coin_purchase,Coin_purchase, foreign_key: :coin_id

    timestamps()
  end

  @doc false
  def changeset(coin, attrs) do
    coin
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
