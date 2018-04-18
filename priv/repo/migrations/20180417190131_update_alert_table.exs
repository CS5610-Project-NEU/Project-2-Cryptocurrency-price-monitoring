defmodule Coinbase.Repo.Migrations.UpdateAlertTable do
  use Ecto.Migration

  def change do

    alter table("coin_alert") do
      add :above, :integer # Database type
    end
  end
end
