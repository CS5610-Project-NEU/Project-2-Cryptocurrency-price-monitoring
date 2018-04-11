defmodule Coinbase.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :money, :float, default: 0
      add :password_hash, :string
      add :pw_tries, :integer
      add :pw_last_try, :utc_datetime

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
