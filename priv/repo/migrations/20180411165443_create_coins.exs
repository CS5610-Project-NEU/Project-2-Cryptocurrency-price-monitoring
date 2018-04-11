defmodule Coinbase.Repo.Migrations.CreateCoins do
  use Ecto.Migration

  def change do
    create table(:coins) do
      add :name, :string

      timestamps()
    end

  end
end
