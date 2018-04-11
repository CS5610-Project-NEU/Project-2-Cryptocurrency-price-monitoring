defmodule Coinbase.Repo.Migrations.CreateCoinPurchase do
  use Ecto.Migration

  def change do
    create table(:coin_purchase) do
      add :amount, :float
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :coin_id, references(:coins, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:coin_purchase, [:user_id])
    create index(:coin_purchase, [:coin_id])
  end
end
