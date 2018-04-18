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
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true
    has_many :coin_alert,Coin_alert, foreign_key: :user_id
    has_many :coin_purchase,Coin_purchase, foreign_key: :user_id

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :money, :password_confirmation, :password])
    |> unique_constraint(:email)
    |> validate_confirmation(:password)
    |> validate_password(:password)
    |> put_pass_hash()
    |> validate_format(:email, ~r/.*?@.*?.com/)
    |> validate_required([:name, :email, :money, :password_hash])
  end
  def validate_password(changeset, field, options \\ []) do
        validate_change(changeset, field, fn _, password ->
          case valid_password?(password) do
            {:ok, _} -> []
            {:error, msg} -> [{field, options[:message] || msg}]
          end
        end)
      end

      def put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
        change(changeset, Comeonin.Argon2.add_hash(password))
      end
      def put_pass_hash(changeset), do: changeset

      def valid_password?(password) when byte_size(password) > 7 do
        {:ok, password}
      end
      def valid_password?(_), do: {:error, "You have left the password blank or it is too short!! Please enter a valid password"}
  end
