defmodule Coinbase.Repo.Migrations.CreateCoinAlert do
  use Ecto.Migration

  def change do
    create table(:coin_alert) do
      add :amount, :float
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :coin_id, references(:coins, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:coin_alert, [:user_id])
    create index(:coin_alert, [:coin_id])
  end
end
