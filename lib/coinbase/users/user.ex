defmodule Coinbase.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Coinbase.Coins.Coin_alert
  alias Coinbase.Coins.Coin_purchase


  schema "users" do
    field :email, :string
    field :money, :float, default: 0
    field :name, :string
    field :password_hash, :string
    field :pw_last_try, :utc_datetime
    field :pw_tries, :integer
    field :password, :string, virtual: true
    has_many :coin_alert,Coin_alert, foreign_key: :user_id
    has_many :coin_purchase,Coin_purchase, foreign_key: :user_id

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :money, :password_hash])
    |> validate_required([:name, :email, :money, :password_hash])
    |> unique_constraint(:email)
    |> validate_format(:email, ~r/.*?@.*?.com/)
  end
end
